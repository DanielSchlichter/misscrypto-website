const fs = require('fs');
const path = require('path');
const https = require('https');

// Hilfsfunktion für Verzögerungen
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Native fetch implementation mit https
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    https.get(url, options, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error(`JSON parsing error: ${error.message}`));
          }
        } else {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Fetch mit Retry-Mechanismus
async function fetchWithRetry(url, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await fetchData(url);
      return data;
    } catch (error) {
      if (error.message.includes('429')) {
        console.log(`Rate limit erreicht, warte ${delayMs * (i + 1)}ms...`);
        await delay(delayMs * (i + 1));
        continue;
      }
      
      if (i === retries - 1) throw error;
      console.log(`Versuch ${i + 1} fehlgeschlagen, versuche erneut...`);
      await delay(delayMs);
    }
  }
}

// Generiere realistische Preisverläufe basierend auf dem aktuellen Preis
function generatePriceHistory(currentPrice, change24h, change7d, change30d) {
  const prices = {
    '24h': [],
    '7d': [],
    '30d': [],
    '1y': []
  };

  // 24h Preise (24 Stunden)
  const price24hStart = currentPrice / (1 + change24h / 100);
  for (let i = 0; i < 24; i++) {
    const progress = i / 23;
    const volatility = (Math.random() - 0.5) * 0.02; // ±1% Volatilität
    const price = price24hStart * (1 + (change24h / 100) * progress + volatility);
    prices['24h'].push(price);
  }

  // 7d Preise (7 Tage)
  const price7dStart = currentPrice / (1 + change7d / 100);
  for (let i = 0; i < 7; i++) {
    const progress = i / 6;
    const volatility = (Math.random() - 0.5) * 0.05; // ±2.5% Volatilität
    const price = price7dStart * (1 + (change7d / 100) * progress + volatility);
    prices['7d'].push(price);
  }

  // 30d Preise (30 Tage)
  const price30dStart = currentPrice / (1 + change30d / 100);
  for (let i = 0; i < 30; i++) {
    const progress = i / 29;
    const volatility = (Math.random() - 0.5) * 0.08; // ±4% Volatilität
    const price = price30dStart * (1 + (change30d / 100) * progress + volatility);
    prices['30d'].push(price);
  }

  // 1y Preise (leer lassen, da nicht in den Testdaten verwendet)
  prices['1y'] = [];

  return prices;
}

// Hole Marktdaten von CoinGecko
async function fetchMarketData() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y';
  
  console.log('Hole Marktdaten von CoinGecko...');
  const data = await fetchWithRetry(url);
  
  if (!Array.isArray(data)) {
    throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
  }

  console.log(`${data.length} Coins von CoinGecko erhalten`);
  return data;
}

// Konvertiere CoinGecko-Daten zu TestCoin-Format
function convertToTestCoin(coinData) {
  const priceChanges = {
    '24h': coinData.price_change_percentage_24h || 0,
    '7d': coinData.price_change_percentage_7d_in_currency || 0,
    '30d': coinData.price_change_percentage_30d_in_currency || 0,
    '1y': coinData.price_change_percentage_1y_in_currency || 0
  };

  const prices = generatePriceHistory(
    coinData.current_price,
    priceChanges['24h'],
    priceChanges['7d'],
    priceChanges['30d']
  );

  return {
    id: coinData.id,
    name: coinData.name,
    symbol: coinData.symbol.toUpperCase(),
    current_price: coinData.current_price,
    price_changes: priceChanges,
    prices: prices,
    image: coinData.image,
    market_cap_rank: coinData.market_cap_rank,
    last_updated: new Date().toISOString()
  };
}

// Aktualisiere current_data.json
async function updateCurrentDataJson(marketData) {
  const currentDataPath = path.join(process.cwd(), 'current_data.json');
  
  try {
    fs.writeFileSync(currentDataPath, JSON.stringify(marketData, null, 2));
    console.log('✅ current_data.json wurde aktualisiert');
  } catch (error) {
    console.error('❌ Fehler beim Aktualisieren von current_data.json:', error);
  }
}

