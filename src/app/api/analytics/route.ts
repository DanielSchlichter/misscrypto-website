import { NextRequest, NextResponse } from 'next/server';
import { saveAnalyticsEvent, getAnalyticsData } from '@/lib/firestore';

interface AnalyticsEvent {
  type: 'page_view' | 'exchange_click';
  page?: string;
  exchange?: string;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
  sessionId?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Bei Build-Zeit oder ohne Firebase: Mock-Daten
    if (process.env.SKIP_MONGODB === 'true') {
      console.log('Firebase nicht verfügbar - verwende Mock-Analytics');
      return NextResponse.json({
        summary: {
          totalPageViews: 1234,
          uniqueVisitors: 567,
          totalExchangeClicks: 89
        },
        pageViews: [
          { page: '/', views: 654, uniqueVisitors: 432 },
          { page: '/krypto-kaufen', views: 321, uniqueVisitors: 234 },
          { page: '/kontakt', views: 123, uniqueVisitors: 89 }
        ],
        exchangeClicks: [
          { exchange: 'Bitvavo', clicks: 45, uniqueVisitors: 34 },
          { exchange: 'Bitpanda', clicks: 32, uniqueVisitors: 28 },
          { exchange: 'Coinbase', clicks: 12, uniqueVisitors: 11 }
        ],
        recentActivity: []
      });
    }

    // Echte Analytics-Daten aus Firestore laden
    const analytics = await getAnalyticsData(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );

    // Analytics-Daten verarbeiten
    let totalPageViews = 0;
    let uniqueVisitors: string[] = [];
    let pageViewsByPage: any[] = [];
    let exchangeClicks: any[] = [];
    let recentVisitors: any[] = [];

    analytics.forEach((event: any) => {
      if (event.sessionId && !uniqueVisitors.includes(event.sessionId)) {
        uniqueVisitors.push(event.sessionId);
      }

      if (event.type === 'page_view') {
        totalPageViews++;

        // Page Views gruppieren
        const existingPage = pageViewsByPage.find(p => p.page === event.page);
        if (existingPage) {
          existingPage.views++;
          if (event.sessionId && !existingPage.uniqueVisitors.includes(event.sessionId)) {
            existingPage.uniqueVisitors.push(event.sessionId);
          }
        } else {
          pageViewsByPage.push({
            page: event.page || 'Unknown',
            views: 1,
            uniqueVisitors: event.sessionId ? [event.sessionId] : []
          });
        }
      }

      if (event.type === 'exchange_click') {
        // Exchange Clicks gruppieren
        const existingExchange = exchangeClicks.find(e => e.exchange === event.exchange);
        if (existingExchange) {
          existingExchange.clicks++;
          if (event.sessionId && !existingExchange.uniqueVisitors.includes(event.sessionId)) {
            existingExchange.uniqueVisitors.push(event.sessionId);
          }
        } else {
          exchangeClicks.push({
            exchange: event.exchange || 'Unknown',
            clicks: 1,
            uniqueVisitors: event.sessionId ? [event.sessionId] : []
          });
        }
      }

      // Recent Activity
      if (recentVisitors.length < 50) {
        recentVisitors.push({
          timestamp: event.timestamp,
          type: event.type,
          page: event.page,
          exchange: event.exchange,
          userAgent: event.userAgent,
          ip: event.ip
        });
      }
    });

    // Format für Frontend
    const formattedPageViews = pageViewsByPage.map(p => ({
      page: p.page,
      views: p.views,
      uniqueVisitors: p.uniqueVisitors.length
    }));

    const formattedExchangeClicks = exchangeClicks.map(e => ({
      exchange: e.exchange,
      clicks: e.clicks,
      uniqueVisitors: e.uniqueVisitors.length
    }));

    return NextResponse.json({
      summary: {
        totalPageViews,
        uniqueVisitors: uniqueVisitors.length,
        totalExchangeClicks: exchangeClicks.reduce((sum, e) => sum + e.clicks, 0)
      },
      pageViews: formattedPageViews,
      exchangeClicks: formattedExchangeClicks,
      recentActivity: recentVisitors
    });

  } catch (error) {
    console.error('Analytics GET Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Analytics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, page, exchange, sessionId } = body;

    if (!type || !sessionId) {
      return NextResponse.json(
        { error: 'Type und sessionId sind erforderlich' },
        { status: 400 }
      );
    }

    const success = await saveAnalyticsEvent({
      type,
      page,
      exchange,
      sessionId,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown'
    });

    if (success) {
    return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Fehler beim Speichern des Analytics-Events' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Analytics POST Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern des Analytics-Events' },
      { status: 500 }
    );
  }
} 