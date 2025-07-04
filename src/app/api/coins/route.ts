import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Für statischen Export erforderlich
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Temporäre Testdaten für den Investment Calculator
const getTestCoins = () => [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 92685,
    price_changes: {
      '24h': 0.30,
      '7d': 0.83,
      '30d': -0.26,
      '1y': 69.41
    },
    prices: {
      '24h': [92100, 92200, 92150, 92300, 92400, 92350, 92500, 92600, 92550, 92700, 92800, 92750, 92900, 92850, 93000, 92950, 93100, 93050, 93200, 93150, 93300, 93250, 93400, 92685],
      '7d': [91900, 92100, 92300, 92500, 92600, 92650, 92685],
      '30d': [93000, 93100, 93200, 93150, 93000, 92900, 92800, 92700, 92600, 92500, 92400, 92300, 92200, 92100, 92000, 91900, 91800, 91700, 91600, 91500, 91400, 91500, 91600, 91700, 91800, 91900, 92000, 92100, 92200, 92685],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    market_cap_rank: 1,
    last_updated: new Date().toISOString()
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    current_price: 2188.23,
    price_changes: {
      '24h': 0.43,
      '7d': 4.60,
      '30d': -5.44,
      '1y': -27.09
    },
    prices: {
      '24h': [2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2192, 2191, 2190, 2189, 2188, 2187, 2188.23],
      '7d': [2090, 2110, 2130, 2150, 2170, 2180, 2188.23],
      '30d': [2310, 2300, 2290, 2280, 2270, 2260, 2250, 2240, 2230, 2220, 2210, 2200, 2190, 2180, 2170, 2160, 2150, 2140, 2130, 2120, 2110, 2120, 2130, 2140, 2150, 2160, 2170, 2180, 2185, 2188.23],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    market_cap_rank: 2,
    last_updated: new Date().toISOString()
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    current_price: 1.90,
    price_changes: {
      '24h': -0.41,
      '7d': 5.69,
      '30d': -4.05,
      '1y': 347.82
    },
    prices: {
      '24h': [1.91, 1.912, 1.914, 1.916, 1.918, 1.920, 1.918, 1.916, 1.914, 1.912, 1.910, 1.908, 1.906, 1.904, 1.902, 1.900, 1.898, 1.896, 1.894, 1.892, 1.890, 1.892, 1.894, 1.90],
      '7d': [1.80, 1.82, 1.84, 1.86, 1.88, 1.89, 1.90],
      '30d': [1.98, 1.97, 1.96, 1.95, 1.94, 1.93, 1.92, 1.91, 1.90, 1.89, 1.88, 1.87, 1.86, 1.85, 1.84, 1.83, 1.82, 1.81, 1.82, 1.83, 1.84, 1.85, 1.86, 1.87, 1.88, 1.89, 1.90, 1.895, 1.898, 1.90],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
    market_cap_rank: 4,
    last_updated: new Date().toISOString()
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    current_price: 561.12,
    price_changes: {
      '24h': 0.22,
      '7d': 1.66,
      '30d': -4.66,
      '1y': 12.38
    },
    prices: {
      '24h': [559, 559.5, 560, 560.5, 561, 561.5, 562, 561.8, 561.6, 561.4, 561.2, 561.0, 560.8, 560.6, 560.4, 560.2, 560.0, 560.2, 560.4, 560.6, 560.8, 561.0, 561.1, 561.12],
      '7d': [552, 554, 556, 558, 560, 560.5, 561.12],
      '30d': [588, 586, 584, 582, 580, 578, 576, 574, 572, 570, 568, 566, 564, 562, 560, 558, 556, 554, 552, 554, 556, 558, 560, 561, 560.8, 560.9, 561.0, 561.05, 561.1, 561.12],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970',
    market_cap_rank: 5,
    last_updated: new Date().toISOString()
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    current_price: 178.12,
    price_changes: {
      '24h': 0.58,
      '7d': 3.21,
      '30d': -7.82,
      '1y': 95.80
    },
    prices: {
      '24h': [177, 177.2, 177.4, 177.6, 177.8, 178, 178.2, 178.4, 178.3, 178.2, 178.1, 178.0, 177.9, 177.8, 177.9, 178.0, 178.1, 178.2, 178.3, 178.2, 178.1, 178.0, 178.1, 178.12],
      '7d': [172, 173, 174, 175, 176, 177, 178.12],
      '30d': [193, 191, 189, 187, 185, 183, 181, 179, 177, 175, 173, 171, 169, 167, 165, 167, 169, 171, 173, 175, 177, 179, 178.5, 178.3, 178.1, 178.0, 178.05, 178.1, 178.11, 178.12],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    market_cap_rank: 6,
    last_updated: new Date().toISOString()
  },
  {
    id: 'usd-coin',
    name: 'USDC',
    symbol: 'USDC',
    current_price: 0.848639,
    price_changes: {
      '24h': 0.09,
      '7d': -0.71,
      '30d': -3.51,
      '1y': -8.34
    },
    prices: {
      '24h': [0.848, 0.8481, 0.8482, 0.8483, 0.8484, 0.8485, 0.8486, 0.8487, 0.8486, 0.8485, 0.8484, 0.8483, 0.8482, 0.8481, 0.8482, 0.8483, 0.8484, 0.8485, 0.8486, 0.8485, 0.8484, 0.8483, 0.8484, 0.848639],
      '7d': [0.854, 0.852, 0.850, 0.849, 0.848, 0.8485, 0.848639],
      '30d': [0.879, 0.877, 0.875, 0.873, 0.871, 0.869, 0.867, 0.865, 0.863, 0.861, 0.859, 0.857, 0.855, 0.853, 0.851, 0.849, 0.847, 0.845, 0.846, 0.847, 0.848, 0.849, 0.8485, 0.8483, 0.8481, 0.8482, 0.8484, 0.8486, 0.8485, 0.848639],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
    market_cap_rank: 7,
    last_updated: new Date().toISOString()
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    current_price: 0.304338,
    price_changes: {
      '24h': 0.26,
      '7d': 1.34,
      '30d': -11.77,
      '1y': 72.30
    },
    prices: {
      '24h': [0.303, 0.3031, 0.3032, 0.3033, 0.3034, 0.3035, 0.3036, 0.3037, 0.3038, 0.3039, 0.3040, 0.3041, 0.3042, 0.3043, 0.3044, 0.3045, 0.3044, 0.3043, 0.3042, 0.3041, 0.3042, 0.3043, 0.3044, 0.304338],
      '7d': [0.300, 0.301, 0.302, 0.303, 0.304, 0.3043, 0.304338],
      '30d': [0.345, 0.343, 0.341, 0.339, 0.337, 0.335, 0.333, 0.331, 0.329, 0.327, 0.325, 0.323, 0.321, 0.319, 0.317, 0.315, 0.313, 0.311, 0.309, 0.307, 0.305, 0.303, 0.304, 0.3042, 0.3043, 0.3044, 0.3043, 0.3042, 0.3043, 0.304338],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
    market_cap_rank: 8,
    last_updated: new Date().toISOString()
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 0.783463,
    price_changes: {
      '24h': 0.84,
      '7d': 8.17,
      '30d': -18.35,
      '1y': 75.25
    },
    prices: {
      '24h': [0.777, 0.778, 0.779, 0.780, 0.781, 0.782, 0.783, 0.784, 0.785, 0.784, 0.783, 0.782, 0.781, 0.782, 0.783, 0.784, 0.785, 0.784, 0.783, 0.782, 0.783, 0.7834, 0.7835, 0.783463],
      '7d': [0.724, 0.735, 0.746, 0.757, 0.768, 0.779, 0.783463],
      '30d': [0.959, 0.948, 0.937, 0.926, 0.915, 0.904, 0.893, 0.882, 0.871, 0.860, 0.849, 0.838, 0.827, 0.816, 0.805, 0.794, 0.783, 0.772, 0.761, 0.750, 0.755, 0.760, 0.765, 0.770, 0.775, 0.780, 0.782, 0.783, 0.7834, 0.783463],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090',
    market_cap_rank: 9,
    last_updated: new Date().toISOString()
  },
  {
    id: 'avalanche-2',
    name: 'Avalanche',
    symbol: 'AVAX',
    current_price: 30.97,
    price_changes: {
      '24h': 0.47,
      '7d': 3.82,
      '30d': -14.25,
      '1y': 82.10
    },
    prices: {
      '24h': [30.82, 30.84, 30.86, 30.88, 30.90, 30.92, 30.94, 30.96, 30.98, 31.00, 30.99, 30.98, 30.97, 30.96, 30.97, 30.98, 30.99, 31.00, 30.99, 30.98, 30.97, 30.96, 30.97, 30.97],
      '7d': [29.83, 30.15, 30.47, 30.65, 30.83, 30.90, 30.97],
      '30d': [36.11, 35.89, 35.67, 35.45, 35.23, 35.01, 34.79, 34.57, 34.35, 34.13, 33.91, 33.69, 33.47, 33.25, 33.03, 32.81, 32.59, 32.37, 32.15, 31.93, 31.71, 31.49, 31.27, 31.05, 30.90, 30.92, 30.94, 30.96, 30.97, 30.97],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369',
    market_cap_rank: 10,
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
    // Bei Build-Zeit: Leere Antwort für statischen Export
    if (process.env.SKIP_MONGODB === 'true' || process.env.NEXT_PHASE === 'phase-production-build') {
      console.log('Build-Modus: Keine Daten verfügbar');
      return NextResponse.json([]);
    }

    console.log('Starte Abruf der Coins aus der Datenbank...');
    
    try {
      const client = await withTimeout(clientPromise, 2000);
      const db = client.db('misscrypto');
      
      const coins = await withTimeout(
        db.collection('coins')
          .find({})
          .sort({ 'price_changes.1y': -1 }) // Sortiere nach 1-Jahres-Performance (höchste zuerst)
          .toArray(),
        3000
      );

      console.log(`${coins.length} Coins aus MongoDB gefunden`);

      if (coins && coins.length > 0) {
        // Konvertiere für beide Komponenten (Investment Calculator + CryptoTicker)
        const mappedCoins = coins.map(coin => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          image: coin.image,
          current_price: coin.current_price,
          // Für Investment Calculator:
          price_change_percentage_1y: coin.price_changes?.['1y'] || 0,
          historical_prices_1y: coin.historical_prices_1y || [],
          market_cap_rank: coin.market_cap_rank,
          // Für CryptoTicker:
          price_changes: coin.price_changes || {
            '24h': 0,
            '7d': 0,
            '30d': 0,
            '1y': 0
          },
          prices: coin.prices || {
            '24h': [],
            '7d': [],
            '30d': [],
            '1y': []
          },
          last_updated: coin.last_updated || new Date().toISOString()
        }));

        // Sortiere nach 1-Jahres-Performance
        const sortedCoins = mappedCoins.sort((a, b) => 
          (b.price_change_percentage_1y || 0) - (a.price_change_percentage_1y || 0)
        );

        console.log(`✅ ${sortedCoins.length} Coins aus MongoDB erhalten`);
        console.log('Top 5 Performer aus MongoDB:');
        sortedCoins.slice(0, 5).forEach((coin, index) => {
          console.log(`  ${index + 1}. ${coin.symbol}: ${coin.price_change_percentage_1y.toFixed(2)}%`);
        });

        return NextResponse.json(sortedCoins);
      }
    } catch (mongoError) {
      console.error('MongoDB-Fehler:', mongoError instanceof Error ? mongoError.message : mongoError);
      console.log('Fallback zu Testdaten wegen MongoDB-Fehler');
    }
    
    // Fallback zu Testdaten wenn MongoDB nicht verfügbar
    console.log('Verwende Testdaten (MongoDB nicht verfügbar)');
    const testCoins = getTestCoins();
    
    // Konvertiere für beide Komponenten (Investment Calculator + CryptoTicker)
    const mappedTestCoins = testCoins.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      image: coin.image,
      current_price: coin.current_price,
      // Für Investment Calculator:
      price_change_percentage_1y: coin.price_changes?.['1y'] || 0,
      historical_prices_1y: [], // Keine historischen Preise in getTestCoins()
      market_cap_rank: coin.market_cap_rank,
      // Für CryptoTicker:
      price_changes: coin.price_changes || {
        '24h': 0,
        '7d': 0,
        '30d': 0,
        '1y': 0
      },
      prices: coin.prices || {
        '24h': [],
        '7d': [],
        '30d': [],
        '1y': []
      },
      last_updated: coin.last_updated || new Date().toISOString()
    }));
    
    // Sortiere nach 1-Jahres-Performance
    const sortedTestCoins = mappedTestCoins.sort((a, b) => 
      (b.price_change_percentage_1y || 0) - (a.price_change_percentage_1y || 0)
    );
    
    console.log('Top 5 Performer aus Testdaten:');
    sortedTestCoins.slice(0, 5).forEach((coin, index) => {
      console.log(`  ${index + 1}. ${coin.symbol}: ${coin.price_change_percentage_1y.toFixed(2)}%`);
    });
    
    return NextResponse.json(sortedTestCoins);
    
  } catch (error) {
    console.error('Allgemeiner Fehler:', error instanceof Error ? error.message : error);
    
    // Auch bei allgemeinen Fehlern Testdaten zurückgeben
    console.log('Fallback zu Testdaten wegen allgemeinem Fehler');
    const testCoins = getTestCoins();
    
    // Konvertiere für beide Komponenten (Investment Calculator + CryptoTicker)
    const mappedTestCoins = testCoins.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      image: coin.image,
      current_price: coin.current_price,
      // Für Investment Calculator:
      price_change_percentage_1y: coin.price_changes?.['1y'] || 0,
      historical_prices_1y: [], // Keine historischen Preise in getTestCoins()
      market_cap_rank: coin.market_cap_rank,
      // Für CryptoTicker:
      price_changes: coin.price_changes || {
        '24h': 0,
        '7d': 0,
        '30d': 0,
        '1y': 0
      },
      prices: coin.prices || {
        '24h': [],
        '7d': [],
        '30d': [],
        '1y': []
      },
      last_updated: coin.last_updated || new Date().toISOString()
    }));
    
    const sortedTestCoins = mappedTestCoins.sort((a, b) => 
      (b.price_change_percentage_1y || 0) - (a.price_change_percentage_1y || 0)
    );
    
    return NextResponse.json(sortedTestCoins);
  }
} 