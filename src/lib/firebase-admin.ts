import * as admin from 'firebase-admin';

// Globale Firebase Admin Singleton-Instanz
let firebaseAdmin: typeof admin | null = null;
let firestoreDb: admin.firestore.Firestore | null = null;
let firebaseAuth: admin.auth.Auth | null = null;
let storageBucket: admin.storage.Bucket | null = null;

export async function getFirebaseAdmin() {
  if (!firebaseAdmin) {
    // Prüfe ob Firebase Admin bereits initialisiert wurde
    if (admin.apps.length === 0) {
      if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        console.log('🔑 Initialisiere Firebase Admin (Global)...');
        
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
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
          projectId: 'misscrypto-bd419',
          storageBucket: 'misscrypto-bd419.firebasestorage.app'
        });
        
        console.log('✅ Firebase Admin (Global) erfolgreich initialisiert');
      } else {
        throw new Error('Firebase Credentials nicht gefunden');
      }
    }
    
    // Singleton-Instanzen setzen
    firebaseAdmin = admin;
    firestoreDb = admin.firestore();
    firebaseAuth = admin.auth();
    storageBucket = admin.storage().bucket('misscrypto-bd419.firebasestorage.app');
  }
  
  return { 
    admin: firebaseAdmin, 
    db: firestoreDb!, 
    auth: firebaseAuth!, 
    bucket: storageBucket! 
  };
}
