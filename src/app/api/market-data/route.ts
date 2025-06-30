import { NextResponse } from 'next/server';

// Für statischen Export erforderlich
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  // Mock market data für statischen Export
  const mockMarketData = {
    totalMarketCap: 2543000000000,
    total24hVolume: 127500000000,
    btcDominance: 56.8,
    ethDominance: 17.2,
    totalCryptocurrencies: 12847,
    lastUpdated: new Date().toISOString()
  };

  return NextResponse.json(mockMarketData);
} 