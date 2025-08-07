import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '../../../lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    console.log('📥 GET /api/media - Starte Media-Abfrage...');
    
    // Admin-Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      console.log('❌ Nicht autorisiert für Media API');
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    console.log('✅ Authentifizierung erfolgreich für Media API');
    
    const { db } = await getFirebaseAdmin();
    
    console.log('🚀 Starte Media-Abfrage aus Firestore...');
    
    // Medien aus Firestore laden (optimiert)
    const mediaCollection = db.collection('media');
    const snapshot = await mediaCollection.orderBy('uploadedAt', 'desc').limit(100).get();
    
    const files = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`✅ ${files.length} Media-Dateien aus Firestore geladen`);

    return NextResponse.json({
      success: true,
      files
    });

  } catch (error) {
    console.error('❌ Fehler beim Laden der Medien:', error);
    return NextResponse.json(
      { success: false, error: 'Fehler beim Laden der Medien' },
      { status: 500 }
    );
  }
} 