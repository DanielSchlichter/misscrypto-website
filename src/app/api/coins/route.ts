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
    current_price: 92661,
    price_changes: {
      '24h': 0.76,
      '7d': 2.97,
      '30d': 0.14,
      '1y': 75.26
    },
    prices: {
      '24h': [92756.98, 91552.17, 91775.54, 91944.15, 91312.97, 92960.69, 92900.29, 92566.43, 91827.53, 92646.27, 91952.45, 92671.42, 92036.75, 91674.77, 92560.49, 92252.11, 92641.98, 92950.60, 92220.91, 93346.77, 92628.63, 92428.76, 92946.23, 91810.50],
      '7d': [87814.56, 88662.80, 92668.48, 93303.01, 89865.42, 90468.50, 94543.32],
      '30d': [94958.25, 92355.62, 91773.80, 95153.68, 92062.25, 95518.29, 89128.86, 89475.01, 92142.46, 91490.63, 92492.60, 88999.53, 92397.40, 94233.32, 96047.79, 94158.55, 89711.41, 91324.31, 93615.39, 93020.14, 90340.54, 88943.63, 89222.84, 89742.81, 91543.37, 91199.95, 92073.72, 91530.49, 90431.52, 89281.35],
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
    current_price: 2220.2,
    price_changes: {
      '24h': 2.57,
      '7d': 7.81,
      '30d': 1.65,
      '1y': -21.67
    },
    prices: {
      '24h': [2177.16, 2153.51, 2160.50, 2181.06, 2178.90, 2165.46, 2176.65, 2195.97, 2197.37, 2181.87, 2188.62, 2182.21, 2205.98, 2209.21, 2184.96, 2220.48, 2193.16, 2218.20, 2199.13, 2201.55, 2209.92, 2212.39, 2220.07, 2232.45],
      '7d': [2082.77, 2087.16, 2090.48, 2131.03, 2183.93, 2165.59, 2254.10],
      '30d': [2103.53, 2160.94, 2174.20, 2169.88, 2267.35, 2104.65, 2104.62, 2205.92, 2216.75, 2160.37, 2213.56, 2220.09, 2208.35, 2163.17, 2240.76, 2214.31, 2209.81, 2259.82, 2192.73, 2240.39, 2272.98, 2154.73, 2138.40, 2272.84, 2181.91, 2180.45, 2228.72, 2256.35, 2279.22, 2180.59],
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
    current_price: 0.85407,
    price_changes: {
      '24h': 0.29,
      '7d': 0.78,
      '30d': -2.55,
      '1y': -7.47
    },
    prices: {
      '24h': [0.85, 0.85, 0.86, 0.85, 0.85, 0.85, 0.85, 0.85, 0.86, 0.85, 0.85, 0.85, 0.85, 0.86, 0.85, 0.86, 0.84, 0.85, 0.86, 0.85, 0.86, 0.85, 0.86, 0.86],
      '7d': [0.87, 0.86, 0.84, 0.87, 0.87, 0.86, 0.86],
      '30d': [0.89, 0.84, 0.91, 0.87, 0.88, 0.88, 0.86, 0.89, 0.85, 0.84, 0.90, 0.86, 0.86, 0.86, 0.88, 0.88, 0.87, 0.88, 0.87, 0.84, 0.84, 0.85, 0.83, 0.87, 0.86, 0.89, 0.87, 0.88, 0.83, 0.86],
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
    current_price: 1.97,
    price_changes: {
      '24h': 2.25,
      '7d': 6.42,
      '30d': 0.48,
      '1y': 392.70
    },
    prices: {
      '24h': [1.91, 1.91, 1.94, 1.94, 1.92, 1.93, 1.95, 1.95, 1.92, 1.94, 1.96, 1.95, 1.93, 1.95, 1.95, 1.96, 1.97, 1.97, 1.97, 1.97, 1.98, 1.96, 1.96, 1.96],
      '7d': [1.87, 1.91, 1.90, 1.91, 1.95, 1.92, 1.95],
      '30d': [1.96, 2.03, 1.98, 1.93, 1.98, 1.92, 2.00, 1.93, 2.04, 1.89, 1.94, 1.99, 1.98, 1.90, 2.03, 2.01, 2.03, 1.92, 2.02, 1.97, 2.04, 2.04, 2.03, 1.90, 1.89, 1.91, 2.02, 2.04, 1.94, 2.02],
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
    current_price: 565.24,
    price_changes: {
      '24h': 0.63,
      '7d': 2.68,
      '30d': -0.80,
      '1y': 18.89
    },
    prices: {
      '24h': [564.79, 563.85, 563.56, 559.89, 566.77, 565.76, 564.52, 561.71, 562.51, 565.72, 558.05, 558.06, 562.40, 561.42, 558.54, 563.30, 566.08, 563.49, 559.38, 563.81, 560.21, 569.13, 565.53, 561.61],
      '7d': [547.56, 546.33, 550.63, 565.44, 554.71, 568.60, 571.66],
      '30d': [571.47, 561.91, 566.75, 564.82, 580.37, 576.74, 569.82, 550.47, 563.24, 548.60, 582.45, 552.29, 551.19, 567.03, 561.27, 587.07, 559.34, 580.41, 557.51, 564.58, 588.30, 566.99, 548.85, 558.69, 586.59, 580.37, 571.59, 563.66, 573.03, 563.44],
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
    current_price: 128.94,
    price_changes: {
      '24h': 1.69,
      '7d': 2.17,
      '30d': -2.70,
      '1y': -0.70
    },
    prices: {
      '24h': [126.32, 127.96, 125.82, 126.90, 127.17, 128.05, 127.97, 127.44, 126.48, 126.43, 127.17, 128.65, 128.68, 128.02, 128.71, 128.29, 129.13, 127.65, 128.88, 128.52, 128.09, 127.78, 128.66, 128.60],
      '7d': [126.52, 123.96, 130.14, 127.71, 128.40, 127.66, 130.97],
      '30d': [136.42, 129.99, 127.55, 129.88, 133.60, 131.43, 132.56, 129.77, 134.27, 132.28, 128.58, 135.89, 130.04, 132.14, 134.64, 133.59, 132.30, 134.90, 126.79, 128.67, 125.03, 126.06, 133.24, 126.48, 127.70, 133.90, 134.56, 129.63, 127.31, 128.03],
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
    current_price: 0.853925,
    price_changes: {
      '24h': 0.28,
      '7d': 0.78,
      '30d': -2.51,
      '1y': -7.51
    },
    prices: {
      '24h': [0.85, 0.85, 0.86, 0.85, 0.86, 0.85, 0.84, 0.86, 0.85, 0.85, 0.85, 0.86, 0.85, 0.84, 0.85, 0.85, 0.86, 0.85, 0.85, 0.86, 0.85, 0.85, 0.86, 0.86],
      '7d': [0.86, 0.85, 0.84, 0.87, 0.87, 0.87, 0.86],
      '30d': [0.88, 0.85, 0.89, 0.87, 0.86, 0.90, 0.86, 0.88, 0.86, 0.85, 0.88, 0.89, 0.86, 0.87, 0.85, 0.89, 0.85, 0.89, 0.88, 0.85, 0.88, 0.84, 0.88, 0.83, 0.88, 0.83, 0.84, 0.88, 0.84, 0.82],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
    market_cap_rank: 7,
    last_updated: new Date().toISOString()
  },
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    current_price: 0.245705,
    price_changes: {
      '24h': 0.47,
      '7d': 3.24,
      '30d': -1.23,
      '1y': 107.56
    },
    prices: {
      '24h': [0.25, 0.25, 0.24, 0.25, 0.24, 0.25, 0.25, 0.24, 0.24, 0.25, 0.25, 0.25, 0.25, 0.25, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.25, 0.25, 0.25],
      '7d': [0.24, 0.24, 0.25, 0.24, 0.24, 0.24, 0.25],
      '30d': [0.24, 0.26, 0.26, 0.24, 0.25, 0.26, 0.24, 0.25, 0.25, 0.25, 0.25, 0.24, 0.24, 0.25, 0.26, 0.26, 0.25, 0.24, 0.24, 0.24, 0.24, 0.26, 0.25, 0.25, 0.25, 0.25, 0.24, 0.24, 0.25, 0.24],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    market_cap_rank: 8,
    last_updated: new Date().toISOString()
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    current_price: 0.14588,
    price_changes: {
      '24h': 2.07,
      '7d': 7.96,
      '30d': -8.64,
      '1y': 46.16
    },
    prices: {
      '24h': [0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.15, 0.14, 0.15, 0.14, 0.14, 0.15, 0.14, 0.15, 0.14, 0.15, 0.14, 0.14, 0.15, 0.15, 0.15],
      '7d': [0.13, 0.14, 0.14, 0.14, 0.14, 0.14, 0.15],
      '30d': [0.16, 0.15, 0.16, 0.16, 0.16, 0.15, 0.15, 0.15, 0.16, 0.15, 0.16, 0.16, 0.16, 0.15, 0.16, 0.15, 0.16, 0.16, 0.15, 0.15, 0.15, 0.14, 0.15, 0.14, 0.14, 0.15, 0.15, 0.15, 0.14, 0.14],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
    market_cap_rank: 9,
    last_updated: new Date().toISOString()
  },
  {
    id: 'staked-ether',
    name: 'Lido Staked Ether',
    symbol: 'STETH',
    current_price: 2218.07,
    price_changes: {
      '24h': 2.48,
      '7d': 7.72,
      '30d': 1.58,
      '1y': -21.63
    },
    prices: {
      '24h': [2161.90, 2147.68, 2155.21, 2186.72, 2168.73, 2161.08, 2176.79, 2184.25, 2164.88, 2163.92, 2181.15, 2203.96, 2185.83, 2207.30, 2187.59, 2182.56, 2190.04, 2207.87, 2208.62, 2215.59, 2221.85, 2199.48, 2213.33, 2239.50],
      '7d': [2057.20, 2109.09, 2136.37, 2159.52, 2186.04, 2194.97, 2230.80],
      '30d': [2198.57, 2194.41, 2143.41, 2181.72, 2170.72, 2138.58, 2228.94, 2229.11, 2232.15, 2124.73, 2113.42, 2181.08, 2228.73, 2119.64, 2193.90, 2180.89, 2234.96, 2141.65, 2273.46, 2290.64, 2273.68, 2242.88, 2284.57, 2202.36, 2197.35, 2172.74, 2216.67, 2197.87, 2171.17, 2282.08],
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
    current_price: 0.501068,
    price_changes: {
      '24h': 2.05,
      '7d': 7.80,
      '30d': -13.85,
      '1y': 46.38
    },
    prices: {
      '24h': [0.49, 0.49, 0.49, 0.49, 0.49, 0.49, 0.50, 0.49, 0.49, 0.49, 0.49, 0.50, 0.50, 0.50, 0.50, 0.49, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50],
      '7d': [0.47, 0.47, 0.47, 0.48, 0.49, 0.49, 0.50],
      '30d': [0.57, 0.57, 0.59, 0.58, 0.59, 0.56, 0.55, 0.55, 0.56, 0.55, 0.55, 0.56, 0.54, 0.56, 0.56, 0.54, 0.54, 0.52, 0.55, 0.54, 0.51, 0.52, 0.54, 0.53, 0.51, 0.53, 0.53, 0.49, 0.52, 0.51],
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
    current_price: 92579,
    price_changes: {
      '24h': 0.90,
      '7d': 2.94,
      '30d': 0.09,
      '1y': 75.15
    },
    prices: {
      '24h': [92511.44, 91732.62, 91569.13, 91629.75, 91040.55, 91307.38, 92438.48, 92421.76, 92697.78, 91909.71, 92821.60, 92251.07, 92303.57, 92371.15, 92291.87, 91790.69, 91767.59, 92138.21, 92019.32, 91814.63, 92251.79, 93133.56, 92648.71, 92787.89],
      '7d': [90579.64, 91195.29, 90588.30, 90196.62, 91991.20, 90333.41, 92454.45],
      '30d': [95832.95, 93593.92, 89832.57, 93695.55, 93786.41, 91624.91, 92917.84, 91278.31, 89657.14, 94403.25, 88982.60, 94560.38, 89663.02, 89934.71, 89650.84, 93192.20, 95888.46, 92763.14, 94346.29, 92714.76, 93044.89, 90404.37, 89744.57, 93313.44, 89055.52, 94967.98, 95479.14, 94493.50, 94520.32, 94561.00],
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
    current_price: 33.37,
    price_changes: {
      '24h': 4.76,
      '7d': 4.92,
      '30d': 7.25,
      '1y': 0.00
    },
    prices: {
      '24h': [31.80, 32.06, 31.89, 32.26, 32.14, 31.98, 32.36, 32.40, 32.65, 32.36, 32.77, 32.29, 32.74, 32.55, 32.60, 33.09, 32.76, 32.92, 32.99, 33.42, 33.14, 33.25, 33.20, 33.48],
      '7d': [31.83, 31.37, 32.48, 31.85, 33.33, 33.61, 33.84],
      '30d': [31.01, 32.42, 32.34, 32.15, 31.52, 31.08, 32.14, 32.00, 32.93, 31.53, 31.81, 32.21, 32.41, 31.97, 32.73, 31.40, 31.51, 32.84, 33.15, 31.86, 31.96, 31.90, 31.97, 32.70, 31.75, 33.34, 33.41, 32.67, 32.44, 33.98],
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
    current_price: 2683.37,
    price_changes: {
      '24h': 2.63,
      '7d': 8.05,
      '30d': 2.31,
      '1y': -18.83
    },
    prices: {
      '24h': [2594.50, 2636.04, 2597.85, 2609.71, 2636.75, 2615.07, 2618.68, 2654.14, 2635.38, 2626.09, 2662.92, 2657.67, 2654.35, 2649.76, 2679.30, 2642.90, 2662.01, 2670.50, 2682.64, 2656.53, 2699.17, 2685.62, 2700.33, 2680.04],
      '7d': [2509.76, 2474.86, 2561.60, 2623.79, 2657.75, 2710.39, 2623.95],
      '30d': [2558.87, 2622.90, 2602.50, 2599.89, 2635.25, 2665.68, 2715.71, 2679.52, 2552.70, 2717.74, 2693.26, 2730.77, 2645.80, 2564.36, 2585.58, 2584.40, 2591.51, 2652.49, 2565.79, 2624.34, 2594.54, 2664.77, 2688.17, 2592.99, 2624.08, 2644.82, 2659.83, 2661.71, 2714.88, 2657.86],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295',
    market_cap_rank: 14,
    last_updated: new Date().toISOString()
  },
  {
    id: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    current_price: 433.61,
    price_changes: {
      '24h': 2.36,
      '7d': 1.55,
      '30d': 19.41,
      '1y': 39.77
    },
    prices: {
      '24h': [421.66, 421.72, 422.82, 426.69, 422.63, 429.36, 430.37, 426.75, 426.02, 424.18, 430.29, 427.67, 429.32, 433.04, 427.74, 433.88, 426.87, 433.62, 431.78, 432.89, 435.72, 435.56, 435.10, 431.45],
      '7d': [431.92, 419.30, 428.47, 440.25, 425.71, 436.33, 439.55],
      '30d': [377.59, 371.09, 364.68, 381.93, 381.76, 367.65, 371.65, 372.16, 369.63, 375.80, 386.17, 379.36, 403.75, 405.32, 384.32, 402.16, 408.94, 402.22, 404.92, 414.01, 423.86, 411.62, 429.94, 408.67, 424.23, 425.70, 420.68, 416.71, 428.98, 442.90],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1696501932',
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