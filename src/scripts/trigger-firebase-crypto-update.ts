import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA6NrfUZcQ7V2tFHq0BVfVBaBRTNT7Pw68",
  authDomain: "misscrypto-bd419.firebaseapp.com",
  projectId: "misscrypto-bd419",
  storageBucket: "misscrypto-bd419.firebasestorage.app",
  messagingSenderId: "316985351888",
  appId: "1:316985351888:web:83ac3a6e4bb4743311c8d5",
  measurementId: "G-DTS6G8HDTE"
};

async function triggerCryptoUpdate() {
  try {
    console.log('🔄 Initialisiere Firebase...');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const functions = getFunctions(app, 'europe-west1');

    // Authentifizierung
    console.log('🔐 Melde bei Firebase an...');
    await signInWithEmailAndPassword(auth, 'admin@misscrypto.de', 'admin123');
    console.log('✅ Erfolgreich angemeldet');

    // Rufe Firebase Function auf
    console.log('🚀 Triggere Krypto-Update Function...');
    const triggerUpdate = httpsCallable(functions, 'triggerCryptoUpdate');
    
    const result = await triggerUpdate();
    console.log('✅ Function erfolgreich ausgeführt:', result.data);

  } catch (error: any) {
    console.error('❌ Fehler beim Triggern der Function:', error);
    
    if (error.code === 'auth/user-not-found') {
      console.error('💡 Führe zuerst das create-firebase-admin Script aus');
    }
    
    process.exit(1);
  }
}

// Führe Script aus
triggerCryptoUpdate(); 