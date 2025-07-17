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
    current_price: 102129,
    price_changes: {
      '24h': 0.68,
      '7d': 7.81,
      '30d': 9.96,
      '1y': 69.04
    },
    prices: {
      '24h': [101552.55, 101558.07, 101822.43, 101360.70, 102374.11, 102149.02, 101426.63, 101182.06, 102647.22, 100717.43, 101222.25, 102333.05, 101815.42, 101021.21, 101594.12, 102360.83, 102493.97, 101158.88, 102577.43, 102519.60, 101128.07, 101511.38, 101400.47, 102758.10],
      '7d': [95190.75, 98085.49, 98649.09, 97096.48, 99096.74, 98755.92, 102364.21],
      '30d': [96483.35, 93227.92, 91281.55, 94727.33, 95855.67, 94665.93, 97259.25, 95740.68, 92221.35, 96743.85, 94579.79, 93527.97, 95809.14, 93987.67, 98534.21, 99796.90, 100858.25, 98522.79, 98326.27, 100647.85, 97072.34, 98908.84, 98957.56, 101614.74, 97092.07, 97461.38, 101546.31, 100132.24, 99239.51, 99716.10],
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
    current_price: 2903.61,
    price_changes: {
      '24h': 7.29,
      '7d': 22.63,
      '30d': 29.43,
      '1y': -9.42
    },
    prices: {
      '24h': [2694.89, 2714.65, 2709.64, 2706.18, 2741.74, 2761.37, 2755.88, 2779.52, 2788.11, 2802.41, 2819.02, 2801.16, 2832.19, 2793.54, 2799.57, 2842.43, 2862.10, 2848.70, 2839.67, 2868.41, 2852.76, 2889.91, 2875.01, 2882.37],
      '7d': [2342.20, 2477.99, 2509.66, 2649.71, 2756.12, 2793.10, 2905.69],
      '30d': [2289.15, 2198.26, 2328.97, 2354.42, 2325.69, 2394.83, 2316.04, 2413.37, 2495.57, 2471.47, 2551.03, 2480.83, 2542.20, 2507.90, 2535.64, 2528.64, 2558.10, 2670.59, 2718.77, 2751.43, 2720.44, 2781.07, 2778.63, 2682.43, 2850.95, 2736.48, 2816.70, 2803.15, 2848.65, 2852.89],
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
    current_price: 2.7,
    price_changes: {
      '24h': 7.68,
      '7d': 30.81,
      '30d': 39.27,
      '1y': 384.29
    },
    prices: {
      '24h': [2.51, 2.51, 2.50, 2.55, 2.56, 2.57, 2.54, 2.55, 2.57, 2.58, 2.61, 2.59, 2.62, 2.61, 2.61, 2.64, 2.65, 2.64, 2.66, 2.67, 2.66, 2.68, 2.68, 2.71],
      '7d': [2.08, 2.20, 2.31, 2.40, 2.44, 2.58, 2.72],
      '30d': [1.88, 1.98, 1.99, 2.03, 1.97, 2.00, 2.16, 2.06, 2.09, 2.24, 2.16, 2.27, 2.32, 2.26, 2.25, 2.36, 2.33, 2.32, 2.39, 2.38, 2.54, 2.49, 2.44, 2.55, 2.58, 2.65, 2.64, 2.66, 2.69, 2.65],
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
    current_price: 0.861065,
    price_changes: {
      '24h': 0.07,
      '7d': 1.02,
      '30d': -0.47,
      '1y': -6.18
    },
    prices: {
      '24h': [0.87, 0.85, 0.87, 0.86, 0.86, 0.87, 0.86, 0.86, 0.86, 0.85, 0.87, 0.87, 0.87, 0.87, 0.86, 0.87, 0.86, 0.86, 0.86, 0.86, 0.87, 0.86, 0.85, 0.87],
      '7d': [0.83, 0.87, 0.84, 0.87, 0.85, 0.86, 0.86],
      '30d': [0.84, 0.87, 0.86, 0.83, 0.84, 0.88, 0.83, 0.90, 0.85, 0.89, 0.83, 0.84, 0.88, 0.88, 0.85, 0.86, 0.85, 0.85, 0.87, 0.89, 0.88, 0.87, 0.88, 0.84, 0.87, 0.89, 0.87, 0.86, 0.84, 0.85],
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
    current_price: 613.45,
    price_changes: {
      '24h': 3.46,
      '7d': 7.04,
      '30d': 8.11,
      '1y': 15.07
    },
    prices: {
      '24h': [593.89, 593.85, 597.96, 600.21, 599.07, 600.31, 598.77, 594.99, 594.44, 597.17, 600.27, 597.71, 603.72, 608.40, 610.57, 609.61, 609.71, 610.18, 612.67, 605.11, 610.34, 608.88, 613.06, 616.00],
      '7d': [572.00, 574.21, 597.66, 606.04, 592.50, 616.60, 620.50],
      '30d': [556.43, 573.88, 584.90, 563.16, 552.97, 552.99, 593.18, 570.90, 581.02, 592.07, 600.47, 584.32, 576.20, 574.43, 606.48, 575.92, 607.50, 601.75, 609.23, 583.26, 615.34, 579.92, 620.28, 626.53, 591.43, 607.95, 628.49, 627.69, 623.21, 621.75],
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
    current_price: 147.92,
    price_changes: {
      '24h': 5.27,
      '7d': 10.11,
      '30d': 11.72,
      '1y': -0.00
    },
    prices: {
      '24h': [141.57, 140.16, 141.04, 141.10, 143.11, 141.21, 142.32, 143.23, 142.23, 144.34, 142.61, 144.26, 143.26, 144.09, 146.18, 145.46, 146.32, 144.72, 146.65, 145.63, 146.69, 147.07, 146.93, 146.60],
      '7d': [135.27, 134.35, 140.97, 140.42, 142.03, 146.54, 147.41],
      '30d': [127.98, 131.50, 138.59, 134.66, 139.28, 134.41, 137.01, 135.15, 133.86, 137.78, 136.82, 134.09, 136.49, 137.76, 143.68, 143.05, 138.29, 137.29, 144.50, 142.76, 142.20, 146.72, 145.51, 143.00, 149.43, 144.04, 149.91, 144.42, 146.55, 150.77],
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
    current_price: 0.860725,
    price_changes: {
      '24h': 0.03,
      '7d': 1.02,
      '30d': -0.47,
      '1y': -6.18
    },
    prices: {
      '24h': [0.85, 0.85, 0.85, 0.86, 0.87, 0.85, 0.85, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.87, 0.85, 0.86, 0.85, 0.86, 0.87, 0.86, 0.86, 0.85, 0.85, 0.86],
      '7d': [0.84, 0.86, 0.86, 0.86, 0.86, 0.88, 0.86],
      '30d': [0.85, 0.86, 0.88, 0.87, 0.84, 0.86, 0.87, 0.88, 0.86, 0.89, 0.86, 0.88, 0.85, 0.86, 0.89, 0.87, 0.85, 0.86, 0.84, 0.89, 0.84, 0.89, 0.89, 0.87, 0.89, 0.83, 0.86, 0.85, 0.89, 0.84],
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
    current_price: 0.182595,
    price_changes: {
      '24h': 7.01,
      '7d': 18.38,
      '30d': 21.10,
      '1y': 57.80
    },
    prices: {
      '24h': [0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18],
      '7d': [0.15, 0.16, 0.16, 0.17, 0.17, 0.17, 0.18],
      '30d': [0.15, 0.16, 0.15, 0.15, 0.15, 0.15, 0.16, 0.15, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.18, 0.17, 0.17, 0.18, 0.18, 0.17, 0.18, 0.18, 0.18],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
    market_cap_rank: 8,
    last_updated: new Date().toISOString()
  },
  {
    id: 'staked-ether',
    name: 'Lido Staked Ether',
    symbol: 'STETH',
    current_price: 2899.37,
    price_changes: {
      '24h': 7.27,
      '7d': 22.49,
      '30d': 29.29,
      '1y': -9.54
    },
    prices: {
      '24h': [2686.55, 2705.32, 2744.01, 2752.90, 2738.01, 2725.87, 2763.88, 2772.84, 2764.35, 2760.95, 2784.96, 2779.35, 2783.25, 2805.36, 2817.83, 2849.39, 2863.76, 2849.80, 2830.89, 2891.19, 2893.47, 2904.16, 2911.39, 2895.74],
      '7d': [2408.49, 2483.67, 2602.28, 2661.18, 2732.97, 2752.79, 2852.28],
      '30d': [2167.00, 2331.35, 2245.32, 2357.20, 2378.67, 2391.57, 2321.92, 2342.04, 2508.42, 2493.71, 2532.08, 2469.26, 2519.92, 2501.12, 2616.62, 2607.24, 2605.51, 2587.15, 2675.88, 2731.53, 2638.16, 2638.48, 2756.09, 2686.84, 2810.81, 2851.71, 2854.57, 2768.03, 2871.77, 2842.86],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206',
    market_cap_rank: 9,
    last_updated: new Date().toISOString()
  },
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    current_price: 0.267068,
    price_changes: {
      '24h': 3.21,
      '7d': 7.50,
      '30d': 11.64,
      '1y': 116.75
    },
    prices: {
      '24h': [0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.27, 0.26, 0.26, 0.26, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.26],
      '7d': [0.24, 0.25, 0.26, 0.25, 0.26, 0.27, 0.27],
      '30d': [0.23, 0.24, 0.25, 0.24, 0.25, 0.23, 0.25, 0.24, 0.25, 0.26, 0.24, 0.25, 0.25, 0.25, 0.25, 0.25, 0.26, 0.25, 0.25, 0.26, 0.26, 0.25, 0.26, 0.26, 0.27, 0.27, 0.26, 0.26, 0.26, 0.26],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    market_cap_rank: 10,
    last_updated: new Date().toISOString()
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 0.661278,
    price_changes: {
      '24h': 3.69,
      '7d': 24.57,
      '30d': 20.50,
      '1y': 60.82
    },
    prices: {
      '24h': [0.64, 0.64, 0.64, 0.65, 0.64, 0.65, 0.64, 0.65, 0.65, 0.65, 0.65, 0.65, 0.64, 0.65, 0.66, 0.66, 0.66, 0.65, 0.66, 0.66, 0.66, 0.65, 0.65, 0.67],
      '7d': [0.54, 0.54, 0.59, 0.60, 0.62, 0.65, 0.67],
      '30d': [0.54, 0.53, 0.55, 0.54, 0.57, 0.58, 0.59, 0.56, 0.57, 0.60, 0.60, 0.57, 0.60, 0.59, 0.61, 0.59, 0.61, 0.63, 0.60, 0.63, 0.63, 0.63, 0.64, 0.66, 0.63, 0.65, 0.64, 0.63, 0.64, 0.66],
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
    current_price: 39.8,
    price_changes: {
      '24h': -2.51,
      '7d': 11.95,
      '30d': 7.05,
      '1y': 0.00
    },
    prices: {
      '24h': [40.53, 40.76, 40.77, 40.43, 40.61, 40.45, 40.36, 40.68, 40.66, 40.31, 40.15, 40.17, 39.93, 40.54, 40.44, 39.88, 39.89, 39.87, 40.12, 39.76, 40.25, 40.06, 40.25, 40.02],
      '7d': [34.90, 35.57, 36.47, 38.46, 37.76, 39.17, 40.12],
      '30d': [38.01, 36.61, 37.64, 37.26, 36.18, 36.16, 37.18, 38.37, 37.65, 37.04, 37.24, 36.77, 39.57, 39.48, 38.43, 39.76, 38.10, 39.30, 37.55, 39.60, 38.78, 37.75, 40.60, 37.98, 39.93, 40.08, 39.09, 39.93, 40.42, 39.81],
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
    current_price: 101975,
    price_changes: {
      '24h': 0.64,
      '7d': 7.73,
      '30d': 9.73,
      '1y': 68.97
    },
    prices: {
      '24h': [100443.87, 100806.09, 101329.37, 100861.33, 101822.47, 101011.00, 100902.98, 101736.29, 102132.97, 102259.20, 102571.51, 101390.42, 101246.39, 101256.92, 102579.27, 101910.73, 101949.28, 101590.55, 102728.87, 101890.01, 102772.56, 102714.86, 102508.04, 101647.20],
      '7d': [93911.68, 94543.25, 95766.89, 99306.79, 97887.00, 99525.65, 103450.64],
      '30d': [91051.37, 92557.97, 95372.41, 90176.65, 94978.19, 93945.04, 96034.12, 96566.63, 96958.43, 99378.58, 97204.53, 100060.24, 97591.26, 94846.05, 100878.59, 97266.44, 101448.22, 95838.00, 100319.22, 101689.03, 96522.05, 102655.95, 101172.16, 98315.79, 100707.70, 97774.63, 98552.53, 104000.04, 102126.36, 104758.32],
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
    current_price: 0.407091,
    price_changes: {
      '24h': 2.74,
      '7d': 65.69,
      '30d': 79.43,
      '1y': 304.19
    },
    prices: {
      '24h': [0.40, 0.39, 0.39, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.40, 0.41, 0.40, 0.41, 0.41, 0.41, 0.41, 0.41, 0.40, 0.41, 0.41],
      '7d': [0.24, 0.27, 0.30, 0.33, 0.36, 0.38, 0.41],
      '30d': [0.23, 0.23, 0.24, 0.24, 0.25, 0.26, 0.26, 0.28, 0.28, 0.28, 0.30, 0.30, 0.30, 0.31, 0.32, 0.31, 0.33, 0.34, 0.35, 0.35, 0.35, 0.36, 0.37, 0.36, 0.38, 0.38, 0.39, 0.40, 0.40, 0.41],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/100/large/fmpFRHHQ_400x400.jpg?1735231350',
    market_cap_rank: 14,
    last_updated: new Date().toISOString()
  },
  {
    id: 'wrapped-steth',
    name: 'Wrapped stETH',
    symbol: 'WSTETH',
    current_price: 3499.95,
    price_changes: {
      '24h': 7.18,
      '7d': 22.65,
      '30d': 29.46,
      '1y': -6.56
    },
    prices: {
      '24h': [3291.15, 3289.24, 3275.03, 3312.26, 3296.27, 3284.95, 3342.72, 3319.25, 3365.89, 3359.81, 3394.40, 3378.41, 3397.86, 3423.15, 3414.24, 3437.34, 3409.16, 3460.80, 3432.38, 3461.40, 3443.53, 3496.59, 3503.35, 3476.62],
      '7d': [2821.83, 3014.43, 3019.78, 3186.41, 3263.27, 3422.54, 3451.09],
      '30d': [2732.57, 2726.95, 2690.33, 2851.04, 2858.95, 2795.87, 2901.28, 2791.68, 2869.64, 2866.26, 2930.30, 2961.11, 3054.33, 3000.72, 2990.31, 3201.53, 3247.10, 3228.39, 3273.51, 3198.30, 3293.82, 3315.98, 3241.75, 3409.51, 3428.30, 3416.10, 3434.61, 3390.79, 3453.29, 3506.70],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295',
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