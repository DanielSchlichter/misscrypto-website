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
            Ich sammle hier die wichtigsten Krypto-Themen, ordne sie für dich ein – und halte dich auf dem Laufenden.
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '40vh',
              marginBottom: '3rem'
            }}>
              <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</span>
            <h2 style={{
                color: '#f8dfa5',
                fontWeight: 700,
                fontSize: isMobile ? '2.2rem' : isTablet ? '2.8rem' : '3.2rem',
              marginBottom: '1.5rem',
                textAlign: 'center',
                letterSpacing: '0.01em',
            }}>
              Coming Soon
            </h2>
            <p style={{
              color: '#d1d5db',
                fontSize: isMobile ? '1.1rem' : isTablet ? '1.2rem' : '1.3rem',
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto 2.5rem',
                lineHeight: '1.6',
              }}>
                Bald findest du hier tagesaktuelle Krypto-News, Einschätzungen und Marktanalysen – verständlich erklärt, zuverlässig ausgewählt.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '1.5rem' : '2rem',
                width: '100%',
                maxWidth: '900px',
              }}>
                <div style={{
                  background: 'rgba(30, 30, 30, 0.7)',
                  borderRadius: '1.25rem',
                  padding: isMobile ? '1.5rem' : '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
                }}>
                  <span style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>📰</span>
                  <h3 style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '1.3rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                    News & Berichte
                  </h3>
                  <p style={{ color: '#d1d5db', textAlign: 'center', fontSize: '1rem', lineHeight: '1.5' }}>
                    Bleib auf dem Laufenden mit den wichtigsten Krypto-News – verständlich, aktuell und auf den Punkt gebracht.
                  </p>
                </div>
                <div style={{
                  background: 'rgba(30, 30, 30, 0.7)',
                  borderRadius: '1.25rem',
                  padding: isMobile ? '1.5rem' : '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
                }}>
                  <span style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>📊</span>
                  <h3 style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '1.3rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                    Krypto-Analysen
                  </h3>
                  <p style={{ color: '#d1d5db', textAlign: 'center', fontSize: '1rem', lineHeight: '1.5' }}>
                    Fundierte Marktanalysen zu Bitcoin, Ethereum & Co. – mit Einblicken, die dir wirklich weiterhelfen.
                  </p>
                </div>
                <div style={{
                  background: 'rgba(30, 30, 30, 0.7)',
                  borderRadius: '1.25rem',
                  padding: isMobile ? '1.5rem' : '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
                }}>
                  <span style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>🎯</span>
                  <h3 style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '1.3rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                    Vergleiche & Einordnungen
                  </h3>
                  <p style={{ color: '#d1d5db', textAlign: 'center', fontSize: '1rem', lineHeight: '1.5' }}>
                    Plattformen, Tools und Trends – geprüft, verglichen und verständlich erklärt.
                  </p>
                </div>
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
                fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '1.5rem',
                lineHeight: '1.1',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Verpasse{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  nichts Wichtiges!
                </span>
              </h2>
              <p style={{
                color: '#d1d5db',
                fontSize: isMobile ? '1.1rem' : isTablet ? '1.2rem' : '1.3rem',
                marginBottom: '2rem',
                lineHeight: '1.6',
                textAlign: isMobile ? 'center' : 'left',
                maxWidth: '600px'
              }}>
                Ich bereite für dich regelmäßig Krypto-Updates auf, die du nicht verpassen solltest: verständlich, verlässlich und mit echtem Mehrwert. Trag dich ein und sei ganz vorne dabei, wenn der Newsfeed startet.
              </p>
              <ul style={{ 
                color: '#f8dfa5',
                fontSize: isMobile ? '1rem' : '1.1rem',
                marginBottom: '2.5rem',
                paddingLeft: 0,
                listStyle: 'none',
                lineHeight: '2.1',
                textAlign: isMobile ? 'center' : 'left',
              }}>
                <li>📰 Krypto-News, die du verstehst</li>
                <li>📚 Wissen, das dich weiterbringt</li>
                <li>💡 Tipps, die wirklich helfen</li>
                <li>🤝 Ehrlich & Unabhängig</li>
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