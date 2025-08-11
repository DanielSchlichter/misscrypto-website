import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '../../../lib/firebase-admin';

// GET - Einzelnen Post laden
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post-ID ist erforderlich' },
        { status: 400 }
      );
    }

    // Use centralized Firebase Admin initialization
    const { admin, db } = await getFirebaseAdmin();
    const doc = await db.collection('newsfeed').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Post nicht gefunden' },
        { status: 404 }
      );
    }

    const post = {
      id: doc.id,
      ...doc.data(),
      // Konvertiere Timestamps für Frontend
      createdAt: doc.data()?.createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate?.() || new Date(),
      publishedAt: doc.data()?.publishedAt?.toDate?.() || null
    };

    console.log(`✅ Single Post geladen: ${id}`);

    return NextResponse.json({
      success: true,
      post: post
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Laden des Posts:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Laden des Posts',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}

// PUT - Post aktualisieren
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post-ID ist erforderlich' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { 
      title, 
      content, 
      category, 
      status, 
      metaTitle, 
      metaDescription
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titel und Inhalt sind erforderlich' },
        { status: 400 }
      );
    }

    // Use centralized Firebase Admin initialization
    const { admin, db } = await getFirebaseAdmin();

    // Helper functions
    function generateSlug(title: string): string {
      return title
        .toLowerCase()
        .replace(/[äöüß]/g, (match) => {
          const replacements: { [key: string]: string } = {
            'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss'
          };
          return replacements[match] || match;
        })
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
    }

    function generateExcerpt(content: string, maxLength: number = 160): string {
      const textContent = content.replace(/<[^>]*>/g, '');
      if (textContent.length <= maxLength) {
        return textContent;
      }
      return textContent.substring(0, maxLength).trim() + '...';
    }

    // Generiere aktualisierte Daten
    const slug = generateSlug(title);
    const excerpt = generateExcerpt(content);
    const baseUrl = 'https://misscrypto.de';
    const fullCanonicalUrl = `${baseUrl}/blog/${slug}`;

    // Update-Objekt erstellen
    const updateData = {
      title,
      content,
      excerpt,
      slug,
      category: category || 'Bitcoin',
      status: status || 'draft',
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        keywords: [category || 'Bitcoin', 'Kryptowährung'],
        canonicalUrl: fullCanonicalUrl,
        openGraphImage: '',
        twitterCard: 'summary_large_image'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: status === 'published' ? admin.firestore.FieldValue.serverTimestamp() : null
    };

    // Post in Firestore aktualisieren
    await db.collection('newsfeed').doc(id).update(updateData);

    console.log(`✅ Post aktualisiert: ${id} (${slug})`);

    return NextResponse.json({
      success: true,
      message: 'Post erfolgreich aktualisiert',
      id: id,
      slug: slug
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Aktualisieren des Posts:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Aktualisieren des Posts',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
} 