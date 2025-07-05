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
    current_price: 124.91,
    price_changes: {
      '24h': -3.91,
      '7d': 3.21,
      '30d': -7.82,
      '1y': 95.80
    },
    prices: {
      '24h': [124.2, 124.3, 124.4, 124.5, 124.6, 124.7, 124.8, 124.9, 125.0, 125.1, 125.2, 125.1, 125.0, 124.9, 124.8, 124.9, 125.0, 125.1, 125.2, 125.1, 125.0, 124.9, 124.8, 124.91],
      '7d': [122.5, 123.0, 123.5, 124.0, 124.5, 124.8, 124.91],
      '30d': [135.2, 134.8, 134.4, 134.0, 133.6, 133.2, 132.8, 132.4, 132.0, 131.6, 131.2, 130.8, 130.4, 130.0, 129.6, 129.2, 128.8, 128.4, 128.0, 127.6, 127.2, 126.8, 126.4, 126.0, 125.6, 125.2, 124.8, 124.9, 124.91, 124.91],
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
    current_price: 0.139465,
    price_changes: {
      '24h': -3.11,
      '7d': 1.34,
      '30d': -11.77,
      '1y': 72.30
    },
    prices: {
      '24h': [0.138, 0.1381, 0.1382, 0.1383, 0.1384, 0.1385, 0.1386, 0.1387, 0.1388, 0.1389, 0.1390, 0.1391, 0.1392, 0.1393, 0.1394, 0.1395, 0.1394, 0.1393, 0.1392, 0.1391, 0.1392, 0.1393, 0.1394, 0.139465],
      '7d': [0.137, 0.1375, 0.138, 0.1385, 0.139, 0.1393, 0.139465],
      '30d': [0.158, 0.156, 0.154, 0.152, 0.150, 0.148, 0.146, 0.144, 0.142, 0.140, 0.138, 0.136, 0.134, 0.132, 0.130, 0.132, 0.134, 0.136, 0.138, 0.140, 0.142, 0.144, 0.143, 0.141, 0.140, 0.139, 0.138, 0.1385, 0.139, 0.139465],
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
    current_price: 0.490183,
    price_changes: {
      '24h': -2.12,
      '7d': 8.17,
      '30d': -18.35,
      '1y': 75.25
    },
    prices: {
      '24h': [0.488, 0.489, 0.490, 0.491, 0.492, 0.493, 0.494, 0.495, 0.496, 0.495, 0.494, 0.493, 0.492, 0.491, 0.490, 0.489, 0.488, 0.489, 0.490, 0.491, 0.492, 0.491, 0.490, 0.490183],
      '7d': [0.452, 0.462, 0.472, 0.482, 0.488, 0.489, 0.490183],
      '30d': [0.601, 0.594, 0.587, 0.580, 0.573, 0.566, 0.559, 0.552, 0.545, 0.538, 0.531, 0.524, 0.517, 0.510, 0.503, 0.496, 0.489, 0.482, 0.475, 0.468, 0.470, 0.472, 0.474, 0.476, 0.478, 0.480, 0.482, 0.485, 0.488, 0.490183],
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
    current_price: 15.11,
    price_changes: {
      '24h': -4.28,
      '7d': 3.82,
      '30d': -14.25,
      '1y': 82.10
    },
    prices: {
      '24h': [15.02, 15.04, 15.06, 15.08, 15.10, 15.12, 15.14, 15.16, 15.18, 15.20, 15.19, 15.18, 15.17, 15.16, 15.15, 15.14, 15.13, 15.12, 15.11, 15.10, 15.09, 15.10, 15.11, 15.11],
      '7d': [14.52, 14.72, 14.92, 15.02, 15.08, 15.10, 15.11],
      '30d': [17.56, 17.34, 17.12, 16.90, 16.68, 16.46, 16.24, 16.02, 15.80, 15.58, 15.36, 15.14, 14.92, 14.70, 14.48, 14.70, 14.92, 15.14, 15.36, 15.58, 15.80, 15.60, 15.40, 15.20, 15.10, 15.08, 15.09, 15.10, 15.11, 15.11],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369',
    market_cap_rank: 10,
    last_updated: new Date().toISOString()
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    current_price: 2.86,
    price_changes: {
      '24h': -3.26,
      '7d': 1.82,
      '30d': -8.45,
      '1y': 52.80
    },
    prices: {
      '24h': [2.84, 2.85, 2.86, 2.87, 2.88, 2.89, 2.90, 2.91, 2.92, 2.91, 2.90, 2.89, 2.88, 2.87, 2.86, 2.85, 2.84, 2.85, 2.86, 2.87, 2.88, 2.87, 2.86, 2.86],
      '7d': [2.81, 2.82, 2.83, 2.84, 2.85, 2.86, 2.86],
      '30d': [3.12, 3.09, 3.06, 3.03, 3.00, 2.97, 2.94, 2.91, 2.88, 2.85, 2.82, 2.85, 2.88, 2.91, 2.94, 2.91, 2.88, 2.85, 2.82, 2.84, 2.86, 2.88, 2.87, 2.86, 2.85, 2.84, 2.85, 2.86, 2.86, 2.86],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008',
    market_cap_rank: 11,
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