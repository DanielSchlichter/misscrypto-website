'use client';

import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

const BitvavoPage = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const { trackExchangeClick } = useAnalytics();

  // Responsive breakpoints
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

  return (
    <>
      <style jsx>{`
        .shiny-divider {
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(248, 223, 165, 0.3) 20%,
            rgba(248, 223, 165, 0.8) 50%,
            rgba(248, 223, 165, 0.3) 80%,
            transparent 100%
          );
          position: relative;
          overflow: hidden;
          margin: 0;
        }

        .shiny-divider::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 20%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0.1) 80%,
            transparent 100%
          );
          animation: shine 4s ease-in-out infinite;
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
        minHeight: 'auto',
        paddingBottom: isMobile ? '1.5rem' : '2rem',
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(248, 223, 165, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 0.8fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center',
            minHeight: isMobile ? 'auto' : '50vh'
          }}>

            {/* Text Content - Left Side */}
            <div style={{
              textAlign: isMobile ? 'center' : 'left',
              position: 'relative'
            }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: isMobile ? '0.875rem' : isTablet ? '1rem' : '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Empfohlene Krypto-Börse
              </div>

              <h1 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.75rem' : '3.5rem',
                fontWeight: '600',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Bitvavo</span> - Europas führende Krypto-Börse
              </h1>

              <p style={{
                color: '#d1d5db',
                fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
                lineHeight: '1.6',
                textAlign: isMobile ? 'center' : 'left',
                marginLeft: '0',
                marginRight: '0',
                maxWidth: 'none',
                marginBottom: '2rem'
              }}>
                MiCA-lizenziert, sicher und benutzerfreundlich – über 4 Millionen Nutzer vertrauen bereits auf Bitvavo.
                Mit nur 0,25% Gebühren und über 400 Kryptowährungen die ideale Börse für deinen Krypto-Einstieg.
              </p>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: isMobile ? 'center' : 'flex-start',
                flexWrap: 'wrap' as const,
                marginBottom: '2rem'
              }}>
                <a
                  href="https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExchangeClick('Bitvavo')}
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🚀 Jetzt bei Bitvavo starten
                </a>
              </div>

            </div>

            {/* Image - Right Side */}
            {!isMobile && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: isTablet ? '50vh' : '60vh'
              }}>
                <img
                  src="/logos/Steffi-Landingpage-Bild-scaled-1%202.webp"
                  alt="MissCrypto Bitvavo"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    maxHeight: isTablet ? '60vh' : '70vh',
                    width: 'auto',
                    borderRadius: '12px',
                    marginBottom: '-40px'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shiny Divider */}
      <div className="shiny-divider"></div>

      {/* Bitvavo Feature Section */}
      <div style={{
        paddingTop: isMobile ? '1.5rem' : '2rem',
        paddingBottom: isMobile ? '0.75rem' : '1rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
            fontWeight: '600',
            lineHeight: '1.2',
            marginBottom: '1rem',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Warum <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
            }}>Bitvavo</span>?
          </h2>
          <p style={{
            color: '#d1d5db',
            fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: '800px'
          }}>
            Bitvavo ist eine der größten Krypto-Börsen in Europa und überzeugt durch Sicherheit, niedrige Gebühren und Benutzerfreundlichkeit.
          </p>
        </div>
      </div>

      {/* Exchange Detail Cards */}
      <div style={{
        paddingTop: '0'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1.5rem' : '2rem'
        }}>
          {/* Exchange Cards Section */}
          <div style={{
            flex: isMobile ? '1' : '1',
            display: isMobile ? 'flex' : 'block',
            flexDirection: isMobile ? 'column' : undefined,
            gap: isMobile ? '1.5rem' : undefined,
            alignItems: isMobile ? 'center' : 'stretch'
          }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                borderRadius: '16px',
                padding: isMobile ? '1.5rem' : '2rem',
                border: '2px solid rgba(248, 223, 165, 0.4)',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0 10px 25px rgba(248, 223, 165, 0.2)',
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: isMobile ? '380px' : 'none',
                marginBottom: '2rem'
              }}
            >
              {/* Bonus Badge */}
              <div style={{
                position: 'absolute',
                top: isMobile ? '-12px' : '-15px',
                right: isMobile ? '10px' : '20px',
                background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                color: '#000000',
                padding: isMobile ? '0.4rem 0.75rem' : '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 3,
                boxShadow: '0 4px 12px rgba(248, 223, 165, 0.3)'
              }}>
                🏆 MiCA-lizenziert
              </div>

              {/* Logo and Crypto Icons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1rem',
                  width: 'fit-content'
                }}>
                  <img
                    src="/logos/bitvavo.svg"
                    alt="Bitvavo Logo"
                    style={{
                      height: '40px',
                      objectFit: 'contain',
                      marginBottom: '-20px'
                    }}
                  />
                </div>

                {/* Crypto Icons */}
                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem', textAlign: 'right' }}>
                    KRYPTOWÄHRUNGEN
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {/* Bitcoin */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#F7931A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}>₿</div>
                    {/* Ethereum */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#627EEA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}>Ξ</div>
                    {/* XRP */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#23292F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}>✕</div>
                    {/* Plus Icon */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(248, 223, 165, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#f8dfa5'
                    }}>+400</div>
                  </div>
                </div>
              </div>

              {/* Exchange Info Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: isMobile ? '0.5rem' : '1rem',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>
                <div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Mindesteinzahlung:</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>1,00 €</div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Gebühren:</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>0,25%</div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Firmensitz:</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Niederlande 🇳🇱
                  </div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Gründung:</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    2018
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExchangeClick('Bitvavo')}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  color: '#000000',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                ZUM ANBIETER →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Table of Contents */}
      <div style={{ padding: isMobile ? '2rem 0' : '3rem 0' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{ display: 'flex', gap: isMobile ? '2rem' : '3rem', position: 'relative' }}>

            {/* Main Content */}
            <div style={{ flex: '1', maxWidth: isMobile ? '100%' : '800px' }}>

              <section id="bitvavo-detail" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.75rem' : '1rem',
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}>
                  <div style={{
                    width: isMobile ? '40px' : '60px',
                    height: isMobile ? '40px' : '60px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '1.125rem' : '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e'
                  }}>
                    1
                  </div>
                  <h2 style={{
                    color: '#ffffff',
                    fontSize: isMobile ? '1.25rem' : '1.75rem',
                    fontWeight: '700',
                    margin: 0,
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Empfohlene Krypto-Börse: Bitvavo
                  </h2>
                </div>

                <div style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Bitvavo ist eine der größten Krypto-Börsen Europas mit Sitz in Amsterdam und gilt als Top-Adresse für sichere und günstige Investments in Kryptowährungen. Die Plattform richtet sich sowohl an Einsteiger als auch an professionelle Trader und überzeugt mit niedrigen Gebühren, einer benutzerfreundlichen App und starker Regulierung.
                  </p>

                  {/* Feature Highlight Box */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    margin: '2rem 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '20px',
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      color: '#1a1a2e',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      💡 HIGHLIGHT
                    </div>
                    <p style={{ margin: 0, fontWeight: '500' }}>
                      Bitvavo gehört zu den ersten Börsen in Europa mit einer offiziellen <strong>MiCA-Lizenz</strong>. Damit erfüllt die Plattform die neuen EU-Standards für Krypto-Assets, was höchste Sicherheit, Transparenz und Anlegerschutz garantiert.
                    </p>
                  </div>

                  <h3 style={{
                    color: '#f8dfa5',
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    marginTop: '2rem'
                  }}>
                    Sicherheit & Regulierung
                  </h3>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Die Registrierung bei Bitvavo ist unkompliziert und erfolgt über das VideoIdent-Verfahren. Als in Europa regulierte Plattform unterliegt Bitvavo der Aufsicht der niederländischen Zentralbank (DNB) und erfüllt seit 2025 zusätzlich alle Anforderungen der EU-weiten MiCA-Regulierung. Kundengelder werden auf separaten Treuhandkonten verwahrt, digitale Assets sind über Cold Storage abgesichert.
                  </p>

                  <h3 style={{
                    color: '#f8dfa5',
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    marginTop: '2rem'
                  }}>
                    Zahlen & Fakten
                  </h3>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '1rem',
                    margin: '1.5rem 0'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f8dfa5', marginBottom: '0.5rem' }}>0,25%</div>
                      <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Standard-Handelsgebühren (reduzierbar bis 0,04% bei hohem Volumen)</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f8dfa5', marginBottom: '0.5rem' }}>400+</div>
                      <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Kryptowährungen handelbar, darunter Bitcoin, Ethereum, XRP und Solana</div>
                    </div>
                  </div>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '1rem 0',
                    color: '#d1d5db'
                  }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f8dfa5', marginRight: '0.5rem' }}>✓</span>
                      MiCA-lizenziert und bei der DNB registriert
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f8dfa5', marginRight: '0.5rem' }}>✓</span>
                      App & Desktop: intuitive Bedienung für Einsteiger, Profi-Features für Trader
                    </li>
                  </ul>

                  <h3 style={{
                    color: '#f8dfa5',
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    marginTop: '2rem'
                  }}>
                    Vorteile für Anleger
                  </h3>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Bitvavo kombiniert eine einfache Nutzeroberfläche mit professionellen Funktionen. Neben klassischem Krypto-Handel bietet die Plattform auch Sparpläne, Staking-Möglichkeiten und eine sehr übersichtliche Gebührenstruktur. Besonders attraktiv ist die Mobile App, mit der sich Käufe und Verkäufe von Kryptowährungen in wenigen Sekunden erledigen lassen.
                  </p>

                  <h3 style={{
                    color: '#f8dfa5',
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    marginTop: '2rem'
                  }}>
                    Fazit
                  </h3>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Bitvavo ist die erste Wahl für Anleger im europäischen Raum, die Wert auf Regulierung, Sicherheit und niedrige Gebühren legen. Durch die MiCA-Lizenz setzt die Börse neue Maßstäbe und bietet Einsteigern wie Profis eine vertrauenswürdige Umgebung, um in Kryptowährungen zu investieren.
                  </p>

                  {/* CTA Section */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    margin: '2rem 0',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem' }}>
                      👉 Jetzt Bitvavo testen und starten
                    </div>
                    <a
                      href="https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExchangeClick('Bitvavo')}
                      style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                        color: '#000000',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Kostenlos registrieren →
                    </a>
                  </div>
                </div>
              </section>

              <section id="bitvavo-faq" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.75rem' : '1rem',
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}>
                  <div style={{
                    width: isMobile ? '40px' : '60px',
                    height: isMobile ? '40px' : '60px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '1.125rem' : '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e'
                  }}>
                    2
                  </div>
                  <h2 style={{
                    color: '#ffffff',
                    fontSize: isMobile ? '1.25rem' : '1.75rem',
                    fontWeight: '700',
                    margin: 0,
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Häufige Fragen zu Bitvavo
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gap: '1rem'
                }}>
                  <details style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}>
                    <summary style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      listStyle: 'none'
                    }}>
                      Ist Bitvavo sicher?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Ja, Bitvavo gehört zu den sichersten Krypto-Börsen in Europa. Die Plattform ist bei der niederländischen Zentralbank (DNB) registriert und seit 2025 zusätzlich nach der neuen MiCA-Verordnung in der EU lizenziert. Kundengelder werden getrennt auf Treuhandkonten verwahrt, digitale Assets liegen größtenteils im Cold Storage. Zusätzlich gibt es Schutzmechanismen wie Zwei-Faktor-Authentifizierung (2FA) und Anti-Phishing-Codes. Damit erfüllt Bitvavo höchste Standards für Sicherheit und Transparenz.
                    </div>
                  </details>

                  <details style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}>
                    <summary style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      listStyle: 'none'
                    }}>
                      Welche Gebühren fallen bei Bitvavo an?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Bitvavo bietet ein sehr günstiges Gebührenmodell. Die Standard-Handelsgebühren liegen bei 0,25 % für Käufer (Taker) und 0,15 % für Verkäufer (Maker). Mit steigendem Handelsvolumen lassen sich die Gebühren weiter reduzieren – bis auf nur 0,04 %. Ein- und Auszahlungen per SEPA sind kostenlos, was die Plattform besonders attraktiv für Anleger macht, die regelmäßig investieren möchten.
                    </div>
                  </details>

                  <details style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}>
                    <summary style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      listStyle: 'none'
                    }}>
                      Kann man bei Bitvavo einen Sparplan einrichten?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Ja, Bitvavo bietet eine einfache Möglichkeit, Sparpläne für Kryptowährungen einzurichten. Nutzer können auswählen, welchen Betrag sie in regelmäßigen Abständen investieren möchten, und die Käufe laufen dann automatisch. Das ist ideal für Dollar-Cost-Averaging (DCA), also den langfristigen Vermögensaufbau durch regelmäßige Investitionen in Bitcoin oder andere Kryptowährungen.
                    </div>
                  </details>

                  <details style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}>
                    <summary style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      listStyle: 'none'
                    }}>
                      Welche Kryptowährungen gibt es bei Bitvavo?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Bei Bitvavo stehen über 400 Kryptowährungen zur Verfügung – darunter die großen Coins wie Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Solana (SOL) oder Cardano (ADA). Zusätzlich finden Anleger auch viele kleinere Projekte und Trend-Assets. Die große Auswahl macht Bitvavo sowohl für Einsteiger als auch für fortgeschrittene Investoren interessant.
                    </div>
                  </details>

                  <details style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}>
                    <summary style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      listStyle: 'none'
                    }}>
                      Was bedeutet die MiCA-Lizenz von Bitvavo?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Die MiCA-Regulierung (Markets in Crypto-Assets) ist seit 2025 der neue EU-Standard für Krypto-Börsen. Mit der MiCA-Lizenz erfüllt Bitvavo die strengsten europäischen Anforderungen in Bezug auf Verbraucherschutz, Transparenz und Sicherheit. Für Anleger bedeutet das: mehr Vertrauen, klare rechtliche Rahmenbedingungen und ein besonders hohes Schutzniveau.
                    </div>
                  </details>
                </div>
              </section>
            </div>

            {/* Table of Contents - Desktop Sidebar only */}
            {!isMobile && (
              <div style={{
                width: isTablet ? '240px' : '280px',
                position: 'sticky',
                top: '120px',
                height: 'fit-content',
                flexShrink: 0
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
                  border: '2px solid rgba(248, 223, 165, 0.4)',
                  borderRadius: '12px',
                  padding: isTablet ? '0.875rem' : '1rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(248, 223, 165, 0.3)'
                  }}>
                    <div style={{ fontSize: '1.2rem' }}>📋</div>
                    <h3 style={{
                      color: '#f8dfa5',
                      fontSize: isTablet ? '1rem' : '1.1rem',
                      fontWeight: '600',
                      margin: 0,
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Inhaltsverzeichnis
                    </h3>
                  </div>
                  <nav>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      <li style={{ marginBottom: '0.75rem' }}>
                        <a
                          href="#bitvavo-detail"
                          style={{
                            color: '#f8dfa5',
                            textDecoration: 'none',
                            fontSize: isTablet ? '0.85rem' : '0.9rem',
                            lineHeight: '1.4',
                            display: 'block',
                            padding: '0.5rem 0 0.5rem 0.75rem',
                            marginLeft: '-1rem',
                            paddingLeft: '1rem',
                            borderLeft: '3px solid #f8dfa5',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          1. Empfohlene Krypto-Börse: Bitvavo
                        </a>
                      </li>
                      <li style={{ marginBottom: '0.75rem' }}>
                        <a
                          href="#bitvavo-faq"
                          style={{
                            color: '#d1d5db',
                            textDecoration: 'none',
                            fontSize: isTablet ? '0.85rem' : '0.9rem',
                            lineHeight: '1.4',
                            display: 'block',
                            padding: '0.5rem 0 0.5rem 0.75rem',
                            marginLeft: '-1rem',
                            paddingLeft: '1rem',
                            borderLeft: '3px solid transparent',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          2. Häufige Fragen zu Bitvavo
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default BitvavoPage;