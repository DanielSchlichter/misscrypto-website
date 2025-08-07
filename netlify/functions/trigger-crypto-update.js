const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, addDoc, Timestamp } = require('firebase/firestore');

// Importiere die gleiche Logik wie die Scheduled Function
const stablecoins = ['tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 'paxos-standard', 'gemini-dollar'];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3, delayMs = 20000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.status === 429) {
        console.log(`Rate limit erreicht, warte ${delayMs/1000} Sekunden...`);
        await delay(delayMs);
        continue;
      }

      if (!response.ok) {
        throw new Error(`CoinGecko API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Versuch ${i + 1} fehlgeschlagen, warte ${delayMs/1000} Sekunden...`);
      await delay(delayMs);
    }
  }
}

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

async function updateCryptoData() {
  
  try {
    console.log('Starte manuelle Aktualisierung der Krypto-Daten...');

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const coinsCollection = collection(db, 'coins');

    // Hole Top 50 Coins von CoinGecko
    const marketData = await fetchWithRetry(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y'
    );

    if (!Array.isArray(marketData)) {
      throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
    }

    // Filtere Stablecoins heraus und sortiere nach 1-Jahres-Performance
    const filteredCoins = marketData
      .filter((coin) => !stablecoins.includes(coin.id))
      .filter((coin) => coin.price_change_percentage_1y_in_currency != null)
      .sort((a, b) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
      .slice(0, 25); // Top 25 Performer

    console.log(`Verarbeite ${filteredCoins.length} Top-Performer...`);
    
    // Für manuelle Aktualisierung: Schnellere Verarbeitung (nur Basis-Daten, keine detaillierten Charts)
    for (const coin of filteredCoins) {
      try {
        console.log(`Aktualisiere ${coin.name} (${coin.id})...`);

        // Erstelle price_changes Objekt
        const price_changes = {
          '24h': coin.price_change_percentage_24h || 0,
          '7d': coin.price_change_percentage_7d_in_currency || 0,
          '30d': coin.price_change_percentage_30d_in_currency || 0,
          '1y': coin.price_change_percentage_1y_in_currency || 0
        };

        // Aktualisiere oder erstelle Coin-Daten in der Datenbank (ohne Charts für schnelle Aktualisierung)
        await collection.updateOne(
          { id: coin.id },
          {
            $set: {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              current_price: coin.current_price,
              price_changes,
              image: coin.image,
              market_cap_rank: coin.market_cap_rank,
              last_updated: new Date(),
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );

        console.log(`${coin.name} erfolgreich aktualisiert!`);
        
        // Kurze Pause zwischen Coins
        await delay(1000);
      } catch (error) {
        console.error(`Fehler beim Aktualisieren von ${coin.id}:`, error);
      }
    }

    console.log('Manuelle Aktualisierung abgeschlossen!');
    return {
      success: true,
      processed: filteredCoins.length,
      timestamp: new Date().toISOString(),
      topPerformers: filteredCoins.slice(0, 5).map(coin => ({
        name: coin.name,
        performance: coin.price_change_percentage_1y_in_currency || 0
      }))
    };
  } catch (error) {
    console.error('Fehler bei manueller Aktualisierung:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Netlify Function für manuelle Trigger
exports.handler = async (event, context) => {
  // Prüfe Authorization Header für Sicherheit
  const authHeader = event.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Unauthorized',
        message: 'Gültiger Authorization Header erforderlich'
      })
    };
  }

  try {
    console.log('Starte manuelle Krypto-Datenaktualisierung...');
    const result = await updateCryptoData();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Krypto-Daten erfolgreich aktualisiert',
        ...result
      })
    };
  } catch (error) {
    console.error('Fehler bei manueller Aktualisierung:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Fehler bei der Aktualisierung',
        message: error.message
      })
    };
  }
}; 