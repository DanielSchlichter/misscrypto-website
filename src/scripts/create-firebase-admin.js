const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');

// Firebase config (gleiche wie in lib/firebase.ts)
const firebaseConfig = {
  apiKey: "AIzaSyA6NrfUZcQ7V2tFHq0BVfVBaBRTNT7Pw68",
  authDomain: "misscrypto-bd419.firebaseapp.com",
  projectId: "misscrypto-bd419",
  storageBucket: "misscrypto-bd419.firebasestorage.app",
  messagingSenderId: "316985351888",
  appId: "1:316985351888:web:83ac3a6e4bb4743311c8d5",
  measurementId: "G-DTS6G8HDTE"
};

async function createAdminUser() {
  try {
    console.log('🔄 Initialisiere Firebase...');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const email = 'admin@misscrypto.de';
    const password = 'admin123';
    const displayName = 'MissCrypto Admin';

    console.log('📝 Erstelle Admin-User...');
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('✅ User erstellt mit UID:', user.uid);

    // Update Profile
    await updateProfile(user, {
      displayName: displayName
    });

    console.log('✅ Admin-User erfolgreich erstellt!');
    console.log('📧 E-Mail:', email);
    console.log('🔑 Passwort:', password);
    console.log('👤 Name:', displayName);
    console.log('🆔 UID:', user.uid);

    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Admin-Users:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  Admin-User existiert bereits');
    }
    
    process.exit(1);
  }
}

createAdminUser(); 