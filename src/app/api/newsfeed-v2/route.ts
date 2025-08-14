import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '../../../lib/firebase-admin';

interface NewsfeedPost {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: string;
  views: number;
  likes: number;
  featuredImage?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}



// Hilfsfunktionen
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
  // Entferne HTML-Tags und erstelle Kurzfassung
  const textContent = content.replace(/<[^>]*>/g, '');
  if (textContent.length <= maxLength) {
    return textContent;
  }
  return textContent.substring(0, maxLength).trim() + '...';
}

// GET - Alle Newsfeed Posts laden (optimiert)
export async function GET(request: NextRequest) {
  try {
    const { admin, db } = await getFirebaseAdmin();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limitCount = parseInt(searchParams.get('limit') || '50');

    // Optimierte Firestore Abfrage
    let query = db.collection('newsfeed').orderBy('createdAt', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }

    if (limitCount > 0) {
      query = query.limit(limitCount);
    }

    console.log('🚀 Starte Newsfeed-Abfrage mit zentraler Firebase Admin...');
    const snapshot = await query.get();
    
    const posts = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      // Konvertiere Timestamps für Frontend
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      publishedAt: doc.data().publishedAt?.toDate?.() || null
    }));

    console.log(`✅ ${posts.length} Newsfeed Posts geladen (optimiert)`);

    return NextResponse.json({
      success: true,
      posts: posts
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Laden der Newsfeed Posts:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Laden der Posts',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}

// POST - Neuen Newsfeed Post erstellen
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    const { admin, db } = await getFirebaseAdmin();

    // Generiere Slug und Excerpt mit Standard-Werten
    const slug = generateSlug(title);
    const excerpt = generateExcerpt(content);
    
    // Standard-Werte für SEO
    const baseUrl = 'https://misscrypto.de';
    const fullCanonicalUrl = `${baseUrl}/blog/${slug}`;

    // Erstelle Post-Objekt mit Standard-Werten
    const postData = {
      title,
      content,
      excerpt,
      slug,
      category: category || 'Bitcoin',
      status: status || 'draft',
      author: session.user.name || session.user.email || 'Admin',
      views: 0,
      likes: 0,
      featuredImage: '',
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        keywords: [category || 'Bitcoin', 'Kryptowährung'],
        canonicalUrl: fullCanonicalUrl,
        openGraphImage: '',
        twitterCard: 'summary_large_image'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: status === 'published' ? admin.firestore.FieldValue.serverTimestamp() : null
    };

    // Speichere in Firestore
    const docRef = await db.collection('newsfeed').add(postData);

    console.log(`✅ Newsfeed Post erstellt: ${docRef.id} (${slug})`);

    return NextResponse.json({
      success: true,
      message: 'Post erfolgreich erstellt',
      id: docRef.id,
      slug: slug
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Erstellen des Posts:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Erstellen des Posts',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}

// DELETE - Newsfeed Post löschen
export async function DELETE(request: NextRequest) {
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

    const { db } = await getFirebaseAdmin();

    // Lösche aus Firestore
    await db.collection('newsfeed').doc(id).delete();

    console.log(`✅ Newsfeed Post gelöscht: ${id}`);

    return NextResponse.json({
      success: true,
      message: 'Post erfolgreich gelöscht'
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Löschen des Posts:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Löschen des Posts',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
} 