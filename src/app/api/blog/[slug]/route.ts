import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug ist erforderlich' },
        { status: 400 }
      );
    }

    // Dynamic Firebase Admin import
    const admin = await import('firebase-admin');
    
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        console.log('🔑 Initialisiere Firebase Admin für Blog...');
        
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
        
        console.log('✅ Firebase Admin für Blog erfolgreich initialisiert');
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

    // Firestore Abfrage nach Slug
    const db = admin.firestore();
    const snapshot = await db.collection('newsfeed')
      .where('slug', '==', slug)
      .where('status', '==', 'published')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Post nicht gefunden' },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const docData = doc.data();
    const post: any = {
      id: doc.id,
      ...docData,
      // Konvertiere Timestamps für Frontend
      createdAt: docData.createdAt?.toDate?.() || new Date(),
      updatedAt: docData.updatedAt?.toDate?.() || new Date(),
      publishedAt: docData.publishedAt?.toDate?.() || null
    };

    // Erhöhe View-Count
    try {
      await doc.ref.update({
        views: (post.views || 0) + 1
      });
      post.views = (post.views || 0) + 1;
    } catch (viewError) {
      console.log('⚠️ Konnte Views nicht erhöhen:', viewError);
    }

    console.log(`✅ Blog Post geladen: ${slug} (Views: ${post.views})`);

    return NextResponse.json({
      success: true,
      post: post
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Laden des Blog Posts:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Laden des Posts',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
} 