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
    current_price: 103100,
    price_changes: {
      '24h': 1.37,
      '7d': 11.82,
      '30d': 13.45,
      '1y': 87.45
    },
    prices: {
      '24h': [101608.49, 101768.37, 101211.49, 102779.48, 102479.18, 101677.70, 101060.75, 101213.92, 101373.73, 101941.01, 101598.79, 102757.48, 101922.60, 103190.43, 101996.98, 103324.94, 102137.37, 102494.47, 101782.65, 101894.89, 102227.05, 103864.41, 102853.24, 103156.05],
      '7d': [93049.33, 93385.59, 96223.89, 98245.10, 97939.28, 101530.39, 103342.91],
      '30d': [94211.94, 91061.02, 90514.46, 91836.66, 93060.45, 89765.88, 93345.92, 93209.12, 96850.85, 92415.98, 92367.31, 93333.67, 97222.64, 92763.23, 100216.60, 97613.96, 100625.53, 96305.43, 98776.23, 98485.10, 102685.03, 100728.87, 100393.49, 100115.48, 102712.81, 99190.33, 104432.27, 104177.04, 101850.19, 105685.51],
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
    current_price: 2588.27,
    price_changes: {
      '24h': 0.94,
      '7d': 19.89,
      '30d': 18.18,
      '1y': -11.63
    },
    prices: {
      '24h': [2583.72, 2546.86, 2584.78, 2541.98, 2588.51, 2568.29, 2593.73, 2592.83, 2597.10, 2592.72, 2549.77, 2593.53, 2580.68, 2577.11, 2596.05, 2564.17, 2575.06, 2564.02, 2603.02, 2582.59, 2608.79, 2567.23, 2570.00, 2575.01],
      '7d': [2157.99, 2271.23, 2328.89, 2421.47, 2397.50, 2492.00, 2617.28],
      '30d': [2145.00, 2244.91, 2301.66, 2284.41, 2293.03, 2268.04, 2241.66, 2317.41, 2252.01, 2310.18, 2326.81, 2421.26, 2437.50, 2378.84, 2440.53, 2452.68, 2334.61, 2358.13, 2473.76, 2510.16, 2479.29, 2409.83, 2439.05, 2494.23, 2529.19, 2543.93, 2518.85, 2636.78, 2541.78, 2673.88],
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
    current_price: 2.56,
    price_changes: {
      '24h': 4.90,
      '7d': 29.68,
      '30d': 36.33,
      '1y': 425.51
    },
    prices: {
      '24h': [2.45, 2.46, 2.46, 2.47, 2.47, 2.45, 2.48, 2.48, 2.48, 2.47, 2.47, 2.49, 2.51, 2.49, 2.52, 2.53, 2.54, 2.55, 2.54, 2.55, 2.56, 2.55, 2.57, 2.56],
      '7d': [2.00, 2.05, 2.12, 2.26, 2.36, 2.43, 2.60],
      '30d': [1.91, 1.93, 1.94, 1.95, 2.01, 2.04, 2.04, 2.00, 2.06, 2.09, 2.14, 2.16, 2.10, 2.17, 2.16, 2.25, 2.22, 2.23, 2.24, 2.28, 2.30, 2.31, 2.44, 2.41, 2.42, 2.43, 2.43, 2.47, 2.47, 2.51],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
    market_cap_rank: 3,
    last_updated: new Date().toISOString()
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    current_price: 0.856059,
    price_changes: {
      '24h': 0.10,
      '7d': 0.49,
      '30d': -1.16,
      '1y': -6.60
    },
    prices: {
      '24h': [0.86, 0.85, 0.86, 0.85, 0.86, 0.86, 0.85, 0.85, 0.86, 0.85, 0.86, 0.86, 0.86, 0.85, 0.85, 0.86, 0.85, 0.86, 0.85, 0.85, 0.85, 0.86, 0.86, 0.86],
      '7d': [0.86, 0.84, 0.85, 0.87, 0.84, 0.85, 0.84],
      '30d': [0.88, 0.89, 0.90, 0.88, 0.83, 0.85, 0.86, 0.89, 0.87, 0.86, 0.85, 0.84, 0.86, 0.88, 0.87, 0.86, 0.87, 0.85, 0.87, 0.85, 0.85, 0.84, 0.89, 0.85, 0.89, 0.88, 0.89, 0.89, 0.87, 0.83],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    market_cap_rank: 4,
    last_updated: new Date().toISOString()
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    current_price: 595.83,
    price_changes: {
      '24h': 0.63,
      '7d': 5.94,
      '30d': 6.38,
      '1y': 21.13
    },
    prices: {
      '24h': [591.94, 587.71, 597.69, 595.09, 597.33, 594.37, 587.95, 598.73, 591.77, 595.81, 593.52, 590.97, 598.95, 595.91, 598.06, 590.29, 590.94, 589.60, 595.35, 598.15, 593.98, 590.94, 597.25, 594.41],
      '7d': [562.63, 581.73, 583.29, 572.61, 574.83, 583.02, 598.95],
      '30d': [560.16, 542.37, 581.53, 576.48, 554.17, 564.40, 548.21, 581.68, 558.04, 567.84, 571.31, 556.83, 557.14, 581.24, 557.38, 588.13, 600.68, 570.16, 567.43, 569.57, 587.67, 572.24, 597.06, 605.72, 577.92, 578.89, 596.65, 607.87, 600.13, 580.55],
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
    current_price: 141.56,
    price_changes: {
      '24h': 1.48,
      '7d': 9.45,
      '30d': 12.52,
      '1y': 6.17
    },
    prices: {
      '24h': [140.71, 138.78, 138.69, 140.87, 138.90, 139.03, 139.63, 140.94, 140.09, 140.59, 139.93, 140.87, 139.45, 141.36, 142.09, 141.46, 141.02, 141.56, 141.16, 140.74, 140.43, 141.95, 140.60, 141.89],
      '7d': [130.00, 129.97, 131.67, 137.45, 134.38, 138.09, 141.88],
      '30d': [126.37, 124.81, 127.43, 125.87, 131.78, 128.17, 127.03, 126.48, 134.46, 130.36, 131.42, 135.85, 137.04, 133.48, 136.64, 136.81, 129.99, 130.74, 132.89, 135.53, 140.06, 139.74, 137.79, 137.72, 138.50, 140.32, 136.66, 139.42, 136.54, 145.65],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756',
    market_cap_rank: 6,
    last_updated: new Date().toISOString()
  },
  {
    id: 'usd-coin',
    name: 'USDC',
    symbol: 'USDC',
    current_price: 0.855869,
    price_changes: {
      '24h': 0.11,
      '7d': 0.47,
      '30d': -1.13,
      '1y': -6.56
    },
    prices: {
      '24h': [0.85, 0.85, 0.86, 0.85, 0.86, 0.85, 0.85, 0.85, 0.86, 0.85, 0.85, 0.85, 0.86, 0.85, 0.86, 0.86, 0.85, 0.85, 0.85, 0.86, 0.85, 0.86, 0.85, 0.85],
      '7d': [0.84, 0.85, 0.83, 0.83, 0.84, 0.86, 0.84],
      '30d': [0.88, 0.89, 0.88, 0.89, 0.86, 0.87, 0.87, 0.89, 0.84, 0.84, 0.84, 0.87, 0.85, 0.89, 0.84, 0.89, 0.84, 0.85, 0.84, 0.87, 0.88, 0.89, 0.83, 0.86, 0.84, 0.82, 0.84, 0.85, 0.87, 0.87],
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
    current_price: 0.172317,
    price_changes: {
      '24h': -0.44,
      '7d': 20.01,
      '30d': 11.99,
      '1y': 67.83
    },
    prices: {
      '24h': [0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17],
      '7d': [0.15, 0.15, 0.16, 0.16, 0.16, 0.17, 0.17],
      '30d': [0.15, 0.15, 0.15, 0.15, 0.16, 0.15, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.17, 0.16, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.18, 0.17, 0.17],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
    market_cap_rank: 8,
    last_updated: new Date().toISOString()
  },
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    current_price: 0.257482,
    price_changes: {
      '24h': -0.86,
      '7d': 5.54,
      '30d': 10.30,
      '1y': 103.59
    },
    prices: {
      '24h': [0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26],
      '7d': [0.24, 0.24, 0.25, 0.25, 0.25, 0.25, 0.26],
      '30d': [0.24, 0.23, 0.24, 0.24, 0.24, 0.23, 0.23, 0.25, 0.24, 0.24, 0.24, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.24, 0.24, 0.25, 0.25, 0.25, 0.26, 0.24, 0.25, 0.26, 0.26, 0.26, 0.26, 0.26],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    market_cap_rank: 9,
    last_updated: new Date().toISOString()
  },
  {
    id: 'staked-ether',
    name: 'Lido Staked Ether',
    symbol: 'STETH',
    current_price: 2588.29,
    price_changes: {
      '24h': 1.02,
      '7d': 19.90,
      '30d': 18.22,
      '1y': -11.72
    },
    prices: {
      '24h': [2558.11, 2587.69, 2572.42, 2563.18, 2591.09, 2589.09, 2548.54, 2580.48, 2588.48, 2573.02, 2582.59, 2576.58, 2569.38, 2589.01, 2580.47, 2565.02, 2569.61, 2562.71, 2566.33, 2584.79, 2602.58, 2561.07, 2591.74, 2586.84],
      '7d': [2110.19, 2211.31, 2292.67, 2385.90, 2424.91, 2529.62, 2613.67],
      '30d': [2219.09, 2275.65, 2143.05, 2153.16, 2210.74, 2233.74, 2296.18, 2208.36, 2309.06, 2244.31, 2317.51, 2321.27, 2419.22, 2360.25, 2461.92, 2383.14, 2460.82, 2432.28, 2440.88, 2407.88, 2491.97, 2393.00, 2543.75, 2466.17, 2574.52, 2483.79, 2537.64, 2571.64, 2490.39, 2623.53],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206',
    market_cap_rank: 10,
    last_updated: new Date().toISOString()
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 0.632174,
    price_changes: {
      '24h': -1.23,
      '7d': 27.49,
      '30d': 15.57,
      '1y': 60.44
    },
    prices: {
      '24h': [0.64, 0.64, 0.65, 0.64, 0.64, 0.64, 0.64, 0.63, 0.64, 0.63, 0.64, 0.64, 0.64, 0.64, 0.64, 0.63, 0.63, 0.64, 0.64, 0.63, 0.64, 0.64, 0.63, 0.63],
      '7d': [0.51, 0.53, 0.55, 0.57, 0.59, 0.61, 0.63],
      '30d': [0.54, 0.53, 0.57, 0.53, 0.57, 0.57, 0.55, 0.56, 0.55, 0.58, 0.58, 0.59, 0.59, 0.60, 0.60, 0.58, 0.59, 0.59, 0.59, 0.62, 0.59, 0.63, 0.61, 0.62, 0.63, 0.62, 0.62, 0.64, 0.61, 0.64],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090',
    market_cap_rank: 11,
    last_updated: new Date().toISOString()
  },
  {
    id: 'hyperliquid',
    name: 'Hyperliquid',
    symbol: 'HYPE',
    current_price: 40.95,
    price_changes: {
      '24h': -1.45,
      '7d': 21.27,
      '30d': 15.72,
      '1y': 0.00
    },
    prices: {
      '24h': [41.22, 41.23, 41.54, 41.32, 41.25, 41.46, 41.20, 41.39, 41.05, 41.35, 41.40, 41.35, 41.00, 41.34, 41.23, 40.77, 41.38, 40.92, 41.12, 41.39, 40.96, 40.99, 41.10, 41.28],
      '7d': [33.55, 35.55, 35.46, 37.24, 38.94, 39.77, 40.34],
      '30d': [34.40, 35.35, 35.86, 36.93, 37.27, 35.05, 36.72, 37.34, 37.93, 36.64, 38.01, 37.02, 38.85, 37.87, 39.08, 37.55, 37.59, 37.34, 40.22, 39.21, 39.99, 38.02, 39.98, 38.51, 39.07, 40.27, 41.41, 41.17, 41.92, 40.26],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/50882/large/hyperliquid.jpg?1729431300',
    market_cap_rank: 12,
    last_updated: new Date().toISOString()
  },
  {
    id: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    current_price: 102912,
    price_changes: {
      '24h': 1.44,
      '7d': 11.76,
      '30d': 13.19,
      '1y': 87.46
    },
    prices: {
      '24h': [100623.68, 101322.12, 100771.55, 102089.53, 102089.13, 102219.66, 102194.45, 102252.35, 102458.83, 102608.33, 101277.67, 101968.82, 102391.91, 101657.17, 103017.57, 101716.75, 101651.71, 102501.03, 103584.34, 103590.76, 101905.50, 102694.30, 102600.61, 102084.39],
      '7d': [90961.26, 93431.93, 94349.65, 95554.10, 97638.89, 102734.59, 103083.12],
      '30d': [92256.39, 93142.06, 94764.65, 95055.35, 94346.91, 95869.41, 92826.20, 92106.71, 90778.40, 94359.73, 98147.98, 97834.30, 96860.53, 99787.03, 96857.05, 99154.26, 95158.53, 95333.14, 95408.14, 100964.23, 101116.41, 100446.40, 99263.35, 102008.70, 103060.67, 101297.13, 98476.48, 101343.61, 103043.44, 102512.70],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857',
    market_cap_rank: 13,
    last_updated: new Date().toISOString()
  },
  {
    id: 'stellar',
    name: 'Stellar',
    symbol: 'XLM',
    current_price: 0.395161,
    price_changes: {
      '24h': -2.53,
      '7d': 84.45,
      '30d': 76.58,
      '1y': 308.91
    },
    prices: {
      '24h': [0.41, 0.41, 0.41, 0.41, 0.40, 0.41, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.39, 0.40, 0.40, 0.39],
      '7d': [0.21, 0.24, 0.27, 0.31, 0.33, 0.37, 0.40],
      '30d': [0.23, 0.23, 0.23, 0.24, 0.25, 0.25, 0.26, 0.26, 0.27, 0.28, 0.29, 0.28, 0.29, 0.29, 0.30, 0.31, 0.33, 0.32, 0.33, 0.33, 0.34, 0.34, 0.35, 0.35, 0.37, 0.37, 0.38, 0.39, 0.39, 0.39],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/100/large/fmpFRHHQ_400x400.jpg?1735231350',
    market_cap_rank: 14,
    last_updated: new Date().toISOString()
  },
  {
    id: 'sui',
    name: 'Sui',
    symbol: 'SUI',
    current_price: 3.34,
    price_changes: {
      '24h': 11.46,
      '7d': 36.11,
      '30d': 29.22,
      '1y': 354.87
    },
    prices: {
      '24h': [3.01, 3.04, 3.03, 3.05, 3.03, 3.05, 3.09, 3.12, 3.11, 3.15, 3.12, 3.15, 3.17, 3.20, 3.20, 3.22, 3.22, 3.22, 3.27, 3.26, 3.28, 3.32, 3.34, 3.31],
      '7d': [2.48, 2.63, 2.74, 2.84, 3.03, 3.19, 3.30],
      '30d': [2.62, 2.71, 2.66, 2.72, 2.71, 2.82, 2.72, 2.86, 2.81, 2.74, 2.84, 2.81, 2.98, 2.88, 3.02, 2.97, 2.98, 2.96, 3.14, 3.01, 3.04, 3.14, 3.14, 3.09, 3.22, 3.25, 3.32, 3.20, 3.31, 3.29],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/26375/large/sui-ocean-square.png?1727791290',
    market_cap_rank: 15,
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