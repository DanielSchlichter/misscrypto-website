import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Stablecoins die wir ausschließen wollen
const stablecoins = ['tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 'paxos-standard', 'gemini-dollar'];

async function fetchWithRetry(url: string, retries = 3, delay = 20000): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.status === 429) {
        console.log(`Rate limit erreicht, warte ${delay/1000} Sekunden...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`CoinGecko API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Versuch ${i + 1} fehlgeschlagen, warte ${delay/1000} Sekunden...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

async function fetchMarketData(coinId: string, days: string): Promise<any> {
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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('misscrypto');
    const collection = db.collection('coins');

    // Hole Top 50 Coins von CoinGecko
    const marketData = await fetchWithRetry(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y'
    );

    if (!Array.isArray(marketData)) {
      throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
    }

    const filteredCoins = marketData
      .filter((coin: any) => !stablecoins.includes(coin.id))
      .slice(0, 10);

    for (const coin of filteredCoins) {
      // Hole Chart-Daten für verschiedene Zeiträume
      const timeRanges = [
        { key: '24h', days: '1', maxPoints: 288 },
        { key: '7d', days: '7', maxPoints: 168 },
        { key: '30d', days: '30', maxPoints: 720 },
        { key: '1y', days: 'max', maxPoints: 365 }
      ];

      const prices: Record<string, number[]> = {};
      for (const { key, days, maxPoints } of timeRanges) {
        try {
          const data = await fetchMarketData(coin.id, days);
          prices[key] = await processChartData(data.prices, maxPoints);
        } catch (error) {
          console.error(`Fehler beim Laden der ${key}-Daten:`, error);
          prices[key] = [];
        }

        // Warte 20 Sekunden zwischen den Anfragen
        await new Promise(resolve => setTimeout(resolve, 20000));
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Krypto-Daten:', error);
    return NextResponse.json({ 
      error: 'Interner Server-Fehler',
      details: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }, { status: 500 });
  }
} 