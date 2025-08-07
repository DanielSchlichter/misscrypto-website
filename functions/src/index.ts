import {onSchedule} from 'firebase-functions/v2/scheduler';
import {onRequest} from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// CoinGecko API Helper - mit node-fetch (gleiche Logik wie im funktionierenden Script)
const fetch = require('node-fetch');

async function fetchData(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'MissCrypto-Bot/1.0 (https://misscrypto.de)',
      'Accept': 'application/json'
    },
    timeout: 10000
  });
  
  console.log(`📡 API Response Status: ${response.status}`);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const text = await response.text();
  
  // Check if response is HTML (rate limited)
  if (text.trim().startsWith('<')) {
    console.error('❌ HTML Response erhalten (Rate Limit?):', text.substring(0, 200));
    throw new Error(`CoinGecko API Rate Limit erreicht. Response: ${text.substring(0, 100)}`);
  }
  
  // Check for empty response
  if (!text || text.trim() === '') {
    throw new Error('Leere API Response erhalten');
  }
  
  console.log(`✅ JSON Response erhalten (${text.length} Zeichen)`);
  return JSON.parse(text);
}

// Types
interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

// Stablecoins die wir ausschließen wollen
const stablecoins = [
  'tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 
  'paxos-standard', 'neutrino', 'fei-usd', 'terra-luna-2',
  'gemini-dollar', 'liquity-usd', 'magic-internet-money',
  'stasis-eurs', 'pax-gold'
];

