import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '../../../lib/firebase-admin';

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

    // Use centralized Firebase Admin initialization
    const { admin, db, bucket } = await getFirebaseAdmin();

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