#!/usr/bin/env node

const admin = require('firebase-admin');

// Firebase Admin konfigurieren
const serviceAccount = {
  type: "service_account",
  project_id: "misscrypto-bd419",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
};

// Fallback: Versuche Default Credentials zu verwenden
try {
  if (!admin.apps.length) {
    if (process.env.FIREBASE_PRIVATE_KEY) {
      console.log('🔑 Verwende Service Account Credentials...');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'misscrypto-bd419'
      });
    } else {
      console.log('🔑 Verwende Default Application Credentials...');
      admin.initializeApp({
        projectId: 'misscrypto-bd419'
      });
    }
  }
} catch (error) {
  console.error('❌ Firebase Admin Initialisierung fehlgeschlagen:', error.message);
  process.exit(1);
}

const db = admin.firestore();

// CoinGecko API Helper - mit node-fetch für einfachere Handhabung
const fetch = require('node-fetch');

async function fetchData(url) {
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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔄 Fetch-Versuch ${i + 1}/${retries} für CoinGecko API...`);
      
      // Längere initiale Wartezeit
      if (i > 0) {
        const preWaitTime = 15000 + (i * 10000); // 15s, 25s, 35s, 45s, 55s
        console.log(`⏳ Pre-Request Wartezeit: ${Math.round(preWaitTime/1000)}s...`);
        await delay(preWaitTime);
      }
      
      const data = await fetchData(url);
      console.log(`✅ Erfolgreich Daten abgerufen (${i + 1}/${retries})`);
      return data;
    } catch (error) {
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

// Stablecoins die wir ausschließen wollen
const stablecoins = [
  'tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 
  'paxos-standard', 'neutrino', 'fei-usd', 'terra-luna-2',
  'gemini-dollar', 'liquity-usd', 'magic-internet-money',
  'stasis-eurs', 'pax-gold'
];

// Hauptfunktion - exakt wie updateCryptoDaily
async function triggerScheduledCryptoUpdate() {
  console.log('🚀 MANUAL: Starte manuelle Krypto-Datenaktualisierung mit Rate Limiting Schutz...');
  
  try {
    // Sammle Daten in kleineren Batches um Rate Limiting zu vermeiden
    const allCoins = [];
    const batchSize = 25; // Kleinere Batches
    const totalPages = 2; // Top 50 Coins in 2 Batches
    
    for (let page = 1; page <= totalPages; page++) {
      console.log(`📊 Lade Batch ${page}/${totalPages} (${batchSize} Coins)...`);
      
      // Längere Pause zwischen Batches
      if (page > 1) {
        console.log(`⏳ Warte 45 Sekunden vor nächstem Batch...`);
        await delay(45000); // 45 Sekunden zwischen Batches
      }
      
      const marketData = await fetchWithRetry(
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
    console.log(`🎉 Manuelle Scheduled Function erfolgreich ausgeführt!`);
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Fehler bei manueller Scheduled Function Ausführung:', error);
    process.exit(1);
  }
}

// Script ausführen
console.log('🔧 Starte manuelle Ausführung der updateCryptoDaily Function...');
triggerScheduledCryptoUpdate(); 