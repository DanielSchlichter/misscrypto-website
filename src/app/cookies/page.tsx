'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TransparentHeader from '../components/TransparentHeader';
import { openCookieManager } from '../../components/CookieManager';

const CookiesPage = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  const handleOpenCookieSettings = () => {
    openCookieManager();
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
      <TransparentHeader />
      
      {/* Hero Section */}
      <section style={{
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        paddingBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
            fontWeight: '500',
            marginBottom: isMobile ? '1rem' : '1.5rem',
            color: '#ffffff',
            lineHeight: '1.2',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Cookie-Richtlinie
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
            color: '#d1d5db',
            maxWidth: '700px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Informationen zur Verwendung von Cookies auf misscrypto.de
          </p>
          
          {/* Cookie-Einstellungen Button */}
          <button
            onClick={handleOpenCookieSettings}
            style={{
              background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
              color: '#000000',
              border: 'none',
              padding: isMobile ? '0.875rem 1.5rem' : isTablet ? '0.9375rem 1.75rem' : '1rem 2rem',
              borderRadius: '0.75rem',
              fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)',
              fontFamily: 'Raleway, sans-serif',
              minHeight: isMobile ? '44px' : '48px',
              minWidth: isMobile ? '200px' : '240px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 223, 165, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
            }}
          >
            🍪 Cookie-Einstellungen verwalten
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ 
        paddingBottom: isMobile ? '4rem' : isTablet ? '5rem' : '6rem'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: isMobile ? '1rem' : '1.5rem',
            padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            
            {/* Einleitung */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Was sind Cookies?
              </h2>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                textAlign: 'justify',
                marginBottom: '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Cookies sind kleine Textdateien, die von Ihrem Webbrowser auf Ihrem Computer oder mobilen Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie ermöglichen es der Website, Ihre Aktionen und Präferenzen über einen bestimmten Zeitraum zu speichern.
              </p>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                textAlign: 'justify',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Diese Website verwendet Cookies, um Ihnen eine bessere Benutzererfahrung zu bieten, die Leistung unserer Website zu analysieren und für Werbezwecke.
              </p>
            </div>

            {/* Arten von Cookies */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Arten von Cookies, die wir verwenden
              </h2>
              
              {/* Notwendige Cookies */}
              <div style={{ 
                marginBottom: isMobile ? '1.5rem' : '2rem'
              }}>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    🔧 Notwendige Cookies
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                    textAlign: 'justify',
                    marginBottom: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich und können nicht deaktiviert werden.
                  </p>
                  <ul style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    paddingLeft: isMobile ? '1rem' : '1.5rem',
                    listStyleType: 'disc',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}>Sitzungs-Cookies für die Navigation</li>
                    <li style={{ marginBottom: '0.5rem' }}>Sicherheits-Cookies für den Schutz vor Angriffen</li>
                    <li>Cookie-Einstellungen und Zustimmungen</li>
                  </ul>
                </div>
              </div>

              {/* Analytische Cookies */}
              <div style={{ 
                marginBottom: isMobile ? '1.5rem' : '2rem'
              }}>
                <div style={{ 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#93c5fd',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    📊 Analytische Cookies
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                    textAlign: 'justify',
                    marginBottom: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und berichten.
                  </p>
                  <ul style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    paddingLeft: isMobile ? '1rem' : '1.5rem',
                    listStyleType: 'disc',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Google Analytics:</strong> Zur Analyse des Website-Traffics und Nutzerverhaltens</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Seitenaufrufe:</strong> Zählung der besuchten Seiten</li>
                    <li><strong>Verweildauer:</strong> Messung der Zeit auf der Website</li>
                  </ul>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div style={{ 
                marginBottom: isMobile ? '1.5rem' : '2rem'
              }}>
                <div style={{ 
                  background: 'rgba(168, 85, 247, 0.1)', 
                  padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(168, 85, 247, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#c4b5fd',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    📱 Marketing Cookies
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                    textAlign: 'justify',
                    marginBottom: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Diese Cookies werden verwendet, um Werbung zu verfolgen und personalisierte Anzeigen zu schalten.
                  </p>
                  <ul style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    paddingLeft: isMobile ? '1rem' : '1.5rem',
                    listStyleType: 'disc',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>AFFILAE:</strong> Affiliate-Marketing-Tracking</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Retargeting:</strong> Anzeigen basierend auf Ihrem Browsing-Verhalten</li>
                    <li><strong>Conversion-Tracking:</strong> Messung der Effektivität von Werbekampagnen</li>
                  </ul>
                </div>
              </div>

              {/* Funktionale Cookies */}
              <div>
                <div style={{ 
                  background: 'rgba(34, 197, 94, 0.1)', 
                  padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#86efac',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    ⚙️ Funktionale Cookies
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                    textAlign: 'justify',
                    marginBottom: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Diese Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung der Website.
                  </p>
                  <ul style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    paddingLeft: isMobile ? '1rem' : '1.5rem',
                    listStyleType: 'disc',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}>Spracheinstellungen</li>
                    <li style={{ marginBottom: '0.5rem' }}>Benutzerpräferenzen</li>
                    <li>Kommentarfunktionen</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cookie-Verwaltung */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Cookie-Verwaltung und Kontrolle
              </h2>
              
              <div style={{
                background: 'rgba(248, 223, 165, 0.1)',
                padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(248, 223, 165, 0.2)',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: '#f8dfa5',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Browser-Einstellungen
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  marginBottom: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Sie können Cookies in Ihrem Browser verwalten und kontrollieren:
                </p>
                <ul style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                  paddingLeft: isMobile ? '1rem' : '1.5rem',
                  listStyleType: 'disc',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Chrome:</strong> Einstellungen {'>'} Datenschutz {'>'} Cookies</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Firefox:</strong> Einstellungen {'>'} Datenschutz {'>'} Cookies</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Safari:</strong> Einstellungen {'>'} Datenschutz {'>'} Cookies</li>
                  <li><strong>Edge:</strong> Einstellungen {'>'} Cookies</li>
                </ul>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: '#93c5fd',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Opt-Out-Möglichkeiten
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  marginBottom: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Für spezielle Dienste können Sie das Tracking direkt deaktivieren:
                </p>
                <ul style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                  paddingLeft: isMobile ? '1rem' : '1.5rem',
                  listStyleType: 'disc',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Google Analytics:</strong>{' '}
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#93c5fd', 
                        textDecoration: 'underline',
                        fontSize: isMobile ? '0.8rem' : '0.85rem'
                      }}
                    >
                      Browser Add-on zur Deaktivierung
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Werbe-Cookies:</strong>{' '}
                    <a 
                      href="https://www.youronlinechoices.eu/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#93c5fd', 
                        textDecoration: 'underline',
                        fontSize: isMobile ? '0.8rem' : '0.85rem'
                      }}
                    >
                      Your Online Choices
                    </a>
                  </li>
                  <li>
                    <strong>Do Not Track:</strong> Aktivieren Sie "Do Not Track" in Ihrem Browser
                  </li>
                </ul>
              </div>
            </div>

            {/* Rechtsgrundlagen */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Rechtsgrundlagen
              </h2>
              <div style={{
                background: 'rgba(156, 163, 175, 0.1)',
                padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(156, 163, 175, 0.2)'
              }}>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  marginBottom: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Die Verwendung von Cookies erfolgt auf folgenden Rechtsgrundlagen:
                </p>
                <ul style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.95rem',
                  paddingLeft: isMobile ? '1rem' : '1.5rem',
                  listStyleType: 'disc',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#f8dfa5' }}>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Für Marketing- und Analyse-Cookies nach Ihrer ausdrücklichen Zustimmung
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#f8dfa5' }}>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):</strong> Für technisch notwendige Cookies zur Bereitstellung der Website-Funktionalität
                  </li>
                  <li>
                    <strong style={{ color: '#f8dfa5' }}>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Für Cookies, die zur Erbringung angefordeter Dienste erforderlich sind
                  </li>
                </ul>
              </div>
            </div>

            {/* Speicherdauer */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Speicherdauer der Cookies
              </h2>
              <div style={{
                background: 'rgba(248, 223, 165, 0.1)',
                padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(248, 223, 165, 0.2)'
              }}>
                <ul style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.95rem',
                  paddingLeft: isMobile ? '1rem' : '1.5rem',
                  listStyleType: 'disc',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#f8dfa5' }}>Session-Cookies:</strong> Werden beim Schließen des Browsers gelöscht
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#f8dfa5' }}>Persistente Cookies:</strong> Bleiben für einen festgelegten Zeitraum gespeichert (meist 1-24 Monate)
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#f8dfa5' }}>Analytics-Cookies:</strong> Speicherdauer von bis zu 26 Monaten
                  </li>
                  <li>
                    <strong style={{ color: '#f8dfa5' }}>Marketing-Cookies:</strong> Speicherdauer von bis zu 13 Monaten
                  </li>
                </ul>
              </div>
            </div>

            {/* Kontakt und Updates */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Kontakt und Aktualisierungen
              </h2>
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                padding: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  marginBottom: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Bei Fragen zu unserer Cookie-Richtlinie können Sie uns jederzeit kontaktieren:
                </p>
                <p style={{
                  color: '#86efac',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  marginBottom: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  <strong>E-Mail:</strong>{' '}
                  <a 
                    href="mailto:contact@misscrypto.de" 
                    style={{ 
                      color: '#86efac', 
                      textDecoration: 'underline',
                      fontSize: isMobile ? '0.85rem' : '0.9rem'
                    }}
                  >
                    contact@misscrypto.de
                  </a>
                </p>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Diese Cookie-Richtlinie kann von Zeit zu Zeit aktualisiert werden. Änderungen werden auf dieser Seite veröffentlicht.
                </p>
              </div>
            </div>

            {/* Letzte Aktualisierung */}
            <div style={{ 
              marginBottom: '2rem',
              padding: isMobile ? '0.75rem' : '1rem',
              background: 'rgba(248, 223, 165, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#f8dfa5',
                fontWeight: '500',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Letzte Aktualisierung: 27. Januar 2025
              </p>
            </div>

            {/* Back to Home Link */}
            <div style={{ textAlign: 'center' }}>
              <Link 
                href="/"
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isMobile ? '0.75rem 1.25rem' : isTablet ? '0.8rem 1.375rem' : '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                  fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                  fontFamily: 'Raleway, sans-serif',
                  minHeight: isMobile ? '44px' : '48px',
                  minWidth: isMobile ? '180px' : '200px'
                }}
              >
                Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPage; 