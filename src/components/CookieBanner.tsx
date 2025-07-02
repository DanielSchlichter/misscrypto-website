'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

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

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Immer erforderlich
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    setMounted(true);
    
    // Prüfe ob bereits eine Entscheidung getroffen wurde
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Lade gespeicherte Präferenzen
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      // Lade entsprechende Scripts
      loadScripts(savedPreferences);
    }
  }, []);

  const loadScripts = (prefs: CookiePreferences) => {
    // Google Analytics nur laden wenn Analytics zugestimmt wurde
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

    // Marketing Scripts (AFFILAE etc.)
    if (prefs.marketing && !document.querySelector('[data-marketing]')) {
      // Hier können Marketing-Scripts geladen werden
      console.log('Marketing scripts loaded');
    }

    // Functional Scripts
    if (prefs.functional && !document.querySelector('[data-functional]')) {
      // Hier können funktionale Scripts geladen werden
      console.log('Functional scripts loaded');
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    saveConsent(allAccepted);
    loadScripts(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    saveConsent(onlyNecessary);
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    saveConsent(preferences);
    loadScripts(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Setze Cookie für 13 Monate (Deutschland Anforderung)
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 13);
    document.cookie = `cookie-consent=${JSON.stringify(prefs)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Notwendige Cookies können nicht deaktiviert werden
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!mounted || !showBanner) return null;

  const bannerContent = (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 99998
        }}
      />
      
      {/* Cookie Banner Modal */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
      >
        <div style={{
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            color: '#ffffff',
            fontFamily: 'Raleway, sans-serif'
          }}>
            {!showSettings ? (
              // Standard Banner
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ color: '#000000', fontSize: '18px' }}>🍪</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#f8dfa5',
                      marginBottom: '1rem',
                      margin: 0
                    }}>
                      Wir respektieren Ihre Privatsphäre
                    </h3>
                    <p style={{
                      color: '#d1d5db',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      marginBottom: '0.5rem',
                      margin: '1rem 0 0.5rem 0'
                    }}>
                      Diese Website verwendet Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. 
                      Notwendige Cookies sind für die Grundfunktionen der Website erforderlich. 
                      Andere Cookies helfen uns, die Website zu verbessern und personalisierte Inhalte anzuzeigen.
                    </p>
                    <p style={{
                      color: '#9ca3af',
                      fontSize: '0.75rem',
                      margin: 0
                    }}>
                      Weitere Informationen finden Sie in unserer{' '}
                      <Link href="/datenschutz" style={{ color: '#f8dfa5', textDecoration: 'underline' }}>
                        Datenschutzerklärung
                      </Link>{' '}
                      und{' '}
                      <Link href="/cookies" style={{ color: '#f8dfa5', textDecoration: 'underline' }}>
                        Cookie-Richtlinie
                      </Link>.
                    </p>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: window.innerWidth < 640 ? 'column' : 'row',
                  gap: '0.75rem' 
                }}>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
                      color: '#000000',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Alle Cookies akzeptieren
                  </button>
                  
                  <button
                    onClick={handleRejectAll}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#d1d5db',
                      border: '1px solid #6b7280',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Nur notwendige Cookies
                  </button>
                  
                  <button
                    onClick={() => setShowSettings(true)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#f8dfa5',
                      border: '1px solid rgba(248, 223, 165, 0.5)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(248, 223, 165, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Einstellungen anpassen
                  </button>
                </div>
              </>
            ) : (
              // Detaillierte Einstellungen
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#f8dfa5',
                    margin: 0
                  }}>
                    Cookie-Einstellungen
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    style={{
                      color: '#9ca3af',
                      background: 'none',
                      border: 'none',
                      padding: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  {/* Notwendige Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontWeight: '600', color: '#ffffff', margin: 0, marginBottom: '0.25rem' }}>Notwendige Cookies</h4>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                          Erforderlich für grundlegende Website-Funktionen
                        </p>
                      </div>
                      <div style={{
                        width: '48px',
                        height: '24px',
                        backgroundColor: '#f8dfa5',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 4px'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#000000',
                          borderRadius: '50%',
                          transform: 'translateX(24px)',
                          transition: 'transform 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                      Diese Cookies sind für die ordnungsgemäße Funktion der Website unerlässlich.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontWeight: '600', color: '#ffffff', margin: 0, marginBottom: '0.25rem' }}>Analytics Cookies</h4>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                          Google Analytics für Nutzungsstatistiken
                        </p>
                      </div>
                      <button
                        onClick={() => handleTogglePreference('analytics')}
                        style={{
                          width: '48px',
                          height: '24px',
                          backgroundColor: preferences.analytics ? '#f8dfa5' : '#6b7280',
                          borderRadius: '12px',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 4px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#ffffff',
                          borderRadius: '50%',
                          transform: preferences.analytics ? 'translateX(24px)' : 'translateX(0)',
                          transition: 'transform 0.3s ease'
                        }}></div>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                      Status: {preferences.analytics ? 'Aktiviert' : 'Deaktiviert'}
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontWeight: '600', color: '#ffffff', margin: 0, marginBottom: '0.25rem' }}>Marketing Cookies</h4>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                          AFFILAE und Werbepartner
                        </p>
                      </div>
                      <button
                        onClick={() => handleTogglePreference('marketing')}
                        style={{
                          width: '48px',
                          height: '24px',
                          backgroundColor: preferences.marketing ? '#f8dfa5' : '#6b7280',
                          borderRadius: '12px',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 4px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#ffffff',
                          borderRadius: '50%',
                          transform: preferences.marketing ? 'translateX(24px)' : 'translateX(0)',
                          transition: 'transform 0.3s ease'
                        }}></div>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                      Status: {preferences.marketing ? 'Aktiviert' : 'Deaktiviert'}
                    </p>
                  </div>

                  {/* Functional Cookies */}
                  <div style={{
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontWeight: '600', color: '#ffffff', margin: 0, marginBottom: '0.25rem' }}>Funktionale Cookies</h4>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                          Erweiterte Website-Funktionen
                        </p>
                      </div>
                      <button
                        onClick={() => handleTogglePreference('functional')}
                        style={{
                          width: '48px',
                          height: '24px',
                          backgroundColor: preferences.functional ? '#f8dfa5' : '#6b7280',
                          borderRadius: '12px',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 4px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#ffffff',
                          borderRadius: '50%',
                          transform: preferences.functional ? 'translateX(24px)' : 'translateX(0)',
                          transition: 'transform 0.3s ease'
                        }}></div>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                      Status: {preferences.functional ? 'Aktiviert' : 'Deaktiviert'}
                    </p>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: window.innerWidth < 640 ? 'column' : 'row',
                  gap: '0.75rem' 
                }}>
                  <button
                    onClick={handleSaveSettings}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
                      color: '#000000',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Einstellungen speichern
                  </button>
                  
                  <button
                    onClick={handleRejectAll}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#d1d5db',
                      border: '1px solid #6b7280',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Alle ablehnen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );

  // Render als Portal direkt in den document.body
  return createPortal(bannerContent, document.body);
};

export default CookieBanner; 