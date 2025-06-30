import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import clientPromise from '@/lib/mongodb';

// Lade Umgebungsvariablen
dotenv.config();

// Hilfsfunktion für Verzögerungen
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Typdefinitionen
interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  image: string;
  market_cap_rank: number;
}

interface PriceData {
  prices: [number, number][];
}

interface TimeRange {
  key: string;
  days: string;
  maxPoints: number;
}

// Stablecoins die wir ausschließen wollen
const stablecoins = ['tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 'paxos-standard', 'gemini-dollar'];

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

async function fetchMarketData(coinId: string, days: string): Promise<PriceData> {
  const data = await fetchWithRetry(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=${days}`
  );
  
  if (!data || !data.prices) {
    throw new Error('Ungültige API-Antwort: Keine Preisdaten gefunden');
  }
  
  return data;
}

async function processChartData(prices: [number, number][], maxPoints: number): Promise<number[]> {
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
  let client: MongoClient | null = null;
  
  try {
    console.log('Starte Aktualisierung der Krypto-Daten...');

    client = await clientPromise;
    const db = client.db('misscrypto');
    const collection = db.collection('coins');

    // Hole Top 50 Coins von CoinGecko mit Retry
    const marketData = await fetchWithRetry(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y'
    ) as CoinData[];

    if (!Array.isArray(marketData)) {
      throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
    }

    const filteredCoins = marketData
      .filter((coin) => !stablecoins.includes(coin.id))
      .slice(0, 10);

    console.log(`Verarbeite ${filteredCoins.length} Coins...`);

    for (const coin of filteredCoins) {
      try {
        console.log(`\nAktualisiere ${coin.name} (${coin.id})...`);

        // Warte 20 Sekunden zwischen Coins
        await delay(20000);

        const timeRanges: TimeRange[] = [
          { key: '24h', days: '1', maxPoints: 288 },
          { key: '7d', days: '7', maxPoints: 168 },
          { key: '30d', days: '30', maxPoints: 720 },
          { key: '1y', days: '365', maxPoints: 12 } // 12 monatliche Punkte für 1 Jahr
        ];

        const prices: Record<string, number[]> = {};
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
          { _id: coin.id },
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

    console.log('\nAktualisierung abgeschlossen!');
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Krypto-Daten:', error);
    throw error;
  }
}

// Starte die Aktualisierung
updateCryptoData().catch(console.error); 