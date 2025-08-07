'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [screenWidth, setScreenWidth] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Redirect wenn nicht authentifiziert und nicht auf Login-Seite
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }, [status, pathname]);

  useEffect(() => {
    // Verstecke Loading-Overlay wenn sich der Pfad ändert (Seite geladen)
    const loadingOverlay = document.getElementById('nav-loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
  }, [pathname]);

  const isMobile = screenWidth < 768;

  // Zeige Login-Seite direkt ohne Layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading-State - nur kurz anzeigen
  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <svg 
            style={{ 
              animation: 'spin 1s linear infinite',
              width: '24px',
              height: '24px'
            }} 
            viewBox="0 0 24 24"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="#f8dfa5" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="32" 
              strokeDashoffset="32"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </svg>
          <span>Prüfe Authentifizierung...</span>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Nicht authentifiziert - leite zu Login weiter
  if (!session?.user || (session.user as any).role !== 'admin') {
    // Sofortige Weiterleitung ohne React Router
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return null;
  }

  const navigationItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Newsfeed', href: '/admin/newsfeed', icon: '📰' },
    { name: 'Newsfeed erstellen', href: '/admin/newsfeed/create', icon: '✏️' },
    { name: 'Mediathek', href: '/admin/media', icon: '🖼️' },
    { name: 'Benutzer', href: '/admin/users', icon: '👥' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1000
        }}>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            MissCrypto Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#f8dfa5',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: isMobile ? '80px' : 0,
        left: isMobile && !sidebarOpen ? '-300px' : 0,
        width: '300px',
        height: isMobile ? 'calc(100vh - 80px)' : '100vh',
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(248, 223, 165, 0.3)',
        padding: '2rem 1rem',
        transition: 'left 0.3s ease',
        zIndex: 999,
        overflowY: 'auto'
      }}>
        {/* Desktop Header */}
        {!isMobile && (
          <div style={{
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem'
            }}>
              ⚡
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              MissCrypto
            </h1>
            <p style={{
              color: '#d1d5db',
              fontSize: '0.875rem'
            }}>
              Admin Dashboard
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav style={{
          marginBottom: '2rem'
        }}>
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              onClick={() => {
                isMobile && setSidebarOpen(false);
                
                // Sofortige visuelle Rückmeldung
                const allLinks = document.querySelectorAll('[data-nav-link]');
                allLinks.forEach(link => {
                  (link as HTMLElement).style.background = 'transparent';
                  (link as HTMLElement).style.color = '#d1d5db';
                });
                const currentLink = document.querySelector(`[data-nav-link="${item.href}"]`);
                if (currentLink) {
                  (currentLink as HTMLElement).style.background = 'rgba(248, 223, 165, 0.1)';
                  (currentLink as HTMLElement).style.color = '#f8dfa5';
                }
                
                // Zeige Loading-Overlay für schnelle Navigation
                const loadingOverlay = document.getElementById('nav-loading-overlay');
                if (loadingOverlay) {
                  loadingOverlay.style.display = 'flex';
                  // Verstecke nach kurzer Zeit (falls Seite schnell lädt)
                  setTimeout(() => {
                    if (loadingOverlay.style.display === 'flex') {
                      loadingOverlay.style.display = 'none';
                    }
                  }, 1000);
                }
              }}
              data-nav-link={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                color: pathname === item.href ? '#f8dfa5' : '#d1d5db',
                background: pathname === item.href ? 'rgba(248, 223, 165, 0.1)' : 'transparent',
                textDecoration: 'none',
                marginBottom: '0.5rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
                  e.currentTarget.style.color = '#f8dfa5';
                }
              }}
              onMouseOut={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#d1d5db';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(248, 223, 165, 0.2)'
        }}>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🚪</span>
            Abmelden
          </button>
        </div>


      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={{
        marginLeft: isMobile ? 0 : '300px',
        marginTop: isMobile ? '80px' : 0,
        minHeight: '100vh',
        padding: isMobile ? '1rem' : '2rem',
        position: 'relative'
      }}>
        {/* Loading Overlay für Navigation */}
        <div
          id="nav-loading-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(2px)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: '#f8dfa5'
          }}>
            <svg 
              style={{ 
                animation: 'spin 1s linear infinite',
                width: '20px',
                height: '20px'
              }} 
              viewBox="0 0 24 24"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none" 
                strokeDasharray="32" 
                strokeDashoffset="32"
                style={{ animation: 'spin 1s linear infinite' }}
              />
            </svg>
            <span>Lade...</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
} 