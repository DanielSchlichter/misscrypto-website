import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Generiere oder hole Session-ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Tracking-Funktion
async function trackEvent(type: 'page_view' | 'exchange_click', data: {
  page?: string;
  exchange?: string;
}) {
  if (typeof window === 'undefined') return;

  const sessionId = getSessionId();
  
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        sessionId,
        ...data
      })
    });
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
}

export function useAnalytics() {
  const pathname = usePathname();

  // Seitenaufruf tracken
  useEffect(() => {
    // Nur für echte Seiten tracken, nicht für Admin-Bereiche
    if (pathname.startsWith('/admin')) return;

    const trackPageView = async () => {
      await trackEvent('page_view', { page: pathname });
    };

    // Kleine Verzögerung um sicherzustellen, dass die Seite geladen ist
    const timer = setTimeout(trackPageView, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Börsen-Klick tracken
  const trackExchangeClick = useCallback(async (exchangeName: string) => {
    await trackEvent('exchange_click', { 
      exchange: exchangeName,
      page: pathname 
    });
  }, [pathname]);

  return {
    trackExchangeClick
  };
} 