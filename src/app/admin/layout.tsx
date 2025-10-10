'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut, SessionProvider } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [screenWidth, setScreenWidth] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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

  const navigationItems: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    {
      name: 'Newsfeed',
      href: '/admin/newsfeed',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h7"/>
          <circle cx="17" cy="18" r="3"/>
        </svg>
      )
    },
    {
      name: 'Artikel erstellen',
      href: '/admin/newsfeed/create',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      )
    },
    {
      name: 'Mediathek',
      href: '/admin/media',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      )
    },
    {
      name: 'Benutzer',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      submenu: [
        {
          name: 'Admins',
          href: '/admin/users',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          )
        },
        {
          name: 'Authoren',
          href: '/admin/authors',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
            </svg>
          )
        }
      ]
    }
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
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Image
                src="/logos/Logo-weiss.webp"
                alt="MissCrypto Logo"
                width={160}
                height={60}
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{
          marginBottom: '2rem'
        }}>
          {navigationItems.map((item) => (
            item.submenu ? (
              // Dropdown für Benutzer
              <div key={item.name}>
                <button
                  onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    color: expandedMenu === item.name ? '#f8dfa5' : '#d1d5db',
                    background: expandedMenu === item.name ? 'rgba(248, 223, 165, 0.1)' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '1rem',
                    marginBottom: '0.5rem'
                  }}
                  onMouseOver={(e) => {
                    if (expandedMenu !== item.name) {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
                      e.currentTarget.style.color = '#f8dfa5';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (expandedMenu !== item.name) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#d1d5db';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'currentColor' }}>{item.icon}</span>
                    {item.name}
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: expandedMenu === item.name ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Submenu Items */}
                {expandedMenu === item.name && (
                  <div style={{
                    marginLeft: '2rem',
                    marginBottom: '0.5rem',
                    borderLeft: '2px solid rgba(248, 223, 165, 0.2)',
                    paddingLeft: '1rem'
                  }}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        prefetch={true}
                        onClick={() => {
                          isMobile && setSidebarOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          color: pathname === subItem.href ? '#f8dfa5' : '#d1d5db',
                          background: pathname === subItem.href ? 'rgba(248, 223, 165, 0.1)' : 'transparent',
                          textDecoration: 'none',
                          marginBottom: '0.25rem',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                        onMouseOver={(e) => {
                          if (pathname !== subItem.href) {
                            e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
                            e.currentTarget.style.color = '#f8dfa5';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (pathname !== subItem.href) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#d1d5db';
                          }
                        }}
                      >
                        <span style={{ color: 'currentColor', opacity: 0.8 }}>{subItem.icon}</span>
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
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
              <span style={{ color: 'currentColor' }}>{item.icon}</span>
              {item.name}
            </Link>
            )
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
        marginLeft: 300,
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      basePath="/api/auth"
    >
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </SessionProvider>
  );
} 