// Hilfsfunktionen
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, retries = 5): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔄 Fetch-Versuch ${i + 1}/${retries} für CoinGecko API...`);
      
      // Längere initiale Wartezeit für Firebase Functions
      if (i > 0) {
        const preWaitTime = 15000 + (i * 10000); // 15s, 25s, 35s, 45s, 55s
        console.log(`⏳ Pre-Request Wartezeit: ${Math.round(preWaitTime/1000)}s...`);
        await delay(preWaitTime);
      }
      
      const data = await fetchData(url);
      console.log(`✅ Erfolgreich Daten abgerufen (${i + 1}/${retries})`);
      return data;
    } catch (error: any) {
      console.error(`❌ Fetch-Fehler (${i + 1}/${retries}):`, error?.message || error);
      
      // Bei Rate Limit/HTML Response deutlich länger warten
      const isRateLimit = error?.message?.includes('Rate Limit') || 
                          error?.message?.includes('HTML') || 
                          error?.message?.includes('Unexpected token <');
      
      const baseWaitTime = isRateLimit ? 60000 : 20000; // 60s für Rate Limit, 20s für andere Fehler
      const waitTime = baseWaitTime + (Math.pow(2, i) * 15000); // Längere progressive Wartezeit
      
      if (i === retries - 1) {
        console.error(`💥 Alle ${retries} Versuche fehlgeschlagen. Letzter Fehler:`, error);
        throw error;
      }
      
      console.log(`⏳ Warte ${Math.round(waitTime/1000)}s vor nächstem Versuch${isRateLimit ? ' (Rate Limit erkannt)' : ''}...`);
      await delay(waitTime);
    }
  }
}

// Hauptfunktion für Krypto-Update mit Rate Limiting Schutz
export const updateCryptoDaily = onSchedule({
  schedule: 'every 5 minutes', // TEST: Alle 5 Minuten für sofortigen Test
  timeZone: 'Europe/Berlin',
  region: 'europe-west1'
}, async (event) => {
  console.log('🚀 Starte tägliche Krypto-Datenaktualisierung mit Rate Limiting Schutz...');
  
  try {
    // Sammle Daten in kleineren Batches um Rate Limiting zu vermeiden
    const allCoins: CoinData[] = [];
    const batchSize = 25; // Kleinere Batches
    const totalPages = 2; // Top 50 Coins in 2 Batches
    
    for (let page = 1; page <= totalPages; page++) {
      console.log(`📊 Lade Batch ${page}/${totalPages} (${batchSize} Coins)...`);
      
      // Längere Pause zwischen Batches
      if (page > 1) {
        console.log(`⏳ Warte 45 Sekunden vor nächstem Batch...`);
        await delay(45000); // 45 Sekunden zwischen Batches
      }
      
      const marketData: CoinData[] = await fetchWithRetry(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${batchSize}&page=${page}&sparkline=true&price_change_percentage=24h,7d,30d,1y`
      );
      
      if (Array.isArray(marketData)) {
        allCoins.push(...marketData);
        console.log(`✅ Batch ${page} erfolgreich: ${marketData.length} Coins geladen`);
      } else {
        console.error(`❌ Batch ${page} fehlgeschlagen: Ungültige Daten`);
      }
      
      // Kurze Pause auch innerhalb der Batches
      await delay(10000); // 10 Sekunden nach jedem Batch
    }
    
    console.log(`📈 Gesamt ${allCoins.length} Coins von CoinGecko geladen`);

    if (!Array.isArray(allCoins) || allCoins.length === 0) {
      throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
    }

    // 2. Filtere Stablecoins und sortiere nach 1-Jahres-Performance
    const filteredCoins = allCoins
      .filter((coin: any) => !stablecoins.includes(coin.id))
      .filter((coin: any) => coin.price_change_percentage_1y_in_currency != null)
      .sort((a: any, b: any) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
      .slice(0, 25); // Top 25 Performer

    console.log(`📈 Verarbeite ${filteredCoins.length} Top-Performer...`);
    console.log('🏆 Top 5 Performer:');
    filteredCoins.slice(0, 5).forEach((coin: any, index: number) => {
      console.log(`  ${index + 1}. ${coin.name}: ${(coin.price_change_percentage_1y_in_currency || 0).toFixed(2)}%`);
    });

    // 3. Lösche alle bestehenden Coins
    console.log('🗑️  Lösche alte Coins...');
    const existingCoins = await db.collection('coins').get();
    const deletePromises = existingCoins.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    console.log(`✅ ${existingCoins.docs.length} alte Coins gelöscht`);

    // 4. Verarbeite jeden Coin
    console.log('\n💾 Speichere Coins in Firestore...');
    const batch = db.batch();
    
    filteredCoins.forEach((coin: any) => {
      const processedCoin = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
        market_cap_rank: coin.market_cap_rank,
        price_changes: {
          '24h': coin.price_change_percentage_24h || 0,
          '7d': coin.price_change_percentage_7d_in_currency || 0,
          '30d': coin.price_change_percentage_30d_in_currency || 0,
          '1y': coin.price_change_percentage_1y_in_currency || 0
        },
        prices: {
          '24h': coin.sparkline_in_7d?.price?.slice(-24) || [],
          '7d': coin.sparkline_in_7d?.price || [],
          '30d': [],
          '1y': []
        },
        historical_prices_1y: [],
        last_updated: admin.firestore.Timestamp.now()
      };
      
      const docRef = db.collection('coins').doc(coin.id);
      batch.set(docRef, processedCoin);
    });

    await batch.commit();
    
    console.log(`✅ ${filteredCoins.length} Coins erfolgreich in Firestore gespeichert!`);

  } catch (error) {
    console.error('❌ Fehler bei täglicher Krypto-Aktualisierung:', error);
    throw error;
  }
});

