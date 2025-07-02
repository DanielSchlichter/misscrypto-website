'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsletterForm from '../components/NewsletterForm';

export default function NewsfeedPage() {
  const [screenWidth, setScreenWidth] = useState(0);

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '6rem 1rem 4rem' : isTablet ? '8rem 2rem 6rem' : '10rem 2rem 8rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(248, 223, 165, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(248, 223, 165, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            fontSize: isMobile ? '3rem' : '4rem',
            marginBottom: '2rem'
          }}>
            📰
          </div>
          
          <h1 style={{
            fontSize: isMobile ? '3rem' : isTablet ? '4rem' : '5rem',
            fontWeight: '700',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.1'
          }}>
            Newsfeed
          </h1>
          
          <p style={{
            fontSize: isMobile ? '1.2rem' : isTablet ? '1.4rem' : '1.5rem',
            lineHeight: '1.6',
            color: '#d1d5db',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            Dein zentraler Hub für die wichtigsten Krypto-Nachrichten, 
            Marktanalysen und Trading-Einblicke – immer aktuell, immer relevant.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : isTablet ? '3rem 2rem' : '4rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Main Coming Soon Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(248, 223, 165, 0.08))',
            backdropFilter: 'blur(15px)',
            borderRadius: '2rem',
            padding: isMobile ? '3rem 2rem' : isTablet ? '4rem 3rem' : '5rem 4rem',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            marginBottom: '4rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(248, 223, 165, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}></div>

            <div style={{
              fontSize: isMobile ? '3rem' : '4rem',
              marginBottom: '2rem',
              position: 'relative',
              zIndex: 1
            }}>
              🚀
            </div>
            
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#f8dfa5',
              position: 'relative',
              zIndex: 1
            }}>
              Coming Soon
            </h2>
            
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              lineHeight: '1.6',
              color: '#d1d5db',
              marginBottom: '3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              position: 'relative',
              zIndex: 1
            }}>
              Wir entwickeln einen innovativen Newsfeed, der dir die wichtigsten 
              Krypto-Nachrichten, tiefgreifende Marktanalysen und exklusive 
              Trading-Insights in Echtzeit liefert.
            </p>

            {/* Features Preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? '2rem' : '2.5rem',
              marginTop: '3rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                background: 'rgba(248, 223, 165, 0.1)',
                borderRadius: '1.5rem',
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                border: '1px solid rgba(248, 223, 165, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem'
                }}>📈</div>
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  color: '#f8dfa5',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  Live Marktanalysen
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#d1d5db',
                  lineHeight: '1.5'
                }}>
                  Echtzeitanalysen der wichtigsten Kryptowährungen mit professionellen Einschätzungen
                </p>
              </div>
              
              <div style={{
                background: 'rgba(248, 223, 165, 0.1)',
                borderRadius: '1.5rem',
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                border: '1px solid rgba(248, 223, 165, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem'
                }}>⚡</div>
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  color: '#f8dfa5',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  Breaking News
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#d1d5db',
                  lineHeight: '1.5'
                }}>
                  Die wichtigsten Krypto-News sofort verfügbar – sei immer einen Schritt voraus
                </p>
              </div>
              
              <div style={{
                background: 'rgba(248, 223, 165, 0.1)',
                borderRadius: '1.5rem',
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                border: '1px solid rgba(248, 223, 165, 0.2)',
                textAlign: 'center',
                gridColumn: isMobile ? '1' : isTablet ? '1 / 3' : 'auto'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem'
                }}>🎯</div>
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  color: '#f8dfa5',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  Personalisierte Insights
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#d1d5db',
                  lineHeight: '1.5'
                }}>
                  Maßgeschneiderte Trading-Empfehlungen basierend auf deinen Interessen
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Preview */}
          <div style={{
            background: 'rgba(17, 17, 17, 0.8)',
            borderRadius: '1.5rem',
            padding: isMobile ? '2rem' : '3rem',
            border: '1px solid rgba(248, 223, 165, 0.1)',
            marginBottom: '4rem'
          }}>
            <h3 style={{
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              color: '#f8dfa5',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              🗓️ Entwicklungsplan
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1.5rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  Q1
                </div>
                <h4 style={{
                  color: '#f8dfa5',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem'
                }}>
                  Beta Version
                </h4>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '0.9rem'
                }}>
                  Erste Testversion mit grundlegenden News-Features
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem'
              }}>
                <div style={{
                  background: 'rgba(248, 223, 165, 0.2)',
                  color: '#f8dfa5',
                  border: '2px solid #f8dfa5',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  Q2
                </div>
                <h4 style={{
                  color: '#f8dfa5',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem'
                }}>
                  Live Analytics
                </h4>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '0.9rem'
                }}>
                  Echtzeitanalysen und erweiterte Marktdaten
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem'
              }}>
                <div style={{
                  background: 'rgba(248, 223, 165, 0.1)',
                  color: '#f8dfa5',
                  border: '2px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  Q3
                </div>
                <h4 style={{
                  color: '#f8dfa5',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem'
                }}>
                  Vollversion
                </h4>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '0.9rem'
                }}>
                  Personalisierung und Premium-Features
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ 
        padding: isMobile ? '4rem 0' : isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(248, 223, 165, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '3rem' : '4rem',
            alignItems: 'center'
          }}>
            {/* Left Column - Text Content */}
            <div>
              <h2 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '2.75rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#ffffff',
                lineHeight: '1.2'
              }}>
                Verpasse{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  nichts Wichtiges!
                </span>
              </h2>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.125rem',
                color: '#d1d5db',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Melde dich für unseren Newsletter an und erfahre als Erste, 
                wenn der Newsfeed live geht. Plus exklusive Vorab-Einblicke:
              </p>
              <ul style={{ 
                marginBottom: '2rem',
                padding: 0,
                listStyle: 'none'
              }}>
                {[
                  '📧 Early Access zum Newsfeed',
                  '🎁 Exklusive Beta-Features',
                  '📊 Wöchentliche Markt-Updates',
                  '🔔 Breaking News Alerts'
                ].map((item, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    padding: isMobile ? '0.5rem 0' : '0.75rem 0'
                  }}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Newsletter Form */}
            <NewsletterForm isMobile={isMobile} isTablet={isTablet} />
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        textAlign: 'center'
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#f8dfa5',
          textDecoration: 'none',
          fontSize: isMobile ? '1rem' : '1.1rem',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          background: 'rgba(248, 223, 165, 0.05)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
          ← Zurück zur Startseite
        </Link>
      </section>
    </div>
  );
} 