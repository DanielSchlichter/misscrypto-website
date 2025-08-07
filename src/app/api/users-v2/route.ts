import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getFirebaseAdmin } from '../../../lib/firebase-admin';

// GET - Alle Admin-Benutzer auflisten (optimiert)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { auth } = await getFirebaseAdmin();

    console.log('🚀 Starte Benutzer-Abfrage mit zentraler Firebase Admin...');
    
    // Lade Benutzer von Firebase Auth mit Limit (optimiert)
    const listUsersResult = await auth.listUsers(100); // Limit auf 100 Benutzer
    const users = listUsersResult.users.map((user: any) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      disabled: user.disabled,
      emailVerified: user.emailVerified,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      customClaims: user.customClaims || {},
      // Standardwerte für erweiterte Daten
      profile: { department: 'Administration' },
      preferences: { theme: 'dark', language: 'de' },
      permissions: { canManageUsers: true },
      lastActivity: user.metadata.lastSignInTime || null,
      totalLogins: 0,
      isActive: !user.disabled
    }));

    console.log(`✅ ${users.length} Benutzer geladen (optimiert)`);

    return NextResponse.json({
      success: true,
      users: users
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Laden der Benutzer (v2):', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Laden der Benutzer',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}

// POST - Neuen Admin-Benutzer erstellen
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, password, displayName } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email und Passwort sind erforderlich' },
        { status: 400 }
      );
    }

    const { auth } = await getFirebaseAdmin();

    console.log(`🔐 Erstelle neuen Admin-Benutzer: ${email}`);

    // Erstelle Benutzer in Firebase Auth
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: displayName || email.split('@')[0],
      emailVerified: true
    });

    // Setze Admin-Claims
    await auth.setCustomUserClaims(userRecord.uid, { 
      role: 'admin',
      adminLevel: 'standard'
    });

    console.log(`✅ Admin-Benutzer erstellt: ${userRecord.uid}`);

    return NextResponse.json({
      success: true,
      message: 'Admin-Benutzer erfolgreich erstellt',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        emailVerified: userRecord.emailVerified
      }
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Erstellen des Benutzers:', error);
    
    let errorMessage = 'Fehler beim Erstellen des Benutzers';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'Ein Benutzer mit dieser E-Mail-Adresse existiert bereits';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Ungültige E-Mail-Adresse';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Das Passwort ist zu schwach (mindestens 6 Zeichen)';
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}

// PATCH - Passwort eines Benutzers ändern
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { uid, newPassword } = body;

    if (!uid || !newPassword) {
      return NextResponse.json(
        { error: 'Benutzer-ID und neues Passwort sind erforderlich' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Das Passwort muss mindestens 6 Zeichen lang sein' },
        { status: 400 }
      );
    }

    const { auth } = await getFirebaseAdmin();

    // Lade Benutzer-Informationen
    const userToUpdate = await auth.getUser(uid);
    
    console.log(`🔐 Ändere Passwort für Benutzer: ${userToUpdate.email}`);

    // Ändere das Passwort
    await auth.updateUser(uid, {
      password: newPassword
    });

    console.log(`✅ Passwort erfolgreich geändert für: ${userToUpdate.email}`);

    return NextResponse.json({
      success: true,
      message: 'Passwort erfolgreich geändert'
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Ändern des Passworts:', error);
    
    let errorMessage = 'Fehler beim Ändern des Passworts';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Benutzer nicht gefunden';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Das Passwort ist zu schwach (mindestens 6 Zeichen)';
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}

// DELETE - Benutzer löschen
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json(
        { error: 'Benutzer-ID ist erforderlich' },
        { status: 400 }
      );
    }

    const { auth } = await getFirebaseAdmin();

    // Lade Benutzer-Informationen
    const userToDelete = await auth.getUser(uid);
    
    // Verhindere, dass sich der Admin selbst löscht
    if (session?.user?.email && userToDelete.email === session.user.email) {
      return NextResponse.json(
        { error: 'Sie können sich nicht selbst löschen' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Lösche Benutzer: ${userToDelete.email}`);

    // Lösche Benutzer aus Firebase Auth
    await auth.deleteUser(uid);

    console.log(`✅ Benutzer gelöscht: ${uid}`);

    return NextResponse.json({
      success: true,
      message: 'Benutzer erfolgreich gelöscht'
    });

  } catch (error: any) {
    console.error('❌ Fehler beim Löschen des Benutzers:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Löschen des Benutzers',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
} 