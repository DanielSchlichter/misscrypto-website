'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut, SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { DataStoreProvider, useDataStore } from './DataStore';

// Components laden
const AdminApp = dynamic(() => import('./AdminApp'), {
  ssr: false
});

interface NavigationItem {
  name: string;
  view?: string;
  icon: React.ReactNode;
  submenu?: {
    name: string;
    view: string;
    icon: React.ReactNode;
  }[];
}

function AdminContentInner() {
  const { data: session, status } = useSession();
  const { isLoading: dataLoading } = useDataStore();
  const [currentView, setCurrentView] = useState('dashboard');
  const [screenWidth, setScreenWidth] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [lastAuthCheck, setLastAuthCheck] = useState<number>(Date.now());

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auth check nur alle 10 Minuten
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastAuthCheck > 600000) { // 10 Minuten
        console.log('🔐 10-Minuten Auth-Check...');
        if (status === 'unauthenticated') {
          window.location.href = '/admin/login';
        }
        setLastAuthCheck(now);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [status, lastAuthCheck]);

  const isMobile = screenWidth < 768;

  const navigationItems: NavigationItem[] = [
    {
      name: 'Dashboard',
      view: 'dashboard',
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
      view: 'newsfeed',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h7"/>
          <circle cx="17" cy="18" r="3"/>
        </svg>
      )
    },
    {
      name: 'Artikel erstellen',
      view: 'newsfeed-create',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      )
    },
    {
      name: 'Mediathek',
      view: 'media',
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
          view: 'users',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          )
        },
        {
          name: 'Authoren',
          view: 'authors',
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

  // Loading state - nur beim ersten Laden
  if ((status === 'loading' && !session) || dataLoading) {
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
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <svg
            style={{
              animation: 'spin 1s linear infinite',
              width: '48px',
              height: '48px'
            }}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#f8dfa5"
              strokeWidth="3"
              fill="none"
              strokeDasharray="32"
              strokeDashoffset="32"
            />
          </svg>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', color: '#f8dfa5', marginBottom: '0.5rem' }}>
              Lade Admin Panel...
            </div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              Alle Daten werden vorgeladen für optimale Performance
            </div>
          </div>
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

  // Nicht authentifiziert
  if (!session?.user || (session.user as any).role !== 'admin') {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return null;
  }

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
                      <button
                        key={subItem.view}
                        onClick={() => {
                          setCurrentView(subItem.view);
                          isMobile && setSidebarOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          color: currentView === subItem.view ? '#f8dfa5' : '#d1d5db',
                          background: currentView === subItem.view ? 'rgba(248, 223, 165, 0.1)' : 'transparent',
                          border: 'none',
                          width: '100%',
                          textAlign: 'left',
                          marginBottom: '0.25rem',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontFamily: 'Raleway, sans-serif'
                        }}
                        onMouseOver={(e) => {
                          if (currentView !== subItem.view) {
                            e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
                            e.currentTarget.style.color = '#f8dfa5';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (currentView !== subItem.view) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#d1d5db';
                          }
                        }}
                      >
                        <span style={{ color: 'currentColor', opacity: 0.8 }}>{subItem.icon}</span>
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view!);
                  isMobile && setSidebarOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  color: currentView === item.view ? '#f8dfa5' : '#d1d5db',
                  background: currentView === item.view ? 'rgba(248, 223, 165, 0.1)' : 'transparent',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  marginBottom: '0.5rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
                onMouseOver={(e) => {
                  if (currentView !== item.view) {
                    e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
                    e.currentTarget.style.color = '#f8dfa5';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentView !== item.view) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#d1d5db';
                  }
                }}
              >
                <span style={{ color: 'currentColor' }}>{item.icon}</span>
                {item.name}
              </button>
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
              transition: 'all 0.3s ease',
              fontFamily: 'Raleway, sans-serif'
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
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
        <AdminApp currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </div>
  );
}

function AdminContent() {
  return (
    <DataStoreProvider>
      <AdminContentInner />
    </DataStoreProvider>
  );
}

export default function AdminPage() {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      basePath="/api/auth"
    >
      <AdminContent />
    </SessionProvider>
  );
}