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
    current_price: 100428,
    price_changes: {
      '24h': 5.44,
      '7d': 9.65,
      '30d': 4.93,
      '1y': 89.12
    },
    prices: {
      '24h': [95376.48, 95172.19, 96347.58, 95121.08, 95207.58, 95482.94, 96406.76, 97742.60, 97438.58, 97388.63, 97174.93, 98242.46, 98872.26, 97928.87, 97990.03, 98698.09, 99604.96, 99126.87, 98655.68, 100014.23, 100323.70, 99227.09, 100399.18, 101124.50],
      '7d': [92295.39, 94858.91, 92698.58, 93902.48, 95605.63, 97491.51, 101052.48],
      '30d': [92897.87, 94992.89, 95972.02, 95214.74, 96324.38, 98068.46, 96888.12, 97323.07, 93510.84, 100428.38, 99202.37, 96858.69, 94652.90, 100517.54, 97389.70, 99253.83, 99848.21, 101012.70, 99331.23, 97133.66, 102525.60, 96196.09, 96916.86, 101568.29, 103325.99, 102821.01, 97877.90, 100803.33, 102717.53, 98841.63],
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
    current_price: 2552.9,
    price_changes: {
      '24h': 7.63,
      '7d': 19.44,
      '30d': 3.27,
      '1y': -11.78
    },
    prices: {
      '24h': [2386.12, 2378.78, 2367.92, 2408.39, 2381.79, 2432.95, 2429.61, 2441.19, 2449.80, 2455.09, 2455.25, 2475.26, 2467.96, 2490.35, 2470.80, 2476.91, 2492.41, 2504.98, 2527.23, 2520.47, 2539.65, 2526.71, 2554.90, 2529.33],
      '7d': [2130.97, 2245.65, 2314.22, 2366.20, 2375.46, 2534.79, 2502.10],
      '30d': [2383.74, 2536.00, 2490.40, 2527.79, 2509.38, 2544.94, 2428.46, 2567.38, 2512.64, 2590.42, 2540.35, 2459.18, 2548.47, 2503.93, 2589.56, 2531.02, 2555.98, 2495.97, 2423.36, 2492.85, 2566.17, 2611.57, 2525.23, 2578.95, 2451.54, 2490.25, 2593.21, 2599.82, 2467.40, 2551.18],
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
    current_price: 2.48,
    price_changes: {
      '24h': 18.23,
      '7d': 31.41,
      '30d': 22.32,
      '1y': 502.15
    },
    prices: {
      '24h': [2.09, 2.12, 2.14, 2.15, 2.15, 2.17, 2.22, 2.22, 2.21, 2.27, 2.25, 2.27, 2.28, 2.33, 2.32, 2.35, 2.36, 2.37, 2.42, 2.40, 2.44, 2.46, 2.46, 2.47],
      '7d': [1.92, 1.94, 2.09, 2.18, 2.25, 2.38, 2.43],
      '30d': [2.10, 2.03, 2.12, 2.07, 2.09, 2.09, 2.12, 2.19, 2.15, 2.17, 2.20, 2.24, 2.19, 2.30, 2.29, 2.20, 2.31, 2.26, 2.24, 2.26, 2.39, 2.36, 2.43, 2.35, 2.41, 2.48, 2.39, 2.41, 2.41, 2.41],
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
    current_price: 0.854603,
    price_changes: {
      '24h': -0.25,
      '7d': 0.63,
      '30d': -1.88,
      '1y': -7.00
    },
    prices: {
      '24h': [0.86, 0.85, 0.86, 0.86, 0.85, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.85, 0.85, 0.85, 0.86, 0.86, 0.86, 0.85, 0.85, 0.86, 0.85, 0.86, 0.85, 0.85],
      '7d': [0.85, 0.84, 0.86, 0.85, 0.87, 0.84, 0.86],
      '30d': [0.88, 0.86, 0.85, 0.84, 0.84, 0.88, 0.84, 0.88, 0.85, 0.90, 0.87, 0.87, 0.88, 0.86, 0.86, 0.88, 0.89, 0.83, 0.88, 0.87, 0.88, 0.84, 0.83, 0.85, 0.86, 0.84, 0.85, 0.86, 0.83, 0.84],
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
    current_price: 591.06,
    price_changes: {
      '24h': 3.36,
      '7d': 6.17,
      '30d': 1.16,
      '1y': 20.82
    },
    prices: {
      '24h': [576.73, 568.50, 568.56, 578.79, 577.89, 570.39, 578.20, 580.12, 575.43, 577.67, 577.04, 583.01, 585.80, 578.75, 583.34, 589.05, 587.27, 590.40, 584.55, 589.41, 586.47, 592.59, 585.84, 592.43],
      '7d': [549.74, 568.33, 568.63, 582.39, 581.41, 592.79, 599.40],
      '30d': [600.37, 574.37, 569.46, 568.95, 583.76, 603.13, 604.89, 602.29, 571.67, 602.81, 586.24, 593.49, 593.40, 592.61, 571.52, 587.68, 569.04, 596.57, 580.27, 606.83, 569.79, 602.40, 575.58, 591.56, 578.55, 572.94, 575.56, 579.91, 607.46, 591.73],
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
    current_price: 140.89,
    price_changes: {
      '24h': 5.10,
      '7d': 12.02,
      '30d': -3.15,
      '1y': 8.81
    },
    prices: {
      '24h': [132.90, 133.70, 134.64, 133.84, 136.07, 136.45, 135.86, 136.43, 136.97, 137.17, 136.07, 136.05, 138.27, 137.80, 137.48, 138.51, 137.96, 140.26, 139.32, 139.25, 139.82, 139.58, 141.08, 141.90],
      '7d': [123.36, 128.19, 132.78, 136.46, 135.50, 138.30, 143.91],
      '30d': [146.98, 149.60, 145.22, 143.81, 149.32, 140.56, 146.04, 149.90, 146.54, 140.95, 146.09, 145.49, 140.83, 142.25, 143.40, 137.95, 141.47, 141.95, 145.94, 140.17, 142.88, 137.91, 142.29, 144.05, 141.86, 139.15, 138.21, 136.03, 140.24, 138.07],
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
    current_price: 0.854439,
    price_changes: {
      '24h': -0.17,
      '7d': 0.65,
      '30d': -1.88,
      '1y': -7.04
    },
    prices: {
      '24h': [0.86, 0.86, 0.85, 0.86, 0.85, 0.85, 0.86, 0.86, 0.86, 0.86, 0.85, 0.86, 0.86, 0.86, 0.86, 0.85, 0.86, 0.85, 0.86, 0.86, 0.85, 0.86, 0.86, 0.86],
      '7d': [0.83, 0.85, 0.84, 0.84, 0.84, 0.87, 0.84],
      '30d': [0.84, 0.88, 0.90, 0.89, 0.90, 0.85, 0.89, 0.88, 0.89, 0.86, 0.86, 0.86, 0.83, 0.85, 0.88, 0.83, 0.86, 0.87, 0.86, 0.89, 0.86, 0.86, 0.83, 0.86, 0.85, 0.84, 0.89, 0.89, 0.85, 0.86],
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
    current_price: 0.177364,
    price_changes: {
      '24h': 15.00,
      '7d': 27.09,
      '30d': 0.84,
      '1y': 76.67
    },
    prices: {
      '24h': [0.15, 0.16, 0.15, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.18, 0.18, 0.18],
      '7d': [0.14, 0.15, 0.15, 0.16, 0.17, 0.17, 0.17],
      '30d': [0.18, 0.17, 0.18, 0.18, 0.17, 0.17, 0.18, 0.18, 0.18, 0.18, 0.18, 0.17, 0.17, 0.18, 0.18, 0.18, 0.18, 0.17, 0.17, 0.17, 0.17, 0.18, 0.18, 0.17, 0.18, 0.18, 0.17, 0.17, 0.18, 0.17],
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
    current_price: 0.256003,
    price_changes: {
      '24h': 2.70,
      '7d': 6.19,
      '30d': 1.05,
      '1y': 106.75
    },
    prices: {
      '24h': [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.26, 0.25, 0.25, 0.25, 0.26, 0.25, 0.25, 0.26, 0.26, 0.25],
      '7d': [0.25, 0.25, 0.25, 0.25, 0.25, 0.26, 0.26],
      '30d': [0.25, 0.25, 0.26, 0.25, 0.26, 0.25, 0.26, 0.25, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.25, 0.26, 0.26, 0.25, 0.25, 0.25, 0.26, 0.25, 0.25, 0.26, 0.25, 0.26, 0.26],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    market_cap_rank: 9,
    last_updated: new Date().toISOString()
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 0.651678,
    price_changes: {
      '24h': 21.20,
      '7d': 33.55,
      '30d': 3.15,
      '1y': 76.56
    },
    prices: {
      '24h': [0.54, 0.54, 0.55, 0.56, 0.55, 0.56, 0.57, 0.58, 0.57, 0.58, 0.59, 0.59, 0.59, 0.60, 0.61, 0.61, 0.62, 0.62, 0.63, 0.63, 0.64, 0.65, 0.65, 0.65],
      '7d': [0.49, 0.52, 0.53, 0.58, 0.61, 0.63, 0.65],
      '30d': [0.64, 0.64, 0.61, 0.62, 0.63, 0.65, 0.63, 0.62, 0.61, 0.61, 0.63, 0.63, 0.63, 0.66, 0.62, 0.63, 0.63, 0.66, 0.64, 0.63, 0.67, 0.63, 0.65, 0.66, 0.65, 0.62, 0.63, 0.65, 0.65, 0.63],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090',
    market_cap_rank: 10,
    last_updated: new Date().toISOString()
  },
  {
    id: 'staked-ether',
    name: 'Lido Staked Ether',
    symbol: 'STETH',
    current_price: 2550.07,
    price_changes: {
      '24h': 7.58,
      '7d': 19.36,
      '30d': 3.18,
      '1y': -12.04
    },
    prices: {
      '24h': [2366.78, 2392.27, 2387.01, 2399.32, 2409.43, 2399.94, 2402.20, 2439.59, 2452.23, 2427.82, 2455.92, 2443.46, 2487.88, 2491.44, 2501.07, 2502.20, 2513.09, 2502.68, 2505.81, 2517.46, 2503.30, 2541.25, 2564.88, 2536.06],
      '7d': [2180.27, 2168.58, 2313.75, 2357.92, 2398.56, 2487.57, 2546.81],
      '30d': [2419.77, 2516.73, 2388.60, 2385.23, 2469.22, 2402.43, 2566.83, 2411.63, 2451.99, 2436.76, 2557.03, 2446.36, 2422.10, 2477.78, 2570.83, 2426.63, 2424.41, 2563.16, 2617.51, 2582.01, 2521.38, 2552.43, 2465.05, 2579.07, 2451.03, 2534.03, 2598.73, 2458.02, 2597.96, 2487.60],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206',
    market_cap_rank: 11,
    last_updated: new Date().toISOString()
  },
  {
    id: 'hyperliquid',
    name: 'Hyperliquid',
    symbol: 'HYPE',
    current_price: 39.06,
    price_changes: {
      '24h': 9.28,
      '7d': 20.15,
      '30d': 3.48,
      '1y': 0.00
    },
    prices: {
      '24h': [35.59, 36.05, 35.71, 36.26, 35.97, 36.53, 36.59, 37.08, 36.55, 37.31, 36.83, 37.44, 37.16, 37.40, 37.97, 37.61, 38.18, 38.40, 38.63, 38.38, 38.47, 38.47, 38.88, 39.09],
      '7d': [31.75, 34.05, 35.02, 35.65, 37.04, 38.64, 38.35],
      '30d': [37.83, 38.69, 37.42, 37.38, 36.66, 37.56, 38.66, 38.94, 37.80, 38.99, 37.72, 39.32, 39.65, 37.27, 39.46, 37.79, 39.04, 38.54, 38.52, 37.35, 38.67, 37.60, 39.62, 37.79, 37.40, 40.28, 40.25, 40.47, 39.40, 37.67],
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
    current_price: 100328,
    price_changes: {
      '24h': 5.38,
      '7d': 9.61,
      '30d': 4.83,
      '1y': 88.42
    },
    prices: {
      '24h': [94679.09, 96121.47, 95075.11, 95609.57, 96704.77, 95669.60, 95796.53, 96861.94, 96769.22, 96345.41, 96552.33, 97590.64, 98618.47, 98020.14, 97818.20, 98504.28, 99246.70, 98748.95, 98743.63, 99624.20, 99273.71, 100617.23, 100780.42, 99970.02],
      '7d': [93667.90, 91176.25, 92405.07, 95443.71, 97127.80, 96597.13, 98481.03],
      '30d': [96014.23, 93409.75, 98628.26, 99212.44, 99849.80, 96583.70, 100433.04, 96284.79, 94363.49, 94751.22, 97696.57, 96461.58, 101045.29, 99641.18, 95833.21, 98036.83, 97907.10, 96691.05, 98229.81, 98645.42, 99536.30, 98140.15, 99468.76, 101115.90, 96812.72, 98499.52, 96986.11, 102564.37, 103592.19, 102296.62],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857',
    market_cap_rank: 13,
    last_updated: new Date().toISOString()
  },
  {
    id: 'wrapped-steth',
    name: 'Wrapped stETH',
    symbol: 'WSTETH',
    current_price: 3071.72,
    price_changes: {
      '24h': 6.74,
      '7d': 19.21,
      '30d': 3.09,
      '1y': -9.44
    },
    prices: {
      '24h': [2870.85, 2899.33, 2891.54, 2912.73, 2903.67, 2945.58, 2933.18, 2959.15, 2960.12, 2927.12, 2959.65, 2949.63, 2973.47, 2962.62, 2990.30, 3032.58, 3006.12, 3039.41, 3052.99, 3046.45, 3021.86, 3058.23, 3057.33, 3047.97],
      '7d': [2536.49, 2620.19, 2787.62, 2772.83, 2947.58, 2978.50, 3049.53],
      '30d': [2878.36, 2951.89, 2931.18, 3030.57, 3065.92, 2995.64, 3073.31, 3075.73, 2930.66, 3077.03, 2939.47, 3006.33, 3135.92, 2929.95, 2969.16, 3071.46, 3016.23, 3121.01, 2943.86, 3114.61, 3147.79, 3064.20, 2964.98, 3133.64, 3033.42, 3067.93, 3020.35, 3151.99, 3053.68, 3057.96],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295',
    market_cap_rank: 14,
    last_updated: new Date().toISOString()
  },
  {
    id: 'sui',
    name: 'Sui',
    symbol: 'SUI',
    current_price: 3.03,
    price_changes: {
      '24h': 9.37,
      '7d': 23.18,
      '30d': -0.49,
      '1y': 334.48
    },
    prices: {
      '24h': [2.78, 2.80, 2.77, 2.83, 2.82, 2.80, 2.83, 2.88, 2.88, 2.85, 2.90, 2.91, 2.88, 2.89, 2.92, 2.91, 2.93, 2.96, 2.95, 3.00, 3.01, 3.00, 3.00, 3.02],
      '7d': [2.46, 2.52, 2.64, 2.80, 2.79, 2.97, 3.06],
      '30d': [2.94, 3.01, 3.15, 3.16, 3.04, 2.96, 2.99, 3.09, 3.04, 2.92, 3.13, 3.06, 2.93, 2.94, 2.93, 2.96, 3.10, 3.03, 2.99, 3.14, 3.14, 2.92, 2.98, 3.09, 3.03, 3.00, 3.04, 2.96, 3.08, 3.08],
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