import { NextResponse } from 'next/server';

// Rate-Limiting-Tracking
let lastRequestTime = 0;
const minRequestInterval = 1000; // Mindestens 1 Sekunde zwischen Anfragen

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get('coinId');
  const days = searchParams.get('days') || '1';
  const currency = searchParams.get('currency') || 'eur';

  if (!coinId) {
    return NextResponse.json({ error: 'Coin ID ist erforderlich' }, { status: 400 });
  }

  try {
    // Rate-Limiting auf Server-Seite
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < minRequestInterval) {
      await new Promise(resolve => setTimeout(resolve, minRequestInterval - timeSinceLastRequest));
    }
    lastRequestTime = Date.now();

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 } // Cache für 5 Minuten
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        // Bei Rate-Limiting länger warten
        await new Promise(resolve => setTimeout(resolve, 5000));
        return NextResponse.json(
          { error: 'Rate limit erreicht, bitte warten' },
          { status: 429 }
        );
      }
      throw new Error(`CoinGecko API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache-Header setzen
    const headers = new Headers();
    headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return NextResponse.json(data, {
      headers,
      status: 200
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Market-Daten:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Daten' },
      { status: 500 }
    );
  }
} 