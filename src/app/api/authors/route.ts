import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Author {
  id?: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  photo?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  expertise?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// GET - Alle Authoren laden
export async function GET(request: NextRequest) {
  try {
    // Admin-Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { admin, db } = await getFirebaseAdmin();

    // Authoren aus Firestore laden
    const authorsRef = db.collection('authors');
    const snapshot = await authorsRef.orderBy('createdAt', 'desc').get();

    const authors: Author[] = [];
    snapshot.forEach((doc) => {
      authors.push({
        id: doc.id,
        ...doc.data()
      } as Author);
    });

    return NextResponse.json({
      success: true,
      authors
    });

  } catch (error: any) {
    console.error('Fehler beim Laden der Authoren:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Authoren' },
      { status: 500 }
    );
  }
}

// POST - Neuen Autor erstellen
export async function POST(request: NextRequest) {
  try {
    // Admin-Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { admin, db } = await getFirebaseAdmin();
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name und E-Mail sind erforderlich' },
        { status: 400 }
      );
    }

    // Prüfe ob E-Mail bereits existiert
    const existingAuthor = await db.collection('authors')
      .where('email', '==', body.email)
      .get();

    if (!existingAuthor.empty) {
      return NextResponse.json(
        { error: 'Ein Autor mit dieser E-Mail-Adresse existiert bereits' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const authorData: Omit<Author, 'id'> = {
      name: body.name,
      email: body.email,
      bio: body.bio || '',
      photo: body.photo || '',
      website: body.website || '',
      socialMedia: {
        twitter: body.socialMedia?.twitter || '',
        linkedin: body.socialMedia?.linkedin || '',
        instagram: body.socialMedia?.instagram || ''
      },
      expertise: Array.isArray(body.expertise) ? body.expertise : [],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    const docRef = await db.collection('authors').add(authorData);

    return NextResponse.json({
      success: true,
      author: {
        id: docRef.id,
        ...authorData
      }
    });

  } catch (error: any) {
    console.error('Fehler beim Erstellen des Autors:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Autors' },
      { status: 500 }
    );
  }
}

// PUT - Autor aktualisieren
export async function PUT(request: NextRequest) {
  try {
    // Admin-Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { admin, db } = await getFirebaseAdmin();
    const body = await request.json();

    if (!body.id || !body.name || !body.email) {
      return NextResponse.json(
        { error: 'ID, Name und E-Mail sind erforderlich' },
        { status: 400 }
      );
    }

    // Prüfe ob E-Mail bereits von anderem Autor verwendet wird
    const existingAuthor = await db.collection('authors')
      .where('email', '==', body.email)
      .get();

    if (!existingAuthor.empty && existingAuthor.docs[0].id !== body.id) {
      return NextResponse.json(
        { error: 'Ein anderer Autor mit dieser E-Mail-Adresse existiert bereits' },
        { status: 400 }
      );
    }

    const updateData = {
      name: body.name,
      email: body.email,
      bio: body.bio || '',
      photo: body.photo || '',
      website: body.website || '',
      socialMedia: {
        twitter: body.socialMedia?.twitter || '',
        linkedin: body.socialMedia?.linkedin || '',
        instagram: body.socialMedia?.instagram || ''
      },
      expertise: Array.isArray(body.expertise) ? body.expertise : [],
      updatedAt: new Date().toISOString()
    };

    await db.collection('authors').doc(body.id).update(updateData);

    return NextResponse.json({
      success: true,
      message: 'Autor erfolgreich aktualisiert'
    });

  } catch (error: any) {
    console.error('Fehler beim Aktualisieren des Autors:', error);
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Autors' },
      { status: 500 }
    );
  }
}

// DELETE - Autor löschen
export async function DELETE(request: NextRequest) {
  try {
    // Admin-Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Autor-ID ist erforderlich' },
        { status: 400 }
      );
    }

    const { admin, db } = await getFirebaseAdmin();

    // Prüfe ob Autor existiert
    const authorDoc = await db.collection('authors').doc(id).get();
    if (!authorDoc.exists) {
      return NextResponse.json(
        { error: 'Autor nicht gefunden' },
        { status: 404 }
      );
    }

    await db.collection('authors').doc(id).delete();

    return NextResponse.json({
      success: true,
      message: 'Autor erfolgreich gelöscht'
    });

  } catch (error: any) {
    console.error('Fehler beim Löschen des Autors:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Autors' },
      { status: 500 }
    );
  }
}