import { NextRequest, NextResponse } from 'next/server';

const MAILERLITE_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2U2NTRkZDY1M2NkMWM1NWIzOWZjN2ZiZGZmNTE3YTI5Y2JlZDdmYjVkOThhZmJjY2UzMjg0OTgzZWI3ZTY3Y2Y0N2IzYTIxN2UxNjkyYmIiLCJpYXQiOjE3NTEzOTY5MzcuOTQxNDI5LCJuYmYiOjE3NTEzOTY5MzcuOTQxNDMyLCJleHAiOjQ5MDcwNzA1MzcuOTM2NDc3LCJzdWIiOiIxMDQ5MjEwIiwic2NvcGVzIjpbXX0.YqYeAGJwB4PQx8ngPN237f5kOcQZvSJPB5siLWM9URdVyo2MzrWw6b1SQibUlTx1wIbV9pysGyMx6wqqSopEMujSsyd-QpGKo00RaNIwwXeb98AXJIo-9PViJbCx-u1vNn82YW81wCfOtZt8bUCHHZeKQmUs6Fu0EgBoI6G4TMMGjGq8Tpt-ykAxD1spCnYFNPHEGhsVg65LI2qJJ4yHWaACuoa3pD2h8S5S87qKPfg9qp4zw_1Ln8o_SUErQ8vmP0SgLLBQ_kc5fjqdWMUVL-FsUsPq1CDl_EH-Ai-uW98EtmYoXc5vfKe5_SN3REDQAm-IYmXuGcJge5yDm3bhwCeikD27XEdMrvDswmo-fGwCnteTfOfF3cJSEprcJSGT09tf3obwxOsviM_GbwF-FxUIfN6w1sNozGp84t7MqEgQKXAdUvT_F93UIsmOSR_4iMQ-DUvuRYIqo89To1j-P1RWshksIEeiHfRJduqzKgll_NjmXtBmDW4Lv1c399izmosJORTs_gAbzjNvxQ7eimsHO3vYSXf66q0__9IcVopBcfQLG1FWKpz-mTWeJCOjHohpiJabfkLI3FkM9OHRAtYwxHFGHJm3XpqgFKHQtNQVqiCb5AgSruKxEX4TpRvHN8a5c_iIcoAP3CN-WuPefakqs5mv2o9jshWyaBCYPBI';
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Lade MailerLite Newsletter-Statistiken...');
    
    // MailerLite API: Alle Subscribers holen
    const subscribersResponse = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`,
      },
    });

    if (!subscribersResponse.ok) {
      console.error('MailerLite API Fehler:', subscribersResponse.status);
      // Fallback zu 0 wenn API nicht erreichbar
      return NextResponse.json({
        totalSubscribers: 0,
        newSubscribersToday: 0,
        newSubscribersThisWeek: 0,
        newSubscribersThisMonth: 0,
        lastNewsletterSent: null
      });
    }

    const subscribersData = await subscribersResponse.json();
    console.log('✅ MailerLite Subscribers geladen:', subscribersData.data?.length || 0);

    // Gesamt-Abonnenten
    const totalSubscribers = subscribersData.data?.length || 0;

    // Datum-Berechnungen
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Neue Abonnenten nach Zeitraum filtern
    let newSubscribersToday = 0;
    let newSubscribersThisWeek = 0;
    let newSubscribersThisMonth = 0;

    if (subscribersData.data) {
      subscribersData.data.forEach((subscriber: any) => {
        if (subscriber.subscribed_at) {
          const subscribedDate = new Date(subscriber.subscribed_at);
          
          // Heute
          if (subscribedDate >= today) {
            newSubscribersToday++;
          }
          
          // Diese Woche
          if (subscribedDate >= startOfWeek) {
            newSubscribersThisWeek++;
          }
          
          // Dieser Monat
          if (subscribedDate >= startOfMonth) {
            newSubscribersThisMonth++;
          }
        }
      });
    }

    // Versuche Campaigns zu holen (optional)
    let lastNewsletterSent = null;
    try {
      const campaignsResponse = await fetch(`${MAILERLITE_API_URL}/campaigns`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`,
        },
      });

      if (campaignsResponse.ok) {
        const campaignsData = await campaignsResponse.json();
        
        // Finde die letzte gesendete Kampagne
        const sentCampaigns = campaignsData.data?.filter((campaign: any) => 
          campaign.status === 'sent' && campaign.finished_at
        ) || [];
        
        if (sentCampaigns.length > 0) {
          // Sortiere nach finished_at
          sentCampaigns.sort((a: any, b: any) => 
            new Date(b.finished_at).getTime() - new Date(a.finished_at).getTime()
          );
          lastNewsletterSent = sentCampaigns[0].finished_at;
        }
      }
    } catch (campaignError) {
      console.log('⚠️ Campaigns konnten nicht geladen werden:', campaignError);
    }

    console.log('📊 Newsletter Stats:', {
      totalSubscribers,
      newSubscribersToday,
      newSubscribersThisWeek,
      newSubscribersThisMonth,
      lastNewsletterSent
    });

    return NextResponse.json({
      totalSubscribers,
      newSubscribersToday,
      newSubscribersThisWeek,
      newSubscribersThisMonth,
      lastNewsletterSent
    });

  } catch (error) {
    console.error('Newsletter-Stats Fehler:', error);
    
    // Fallback zu 0 bei Fehlern
    return NextResponse.json({
      totalSubscribers: 0,
      newSubscribersToday: 0,
      newSubscribersThisWeek: 0,
      newSubscribersThisMonth: 0,
      lastNewsletterSent: null
    });
  }
} 