import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Media Upload API called');
    
    // Admin-Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    
    console.log('🔐 Session check:', {
      hasSession: !!session,
      user: session?.user,
      role: (session?.user as any)?.role
    });
    
    if (!session || (session.user as any)?.role !== 'admin') {
      console.log('❌ Authentication failed');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nicht autorisiert',
          debug: {
            hasSession: !!session,
            userRole: (session?.user as any)?.role,
            expectedRole: 'admin'
          }
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Keine Datei gefunden' },
        { status: 400 }
      );
    }

    // Validierung
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      return NextResponse.json(
        { success: false, error: 'Nur Bilder und Videos sind erlaubt' },
        { status: 400 }
      );
    }

    // Größe prüfen (100MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Datei zu groß. Maximum: 100MB' },
        { status: 400 }
      );
    }

    // Dynamic Firebase Admin import
    const admin = await import('firebase-admin');
    
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        console.log('🔑 Initialisiere Firebase Admin für Media Upload...');
        
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
        
        console.log('✅ Firebase Admin für Media Upload erfolgreich initialisiert');
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

    // Eindeutigen Dateinamen generieren
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `media/${timestamp}_${safeName}`;

    // Datei zu Firebase Storage hochladen
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const firebaseFile = bucket.file(fileName);
    
    await firebaseFile.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    });

    // Öffentliche URL erstellen
    await firebaseFile.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Metadaten in Firestore speichern
    const mediaDoc = {
      name: file.name,
      originalName: file.name,
      url: publicUrl,
      storagePath: fileName,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      mimeType: file.type,
      size: file.size,
      uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
      uploadedBy: (session.user as any)?.email || 'unknown',
    };

    const docRef = await db.collection('media').add(mediaDoc);

    return NextResponse.json({
      success: true,
      file: {
        id: docRef.id,
        ...mediaDoc,
        uploadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Upload-Fehler:', error);
    console.error('❌ Error Stack:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Upload fehlgeschlagen',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      },
      { status: 500 }
    );
  }
} 