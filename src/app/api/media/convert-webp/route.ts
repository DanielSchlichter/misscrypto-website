import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    // Auth prüfen
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { fileId, fileName, fileUrl, keepOriginal } = await request.json();

    if (!fileUrl || !fileName) {
      return NextResponse.json(
        { error: 'Datei-URL und Name erforderlich' },
        { status: 400 }
      );
    }

    console.log(`🔄 Konvertiere zu WebP: ${fileName}`);

    // Firebase Admin initialisieren
    const { admin, db, bucket } = await getFirebaseAdmin();

    try {
      // Bild von URL laden
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const imageBuffer = Buffer.from(await response.arrayBuffer());

      // Zu WebP konvertieren mit Sharp
      const webpBuffer = await sharp(imageBuffer)
        .webp({
          quality: 85, // Gute Qualität bei kleinerer Dateigröße
          effort: 6    // Höhere Kompression (0-6)
        })
        .toBuffer();

      // Neuer Dateiname mit .webp Extension
      const webpFileName = fileName.replace(/\.(png|jpg|jpeg|gif|bmp|tiff?)$/i, '.webp');
      const timestamp = Date.now();
      const webpPath = `media/${timestamp}_${webpFileName}`;

      // WebP-Datei zu Firebase Storage hochladen
      const file = bucket.file(webpPath);
      const stream = file.createWriteStream({
        metadata: {
          contentType: 'image/webp',
          metadata: {
            originalName: fileName,
            convertedAt: new Date().toISOString(),
            originalFormat: fileName.split('.').pop()?.toLowerCase()
          }
        }
      });

      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(webpBuffer);
      });

      // Datei öffentlich machen
      await file.makePublic();

      // Öffentliche URL generieren
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${webpPath}`;

      console.log(`✅ WebP erstellt: ${webpFileName}`);

      // Metadaten in Firestore speichern
      const mediaDoc = {
        name: webpFileName,
        originalName: fileName,
        url: publicUrl,
        storagePath: webpPath,
        type: 'image',
        mimeType: 'image/webp',
        size: webpBuffer.length,
        uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
        uploadedBy: (session.user as any)?.email || 'unknown',
        convertedFrom: fileUrl,
        conversionMetadata: {
          originalFormat: fileName.split('.').pop()?.toLowerCase(),
          convertedAt: new Date().toISOString(),
          quality: 85,
          effort: 6
        }
      };

      const docRef = await db.collection('media').add(mediaDoc);

      // Neues Dateiobjekt für die Mediathek
      const newFile = {
        id: docRef.id,
        name: webpFileName,
        url: publicUrl,
        type: 'image' as const,
        mimeType: 'image/webp',
        size: webpBuffer.length,
        uploadedAt: new Date().toISOString()
      };

      // Original löschen wenn gewünscht
      if (!keepOriginal && fileId) {
        try {
          // Original-Datei aus Storage löschen
          const originalPath = fileUrl.split('/').slice(-1)[0];
          const originalFile = bucket.file(decodeURIComponent(originalPath));
          await originalFile.delete().catch(err => {
            console.log('Original konnte nicht gelöscht werden:', err);
          });
        } catch (error) {
          console.error('Fehler beim Löschen des Originals:', error);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'WebP-Konvertierung erfolgreich',
        newFile: newFile
      });

    } catch (error: any) {
      console.error('Fehler bei WebP-Konvertierung:', error);
      return NextResponse.json(
        {
          error: 'Konvertierung fehlgeschlagen',
          details: error.message
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('API-Fehler:', error);
    return NextResponse.json(
      {
        error: 'Serverfehler',
        details: error.message
      },
      { status: 500 }
    );
  }
}