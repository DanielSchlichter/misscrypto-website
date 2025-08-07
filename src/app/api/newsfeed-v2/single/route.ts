import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

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

    // Dynamic Firebase Admin import
    const admin = await import('firebase-admin');
    
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        console.log('🔑 Initialisiere Firebase Admin für Single Post...');
        
        const serviceAccount = {
          type: "service_account",
          project_id: "misscrypto-bd419",
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
          universe_domain: "googleapis.com"
        };

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as any),
          projectId: 'misscrypto-bd419'
        });
        
        console.log('✅ Firebase Admin für Single Post erfolgreich initialisiert');
      } else {
        return NextResponse.json(
          { 
            error: 'Firebase Credentials nicht gefunden',
            details: 'FIREBASE_PRIVATE_KEY und FIREBASE_CLIENT_EMAIL sind erforderlich'
          },
          { status: 503 }
        );
      }
    }

    // Post aus Firestore laden
    const db = admin.firestore();
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

    // Dynamic Firebase Admin import
    const admin = await import('firebase-admin');

    if (!admin.apps.length) {
      return NextResponse.json(
        { error: 'Firebase Admin nicht initialisiert' },
        { status: 503 }
      );
    }

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
    const db = admin.firestore();
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