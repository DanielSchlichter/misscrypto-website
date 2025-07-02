'use client';

import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

// Globale Funktion zum Öffnen des Cookie-Managers
let openCookieManagerGlobal: (() => void) | null = null;

export const openCookieManager = () => {
  if (openCookieManagerGlobal) {
    openCookieManagerGlobal();
  }
};

const CookieManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });
  const [hasConsent, setHasConsent] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Lade aktuelle Einstellungen
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      setPreferences(JSON.parse(consent));
      setHasConsent(true);
    }

    // Setze globale Funktion
    openCookieManagerGlobal = () => setIsOpen(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      openCookieManagerGlobal = null;
    };
  }, []);

  const isMobile = screenWidth < 768;

  const removeScripts = () => {
    // Entferne alle Tracking-Scripts
    const scripts = document.querySelectorAll('[data-gtag], [data-marketing], [data-functional]');
    scripts.forEach(script => script.remove());
    
    // Lösche Google Analytics Daten
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  const loadScripts = (prefs: CookiePreferences) => {
    // Gleiche Logik wie im CookieBanner
    if (prefs.analytics && !document.querySelector('[data-gtag]')) {
      const script1 = document.createElement('script');
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      script1.async = true;
      script1.setAttribute('data-gtag', 'true');
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.setAttribute('data-gtag', 'true');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      `;
      document.head.appendChild(script2);
    }

    if (prefs.marketing && !document.querySelector('[data-marketing]')) {
      console.log('Marketing scripts loaded');
    }

    if (prefs.functional && !document.querySelector('[data-functional]')) {
      console.log('Functional scripts loaded');
    }
  };

  const handleSaveSettings = () => {
    // Entferne zunächst alle Scripts
    removeScripts();
    
    // Speichere neue Einstellungen
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Cookie für 13 Monate setzen
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 13);
    document.cookie = `cookie-consent=${JSON.stringify(preferences)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
    
    // Lade entsprechende Scripts
    loadScripts(preferences);
    
    setIsOpen(false);
    setHasConsent(true);
  };

  const handleResetConsent = () => {
    // Lösche alle Cookies und localStorage
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    document.cookie = 'cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Entferne alle Scripts
    removeScripts();
    
    // Reset Präferenzen
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    });
    
    setHasConsent(false);
    setIsOpen(false);
    
    // Lade Seite neu um Cookie-Banner zu zeigen
    window.location.reload();
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Zeige Manager nur wenn Modal geöffnet ist oder wenn Consent existiert
  if (!isOpen && !hasConsent) return null;

  return (
    <>
      {/* Floating Cookie Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        title="Cookie-Einstellungen verwalten"
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          zIndex: 99997,
          background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
          color: '#000000',
          padding: '0.75rem',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          fontSize: '1.125rem',
          transition: 'all 0.3s ease',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        🍪
      </button>

      {/* Cookie Manager Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 99998
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '1rem'
          }}>
            <div style={{
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                padding: isMobile ? '1.5rem' : '2rem',
                border: '1px solid rgba(248, 223, 165, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.125rem' : '1.25rem',
                    fontWeight: '600',
                    color: '#f8dfa5',
                    margin: 0
                  }}>
                    🍪 Cookie-Einstellungen verwalten
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: '#9ca3af',
                      background: 'none',
                      border: 'none',
                      padding: '0.25rem',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#9ca3af';
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {/* Notwendige Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: 0,
                          fontSize: isMobile ? '0.875rem' : '1rem'
                        }}>
                          🔧 Notwendige Cookies
                        </h4>
                        <p style={{
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          color: '#9ca3af',
                          margin: '0.25rem 0 0 0'
                        }}>
                          Erforderlich für grundlegende Website-Funktionen
                        </p>
                      </div>
                      <div style={{
                        width: '48px',
                        height: '24px',
                        background: '#f8dfa5',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 2px',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          background: '#000000',
                          borderRadius: '50%',
                          transform: 'translateX(24px)',
                          transition: 'transform 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      Diese Cookies sind für die ordnungsgemäße Funktion der Website unerlässlich.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: 0,
                          fontSize: isMobile ? '0.875rem' : '1rem'
                        }}>
                          📊 Analytics Cookies
                        </h4>
                        <p style={{
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          color: '#9ca3af',
                          margin: '0.25rem 0 0 0'
                        }}>
                          Google Analytics für Nutzungsstatistiken
                        </p>
                      </div>
                      <button
                        onClick={() => handleTogglePreference('analytics')}
                        style={{
                          position: 'relative',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          width: '48px',
                          height: '24px',
                          background: preferences.analytics ? '#f8dfa5' : '#6b7280',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 2px',
                          transition: 'background 0.3s ease'
                        }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            background: '#ffffff',
                            borderRadius: '50%',
                            transform: preferences.analytics ? 'translateX(24px)' : 'translateX(0px)',
                            transition: 'transform 0.3s ease'
                          }}></div>
                        </div>
                      </button>
                    </div>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      Status: {preferences.analytics ? 'Aktiviert' : 'Deaktiviert'}
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: 0,
                          fontSize: isMobile ? '0.875rem' : '1rem'
                        }}>
                          🎯 Marketing Cookies
                        </h4>
                        <p style={{
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          color: '#9ca3af',
                          margin: '0.25rem 0 0 0'
                        }}>
                          AFFILAE und Werbepartner
                        </p>
                      </div>
                      <button
                        onClick={() => handleTogglePreference('marketing')}
                        style={{
                          position: 'relative',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          width: '48px',
                          height: '24px',
                          background: preferences.marketing ? '#f8dfa5' : '#6b7280',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 2px',
                          transition: 'background 0.3s ease'
                        }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            background: '#ffffff',
                            borderRadius: '50%',
                            transform: preferences.marketing ? 'translateX(24px)' : 'translateX(0px)',
                            transition: 'transform 0.3s ease'
                          }}></div>
                        </div>
                      </button>
                    </div>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      Status: {preferences.marketing ? 'Aktiviert' : 'Deaktiviert'}
                    </p>
                  </div>

                  {/* Functional Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: 0,
                          fontSize: isMobile ? '0.875rem' : '1rem'
                        }}>
                          ⚙️ Funktionale Cookies
                        </h4>
                        <p style={{
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          color: '#9ca3af',
                          margin: '0.25rem 0 0 0'
                        }}>
                          Erweiterte Website-Funktionen
                        </p>
                      </div>
                      <button
                        onClick={() => handleTogglePreference('functional')}
                        style={{
                          position: 'relative',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          width: '48px',
                          height: '24px',
                          background: preferences.functional ? '#f8dfa5' : '#6b7280',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 2px',
                          transition: 'background 0.3s ease'
                        }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            background: '#ffffff',
                            borderRadius: '50%',
                            transform: preferences.functional ? 'translateX(24px)' : 'translateX(0px)',
                            transition: 'transform 0.3s ease'
                          }}></div>
                        </div>
                      </button>
                    </div>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      Status: {preferences.functional ? 'Aktiviert' : 'Deaktiviert'}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '0.75rem'
                }}>
                  <button
                    onClick={handleSaveSettings}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      color: '#000000',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease',
                      fontSize: isMobile ? '0.875rem' : '1rem'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    ✅ Einstellungen speichern
                  </button>
                  
                  <button
                    onClick={handleResetConsent}
                    style={{
                      flex: 1,
                      background: '#dc2626',
                      color: '#ffffff',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                      fontSize: isMobile ? '0.875rem' : '1rem'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#b91c1c';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#dc2626';
                    }}
                  >
                    🗑️ Einwilligung zurücksetzen
                  </button>
                </div>

                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginTop: '1rem',
                  textAlign: 'center',
                  margin: '1rem 0 0 0'
                }}>
                  Letzte Aktualisierung Ihrer Einstellungen: {localStorage.getItem('cookie-consent-date') ? 
                    new Date(localStorage.getItem('cookie-consent-date')!).toLocaleDateString('de-DE') : 
                    'Unbekannt'
                  }
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CookieManager; 