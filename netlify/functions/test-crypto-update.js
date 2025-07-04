const { MongoClient } = require('mongodb');

// Stablecoins die wir ausschließen wollen
const stablecoins = ['tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 'paxos-standard', 'gemini-dollar'];

async function testCryptoUpdate() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    console.log('Starte Test-Aktualisierung der Krypto-Daten...');

    await client.connect();
    const db = client.db('misscrypto');
    const collection = db.collection('coins');

    // Hole nur Top 20 Coins von CoinGecko für schnellen Test
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y'
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API Error: ${response.status}`);
    }

    const marketData = await response.json();

    if (!Array.isArray(marketData)) {
      throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
    }

    // Filtere Stablecoins heraus und sortiere nach 1-Jahres-Performance
    const filteredCoins = marketData
      .filter((coin) => !stablecoins.includes(coin.id))
      .filter((coin) => coin.price_change_percentage_1y_in_currency != null) // Nur Coins mit 1y-Daten
      .sort((a, b) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
      .slice(0, 5); // Nur Top 5 für schnellen Test

    console.log(`Verarbeite ${filteredCoins.length} Top-Performer für Test...`);
    console.log('Top 5 Performer:');
    filteredCoins.forEach((coin, index) => {
      console.log(`  ${index + 1}. ${coin.name}: ${(coin.price_change_percentage_1y_in_currency || 0).toFixed(2)}%`);
    });

    // Schnelle Verarbeitung ohne Charts
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

        // Aktualisiere oder erstelle Coin-Daten in der Datenbank (ohne Charts für schnellen Test)
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
              prices: {
                '24h': [],
                '7d': [],
                '30d': [],
                '1y': []
              },
              last_updated: new Date(),
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );

        console.log(`${coin.name} erfolgreich aktualisiert!`);
      } catch (error) {
        console.error(`Fehler beim Aktualisieren von ${coin.id}:`, error);
      }
    }

    console.log('\nTest-Aktualisierung abgeschlossen!');
    return {
      success: true,
      processed: filteredCoins.length,
      timestamp: new Date().toISOString(),
      topPerformers: filteredCoins.map(coin => ({
        name: coin.name,
        performance: coin.price_change_percentage_1y_in_currency || 0
      }))
    };
  } catch (error) {
    console.error('Fehler bei Test-Aktualisierung:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Netlify Function für Test-Update
exports.handler = async (event, context) => {
  try {
    console.log('Starte Test-Krypto-Datenaktualisierung...');
    const result = await testCryptoUpdate();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Test: Krypto-Daten erfolgreich aktualisiert',
        ...result
      })
    };
  } catch (error) {
    console.error('Fehler bei Test-Aktualisierung:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Fehler bei der Test-Aktualisierung',
        message: error.message
      })
    };
  }
}; 