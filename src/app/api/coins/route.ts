import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getCryptoCoins, saveCryptoCoins } from '@/lib/firestore';

// Für statischen Export erforderlich
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Temporäre Testdaten für den Investment Calculator
const getTestCoins = () => [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 100247,
    price_changes: {
      '24h': -1.05,
      '7d': -1.39,
      '30d': 10.79,
      '1y': 64.59
    },
    prices: {
      '24h': [102029.03, 102006.94, 101914.78, 101544.64, 101076.84, 101872.31, 100674.11, 100216.21, 101230.86, 100553.99, 101859.11, 101484.80, 100869.24, 100487.60, 99768.63, 101578.91, 101244.79, 100520.96, 99843.98, 101320.48, 100409.81, 101331.22, 99745.48, 100306.39],
      '7d': [101863.84, 101729.15, 103050.06, 99259.03, 100907.29, 101643.84, 101653.66],
      '30d': [88800.77, 92500.99, 87563.25, 89734.03, 89105.49, 94009.79, 93037.14, 93942.48, 95115.02, 94268.49, 97106.48, 96693.55, 95065.11, 96840.09, 98301.38, 94918.11, 96241.70, 97525.37, 97063.52, 98252.91, 97753.25, 96288.07, 100147.37, 100996.61, 97432.47, 97194.50, 102834.98, 99161.80, 98593.57, 101029.57],
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
    current_price: 3067.32,
    price_changes: {
      '24h': -3.63,
      '7d': 7.03,
      '30d': 48.19,
      '1y': -3.55
    },
    prices: {
      '24h': [3162.22, 3179.51, 3170.83, 3178.77, 3155.56, 3131.05, 3135.93, 3172.24, 3171.27, 3166.32, 3111.96, 3119.35, 3138.85, 3117.89, 3130.15, 3095.64, 3090.91, 3126.42, 3113.11, 3079.43, 3061.93, 3085.04, 3071.84, 3060.56],
      '7d': [2921.27, 2843.08, 2920.35, 2972.93, 2966.29, 3030.48, 3058.25],
      '30d': [2018.50, 2075.90, 2099.63, 2117.95, 2202.56, 2225.99, 2315.63, 2263.76, 2340.12, 2440.48, 2348.08, 2480.20, 2443.59, 2567.59, 2539.32, 2640.95, 2574.21, 2631.12, 2768.69, 2716.57, 2697.39, 2735.46, 2906.67, 2882.94, 2838.68, 3002.18, 3004.66, 2917.65, 3027.46, 3069.52],
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
    current_price: 2.66,
    price_changes: {
      '24h': -11.00,
      '7d': 2.16,
      '30d': 43.51,
      '1y': 377.57
    },
    prices: {
      '24h': [2.96, 3.00, 2.97, 2.92, 2.93, 2.90, 2.92, 2.89, 2.88, 2.84, 2.82, 2.82, 2.83, 2.79, 2.77, 2.77, 2.76, 2.77, 2.71, 2.74, 2.70, 2.70, 2.67, 2.66],
      '7d': [2.59, 2.66, 2.67, 2.61, 2.66, 2.66, 2.61],
      '30d': [1.79, 1.91, 1.90, 1.90, 1.93, 1.92, 2.06, 1.98, 2.10, 2.08, 2.20, 2.17, 2.23, 2.19, 2.27, 2.27, 2.29, 2.38, 2.32, 2.33, 2.35, 2.44, 2.44, 2.53, 2.53, 2.61, 2.57, 2.62, 2.61, 2.64],
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
    current_price: 0.849653,
    price_changes: {
      '24h': -0.32,
      '7d': -1.31,
      '30d': -1.45,
      '1y': -7.86
    },
    prices: {
      '24h': [0.85, 0.86, 0.85, 0.84, 0.85, 0.84, 0.86, 0.84, 0.85, 0.86, 0.86, 0.86, 0.85, 0.86, 0.85, 0.86, 0.86, 0.84, 0.85, 0.84, 0.85, 0.85, 0.84, 0.84],
      '7d': [0.86, 0.87, 0.86, 0.87, 0.85, 0.84, 0.83],
      '30d': [0.86, 0.87, 0.87, 0.88, 0.86, 0.83, 0.88, 0.85, 0.87, 0.85, 0.84, 0.85, 0.87, 0.88, 0.89, 0.88, 0.82, 0.88, 0.85, 0.83, 0.83, 0.84, 0.89, 0.86, 0.85, 0.87, 0.86, 0.86, 0.84, 0.85],
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
    current_price: 653.31,
    price_changes: {
      '24h': -4.13,
      '7d': 7.01,
      '30d': 18.45,
      '1y': 21.14
    },
    prices: {
      '24h': [684.64, 681.07, 677.58, 674.43, 677.16, 681.43, 667.70, 674.56, 675.36, 676.32, 667.10, 667.10, 663.73, 665.34, 658.36, 668.69, 657.34, 659.93, 665.84, 659.77, 657.11, 654.22, 656.80, 650.02],
      '7d': [598.42, 610.78, 612.22, 637.35, 636.31, 630.96, 644.96],
      '30d': [533.74, 541.90, 546.00, 566.11, 550.23, 572.29, 585.49, 576.22, 589.07, 600.74, 605.29, 587.38, 588.65, 609.42, 621.85, 615.02, 602.47, 595.55, 635.56, 596.78, 600.24, 641.97, 614.40, 624.06, 641.94, 632.55, 629.79, 658.36, 639.15, 646.22],
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
    current_price: 158.79,
    price_changes: {
      '24h': -7.71,
      '7d': 8.81,
      '30d': 28.50,
      '1y': -0.88
    },
    prices: {
      '24h': [172.76, 172.37, 170.92, 171.32, 170.80, 169.18, 170.12, 168.01, 168.02, 165.91, 164.87, 165.37, 165.83, 164.00, 165.56, 164.04, 163.11, 162.61, 160.42, 161.32, 159.75, 161.49, 157.87, 160.49],
      '7d': [144.18, 145.16, 153.10, 149.09, 152.52, 159.36, 160.19],
      '30d': [122.72, 124.72, 130.62, 123.16, 127.49, 132.78, 133.88, 130.32, 136.09, 132.72, 136.35, 139.34, 139.25, 143.77, 138.00, 139.74, 143.87, 146.72, 142.55, 143.93, 147.61, 144.93, 146.47, 153.70, 152.52, 158.72, 150.89, 156.01, 161.04, 157.35],
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
    current_price: 0.849128,
    price_changes: {
      '24h': -0.33,
      '7d': -1.33,
      '30d': -1.44,
      '1y': -7.91
    },
    prices: {
      '24h': [0.85, 0.84, 0.85, 0.85, 0.86, 0.85, 0.85, 0.85, 0.84, 0.85, 0.85, 0.86, 0.84, 0.86, 0.86, 0.86, 0.85, 0.85, 0.85, 0.85, 0.86, 0.85, 0.85, 0.85],
      '7d': [0.84, 0.86, 0.87, 0.86, 0.83, 0.85, 0.86],
      '30d': [0.87, 0.85, 0.85, 0.83, 0.84, 0.88, 0.83, 0.86, 0.86, 0.87, 0.83, 0.85, 0.83, 0.85, 0.84, 0.86, 0.86, 0.87, 0.85, 0.88, 0.83, 0.84, 0.85, 0.85, 0.88, 0.83, 0.86, 0.85, 0.88, 0.82],
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
    current_price: 0.202635,
    price_changes: {
      '24h': -10.64,
      '7d': 10.65,
      '30d': 44.16,
      '1y': 67.84
    },
    prices: {
      '24h': [0.23, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.20, 0.20, 0.20],
      '7d': [0.18, 0.18, 0.19, 0.19, 0.20, 0.20, 0.20],
      '30d': [0.14, 0.14, 0.14, 0.15, 0.15, 0.15, 0.15, 0.16, 0.15, 0.16, 0.16, 0.17, 0.16, 0.17, 0.17, 0.17, 0.17, 0.17, 0.18, 0.18, 0.19, 0.19, 0.18, 0.19, 0.19, 0.19, 0.20, 0.20, 0.20, 0.21],
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
    current_price: 3058.7,
    price_changes: {
      '24h': -3.54,
      '7d': 6.12,
      '30d': 47.90,
      '1y': -3.83
    },
    prices: {
      '24h': [3188.53, 3174.76, 3163.03, 3186.64, 3163.40, 3118.98, 3169.11, 3111.37, 3152.58, 3150.96, 3106.98, 3094.61, 3114.59, 3135.74, 3132.14, 3071.78, 3084.81, 3067.74, 3086.53, 3084.26, 3095.68, 3055.80, 3065.83, 3036.85],
      '7d': [2898.48, 2934.63, 2942.13, 3038.54, 2989.78, 3053.72, 3072.74],
      '30d': [2046.10, 2108.72, 2212.12, 2115.36, 2189.92, 2158.61, 2352.35, 2230.30, 2390.50, 2398.30, 2421.58, 2448.00, 2555.16, 2566.29, 2481.17, 2556.42, 2599.75, 2699.03, 2738.12, 2689.49, 2705.50, 2735.69, 2745.19, 2830.65, 2905.45, 2974.23, 2943.56, 2936.97, 3100.52, 3014.02],
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
    current_price: 0.261467,
    price_changes: {
      '24h': -3.29,
      '7d': -1.95,
      '30d': 11.21,
      '1y': 111.63
    },
    prices: {
      '24h': [0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.26, 0.26, 0.26, 0.26, 0.27, 0.26, 0.26, 0.26, 0.26, 0.26],
      '7d': [0.27, 0.26, 0.27, 0.26, 0.27, 0.26, 0.27],
      '30d': [0.24, 0.23, 0.24, 0.24, 0.23, 0.24, 0.25, 0.24, 0.25, 0.24, 0.24, 0.25, 0.25, 0.24, 0.25, 0.25, 0.24, 0.25, 0.26, 0.26, 0.25, 0.25, 0.25, 0.25, 0.26, 0.25, 0.26, 0.26, 0.26, 0.27],
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
    current_price: 0.680391,
    price_changes: {
      '24h': -10.01,
      '7d': 6.11,
      '30d': 36.08,
      '1y': 79.75
    },
    prices: {
      '24h': [0.76, 0.75, 0.75, 0.74, 0.74, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.71, 0.71, 0.71, 0.71, 0.70, 0.70, 0.69, 0.70, 0.69, 0.69, 0.68, 0.68],
      '7d': [0.65, 0.65, 0.64, 0.65, 0.66, 0.67, 0.67],
      '30d': [0.51, 0.49, 0.52, 0.52, 0.53, 0.54, 0.55, 0.54, 0.55, 0.56, 0.56, 0.56, 0.57, 0.56, 0.61, 0.60, 0.62, 0.59, 0.61, 0.61, 0.63, 0.64, 0.66, 0.64, 0.66, 0.64, 0.65, 0.68, 0.67, 0.68],
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
    current_price: 99979,
    price_changes: {
      '24h': -1.18,
      '7d': -1.67,
      '30d': 10.59,
      '1y': 64.24
    },
    prices: {
      '24h': [100632.42, 100938.37, 100570.53, 101371.67, 101886.93, 101027.51, 101375.83, 99934.52, 101724.95, 100798.41, 99848.65, 100515.92, 100899.83, 99917.58, 101167.56, 99821.36, 99960.30, 101284.81, 99325.80, 100543.94, 100602.60, 100083.36, 100188.80, 100514.81],
      '7d': [102345.39, 101283.26, 100798.49, 101865.16, 100720.07, 100379.93, 99060.86],
      '30d': [89443.23, 91730.15, 89145.29, 90082.34, 89760.99, 92387.54, 95667.76, 92639.18, 91980.93, 93379.12, 90682.39, 90738.57, 97222.73, 95879.67, 97178.04, 94890.03, 97299.07, 98368.83, 94169.83, 93619.93, 95460.52, 97705.17, 98405.46, 100101.53, 100280.61, 95206.22, 102321.99, 100519.47, 97381.11, 98989.55],
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
    current_price: 36.74,
    price_changes: {
      '24h': -4.17,
      '7d': -7.04,
      '30d': 14.63,
      '1y': 0.00
    },
    prices: {
      '24h': [38.71, 38.31, 38.18, 37.85, 38.22, 37.72, 38.05, 37.61, 37.62, 37.61, 37.26, 37.85, 37.63, 37.64, 37.70, 36.93, 36.90, 37.18, 36.74, 36.66, 37.21, 36.71, 36.84, 36.66],
      '7d': [40.20, 39.80, 39.51, 38.62, 37.40, 37.53, 36.45],
      '30d': [33.06, 31.97, 33.02, 31.46, 31.51, 33.68, 32.05, 32.25, 32.23, 34.78, 34.79, 32.90, 33.51, 34.32, 35.55, 34.10, 34.55, 35.13, 35.67, 34.74, 36.12, 35.09, 35.81, 34.72, 35.78, 36.16, 36.50, 37.59, 37.86, 36.81],
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
    current_price: 3705.16,
    price_changes: {
      '24h': -3.21,
      '7d': 7.21,
      '30d': 48.47,
      '1y': -0.89
    },
    prices: {
      '24h': [3864.38, 3791.08, 3798.26, 3820.93, 3789.97, 3783.03, 3763.21, 3759.91, 3765.92, 3767.40, 3764.09, 3763.88, 3781.78, 3780.95, 3780.49, 3739.76, 3750.35, 3767.11, 3696.84, 3763.22, 3712.34, 3734.87, 3711.19, 3690.55],
      '7d': [3541.81, 3478.48, 3479.70, 3507.57, 3665.30, 3627.05, 3780.36],
      '30d': [2466.87, 2615.62, 2488.81, 2588.18, 2630.57, 2763.14, 2760.68, 2723.39, 2765.85, 2877.10, 2958.22, 2997.58, 2979.92, 3014.16, 3132.89, 3146.09, 3090.12, 3120.64, 3201.86, 3290.10, 3277.14, 3424.26, 3403.04, 3454.10, 3529.76, 3463.66, 3645.62, 3554.53, 3644.14, 3629.93],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295',
    market_cap_rank: 14,
    last_updated: new Date().toISOString()
  },
  {
    id: 'stellar',
    name: 'Stellar',
    symbol: 'XLM',
    current_price: 0.358935,
    price_changes: {
      '24h': -10.74,
      '7d': -7.97,
      '30d': 69.87,
      '1y': 282.93
    },
    prices: {
      '24h': [0.40, 0.40, 0.40, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.38, 0.38, 0.38, 0.38, 0.37, 0.37, 0.37, 0.37, 0.36, 0.37, 0.36, 0.36, 0.36],
      '7d': [0.39, 0.38, 0.38, 0.38, 0.37, 0.37, 0.37],
      '30d': [0.21, 0.21, 0.23, 0.22, 0.22, 0.24, 0.24, 0.24, 0.25, 0.25, 0.26, 0.27, 0.27, 0.29, 0.29, 0.28, 0.29, 0.30, 0.30, 0.32, 0.30, 0.32, 0.32, 0.33, 0.34, 0.34, 0.35, 0.35, 0.35, 0.36],
      '1y': []
    },
    image: 'https://coin-images.coingecko.com/coins/images/100/large/fmpFRHHQ_400x400.jpg?1735231350',
    market_cap_rank: 15,
    last_updated: new Date().toISOString()
  }
];

// Firestore ist natürlich async und braucht keine Timeout-Funktionen

export async function GET() {
  try {
    // Bei Build-Zeit: Leere Antwort für statischen Export
    if (process.env.SKIP_MONGODB === 'true' || process.env.NEXT_PHASE === 'phase-production-build') {
      console.log('Build-Modus: Keine Daten verfügbar');
      return NextResponse.json([]);
    }

    console.log('Starte Abruf der Coins aus Firestore...');
    
    try {
      const coins = await getCryptoCoins();

      console.log(`${coins.length} Coins aus Firestore gefunden`);

      if (coins && coins.length > 0) {
        // Konvertiere für beide Komponenten (Investment Calculator + CryptoTicker)
        const mappedCoins = coins.map((coin: any) => ({
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
        const sortedCoins = mappedCoins.sort((a: any, b: any) => 
          (b.price_change_percentage_1y || 0) - (a.price_change_percentage_1y || 0)
        );

        console.log(`✅ ${sortedCoins.length} Coins aus Firestore erhalten`);
        console.log('Top 5 Performer aus Firestore:');
        sortedCoins.slice(0, 5).forEach((coin: any, index: number) => {
          console.log(`  ${index + 1}. ${coin.symbol}: ${coin.price_change_percentage_1y.toFixed(2)}%`);
        });

        return NextResponse.json(sortedCoins);
      }
    } catch (firestoreError) {
      console.error('Firestore-Fehler:', firestoreError instanceof Error ? firestoreError.message : firestoreError);
      console.log('Fallback zu Testdaten wegen Firestore-Fehler');
    }
    
    // Fallback zu Testdaten wenn Firestore nicht verfügbar
    console.log('Verwende Testdaten (Firestore nicht verfügbar)');
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

// POST-Route für das Speichern von Krypto-Daten
export async function POST(request: NextRequest) {
  try {
    console.log('📥 POST /api/coins - Empfange Krypto-Daten zum Speichern...');
    
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log('🔐 Session check:', { 
      hasSession: !!session, 
      user: session?.user?.name,
      role: (session?.user as any)?.role 
    });
    
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }
    
    const body = await request.json();
    const { coins } = body;
    
    if (!Array.isArray(coins)) {
      return NextResponse.json(
        { error: 'Ungültige Daten: coins muss ein Array sein' },
        { status: 400 }
      );
    }
    
    console.log(`💾 Speichere ${coins.length} Coins in Firestore...`);
    
    // Speichere die Coins in Firestore
    await saveCryptoCoins(coins);
    
    console.log(`✅ ${coins.length} Coins erfolgreich in Firestore gespeichert!`);
    
    return NextResponse.json({
      success: true,
      message: `${coins.length} Krypto-Daten erfolgreich gespeichert`,
      count: coins.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ Fehler beim Speichern der Krypto-Daten:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Speichern der Krypto-Daten',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
} 