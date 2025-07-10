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
    current_price: 96954,
    price_changes: {
      '24h': 3.93,
      '7d': 4.16,
      '30d': 1.85,
      '1y': 81.93
    },
    prices: {
      '24h': [92954.68, 93721.47, 94230.59, 93018.34, 93002.82, 94286.55, 93451.17, 95269.25, 93697.17, 94778.11, 94457.19, 95306.26, 94685.85, 95573.95, 94914.77, 95311.98, 95401.83, 96239.21, 96799.61, 96259.91, 95980.06, 96222.01, 97108.01, 97460.79],
      '7d': [93347.38, 91745.70, 95347.12, 95787.29, 93701.60, 94310.90, 97524.16],
      '30d': [97303.43, 96222.18, 92276.13, 93902.90, 94325.24, 95661.41, 91877.42, 96228.71, 99039.88, 98170.83, 92231.54, 96498.74, 98490.68, 96636.25, 94809.38, 95237.44, 99295.68, 99342.11, 93107.79, 92980.95, 97732.55, 97318.45, 94550.27, 94938.40, 93629.06, 95587.68, 97515.36, 96103.66, 94463.99, 93715.01],
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
    current_price: 2406.38,
    price_changes: {
      '24h': 5.80,
      '7d': 9.83,
      '30d': 0.50,
      '1y': -16.53
    },
    prices: {
      '24h': [2266.81, 2291.97, 2296.60, 2296.74, 2289.07, 2311.08, 2328.43, 2329.03, 2301.95, 2311.72, 2313.00, 2360.20, 2348.36, 2363.15, 2343.06, 2355.10, 2366.73, 2388.33, 2387.57, 2398.44, 2381.47, 2377.44, 2421.79, 2389.09],
      '7d': [2244.85, 2261.54, 2217.98, 2297.80, 2350.56, 2420.20, 2425.31],
      '30d': [2366.25, 2432.03, 2419.87, 2350.30, 2484.47, 2313.52, 2388.67, 2371.86, 2324.81, 2393.77, 2453.68, 2424.13, 2430.01, 2407.85, 2376.03, 2481.80, 2315.37, 2355.71, 2325.69, 2407.46, 2333.65, 2380.69, 2313.20, 2384.93, 2476.06, 2338.90, 2398.30, 2351.20, 2450.77, 2312.31],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    market_cap_rank: 2,
    last_updated: new Date().toISOString()
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    current_price: 0.855804,
    price_changes: {
      '24h': 0.20,
      '7d': 0.54,
      '30d': -2.25,
      '1y': -7.32
    },
    prices: {
      '24h': [0.85, 0.85, 0.86, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.86, 0.85, 0.86, 0.85, 0.85, 0.86, 0.85, 0.85, 0.86, 0.85, 0.85, 0.85, 0.86, 0.86, 0.85],
      '7d': [0.87, 0.86, 0.86, 0.84, 0.87, 0.84, 0.86],
      '30d': [0.84, 0.87, 0.86, 0.88, 0.85, 0.85, 0.89, 0.89, 0.88, 0.85, 0.87, 0.90, 0.85, 0.87, 0.90, 0.87, 0.85, 0.83, 0.89, 0.89, 0.87, 0.87, 0.86, 0.88, 0.87, 0.83, 0.84, 0.88, 0.88, 0.87],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    market_cap_rank: 3,
    last_updated: new Date().toISOString()
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    current_price: 2.13,
    price_changes: {
      '24h': 4.81,
      '7d': 10.86,
      '30d': 6.99,
      '1y': 433.10
    },
    prices: {
      '24h': [2.05, 2.03, 2.04, 2.04, 2.05, 2.04, 2.07, 2.04, 2.06, 2.08, 2.09, 2.08, 2.10, 2.09, 2.10, 2.11, 2.08, 2.10, 2.09, 2.11, 2.12, 2.11, 2.13, 2.13],
      '7d': [1.95, 1.97, 1.98, 2.03, 2.06, 2.06, 2.09],
      '30d': [1.96, 2.04, 1.99, 1.97, 1.98, 2.01, 2.07, 2.07, 2.00, 2.03, 2.09, 2.06, 2.10, 2.01, 2.05, 2.02, 2.02, 2.04, 2.06, 2.04, 2.13, 2.09, 2.15, 2.18, 2.05, 2.12, 2.08, 2.09, 2.08, 2.15],
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
    current_price: 575.91,
    price_changes: {
      '24h': 1.78,
      '7d': 2.73,
      '30d': -0.92,
      '1y': 18.92
    },
    prices: {
      '24h': [564.27, 563.44, 563.54, 567.01, 571.46, 573.50, 564.25, 567.34, 565.54, 574.76, 569.76, 569.96, 572.42, 575.86, 577.60, 571.27, 572.80, 578.85, 576.43, 574.82, 572.56, 579.18, 576.03, 578.99],
      '7d': [565.99, 559.61, 570.01, 578.30, 575.33, 582.25, 571.54],
      '30d': [571.29, 592.55, 592.59, 592.31, 570.69, 603.44, 563.83, 562.48, 560.80, 589.87, 577.22, 576.85, 560.46, 594.24, 592.40, 592.50, 595.12, 581.96, 582.54, 594.87, 600.58, 594.67, 562.35, 568.34, 590.35, 556.84, 567.04, 556.77, 596.51, 575.03],
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
    current_price: 136.07,
    price_changes: {
      '24h': 3.26,
      '7d': 6.02,
      '30d': -1.12,
      '1y': 4.32
    },
    prices: {
      '24h': [131.38, 133.05, 133.23, 131.94, 132.51, 132.03, 132.78, 133.64, 132.55, 133.98, 132.94, 134.45, 135.17, 133.91, 135.00, 133.95, 133.84, 135.80, 136.08, 136.32, 134.51, 136.15, 135.55, 134.75],
      '7d': [130.29, 130.57, 132.41, 134.93, 134.38, 135.88, 133.58],
      '30d': [143.12, 135.62, 142.76, 137.90, 141.47, 137.66, 133.28, 137.04, 138.26, 139.09, 140.16, 132.74, 141.89, 137.96, 141.82, 131.93, 136.26, 138.54, 141.58, 141.67, 131.71, 133.77, 132.60, 140.42, 132.51, 131.05, 140.96, 130.99, 135.86, 137.65],
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
    current_price: 0.855377,
    price_changes: {
      '24h': 0.17,
      '7d': 0.49,
      '30d': -2.27,
      '1y': -7.35
    },
    prices: {
      '24h': [0.86, 0.86, 0.85, 0.85, 0.86, 0.85, 0.86, 0.86, 0.86, 0.86, 0.85, 0.85, 0.86, 0.85, 0.86, 0.86, 0.86, 0.86, 0.85, 0.85, 0.85, 0.85, 0.85, 0.86],
      '7d': [0.86, 0.83, 0.87, 0.84, 0.87, 0.86, 0.85],
      '30d': [0.89, 0.91, 0.84, 0.90, 0.88, 0.86, 0.86, 0.87, 0.87, 0.87, 0.90, 0.87, 0.86, 0.87, 0.85, 0.86, 0.89, 0.85, 0.86, 0.85, 0.84, 0.84, 0.84, 0.83, 0.83, 0.83, 0.86, 0.85, 0.83, 0.88],
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
    current_price: 0.157668,
    price_changes: {
      '24h': 6.57,
      '7d': 8.58,
      '30d': -5.57,
      '1y': 55.91
    },
    prices: {
      '24h': [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.16, 0.16, 0.16, 0.15, 0.16, 0.16, 0.16, 0.16],
      '7d': [0.15, 0.15, 0.15, 0.15, 0.16, 0.15, 0.16],
      '30d': [0.17, 0.16, 0.17, 0.16, 0.16, 0.17, 0.17, 0.17, 0.17, 0.17, 0.16, 0.17, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.17, 0.16, 0.16, 0.17, 0.16, 0.16, 0.15, 0.16, 0.16, 0.16],
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
    current_price: 0.249039,
    price_changes: {
      '24h': 1.30,
      '7d': 2.45,
      '30d': -2.92,
      '1y': 105.03
    },
    prices: {
      '24h': [0.24, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
      '7d': [0.24, 0.25, 0.25, 0.25, 0.24, 0.25, 0.25],
      '30d': [0.25, 0.25, 0.26, 0.25, 0.26, 0.25, 0.26, 0.25, 0.25, 0.26, 0.25, 0.26, 0.26, 0.26, 0.26, 0.25, 0.26, 0.26, 0.25, 0.25, 0.25, 0.25, 0.25, 0.24, 0.25, 0.24, 0.25, 0.25, 0.25, 0.24],
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
    current_price: 2404.8,
    price_changes: {
      '24h': 5.86,
      '7d': 9.84,
      '30d': 0.54,
      '1y': -16.59
    },
    prices: {
      '24h': [2253.86, 2272.68, 2274.44, 2310.61, 2278.46, 2282.12, 2321.41, 2333.03, 2300.77, 2340.25, 2336.42, 2345.72, 2348.16, 2333.72, 2330.71, 2375.75, 2379.65, 2392.29, 2357.48, 2403.05, 2371.25, 2383.02, 2381.40, 2404.05],
      '7d': [2160.69, 2188.88, 2270.28, 2305.54, 2336.80, 2319.99, 2382.91],
      '30d': [2481.14, 2296.99, 2316.03, 2352.77, 2473.34, 2348.57, 2460.90, 2330.94, 2441.39, 2446.58, 2478.05, 2441.35, 2302.74, 2330.12, 2466.39, 2305.75, 2488.13, 2377.40, 2419.81, 2471.10, 2323.18, 2420.11, 2369.39, 2471.13, 2495.19, 2422.74, 2417.22, 2486.38, 2456.62, 2335.95],
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
    current_price: 0.552539,
    price_changes: {
      '24h': 6.33,
      '7d': 9.64,
      '30d': -9.47,
      '1y': 55.14
    },
    prices: {
      '24h': [0.52, 0.52, 0.52, 0.52, 0.53, 0.52, 0.53, 0.52, 0.53, 0.53, 0.53, 0.53, 0.54, 0.54, 0.54, 0.54, 0.55, 0.54, 0.54, 0.55, 0.55, 0.54, 0.55, 0.55],
      '7d': [0.49, 0.52, 0.52, 0.52, 0.53, 0.53, 0.56],
      '30d': [0.63, 0.61, 0.61, 0.62, 0.59, 0.60, 0.59, 0.61, 0.61, 0.61, 0.57, 0.57, 0.57, 0.57, 0.57, 0.57, 0.56, 0.56, 0.55, 0.59, 0.57, 0.57, 0.57, 0.57, 0.54, 0.56, 0.56, 0.56, 0.57, 0.57],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090',
    market_cap_rank: 11,
    last_updated: new Date().toISOString()
  },
  {
    id: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    current_price: 96845,
    price_changes: {
      '24h': 3.86,
      '7d': 4.21,
      '30d': 1.82,
      '1y': 82.06
    },
    prices: {
      '24h': [92594.87, 93591.36, 93956.50, 93796.17, 93914.59, 93112.69, 94216.94, 95266.43, 94517.23, 95470.56, 95472.10, 94266.23, 95902.91, 96190.91, 95822.05, 95317.95, 96429.50, 95554.89, 95201.87, 96923.80, 96617.51, 97378.23, 96920.81, 96178.71],
      '7d': [94013.28, 93858.30, 93020.02, 92801.20, 93441.39, 94824.57, 97756.87],
      '30d': [94997.86, 96079.52, 97896.10, 94722.24, 96590.49, 98302.26, 94244.38, 94737.30, 92677.37, 95567.68, 98619.88, 96754.72, 96281.16, 97145.23, 99206.40, 98609.80, 95116.47, 96361.00, 98480.52, 96685.37, 96241.11, 93545.50, 95408.49, 100040.95, 97494.43, 94642.11, 96145.01, 98817.16, 94823.63, 95591.89],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857',
    market_cap_rank: 12,
    last_updated: new Date().toISOString()
  },
  {
    id: 'hyperliquid',
    name: 'Hyperliquid',
    symbol: 'HYPE',
    current_price: 36.65,
    price_changes: {
      '24h': 8.10,
      '7d': 6.13,
      '30d': 4.89,
      '1y': 0.00
    },
    prices: {
      '24h': [33.63, 34.26, 33.90, 34.04, 34.28, 34.42, 34.92, 34.64, 34.89, 34.80, 35.26, 35.09, 35.01, 35.22, 35.54, 35.60, 35.63, 36.26, 36.33, 36.06, 36.11, 36.43, 36.53, 36.40],
      '7d': [33.69, 34.19, 34.91, 35.85, 36.75, 35.80, 36.13],
      '30d': [35.19, 34.40, 35.98, 35.38, 34.95, 35.70, 35.96, 36.42, 34.93, 34.87, 34.56, 34.72, 36.74, 35.16, 35.65, 37.14, 37.25, 36.32, 35.60, 35.37, 35.68, 34.79, 35.53, 35.06, 37.67, 35.33, 37.32, 36.45, 36.23, 37.28],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/50882/large/hyperliquid.jpg?1729431300',
    market_cap_rank: 13,
    last_updated: new Date().toISOString()
  },
  {
    id: 'wrapped-steth',
    name: 'Wrapped stETH',
    symbol: 'WSTETH',
    current_price: 2913.5,
    price_changes: {
      '24h': 6.05,
      '7d': 10.13,
      '30d': 0.99,
      '1y': -13.64
    },
    prices: {
      '24h': [2729.70, 2743.77, 2785.80, 2772.30, 2776.15, 2774.05, 2809.71, 2802.30, 2777.69, 2808.39, 2845.70, 2843.86, 2812.06, 2839.61, 2866.79, 2846.89, 2866.19, 2859.12, 2858.68, 2887.52, 2881.75, 2882.43, 2901.51, 2888.58],
      '7d': [2602.06, 2693.54, 2782.98, 2822.36, 2882.60, 2885.16, 2966.13],
      '30d': [2928.51, 2821.29, 2793.64, 2951.33, 2776.58, 2778.59, 2891.21, 2857.93, 2823.06, 2958.48, 2833.46, 2848.13, 2953.28, 2794.47, 3001.88, 2815.47, 2875.49, 2939.96, 2843.01, 2909.91, 2968.41, 2865.50, 2923.45, 2801.96, 2874.12, 2915.10, 2899.25, 3007.28, 2988.01, 2828.42],
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
    current_price: 2.88,
    price_changes: {
      '24h': 14.35,
      '7d': 12.96,
      '30d': -3.24,
      '1y': 326.61
    },
    prices: {
      '24h': [2.54, 2.54, 2.53, 2.55, 2.60, 2.60, 2.60, 2.62, 2.64, 2.64, 2.67, 2.70, 2.70, 2.75, 2.72, 2.76, 2.76, 2.80, 2.79, 2.82, 2.81, 2.84, 2.85, 2.90],
      '7d': [2.49, 2.56, 2.72, 2.76, 2.71, 2.82, 2.92],
      '30d': [2.86, 2.87, 2.88, 2.87, 3.00, 2.98, 2.89, 3.02, 2.91, 2.89, 3.04, 2.85, 2.91, 3.03, 3.00, 2.82, 2.83, 2.98, 3.00, 2.95, 3.00, 2.97, 2.82, 2.90, 2.93, 2.98, 2.95, 3.00, 2.84, 2.88],
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