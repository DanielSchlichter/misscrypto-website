const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

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

// Test Crypto Data
const testCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    current_price: 102129,
    market_cap_rank: 1,
    price_changes: {
      '24h': 0.68,
      '7d': 7.81,
      '30d': 9.96,
      '1y': 69.04
    },
    prices: {
      '24h': [101552, 101558, 101822, 101360, 102374],
      '7d': [95190, 98085, 98649, 97096, 99096, 98755, 102364],
      '30d': [],
      '1y': []
    },
    historical_prices_1y: [],
    image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    last_updated: Timestamp.now()
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    current_price: 2903.61,
    market_cap_rank: 2,
    price_changes: {
      '24h': 7.29,
      '7d': 22.63,
      '30d': 29.43,
      '1y': -9.42
    },
    prices: {
      '24h': [2694, 2714, 2709, 2706, 2741, 2761],
      '7d': [2342, 2477, 2509, 2649, 2756, 2793, 2905],
      '30d': [],
      '1y': []
    },
    historical_prices_1y: [],
    image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    last_updated: Timestamp.now()
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'xrp',
    current_price: 2.7,
    market_cap_rank: 3,
    price_changes: {
      '24h': 7.68,
      '7d': 30.81,
      '30d': 39.27,
      '1y': 384.29
    },
    prices: {
      '24h': [2.51, 2.51, 2.5, 2.55, 2.56, 2.57],
      '7d': [2.08, 2.2, 2.31, 2.4, 2.44, 2.58, 2.72],
      '30d': [],
      '1y': []
    },
    historical_prices_1y: [],
    image: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
    last_updated: Timestamp.now()
  }
];

async function addTestData() {
  try {
    console.log('🔄 Initialisiere Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('💾 Füge Test-Krypto-Daten zu Firestore hinzu...');
    
    for (const coin of testCoins) {
      const docRef = await addDoc(collection(db, 'coins'), coin);
      console.log(`✅ ${coin.name} hinzugefügt mit ID: ${docRef.id}`);
    }
    
    console.log('🎉 Alle Test-Daten erfolgreich hinzugefügt!');
    console.log('📊 Jetzt sollte die Website echte Firestore-Daten anzeigen');

  } catch (error) {
    console.error('❌ Fehler beim Hinzufügen der Test-Daten:', error);
    process.exit(1);
  }
}

addTestData(); 