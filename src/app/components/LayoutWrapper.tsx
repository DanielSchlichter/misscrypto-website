'use client';

import { usePathname } from 'next/navigation';
import TransparentHeader from './TransparentHeader';
import StickyHeader from './StickyHeader';
import Footer from './Footer';
import CookieBanner from '../../components/CookieBanner';
import CookieManager from '../../components/CookieManager';
import { useAnalytics } from '../../hooks/useAnalytics';

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
    return <main className="min-h-screen">{children}</main>;
  }

  // Normale Website: Mit Header und Footer
  return (
    <>
      <TransparentHeader />
      <StickyHeader />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <CookieManager />
    </>
  );
} 