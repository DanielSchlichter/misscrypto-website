'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // SessionProvider nur wenn wirklich nötig
  if (typeof window === 'undefined') {
    // Server-side: Kein SessionProvider
    return <>{children}</>;
  }

  // Client-side: SessionProvider mit minimaler Konfiguration
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      // Basis-URL explizit setzen
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  );
} 