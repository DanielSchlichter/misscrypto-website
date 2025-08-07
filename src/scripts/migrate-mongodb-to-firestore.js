const { MongoClient } = require('mongodb');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, addDoc, setDoc } = require('firebase/firestore');

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

async function migrateData() {
  console.log('🔄 Starte Migration von MongoDB zu Firestore...');

  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log('⚠️  MONGODB_URI nicht gefunden - Migration übersprungen');
      return;
    }

    console.log('🔄 Verbinde mit MongoDB...');
    const mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    const mongoDB = mongoClient.db('misscrypto');

    // Migrate Coins
    console.log('📊 Migriere Crypto Coins...');
    try {
      const coinsCollection = mongoDB.collection('coins');
      const coins = await coinsCollection.find({}).toArray();
      
      if (coins.length > 0) {
        console.log(`Gefunden: ${coins.length} Coins in MongoDB`);
        
        for (const coin of coins) {
          delete coin._id; // Remove MongoDB _id
          await addDoc(collection(db, 'coins'), coin);
        }
        
        console.log(`✅ ${coins.length} Coins nach Firestore migriert`);
      } else {
        console.log('ℹ️  Keine Coins in MongoDB gefunden');
      }
    } catch (error) {
      console.log('⚠️  Fehler bei Coins Migration:', error.message);
    }

    // Migrate Analytics
    console.log('📈 Migriere Analytics...');
    try {
      const analyticsCollection = mongoDB.collection('analytics');
      const analytics = await analyticsCollection.find({}).toArray();
      
      if (analytics.length > 0) {
        console.log(`Gefunden: ${analytics.length} Analytics Events in MongoDB`);
        
        for (const event of analytics) {
          delete event._id; // Remove MongoDB _id
          await addDoc(collection(db, 'analytics'), event);
        }
        
        console.log(`✅ ${analytics.length} Analytics Events nach Firestore migriert`);
      } else {
        console.log('ℹ️  Keine Analytics in MongoDB gefunden');
      }
    } catch (error) {
      console.log('⚠️  Fehler bei Analytics Migration:', error.message);
    }

    // Migrate Newsfeed
    console.log('📰 Migriere Newsfeed...');
    try {
      const newsfeedCollection = mongoDB.collection('newsfeed');
      const posts = await newsfeedCollection.find({}).toArray();
      
      if (posts.length > 0) {
        console.log(`Gefunden: ${posts.length} Newsfeed Posts in MongoDB`);
        
        for (const post of posts) {
          delete post._id; // Remove MongoDB _id
          await addDoc(collection(db, 'newsfeed'), post);
        }
        
        console.log(`✅ ${posts.length} Newsfeed Posts nach Firestore migriert`);
      } else {
        console.log('ℹ️  Keine Newsfeed Posts in MongoDB gefunden');
      }
    } catch (error) {
      console.log('⚠️  Fehler bei Newsfeed Migration:', error.message);
    }

    await mongoClient.close();
    console.log('✅ MongoDB zu Firestore Migration abgeschlossen!');

  } catch (error) {
    console.error('❌ Migration-Fehler:', error.message);
    process.exit(1);
  }
}

// Führe Migration aus
migrateData(); 