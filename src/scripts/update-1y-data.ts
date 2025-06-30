import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Lade Umgebungsvariablen
dotenv.config({ path: '.env.local' });
dotenv.config();

// MongoDB Verbindung
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.log('Verfügbare Umgebungsvariablen:', Object.keys(process.env).filter(key => key.includes('MONGO')));
  throw new Error('MONGODB_URI ist nicht definiert');
}

const client = new MongoClient(uri);

// Hilfsfunktion für Verzögerungen
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

interface PriceData {
  prices: [number, number][];
}

async function fetchWithRetry(url: string, retries = 3, delayMs = 20000): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.status === 429) {
        console.log(`  Rate limit erreicht, warte ${delayMs/1000} Sekunden...`);
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
      console.log(`  Versuch ${i + 1} fehlgeschlagen, warte ${delayMs/1000} Sekunden...`);
      await delay(delayMs);
    }
  }
}

async function fetch1YearData(coinId: string): Promise<number[]> {
  try {
    const data = await fetchWithRetry(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=365`
    ) as PriceData;
    
    if (!data || !data.prices || data.prices.length === 0) {
      throw new Error('Keine Preisdaten gefunden');
    }
    
    // Erstelle 12 monatliche Datenpunkte
    const step = Math.floor(data.prices.length / 12);
    const monthlyPrices = data.prices
      .filter((_: any, index: number) => index % step === 0)
      .slice(0, 12)
      .map((price: any) => price[1]);
    
    return monthlyPrices;
  } catch (error) {
    console.error(`Fehler beim Laden der 1-Jahres-Daten für ${coinId}:`, error);
    return [];
  }
}

async function update1YearData() {
  try {
    console.log('Starte Aktualisierung der 1-Jahres-Daten...');

    await client.connect();
    const db = client.db('misscrypto');
    const collection = db.collection('coins');

    // Hole alle Coins aus der Datenbank
    const coins = await collection.find({}).toArray();
    console.log(`Gefunden: ${coins.length} Coins in der Datenbank`);

    for (const coin of coins) {
      try {
        const coinId = (coin._id || coin.id).toString();
        console.log(`\nAktualisiere 1-Jahres-Daten für ${coin.name} (${coinId})...`);

        // Prüfe ob bereits 1y-Daten vorhanden sind
        if (coin.prices?.['1y'] && coin.prices['1y'].length > 0) {
          console.log(`  1-Jahres-Daten bereits vorhanden, überspringe...`);
          continue;
        }

        // Hole 1-Jahres-Daten
        const yearlyPrices = await fetch1YearData(coinId);
        
        if (yearlyPrices.length > 0) {
          // Berechne 1-Jahres-Performance
          const startPrice = yearlyPrices[0];
          const endPrice = yearlyPrices[yearlyPrices.length - 1];
          const yearlyChange = ((endPrice - startPrice) / startPrice) * 100;

          // Aktualisiere Datenbank
          await collection.updateOne(
            { _id: coin._id },
            {
              $set: {
                'prices.1y': yearlyPrices,
                'price_changes.1y': yearlyChange,
                last_updated: new Date(),
                updatedAt: new Date()
              }
            }
          );

          console.log(`  ✅ 1-Jahres-Daten erfolgreich hinzugefügt (${yearlyChange.toFixed(2)}%)`);
        } else {
          console.log(`  ❌ Keine 1-Jahres-Daten verfügbar`);
        }

        // Warte 25 Sekunden zwischen Coins (CoinGecko Rate Limit)
        await delay(25000);

      } catch (error) {
        console.error(`  Fehler beim Aktualisieren von ${coin.id}:`, error);
        await delay(25000); // Auch bei Fehlern warten
      }
    }

    console.log('\n✅ Aktualisierung der 1-Jahres-Daten abgeschlossen!');
  } catch (error) {
    console.error('Fehler beim Aktualisieren der 1-Jahres-Daten:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Starte die Aktualisierung
update1YearData().catch(console.error); 