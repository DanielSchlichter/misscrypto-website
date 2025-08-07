// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6NrfUZcQ7V2tFHq0BVfVBaBRTNT7Pw68",
  authDomain: "misscrypto-bd419.firebaseapp.com",
  projectId: "misscrypto-bd419",
  storageBucket: "misscrypto-bd419.firebasestorage.app",
  messagingSenderId: "316985351888",
  appId: "1:316985351888:web:83ac3a6e4bb4743311c8d5",
  measurementId: "G-DTS6G8HDTE"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Analytics (nur im Browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app; 