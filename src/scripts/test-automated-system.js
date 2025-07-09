const https = require('https');

// Test-URLs (anpassen für deine Netlify-Site)
const BASE_URL = 'https://your-site.netlify.app';
const API_ENDPOINTS = {
  coins: `${BASE_URL}/api/coins`,
  updateFunction: `${BASE_URL}/.netlify/functions/update-test-data-daily`
};

// Hilfsfunktion für HTTP-Requests
function makeRequest(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data,
            error: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Test der API-Endpunkte
async function testApiEndpoints() {
  console.log('🧪 Teste API-Endpunkte...\n');

  try {
    // Test 1: Coins API
    console.log('1. Teste /api/coins...');
    const coinsResponse = await makeRequest(API_ENDPOINTS.coins);
    console.log(`   Status: ${coinsResponse.status}`);
    
    if (coinsResponse.status === 200 && Array.isArray(coinsResponse.data)) {
      console.log(`   ✅ ${coinsResponse.data.length} Coins gefunden`);
      if (coinsResponse.data.length > 0) {
        const firstCoin = coinsResponse.data[0];
        console.log(`   Erste Coin: ${firstCoin.name} (${firstCoin.symbol}) - €${firstCoin.current_price}`);
      }
    } else {
      console.log(`   ❌ Unerwartete Antwort: ${JSON.stringify(coinsResponse.data)}`);
    }

    // Test 2: Netlify Function (nur Status prüfen)
    console.log('\n2. Teste Netlify Function Status...');
    const functionResponse = await makeRequest(API_ENDPOINTS.updateFunction);
    console.log(`   Status: ${functionResponse.status}`);
    
    if (functionResponse.status === 200) {
      console.log('   ✅ Netlify Function ist erreichbar');
    } else {
      console.log('   ⚠️  Netlify Function Status ungewöhnlich (möglicherweise normal wenn leer)');
    }

  } catch (error) {
    console.error('❌ Fehler beim Testen der API-Endpunkte:', error);
  }
}

// Test der Datenqualität
async function testDataQuality() {
  console.log('\n📊 Teste Datenqualität...\n');

  try {
    const response = await makeRequest(API_ENDPOINTS.coins);
    
    if (response.status !== 200 || !Array.isArray(response.data)) {
      console.log('❌ Keine Daten verfügbar für Qualitätstest');
      return;
    }

    const testCoins = response.data;
    
    // Test 1: Datenstruktur
    console.log('1. Teste Datenstruktur...');
    const requiredFields = ['id', 'name', 'symbol', 'current_price', 'price_changes', 'prices', 'market_cap_rank'];
    let structureValid = true;
    
    testCoins.forEach((coin, index) => {
      requiredFields.forEach(field => {
        if (!coin[field]) {
          console.log(`   ❌ Fehlender Feld "${field}" bei Coin ${index}: ${coin.name}`);
          structureValid = false;
        }
      });
    });
    
    if (structureValid) {
      console.log('   ✅ Datenstruktur ist vollständig');
    }

    // Test 2: Preisänderungen
    console.log('\n2. Teste Preisänderungen...');
    const priceChangeRanges = ['24h', '7d', '30d', '1y'];
    let priceChangesValid = true;
    
    testCoins.forEach((coin, index) => {
      priceChangeRanges.forEach(range => {
        if (coin.price_changes[range] === undefined) {
          console.log(`   ❌ Fehlende Preisänderung "${range}" bei ${coin.name}`);
          priceChangesValid = false;
        }
      });
    });
    
    if (priceChangesValid) {
      console.log('   ✅ Preisänderungen sind vollständig');
    }

    // Test 3: Preishistorie
    console.log('\n3. Teste Preishistorie...');
    const priceHistoryRanges = ['24h', '7d', '30d'];
    let priceHistoryValid = true;
    
    testCoins.forEach((coin, index) => {
      priceHistoryRanges.forEach(range => {
        if (!Array.isArray(coin.prices[range])) {
          console.log(`   ❌ Fehlende Preishistorie "${range}" bei ${coin.name}`);
          priceHistoryValid = false;
        }
      });
    });
    
    if (priceHistoryValid) {
      console.log('   ✅ Preishistorie ist vollständig');
    }

    // Test 4: Aktualität
    console.log('\n4. Teste Aktualität...');
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    let dataFresh = true;
    testCoins.forEach((coin, index) => {
      if (coin.last_updated) {
        const lastUpdated = new Date(coin.last_updated);
        if (lastUpdated < oneDayAgo) {
          console.log(`   ⚠️  Daten für ${coin.name} sind älter als 24 Stunden`);
          dataFresh = false;
        }
      }
    });
    
    if (dataFresh) {
      console.log('   ✅ Daten sind aktuell (weniger als 24 Stunden alt)');
    }

    // Zusammenfassung
    console.log('\n📈 Datenqualität-Zusammenfassung:');
    console.log(`   Anzahl Coins: ${testCoins.length}`);
    console.log(`   Top Performer: ${testCoins[0]?.name} (${testCoins[0]?.price_changes?.['1y']?.toFixed(2)}% 1Jahr)`);
    console.log(`   Letzte Aktualisierung: ${testCoins[0]?.last_updated}`);

  } catch (error) {
    console.error('❌ Fehler beim Testen der Datenqualität:', error);
  }
}

// Hauptfunktion
async function runTests() {
  console.log('🚀 Automatisches Testdaten-System Test\n');
  console.log('=' .repeat(50));
  
  await testApiEndpoints();
  await testDataQuality();
  
  console.log('\n' + '=' .repeat(50));
  console.log('✅ Tests abgeschlossen!');
  console.log('\nHinweis: Für vollständige Tests passe die BASE_URL in diesem Script an.');
}

// Starte die Tests
runTests().catch(console.error); 