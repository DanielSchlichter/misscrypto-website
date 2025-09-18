'use client';

import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

const BitpandaClient = () => {
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
                }}>Bitpanda</span> - Österreichs führende Krypto-Börse
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
                FMA-reguliert, keine Ein-/Auszahlungsgebühren und über 400 Assets – Bitpanda verbindet Krypto mit klassischen Anlagen in einer benutzerfreundlichen Plattform.
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
                  href="https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExchangeClick('Bitpanda')}
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
                  🚀 Jetzt bei Bitpanda starten
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
                  alt="MissCrypto Bitpanda"
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

      {/* Bitpanda Feature Section */}
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
            }}>Bitpanda</span>?
          </h2>
          <p style={{
            color: '#d1d5db',
            fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: '800px'
          }}>
            Bitpanda ist eine der bekanntesten Krypto-Börsen Europas und bietet neben Kryptowährungen auch Aktien, ETFs und Edelmetalle.
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
                🏆 FMA-reguliert
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
                    src="/logos/bitpanda.png"
                    alt="Bitpanda Logo"
                    style={{
                      height: '40px',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Crypto Icons */}
                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem', textAlign: 'right' }}>
                    ASSETS
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
                    {/* Stocks */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#4F46E5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}>📈</div>
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
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>10,00 €</div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Gebühren:</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>ab 0,25%</div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Firmensitz:</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Österreich 🇦🇹
                  </div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Gründung:</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    2014
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExchangeClick('Bitpanda')}
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

              <section id="bitpanda-detail" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
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
                    Empfohlene Krypto-Börse: Bitpanda
                  </h2>
                </div>

                <div style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Bitpanda ist eine der bekanntesten Krypto-Börsen in Europa und hat ihren Hauptsitz in Wien. Gegründet 2014, bietet die Plattform heute weit mehr als nur den Handel mit Kryptowährungen: Neben Bitcoin, Ethereum oder XRP können Anleger auch Aktien, ETFs und Edelmetalle kaufen. Damit ist Bitpanda ein echter All-in-One-Investment-Anbieter, der sich sowohl für Einsteiger als auch für erfahrene Trader eignet.
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
                      Bitpanda erhebt <strong>keine Ein- und Auszahlungsgebühren</strong> und punktet mit einer besonders einfachen Benutzeroberfläche, die auch Anfängern den Einstieg in die Welt der Kryptowährungen erleichtert.
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
                    Bitpanda ist durch die österreichische Finanzmarktaufsichtsbehörde (FMA) als PSD2-Zahlungsdienstleister lizenziert. Damit erfüllt die Plattform strenge europäische Vorgaben und bietet ein hohes Maß an Sicherheit und Transparenz. Kundengelder werden separat verwahrt, digitale Assets sind über Cold Storage abgesichert.
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
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f8dfa5', marginBottom: '0.5rem' }}>ab 0,25%</div>
                      <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Handelsgebühren beim Kauf und Verkauf von Kryptowährungen</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f8dfa5', marginBottom: '0.5rem' }}>400+</div>
                      <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>digitale Assets (Kryptowährungen, Aktien, ETFs, Edelmetalle)</div>
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
                      Regulierung durch die FMA in Österreich
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f8dfa5', marginRight: '0.5rem' }}>✓</span>
                      Sitz in Wien, europäische Rechts- und Datenschutzstandards
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
                    Ein wesentlicher Vorteil von Bitpanda ist die große Auswahl: Anleger können nicht nur in Kryptowährungen investieren, sondern auch in klassische Anlageklassen wie Gold, Silber oder globale Aktien. Damit eignet sich die Plattform perfekt für alle, die ihr Portfolio breit diversifizieren wollen.
                  </p>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Zudem bietet Bitpanda ein Rewards-Programm, bei dem Nutzer durch den Besitz des hauseigenen BEST-Tokens Gebührenrabatte und weitere Vorteile erhalten. Die intuitive Mobile App rundet das Angebot ab und ermöglicht Investitionen per Smartphone in wenigen Sekunden.
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
                    Bitpanda ist eine ideale Wahl für alle, die eine breit aufgestellte Investment-Plattform suchen, die Krypto mit klassischen Anlageklassen verbindet. Dank Regulierung durch die FMA, einer benutzerfreundlichen App und einer enormen Asset-Auswahl ist Bitpanda besonders für europäische Anleger interessant, die auf Sicherheit und Vielfalt setzen.
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
                      👉 Jetzt Bitpanda testen und starten
                    </div>
                    <a
                      href="https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExchangeClick('Bitpanda')}
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

              <section id="bitpanda-faq" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
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
                    Häufige Fragen zu Bitpanda
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
                      Ist Bitpanda sicher?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Ja, Bitpanda gilt als eine der sichersten Krypto-Börsen Europas. Die Plattform hat ihren Sitz in Wien und ist durch die österreichische Finanzmarktaufsicht (FMA) als PSD2-Zahlungsdienstleister reguliert. Kundengelder werden getrennt verwahrt, digitale Assets liegen im Cold Storage. Zusätzlich bietet Bitpanda moderne Sicherheitsfunktionen wie Zwei-Faktor-Authentifizierung (2FA) und regelmäßige externe Prüfungen. Durch die klare Regulierung und den Standort in Österreich genießen Nutzer europäische Rechts- und Datenschutzstandards.
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
                      Welche Gebühren fallen bei Bitpanda an?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Bitpanda arbeitet mit fixen Spreads. Beim Kauf oder Verkauf von Kryptowährungen fallen in der Regel 1,49 % an. Für andere Anlageklassen wie Aktien oder Edelmetalle gelten ebenfalls transparente Kostenmodelle. Es gibt keine versteckten Ein- oder Auszahlungsgebühren. Wer den hauseigenen BEST-Token hält, profitiert zudem von Rabatten auf die Handelsgebühren und weiteren Vorteilen im Rewards-Programm.
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
                      Welche Kryptowährungen gibt es bei Bitpanda?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Bitpanda bietet eine sehr große Auswahl von über 400 digitalen Assets. Dazu gehören die bekanntesten Kryptowährungen wie Bitcoin (BTC), Ethereum (ETH) oder Ripple (XRP), aber auch kleinere Projekte und viele Trend-Coins. Zusätzlich können Anleger auf Bitpanda auch Aktien, ETFs und Edelmetalle kaufen. Damit ist Bitpanda eine der vielseitigsten Plattformen für europäische Anleger.
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
                      Kann man bei Bitpanda einen Sparplan einrichten?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Ja, Bitpanda ermöglicht Sparpläne auf Kryptowährungen, Aktien, ETFs und Edelmetalle. Nutzer können einen festen Betrag wählen, der regelmäßig automatisch investiert wird. Die Einrichtung ist unkompliziert und kann per SEPA-Lastschrift laufen. Das macht Bitpanda besonders interessant für Anleger, die langfristig Vermögen aufbauen möchten – egal ob in Bitcoin, Ethereum oder klassische Anlageklassen.
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
                      Was ist das Bitpanda BEST-Token-Programm?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem', color: '#d1d5db', lineHeight: '1.6' }}>
                      Das BEST-Token-Programm ist ein Vorteilssystem für aktive Nutzer. Wer den Bitpanda Ecosystem Token (BEST) hält, erhält Gebührenrabatte beim Handel, Zugang zu exklusiven Vorteilen und kann an regelmäßigen Belohnungen teilnehmen. BEST stärkt die Bindung an die Plattform und lohnt sich vor allem für Anleger, die Bitpanda regelmäßig nutzen.
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
                          href="#bitpanda-detail"
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
                          1. Empfohlene Krypto-Börse: Bitpanda
                        </a>
                      </li>
                      <li style={{ marginBottom: '0.75rem' }}>
                        <a
                          href="#bitpanda-faq"
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
                          2. Häufige Fragen zu Bitpanda
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

export default BitpandaClient;