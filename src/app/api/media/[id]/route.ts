import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '../../../../lib/firebase-admin';

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

    // NextJS 14+ requires awaiting params
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Datei-ID fehlt' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Lösche Media-Datei: ${id}`);

    // Verwende zentralen Firebase Admin Service
    const { db, bucket } = await getFirebaseAdmin();

    // Datei-Metadaten aus Firestore laden
    console.log(`📄 Lade Metadaten für: ${id}`);
    const mediaDoc = await db.collection('media').doc(id).get();
    
    if (!mediaDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Datei nicht gefunden' },
        { status: 404 }
      );
    }

    const mediaData = mediaDoc.data();
    console.log(`📄 Metadaten geladen: ${mediaData?.name || 'Unbekannt'}`);

    // Parallele Löschung für bessere Performance
    const deletePromises = [];

    // 1. Datei aus Firebase Storage löschen (falls vorhanden)
    if (mediaData?.storagePath) {
      console.log(`🗂️ Lösche aus Storage: ${mediaData.storagePath}`);
      deletePromises.push(
        bucket.file(mediaData.storagePath).delete().catch((error) => {
          console.warn('⚠️ Storage-Löschung fehlgeschlagen (Datei existiert möglicherweise nicht):', error);
          // Fehler nicht weiterwerfen - Metadaten trotzdem löschen
        })
      );
    }

    // 2. Metadaten aus Firestore löschen
    console.log(`🗃️ Lösche Metadaten: ${id}`);
    deletePromises.push(db.collection('media').doc(id).delete());

    // Warte auf alle Löschvorgänge
    await Promise.all(deletePromises);

    console.log(`✅ Media-Datei erfolgreich gelöscht: ${id}`);

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