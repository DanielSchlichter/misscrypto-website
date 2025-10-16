import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug ist erforderlich' },
        { status: 400 }
      );
    }

    // Firebase Admin initialisieren falls noch nicht geschehen
    if (!admin.apps.length) {
      console.log('🔑 Initialisiere Firebase Admin für By-Slug...');

      if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
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
        
        console.log('✅ Firebase Admin für By-Slug erfolgreich initialisiert');
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

    // Post nach Slug suchen
    const db = admin.firestore();
    const querySnapshot = await db.collection('newsfeed')
      .where('slug', '==', slug)
      .where('status', '==', 'published')
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Post nicht gefunden' },
        { status: 404 }
      );
    }

    const doc = querySnapshot.docs[0];
    const postData = doc.data();

    // View count erhöhen
    await doc.ref.update({
      views: admin.firestore.FieldValue.increment(1)
    });

    // Autoren-Daten laden falls authorId vorhanden
    let authorData = null;
    if (postData.authorId) {
      try {
        const authorDoc = await db.collection('authors').doc(postData.authorId).get();
        if (authorDoc.exists) {
          authorData = {
            id: authorDoc.id,
            ...authorDoc.data()
          };
          console.log('✅ Autor geladen:', authorData.name);
        }
      } catch (authorError) {
        console.warn('⚠️ Fehler beim Laden des Autors:', authorError);
      }
    }

    const post = {
      id: doc.id,
      ...postData,
      authorData, // Hinzufügen der aufgelösten Autor-Daten
      createdAt: postData.createdAt?.toDate?.()?.toISOString() || postData.createdAt,
      publishedAt: postData.publishedAt?.toDate?.()?.toISOString() || postData.publishedAt,
      views: (postData.views || 0) + 1
    };

    console.log('✅ Post geladen:', doc.id, 'mit Autor:', authorData?.name || 'kein Autor');

    return NextResponse.json({
      success: true,
      post
    });

  } catch (error) {
    console.error('❌ Fehler beim Laden des Posts:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Laden des Posts',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      },
      { status: 500 }
    );
  }
}