// Aktualisiere Testdaten in route.ts
async function updateRouteTestData(testCoins) {
  const routePath = path.join(process.cwd(), 'src/app/api/coins/route.ts');
  
  try {
    const routeContent = fs.readFileSync(routePath, 'utf8');
    
    // Finde den Start und das Ende der getTestCoins Funktion
    const startMarker = 'const getTestCoins = () => [';
    const endMarker = '];';
    
    const startIndex = routeContent.indexOf(startMarker);
    if (startIndex === -1) {
      throw new Error('getTestCoins Funktion nicht gefunden');
    }
    
    const searchStart = startIndex + startMarker.length;
    const endIndex = routeContent.indexOf(endMarker, searchStart);
    if (endIndex === -1) {
      throw new Error('Ende der getTestCoins Funktion nicht gefunden');
    }

    // Erstelle neuen Testdaten-String
    const newTestData = testCoins.map(coin => `  {
    id: '${coin.id}',
    name: '${coin.name}',
    symbol: '${coin.symbol}',
    current_price: ${coin.current_price},
    price_changes: {
      '24h': ${coin.price_changes['24h'].toFixed(2)},
      '7d': ${coin.price_changes['7d'].toFixed(2)},
      '30d': ${coin.price_changes['30d'].toFixed(2)},
      '1y': ${coin.price_changes['1y'].toFixed(2)}
    },
    prices: {
      '24h': [${coin.prices['24h'].map(p => p.toFixed(2)).join(', ')}],
      '7d': [${coin.prices['7d'].map(p => p.toFixed(2)).join(', ')}],
      '30d': [${coin.prices['30d'].map(p => p.toFixed(2)).join(', ')}],
      '1y': []
    },
    image: '${coin.image}',
    market_cap_rank: ${coin.market_cap_rank},
    last_updated: new Date().toISOString()
  }`).join(',\n');

    // Ersetze den Inhalt der getTestCoins Funktion
    const newRouteContent = routeContent.substring(0, startIndex + startMarker.length) + 
                           '\n' + newTestData + '\n' + 
                           routeContent.substring(endIndex);
    
    fs.writeFileSync(routePath, newRouteContent);
    console.log('✅ Testdaten in route.ts wurden aktualisiert');
  } catch (error) {
    console.error('❌ Fehler beim Aktualisieren der route.ts:', error);
  }
}

// Hauptfunktion
async function updateTestData() {
  try {
    console.log('🚀 Starte Aktualisierung der Testdaten...\n');

    // Hole Marktdaten von CoinGecko
    const marketData = await fetchMarketData();
    
    // Filtere die wichtigsten Coins (Top 15 nach Marktkapitalisierung)
    const topCoins = marketData
      .filter(coin => coin.market_cap_rank <= 15)
      .sort((a, b) => a.market_cap_rank - b.market_cap_rank);

    console.log(`\n📊 Verarbeite ${topCoins.length} Top-Coins:`);
    topCoins.forEach((coin, index) => {
      console.log(`  ${index + 1}. ${coin.name} (${coin.symbol.toUpperCase()}) - Rang ${coin.market_cap_rank} - €${coin.current_price.toFixed(2)}`);
    });

    // Konvertiere zu TestCoin-Format
    const testCoins = topCoins.map(convertToTestCoin);

    // Aktualisiere current_data.json
    await updateCurrentDataJson(marketData);

    // Aktualisiere Testdaten in route.ts
    await updateRouteTestData(testCoins);

    console.log('\n✅ Alle Testdaten wurden erfolgreich aktualisiert!');
    console.log(`📅 Letzte Aktualisierung: ${new Date().toLocaleString('de-DE')}`);
    
  } catch (error) {
    console.error('❌ Fehler beim Aktualisieren der Testdaten:', error);
    process.exit(1);
  }
}

// Starte die Aktualisierung
updateTestData(); 