import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Für statischen Export erforderlich
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Mock-Daten als Fallback
const mockCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 107250,
    price_changes: {
      '24h': 2.5,
      '7d': 8.2,
      '30d': 15.3
    },
    prices: {
      '24h': Array.from({length: 24}, (_, i) => 107000 + Math.random() * 1000),
      '7d': Array.from({length: 7}, (_, i) => 105000 + Math.random() * 3000),
      '30d': Array.from({length: 30}, (_, i) => 95000 + Math.random() * 15000)
    },
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    market_cap_rank: 1,
    last_updated: new Date().toISOString()
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    current_price: 4125,
    price_changes: {
      '24h': 1.8,
      '7d': 5.4,
      '30d': 12.1
    },
    prices: {
      '24h': Array.from({length: 24}, (_, i) => 4100 + Math.random() * 100),
      '7d': Array.from({length: 7}, (_, i) => 4000 + Math.random() * 200),
      '30d': Array.from({length: 30}, (_, i) => 3800 + Math.random() * 400)
    },
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    market_cap_rank: 2,
    last_updated: new Date().toISOString()
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    current_price: 2.85,
    price_changes: {
      '24h': -0.5,
      '7d': 3.2,
      '30d': 22.8
    },
    prices: {
      '24h': Array.from({length: 24}, (_, i) => 2.80 + Math.random() * 0.10),
      '7d': Array.from({length: 7}, (_, i) => 2.70 + Math.random() * 0.20),
      '30d': Array.from({length: 30}, (_, i) => 2.20 + Math.random() * 0.80)
    },
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    market_cap_rank: 3,
    last_updated: new Date().toISOString()
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 1.25,
    price_changes: {
      '24h': 0.8,
      '7d': 4.2,
      '30d': 18.5
    },
    prices: {
      '24h': Array.from({length: 24}, (_, i) => 1.23 + Math.random() * 0.05),
      '7d': Array.from({length: 7}, (_, i) => 1.15 + Math.random() * 0.15),
      '30d': Array.from({length: 30}, (_, i) => 1.00 + Math.random() * 0.30)
    },
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    market_cap_rank: 4,
    last_updated: new Date().toISOString()
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    current_price: 245,
    price_changes: {
      '24h': 3.2,
      '7d': 12.8,
      '30d': 45.2
    },
    prices: {
      '24h': Array.from({length: 24}, (_, i) => 242 + Math.random() * 8),
      '7d': Array.from({length: 7}, (_, i) => 215 + Math.random() * 35),
      '30d': Array.from({length: 30}, (_, i) => 165 + Math.random() * 85)
    },
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    market_cap_rank: 5,
    last_updated: new Date().toISOString()
  }
];

// Timeout-Funktion für MongoDB-Operationen
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
    )
  ]);
};

export async function GET() {
  try {
    // Bei Build-Zeit oder wenn MongoDB nicht verfügbar ist: Direkt Mock-Daten zurückgeben
    if (process.env.SKIP_MONGODB === 'true' || process.env.NEXT_PHASE === 'phase-production-build') {
      console.log('Build-Modus: Verwende Mock-Daten direkt');
      return NextResponse.json(mockCoins);
    }

    console.log('Starte Abruf der Coins aus der Datenbank...');
    
    // Sehr kurzer Timeout für Build-Prozess
    const client = await withTimeout(clientPromise, 2000);
    const db = client.db('misscrypto');
    
    const coins = await withTimeout(
      db.collection('coins')
        .find({})
        .sort({ market_cap_rank: 1 })
        .toArray(),
      3000
    );

    console.log(`${coins.length} Coins aus MongoDB gefunden`);

    if (!coins || coins.length === 0) {
      console.log('Keine Coins in der Datenbank gefunden, verwende Mock-Daten');
      return NextResponse.json(mockCoins);
    }

    // Mappe die MongoDB-Daten zur erwarteten Struktur
    const mappedCoins = coins.map(coin => ({
      id: coin._id || coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      price_changes: coin.price_changes || {
        '24h': 0,
        '7d': 0,
        '30d': 0
      },
      prices: coin.prices || {
        '24h': [],
        '7d': [],
        '30d': []
      },
      image: coin.image,
      market_cap_rank: coin.market_cap_rank,
      last_updated: coin.last_updated
    })).filter(coin => {
      if (!coin.id || !coin.name || !coin.current_price) {
        console.error('Ungültige Coin-Struktur:', coin.id);
        return false;
      }
      return true;
    });

    console.log(`${mappedCoins.length} gültige Coins aus MongoDB zurückgegeben`);
    return NextResponse.json(mappedCoins);
    
  } catch (error) {
    console.error('MongoDB-Fehler oder Timeout, verwende Mock-Daten als Fallback:', error instanceof Error ? error.message : error);
    
    // Fallback auf Mock-Daten bei jedem Fehler
    console.log('Verwende Mock-Daten aufgrund von Fehler');
    return NextResponse.json(mockCoins);
  }
} 