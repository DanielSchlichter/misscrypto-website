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
    current_price: 102701,
    price_changes: {
      '24h': 1.18,
      '7d': 11.38,
      '30d': 13.01,
      '1y': 86.72
    },
    prices: {
      '24h': [101690.85, 100669.82, 101388.93, 100981.11, 101794.98, 101292.49, 102576.13, 101528.04, 101655.23, 102814.78, 101799.60, 101073.43, 101957.32, 101995.35, 101830.99, 103205.85, 101948.04, 103130.50, 102716.60, 102869.34, 103188.22, 102032.74, 102047.55, 103294.33],
      '7d': [90894.47, 92377.19, 97685.71, 98453.71, 100283.82, 101177.82, 104722.24],
      '30d': [87560.14, 88292.17, 92276.84, 88826.93, 89294.55, 93251.78, 90013.31, 91918.89, 94904.36, 97170.27, 98147.48, 94774.08, 96681.96, 93552.06, 99440.08, 97480.63, 100522.49, 99240.37, 96182.81, 99570.31, 96143.26, 101302.36, 100278.89, 98290.04, 103410.74, 99782.17, 104292.73, 103042.26, 103143.96, 106054.13],
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
    current_price: 2583.15,
    price_changes: {
      '24h': 0.95,
      '7d': 19.65,
      '30d': 17.94,
      '1y': -11.80
    },
    prices: {
      '24h': [2558.95, 2552.41, 2581.05, 2560.20, 2555.70, 2539.08, 2559.84, 2556.85, 2579.10, 2569.88, 2566.52, 2586.50, 2588.96, 2552.98, 2578.38, 2592.24, 2570.05, 2576.27, 2602.34, 2568.58, 2564.20, 2568.80, 2573.33, 2605.85],
      '7d': [2206.96, 2262.67, 2303.12, 2362.21, 2389.89, 2500.97, 2586.87],
      '30d': [2257.08, 2138.59, 2221.83, 2238.07, 2158.80, 2259.66, 2300.54, 2366.43, 2344.32, 2372.89, 2295.61, 2367.15, 2277.23, 2316.14, 2439.02, 2472.59, 2490.27, 2500.47, 2397.21, 2444.09, 2485.96, 2501.70, 2522.61, 2579.31, 2464.06, 2602.02, 2571.51, 2585.40, 2547.96, 2621.00],
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
    current_price: 2.51,
    price_changes: {
      '24h': 3.72,
      '7d': 27.38,
      '30d': 33.91,
      '1y': 416.16
    },
    prices: {
      '24h': [2.40, 2.43, 2.43, 2.44, 2.46, 2.43, 2.47, 2.46, 2.47, 2.48, 2.44, 2.45, 2.47, 2.47, 2.48, 2.50, 2.49, 2.47, 2.50, 2.49, 2.52, 2.53, 2.50, 2.52],
      '7d': [1.99, 2.05, 2.12, 2.27, 2.31, 2.45, 2.48],
      '30d': [1.91, 1.83, 1.89, 1.90, 2.00, 2.02, 2.04, 1.96, 1.98, 2.06, 2.12, 2.07, 2.15, 2.22, 2.22, 2.18, 2.20, 2.24, 2.31, 2.27, 2.29, 2.28, 2.33, 2.42, 2.33, 2.44, 2.52, 2.48, 2.47, 2.53],
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
    current_price: 0.856951,
    price_changes: {
      '24h': 0.20,
      '7d': 0.60,
      '30d': -1.06,
      '1y': -6.50
    },
    prices: {
      '24h': [0.86, 0.86, 0.86, 0.85, 0.85, 0.85, 0.86, 0.85, 0.86, 0.86, 0.86, 0.86, 0.86, 0.85, 0.85, 0.86, 0.85, 0.86, 0.86, 0.85, 0.86, 0.85, 0.86, 0.86],
      '7d': [0.86, 0.84, 0.84, 0.85, 0.87, 0.84, 0.84],
      '30d': [0.87, 0.88, 0.87, 0.86, 0.89, 0.86, 0.88, 0.83, 0.87, 0.85, 0.86, 0.90, 0.89, 0.87, 0.84, 0.89, 0.88, 0.83, 0.88, 0.88, 0.85, 0.83, 0.86, 0.85, 0.88, 0.84, 0.89, 0.85, 0.83, 0.88],
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
    current_price: 593.7,
    price_changes: {
      '24h': 0.42,
      '7d': 5.56,
      '30d': 6.00,
      '1y': 20.70
    },
    prices: {
      '24h': [589.55, 587.07, 587.85, 591.20, 596.22, 592.04, 595.17, 592.94, 590.82, 587.50, 589.80, 588.44, 588.88, 591.22, 588.54, 587.39, 587.26, 598.27, 592.99, 593.78, 596.90, 589.05, 592.92, 593.62],
      '7d': [572.42, 579.18, 579.77, 586.71, 577.75, 583.33, 604.14],
      '30d': [549.16, 581.29, 545.02, 549.39, 573.60, 581.23, 564.97, 545.85, 573.71, 587.17, 562.36, 573.00, 591.24, 566.80, 590.94, 594.73, 600.62, 558.48, 588.14, 600.53, 599.25, 604.79, 587.40, 579.23, 608.77, 576.27, 588.14, 600.90, 599.75, 588.63],
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
    current_price: 140.97,
    price_changes: {
      '24h': 1.62,
      '7d': 8.99,
      '30d': 12.05,
      '1y': 5.73
    },
    prices: {
      '24h': [139.35, 140.15, 137.60, 138.14, 139.49, 140.45, 137.95, 139.15, 140.23, 139.27, 140.11, 139.49, 140.09, 139.37, 140.92, 139.42, 140.45, 139.87, 140.18, 140.39, 141.48, 140.87, 140.21, 141.27],
      '7d': [131.62, 133.84, 130.55, 135.98, 135.66, 142.08, 138.68],
      '30d': [125.77, 123.55, 127.87, 127.58, 132.28, 131.69, 132.82, 129.52, 127.34, 129.98, 132.59, 128.99, 127.49, 132.97, 132.21, 131.61, 136.21, 131.30, 138.82, 139.21, 139.17, 141.71, 135.51, 134.23, 139.99, 141.88, 134.42, 140.70, 138.72, 143.29],
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
    current_price: 0.856756,
    price_changes: {
      '24h': 0.22,
      '7d': 0.57,
      '30d': -1.03,
      '1y': -6.46
    },
    prices: {
      '24h': [0.85, 0.85, 0.86, 0.85, 0.86, 0.85, 0.86, 0.85, 0.86, 0.86, 0.86, 0.86, 0.85, 0.85, 0.85, 0.85, 0.85, 0.86, 0.86, 0.85, 0.86, 0.86, 0.86, 0.85],
      '7d': [0.84, 0.84, 0.87, 0.86, 0.87, 0.85, 0.84],
      '30d': [0.84, 0.83, 0.85, 0.87, 0.89, 0.84, 0.89, 0.86, 0.88, 0.89, 0.88, 0.84, 0.89, 0.86, 0.87, 0.85, 0.84, 0.84, 0.85, 0.83, 0.86, 0.86, 0.86, 0.87, 0.83, 0.84, 0.86, 0.89, 0.84, 0.85],
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
    current_price: 0.17159,
    price_changes: {
      '24h': 0.22,
      '7d': 19.50,
      '30d': 11.52,
      '1y': 67.12
    },
    prices: {
      '24h': [0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17],
      '7d': [0.14, 0.15, 0.15, 0.16, 0.17, 0.17, 0.17],
      '30d': [0.15, 0.16, 0.15, 0.15, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.17, 0.16, 0.17, 0.16, 0.17, 0.16, 0.17, 0.17, 0.16, 0.16, 0.17, 0.17, 0.17, 0.17, 0.18, 0.18],
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
    current_price: 0.257806,
    price_changes: {
      '24h': -0.76,
      '7d': 5.67,
      '30d': 10.43,
      '1y': 103.85
    },
    prices: {
      '24h': [0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26],
      '7d': [0.25, 0.25, 0.24, 0.25, 0.26, 0.25, 0.26],
      '30d': [0.23, 0.23, 0.23, 0.23, 0.24, 0.24, 0.24, 0.24, 0.25, 0.24, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.24, 0.26, 0.25, 0.26, 0.25, 0.25, 0.25, 0.25, 0.26, 0.25, 0.26, 0.25],
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
    current_price: 2572.49,
    price_changes: {
      '24h': 0.63,
      '7d': 19.17,
      '30d': 17.50,
      '1y': -12.26
    },
    prices: {
      '24h': [2564.67, 2534.29, 2541.44, 2581.90, 2571.89, 2560.98, 2553.60, 2548.74, 2573.41, 2565.04, 2586.49, 2571.54, 2549.87, 2590.48, 2574.59, 2557.20, 2560.98, 2556.73, 2571.85, 2571.48, 2572.60, 2562.76, 2567.62, 2564.18],
      '7d': [2201.68, 2199.37, 2277.79, 2323.32, 2428.20, 2500.02, 2612.21],
      '30d': [2168.65, 2153.84, 2209.55, 2259.65, 2208.12, 2211.37, 2257.82, 2335.28, 2376.95, 2281.11, 2386.55, 2338.20, 2302.28, 2376.81, 2451.21, 2335.27, 2459.91, 2475.12, 2501.31, 2509.68, 2408.94, 2451.52, 2527.70, 2430.62, 2500.35, 2451.40, 2461.65, 2472.31, 2532.38, 2579.10],
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
    current_price: 0.627247,
    price_changes: {
      '24h': -1.07,
      '7d': 26.50,
      '30d': 14.67,
      '1y': 59.19
    },
    prices: {
      '24h': [0.64, 0.63, 0.63, 0.64, 0.63, 0.64, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.62, 0.63, 0.63, 0.63, 0.62, 0.63, 0.63, 0.63, 0.62, 0.62, 0.63, 0.63],
      '7d': [0.50, 0.51, 0.54, 0.55, 0.59, 0.59, 0.64],
      '30d': [0.57, 0.57, 0.54, 0.54, 0.58, 0.55, 0.54, 0.55, 0.58, 0.59, 0.59, 0.57, 0.58, 0.60, 0.59, 0.61, 0.59, 0.58, 0.60, 0.61, 0.59, 0.62, 0.62, 0.63, 0.60, 0.60, 0.60, 0.62, 0.64, 0.65],
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
    current_price: 40.91,
    price_changes: {
      '24h': -1.39,
      '7d': 21.17,
      '30d': 15.63,
      '1y': 0.00
    },
    prices: {
      '24h': [41.51, 41.47, 41.03, 41.27, 40.99, 41.16, 41.23, 41.11, 41.59, 41.40, 41.50, 41.04, 41.50, 40.85, 41.23, 41.17, 41.02, 41.27, 40.87, 40.97, 41.29, 41.32, 40.55, 41.26],
      '7d': [33.04, 35.29, 35.62, 36.72, 38.94, 40.40, 40.08],
      '30d': [34.04, 34.42, 34.75, 37.04, 37.08, 35.65, 37.21, 37.41, 37.96, 37.75, 37.85, 37.52, 36.32, 36.56, 38.10, 37.20, 39.49, 37.67, 39.66, 38.65, 37.91, 40.58, 40.18, 39.03, 39.69, 39.73, 41.70, 40.76, 41.04, 41.24],
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
    current_price: 102602,
    price_changes: {
      '24h': 1.30,
      '7d': 11.42,
      '30d': 12.84,
      '1y': 86.89
    },
    prices: {
      '24h': [102248.71, 101330.78, 100960.69, 100469.48, 101333.61, 102465.31, 102363.60, 102672.11, 101650.55, 101102.88, 102555.66, 102529.97, 102901.22, 102298.65, 102171.74, 101289.87, 101551.68, 101933.46, 103120.46, 102134.00, 102180.71, 103083.74, 102293.91, 103152.08],
      '7d': [93955.56, 95802.99, 93801.28, 95460.46, 98871.47, 99293.96, 101648.21],
      '30d': [90294.02, 89088.57, 94679.27, 95522.77, 89998.45, 90903.43, 94724.08, 90258.10, 91706.53, 96296.23, 93970.37, 92412.85, 96949.17, 95338.71, 94359.29, 100286.29, 96849.65, 94489.41, 100346.83, 99253.60, 95369.65, 101196.61, 101970.56, 101795.21, 98464.54, 102790.68, 98320.64, 99383.14, 102422.55, 100832.73],
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
    current_price: 0.389873,
    price_changes: {
      '24h': -2.00,
      '7d': 81.98,
      '30d': 74.21,
      '1y': 303.44
    },
    prices: {
      '24h': [0.40, 0.39, 0.40, 0.40, 0.39, 0.40, 0.39, 0.40, 0.39, 0.39, 0.39, 0.40, 0.39, 0.39, 0.40, 0.40, 0.40, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39],
      '7d': [0.22, 0.25, 0.27, 0.30, 0.33, 0.36, 0.39],
      '30d': [0.23, 0.24, 0.24, 0.24, 0.25, 0.25, 0.26, 0.27, 0.27, 0.28, 0.29, 0.29, 0.29, 0.30, 0.31, 0.32, 0.31, 0.32, 0.33, 0.33, 0.35, 0.34, 0.35, 0.35, 0.36, 0.37, 0.38, 0.38, 0.39, 0.40],
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
    current_price: 3.3,
    price_changes: {
      '24h': 11.21,
      '7d': 34.75,
      '30d': 27.92,
      '1y': 350.31
    },
    prices: {
      '24h': [2.95, 2.99, 2.99, 3.04, 3.00, 3.07, 3.06, 3.09, 3.06, 3.10, 3.11, 3.14, 3.12, 3.17, 3.15, 3.20, 3.18, 3.23, 3.21, 3.22, 3.28, 3.25, 3.28, 3.29],
      '7d': [2.39, 2.61, 2.67, 2.93, 3.01, 3.14, 3.25],
      '30d': [2.62, 2.64, 2.72, 2.59, 2.75, 2.75, 2.66, 2.73, 2.88, 2.71, 2.84, 2.95, 2.94, 2.81, 3.02, 3.00, 2.97, 3.06, 3.10, 3.07, 3.15, 3.01, 3.19, 3.09, 3.21, 3.15, 3.24, 3.17, 3.19, 3.39],
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