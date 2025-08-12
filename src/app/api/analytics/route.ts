import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

    // Echte Analytics-Daten mit Firebase Admin laden
    const { admin, db } = await getFirebaseAdmin();

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    let q: FirebaseFirestore.Query = db.collection('analytics');
    if (start) {
      q = q.where('timestamp', '>=', start);
    }
    if (end) {
      q = q.where('timestamp', '<=', end);
    }
    q = q.orderBy('timestamp', 'desc');

    const snapshot = await q.get();
    const analytics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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

    const { admin, db } = await getFirebaseAdmin();

    await db.collection('analytics').add({
      type,
      page: page || null,
      exchange: exchange || null,
      sessionId,
      userAgent: request.headers.get('user-agent') || null,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics POST Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern des Analytics-Events' },
      { status: 500 }
    );
  }
} 