// Manuelle Trigger-Funktion für Sofort-Updates
export const triggerCryptoUpdate = onRequest({
  region: 'europe-west1',
  cors: true
}, async (req, res) => {
  // CORS Headers explizit setzen
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Preflight OPTIONS Request
  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }
  
  // Nur POST erlauben
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  console.log('🔧 Manuelle Krypto-Aktualisierung gestartet...');
  
  try {
    // Führe die gleiche Logik wie die Scheduled Function aus
    await updateCryptoDaily.run({} as any);
    
    res.status(200).json({
      success: true,
      message: 'Krypto-Daten erfolgreich aktualisiert',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Fehler bei manueller Aktualisierung:', error);
    res.status(500).json({ 
      error: 'Manual update failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Health Check Function
export const healthCheck = onRequest({
  region: 'europe-west1'
}, async (req, res) => {
  try {
    // Prüfe Firestore-Verbindung
    const coinsSnapshot = await db.collection('coins').limit(1).get();
    const coinCount = (await db.collection('coins').get()).size;
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      firestore: 'connected',
      totalCoins: coinCount,
      lastCoin: coinsSnapshot.docs[0]?.data()?.last_updated || null
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'unhealthy',
      error: error.toString(),
      timestamp: new Date().toISOString()
    });
  }
});

// Test-Version für manuelles Crypto-Update mit Rate Limiting 
export const testCryptoUpdate = onRequest({
  region: 'europe-west1',
  cors: true
}, async (req, res) => {
  // CORS Headers setzen
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  console.log('🚀 TEST: Starte manuelle Krypto-Datenaktualisierung mit Rate Limiting...');
  
  try {
    // Sammle Daten in kleineren Batches um Rate Limiting zu vermeiden (wie updateCryptoDaily)
    const allCoins: CoinData[] = [];
    const batchSize = 25; // Kleinere Batches
    const totalPages = 2; // Top 50 Coins in 2 Batches
    
    for (let page = 1; page <= totalPages; page++) {
      console.log(`📊 TEST Batch ${page}/${totalPages} (${batchSize} Coins)...`);
      
      // Längere Pause zwischen Batches
      if (page > 1) {
        console.log(`⏳ TEST: Warte 30 Sekunden vor nächstem Batch...`);
        await delay(30000); // 30 Sekunden zwischen Batches für Test
      }
      
      const marketData: CoinData[] = await fetchWithRetry(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${batchSize}&page=${page}&sparkline=true&price_change_percentage=24h,7d,30d,1y`
      );
      
      if (Array.isArray(marketData)) {
        allCoins.push(...marketData);
        console.log(`✅ TEST Batch ${page} erfolgreich: ${marketData.length} Coins geladen`);
      } else {
        console.error(`❌ TEST Batch ${page} fehlgeschlagen: Ungültige Daten`);
      }
      
      // Kurze Pause auch innerhalb der Batches
      await delay(5000); // 5 Sekunden nach jedem Batch
    }
    
    console.log(`📈 TEST Gesamt ${allCoins.length} Coins von CoinGecko geladen`);

    if (!Array.isArray(allCoins) || allCoins.length === 0) {
      throw new Error('Ungültige Daten von CoinGecko API erhalten');
    }

    console.log(`✅ ${allCoins.length} Coins von CoinGecko geladen`);

    // 2. Filtere Stablecoins und sortiere nach 1-Jahres-Performance
    console.log('🔄 TEST: Filtere Stablecoins und sortiere nach Performance...');
    const filteredCoins = allCoins
      .filter((coin: any) => !stablecoins.includes(coin.id))
      .sort((a: any, b: any) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
      .slice(0, 25);

    console.log(`✅ Top ${filteredCoins.length} Performer gefiltert`);

    // 3. Lösche alte Coins
    console.log('🗑️ Lösche alte Coins aus Firestore...');
    const existingCoins = await db.collection('coins').get();
    const deletePromises = existingCoins.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    console.log(`✅ ${existingCoins.docs.length} alte Coins gelöscht`);

    // 4. Speichere neue Coins
    console.log('\n💾 TEST: Speichere Coins in Firestore...');
    const batch = db.batch();
    
    filteredCoins.forEach((coin: any) => {
      const processedCoin = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
        market_cap_rank: coin.market_cap_rank,
        price_changes: {
          '24h': coin.price_change_percentage_24h || 0,
          '7d': coin.price_change_percentage_7d_in_currency || 0,
          '30d': coin.price_change_percentage_30d_in_currency || 0,
          '1y': coin.price_change_percentage_1y_in_currency || 0
        },
        sparkline_in_7d: {
          price: coin.sparkline_in_7d?.price || []
        },
        price_history: {
          '24h': [],
          '7d': [],
          '30d': [],
          '1y': []
        },
        historical_prices_1y: [],
        last_updated: admin.firestore.Timestamp.now()
      };
      
      const docRef = db.collection('coins').doc(coin.id);
      batch.set(docRef, processedCoin);
    });

    await batch.commit();
    console.log(`✅ ${filteredCoins.length} Coins erfolgreich in Firestore gespeichert!`);
    
    res.status(200).json({
      success: true,
      message: `${filteredCoins.length} Krypto-Daten erfolgreich aktualisiert`,
      timestamp: new Date().toISOString(),
      coinCount: filteredCoins.length
    });
  } catch (error) {
    console.error('❌ TEST: Fehler bei manueller Aktualisierung:', error);
    res.status(500).json({ 
      error: 'Test update failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Neue manuelle Crypto Update Function (HTTP statt callable)
export const manualCryptoUpdate = onRequest({
  region: 'europe-west1',
  cors: true
}, async (req, res) => {
  // CORS Headers setzen
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  console.log('🔧 MANUAL: Starte manuelle Krypto-Datenaktualisierung...');
  
  try {
    // Führe die exakt gleiche Logik wie updateCryptoDaily aus
    // 1. Hole Top 50 Coins von CoinGecko
    console.log('📊 Lade Top 50 Coins von CoinGecko...');
    const marketData: CoinData[] = await fetchWithRetry(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h,7d,30d,1y'
    );

    if (!Array.isArray(marketData)) {
      throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
    }

    // 2. Filtere Stablecoins und sortiere nach 1-Jahres-Performance
    const filteredCoins = marketData
      .filter((coin) => !stablecoins.includes(coin.id))
      .filter((coin) => coin.price_change_percentage_1y_in_currency != null)
      .sort((a, b) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
      .slice(0, 25); // Top 25 Performer

    console.log(`📈 Verarbeite ${filteredCoins.length} Top-Performer...`);
    console.log('🏆 Top 5 Performer:');
    filteredCoins.slice(0, 5).forEach((coin, index) => {
      console.log(`  ${index + 1}. ${coin.name}: ${(coin.price_change_percentage_1y_in_currency || 0).toFixed(2)}%`);
    });

    // 3. Lösche alle bestehenden Coins
    console.log('🗑️  Lösche alte Coins...');
    const existingCoins = await db.collection('coins').get();
    const deletePromises = existingCoins.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    console.log(`✅ ${existingCoins.docs.length} alte Coins gelöscht`);

    // 4. Verarbeite jeden Coin
    console.log('\n💾 Speichere Coins in Firestore...');
    const batch = db.batch();
    
    filteredCoins.forEach((coin) => {
      const processedCoin = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
        market_cap_rank: coin.market_cap_rank,
        price_changes: {
          '24h': coin.price_change_percentage_24h || 0,
          '7d': coin.price_change_percentage_7d_in_currency || 0,
          '30d': coin.price_change_percentage_30d_in_currency || 0,
          '1y': coin.price_change_percentage_1y_in_currency || 0
        },
        prices: {
          '24h': coin.sparkline_in_7d?.price?.slice(-24) || [],
          '7d': coin.sparkline_in_7d?.price || [],
          '30d': [],
          '1y': []
        },
        historical_prices_1y: [],
        last_updated: admin.firestore.Timestamp.now()
      };
      
      const docRef = db.collection('coins').doc(coin.id);
      batch.set(docRef, processedCoin);
    });

    await batch.commit();
    
    console.log(`✅ ${filteredCoins.length} Coins erfolgreich in Firestore gespeichert!`);
    
    res.status(200).json({
      success: true,
      message: `${filteredCoins.length} Krypto-Daten erfolgreich aktualisiert`,
      timestamp: new Date().toISOString(),
      coinCount: filteredCoins.length,
      topPerformers: filteredCoins.slice(0, 5).map(coin => ({
        name: coin.name,
        symbol: coin.symbol,
        performance: `${(coin.price_change_percentage_1y_in_currency || 0).toFixed(2)}%`
      }))
    });
  } catch (error) {
    console.error('❌ MANUAL: Fehler bei manueller Aktualisierung:', error);
    res.status(500).json({ 
      error: 'Manual update failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}); 