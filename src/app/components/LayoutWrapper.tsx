'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import TransparentHeader from './TransparentHeader';
import StickyHeader from './StickyHeader';
import Footer from './Footer';
import CookieBanner from '../../components/CookieBanner';
import CookieManager from '../../components/CookieManager';
import { useAnalytics } from '../../hooks/useAnalytics';

// Error Boundary für Client-Side Errors
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Globale Error Handler für unerwartete Fehler
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Globaler Fehler abgefangen:', event.error);
      
      // Spezifische Behandlung für share-modal.js Fehler
      if (event.filename?.includes('share-modal.js')) {
        console.warn('Share-Modal Script Fehler - wird ignoriert');
        event.preventDefault();
        return;
      }
      
      // Andere kritische Fehler loggen
      if (event.error?.message?.includes('addEventListener')) {
        console.warn('addEventListener Fehler - möglicherweise DOM-Element nicht verfügbar');
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unbehandelte Promise-Rejection:', event.reason);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
};

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Analytics tracking für alle Nicht-Admin-Seiten
  useAnalytics();

  if (isAdminRoute) {
    // Admin-Bereich: Nur der Inhalt ohne Header/Footer
    return (
      <ErrorBoundary>
        <main className="min-h-screen">{children}</main>
      </ErrorBoundary>
    );
  }

  // Normale Website: Mit Header und Footer
  return (
    <ErrorBoundary>
      <TransparentHeader />
      <StickyHeader />
      <main>
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <CookieManager />
    </ErrorBoundary>
  );
} 