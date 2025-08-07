import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Admin-Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Datei-ID fehlt' },
        { status: 400 }
      );
    }

    // Dynamic Firebase Admin import
    const admin = await import('firebase-admin');
    
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        console.log('🔑 Initialisiere Firebase Admin für Media Delete...');
        
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
          projectId: 'misscrypto-bd419',
          storageBucket: 'misscrypto-bd419.firebasestorage.app'
        });
        
        console.log('✅ Firebase Admin für Media Delete erfolgreich initialisiert');
      } else {
        return NextResponse.json(
          { 
            success: false,
            error: 'Firebase Credentials nicht gefunden',
            details: 'FIREBASE_PRIVATE_KEY und FIREBASE_CLIENT_EMAIL sind erforderlich'
          },
          { status: 503 }
        );
      }
    }

    const bucket = admin.storage().bucket('misscrypto-bd419.firebasestorage.app');
    const db = admin.firestore();

    // Datei-Metadaten aus Firestore laden
    const mediaDoc = await db.collection('media').doc(id).get();
    
    if (!mediaDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Datei nicht gefunden' },
        { status: 404 }
      );
    }

    const mediaData = mediaDoc.data();

    try {
      // Datei aus Firebase Storage löschen
      if (mediaData?.storagePath) {
        const file = bucket.file(mediaData.storagePath);
        await file.delete();
      }
    } catch (storageError) {
      console.error('⚠️ Fehler beim Löschen aus Storage (Datei existiert möglicherweise nicht):', storageError);
      // Wir setzen trotzdem fort, um die Metadaten zu löschen
    }

    // Metadaten aus Firestore löschen
    await db.collection('media').doc(id).delete();

    return NextResponse.json({
      success: true,
      message: 'Datei erfolgreich gelöscht'
    });

  } catch (error) {
    console.error('❌ Fehler beim Löschen der Datei:', error);
    return NextResponse.json(
      { success: false, error: 'Fehler beim Löschen der Datei' },
      { status: 500 }
    );
  }
} 