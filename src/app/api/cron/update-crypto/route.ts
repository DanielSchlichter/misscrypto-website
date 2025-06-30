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

// Für statischen Export erforderlich
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  // Für statischen Export - keine Cron-Jobs möglich
  return NextResponse.json({ 
    message: 'Cron-Job nicht verfügbar im statischen Export Modus',
    status: 'disabled'
  });
} 