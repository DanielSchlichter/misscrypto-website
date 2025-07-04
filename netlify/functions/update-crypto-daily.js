const { MongoClient } = require('mongodb');

// Stablecoins die wir ausschließen wollen
const stablecoins = ['tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 'paxos-standard', 'gemini-dollar'];

// Hilfsfunktion für Verzögerungen
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

async function fetchMarketData(coinId, days) {
  const data = await fetchWithRetry(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=${days}`
  );
  
  if (!data || !data.prices) {
    throw new Error('Ungültige API-Antwort: Keine Preisdaten gefunden');
  }
  
  return data;
}

async function processChartData(prices, maxPoints) {
  if (!Array.isArray(prices)) {
    throw new Error('Ungültige Preisdaten: Kein Array');
  }

  if (prices.length > maxPoints) {
    const step = Math.floor(prices.length / maxPoints);
    return prices
      .filter((_, index) => index % step === 0)
      .slice(0, maxPoints)
      .map(price => price[1]);
  }
  return prices.map(price => price[1]);
}

async function updateCryptoData() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    console.log('Starte tägliche Aktualisierung der Krypto-Daten...');

    await client.connect();
    const db = client.db('misscrypto');
    const collection = db.collection('coins');

    // Hole Top 50 Coins von CoinGecko mit Retry
    const marketData = await fetchWithRetry(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y'
    );

    if (!Array.isArray(marketData)) {
      throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
    }

    // Filtere Stablecoins heraus und sortiere nach 1-Jahres-Performance
    const filteredCoins = marketData
      .filter((coin) => !stablecoins.includes(coin.id))
      .filter((coin) => coin.price_change_percentage_1y_in_currency != null) // Nur Coins mit 1y-Daten
      .sort((a, b) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
      .slice(0, 25); // Top 25 Performer (mehr als genug für Top 10)

    console.log(`Verarbeite ${filteredCoins.length} Top-Performer...`);
    console.log('Top 5 Performer:');
    filteredCoins.slice(0, 5).forEach((coin, index) => {
      console.log(`  ${index + 1}. ${coin.name}: ${(coin.price_change_percentage_1y_in_currency || 0).toFixed(2)}%`);
    });

    for (const coin of filteredCoins) {
      try {
        console.log(`\nAktualisiere ${coin.name} (${coin.id})...`);

        // Warte 20 Sekunden zwischen Coins
        await delay(20000);

        const timeRanges = [
          { key: '24h', days: '1', maxPoints: 288 },
          { key: '7d', days: '7', maxPoints: 168 },
          { key: '30d', days: '30', maxPoints: 720 },
          { key: '1y', days: '365', maxPoints: 12 } // 12 monatliche Punkte für 1 Jahr
        ];

        const prices = {};
        for (const { key, days, maxPoints } of timeRanges) {
          console.log(`  Hole ${key}-Daten...`);
          try {
            const data = await fetchMarketData(coin.id, days);
            prices[key] = await processChartData(data.prices, maxPoints);
          } catch (error) {
            console.error(`  Fehler beim Laden der ${key}-Daten:`, error);
            prices[key] = [];
          }
          // Warte 20 Sekunden zwischen Zeiträumen
          await delay(20000);
        }

        // Erstelle price_changes Objekt
        const price_changes = {
          '24h': coin.price_change_percentage_24h || 0,
          '7d': coin.price_change_percentage_7d_in_currency || 0,
          '30d': coin.price_change_percentage_30d_in_currency || 0,
          '1y': coin.price_change_percentage_1y_in_currency || 0
        };

        // Aktualisiere oder erstelle Coin-Daten in der Datenbank
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
              prices,
              last_updated: new Date(),
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );

        console.log(`  ${coin.name} erfolgreich aktualisiert!`);
      } catch (error) {
        console.error(`  Fehler beim Aktualisieren von ${coin.id}:`, error);
      }
    }

    console.log('\nTägliche Aktualisierung abgeschlossen!');
    return {
      success: true,
      processed: filteredCoins.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Fehler bei täglicher Aktualisierung:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Standard Netlify Function Handler
exports.handler = async (event, context) => {
  try {
    console.log('Starte geplante Krypto-Datenaktualisierung...');
    const result = await updateCryptoData();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Krypto-Daten erfolgreich aktualisiert',
        ...result
      })
    };
  } catch (error) {
    console.error('Fehler bei geplanter Aktualisierung:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Fehler bei der Aktualisierung',
        message: error.message
      })
    };
  }
}; 