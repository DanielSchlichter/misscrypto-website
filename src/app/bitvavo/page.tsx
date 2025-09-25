'use client';

import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import Head from 'next/head';

const BitvavoPage = () => {
  const [screenWidth, setScreenWidth] = useState(1024);
  const [isClient, setIsClient] = useState(false);
  const { trackExchangeClick } = useAnalytics();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setIsClient(true);
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = isClient && screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  const handleBitvavoClick = () => {
    trackExchangeClick('Bitvavo');
    window.open('https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb', '_blank');
  };

  if (!isClient) {
    return <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)' }} />;
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Bitvavo",
    "description": "Eine der größten Krypto-Börsen Europas mit Sitz in Amsterdam. MiCA-lizenziert, sicher und benutzerfreundlich mit nur 0,25% Gebühren.",
    "provider": {
      "@type": "Organization",
      "name": "Bitvavo",
      "url": "https://bitvavo.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "4000000"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.0025",
      "priceCurrency": "EUR",
      "description": "0,25% Standard-Handelsgebühren"
    }
  };

  // FAQ Structured Data for Google
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ist Bitvavo sicher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Bitvavo gehört zu den sichersten Krypto-Börsen in Europa. Die Plattform ist bei der niederländischen Zentralbank (DNB) registriert und seit 2025 zusätzlich nach der neuen MiCA-Verordnung in der EU lizenziert. Kundengelder werden getrennt auf Treuhandkonten verwahrt, digitale Assets liegen größtenteils im Cold Storage. Zusätzlich gibt es Schutzmechanismen wie Zwei-Faktor-Authentifizierung (2FA) und Anti-Phishing-Codes. Damit erfüllt Bitvavo höchste Standards für Sicherheit und Transparenz."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Gebühren fallen bei Bitvavo an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bitvavo bietet ein sehr günstiges Gebührenmodell. Die Standard-Handelsgebühren liegen bei 0,25% für Käufer (Taker) und 0,15% für Verkäufer (Maker). Mit steigendem Handelsvolumen lassen sich die Gebühren weiter reduzieren – bis auf nur 0,04%. Ein- und Auszahlungen per SEPA sind kostenlos, was die Plattform besonders attraktiv für Anleger macht, die regelmäßig investieren möchten."
        }
      },
      {
        "@type": "Question",
        "name": "Kann man bei Bitvavo einen Sparplan einrichten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Bitvavo bietet eine einfache Möglichkeit, Sparpläne für Kryptowährungen einzurichten. Nutzer können auswählen, welchen Betrag sie in regelmäßigen Abständen investieren möchten, und die Käufe laufen dann automatisch. Das ist ideal für Dollar-Cost-Averaging (DCA), also den langfristigen Vermögensaufbau durch regelmäßige Investitionen in Bitcoin oder andere Kryptowährungen."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Kryptowährungen gibt es bei Bitvavo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei Bitvavo stehen über 400 Kryptowährungen zur Verfügung – darunter die großen Coins wie Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Solana (SOL) oder Cardano (ADA). Zusätzlich finden Anleger auch viele kleinere Projekte und Trend-Assets. Die große Auswahl macht Bitvavo sowohl für Einsteiger als auch für fortgeschrittene Investoren interessant."
        }
      },
      {
        "@type": "Question",
        "name": "Was bedeutet die MiCA-Lizenz von Bitvavo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die MiCA-Regulierung (Markets in Crypto-Assets) ist seit 2025 der neue EU-Standard für Krypto-Börsen. Mit der MiCA-Lizenz erfüllt Bitvavo die strengsten europäischen Anforderungen in Bezug auf Verbraucherschutz, Transparenz und Sicherheit. Für Anleger bedeutet das: mehr Vertrauen, klare rechtliche Rahmenbedingungen und ein besonders hohes Schutzniveau."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Bitvavo - Europas führende MiCA-lizenzierte Krypto-Börse | 0,25% Gebühren</title>
        <meta name="description" content="⭐ Bitvavo ist eine der größten Krypto-Börsen Europas. MiCA-lizenziert, 0,25% Gebühren, 400+ Kryptowährungen. Sicher & benutzerfreundlich für 4M+ Nutzer." />
        <meta name="keywords" content="Bitvavo, Krypto-Börse, MiCA-lizenziert, Bitcoin kaufen, niedrige Gebühren, Europa, DNB reguliert" />
        <meta property="og:title" content="Bitvavo - MiCA-lizenzierte Krypto-Börse | 0,25% Gebühren" />
        <meta property="og:description" content="Eine der größten Krypto-Börsen Europas. MiCA-lizenziert, sicher und mit nur 0,25% Gebühren. Über 4 Millionen Nutzer vertrauen bereits auf Bitvavo." />
        <meta property="og:image" content="/logos/bitvavo.svg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bitvavo - MiCA-lizenzierte Krypto-Börse" />
        <meta name="twitter:description" content="Europas führende Krypto-Börse mit 0,25% Gebühren und MiCA-Lizenz" />
        <link rel="canonical" href="https://misscrypto.com/bitvavo" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </Head>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          33% { transform: translateY(-15px) rotate(2deg); opacity: 0.8; }
          66% { transform: translateY(8px) rotate(-2deg); opacity: 0.9; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(248, 223, 165, 0.3); }
          50% { box-shadow: 0 0 40px rgba(248, 223, 165, 0.6), 0 0 60px rgba(248, 223, 165, 0.3); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .float-element {
          animation: float 8s ease-in-out infinite;
        }

        .float-element-reverse {
          animation: float 10s ease-in-out infinite reverse;
        }

        .shine-effect {
          animation: shine 4s ease-in-out infinite;
        }

        .pulse-effect {
          animation: pulse 3s ease-in-out infinite;
        }

        .glow-effect {
          animation: glow 2s ease-in-out infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #f8dfa5 30%, #e4b15e 60%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .premium-card {
          position: relative;
          background: linear-gradient(135deg,
            rgba(248, 223, 165, 0.08) 0%,
            rgba(228, 177, 94, 0.12) 25%,
            rgba(26, 26, 46, 0.95) 50%,
            rgba(22, 33, 62, 0.98) 75%,
            rgba(15, 23, 42, 1) 100%
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(248, 223, 165, 0.25);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 0 1px rgba(248, 223, 165, 0.1);
        }

        .premium-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(248, 223, 165, 0.6), transparent);
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(248, 223, 165, 0.6);
          border-radius: 50%;
          animation: floatParticle 15s linear infinite;
        }

        @keyframes floatParticle {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100px) translateX(100px) rotate(360deg); opacity: 0; }
        }

        .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 25%; top: 60%; animation-delay: 2s; }
        .particle:nth-child(3) { left: 40%; top: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { left: 55%; top: 80%; animation-delay: 6s; }
        .particle:nth-child(5) { left: 70%; top: 40%; animation-delay: 8s; }
        .particle:nth-child(6) { left: 85%; top: 70%; animation-delay: 10s; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        color: '#ffffff',
        fontFamily: 'Raleway, sans-serif'
      }}>

        {/* Hero Section */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          zIndex: 10,
          paddingBottom: isMobile ? '3rem' : '4rem',
          paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
          background: 'radial-gradient(ellipse at top center, rgba(248, 223, 165, 0.05) 0%, rgba(26, 26, 46, 0.8) 50%, #000000 100%)',
          minHeight: isMobile ? 'auto' : '90vh'
        }}>
          {/* Floating Particles Background */}
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          {/* Enhanced Animated Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 15% 20%, rgba(248, 223, 165, 0.12) 0%, transparent 40%),
              radial-gradient(circle at 85% 80%, rgba(228, 177, 94, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(248, 223, 165, 0.03) 0%, transparent 60%)
            `,
            pointerEvents: 'none'
          }}></div>

          <div className="float-element-reverse pulse-effect" style={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.15), rgba(212, 175, 55, 0.2))',
            border: '2px solid rgba(228, 177, 94, 0.4)',
            backdropFilter: 'blur(10px)'
          }}></div>
          <div className="float-element" style={{
            position: 'absolute',
            top: '60%',
            left: '5%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.15))',
            border: '1px solid rgba(248, 223, 165, 0.5)',
            backdropFilter: 'blur(5px)'
          }}></div>

          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isMobile ? '0 1rem' : '0 2rem',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
              gap: isMobile ? '3rem' : '4rem',
              alignItems: 'center',
              width: '100%'
            }}>

              {/* Enhanced Text Content - Left Side */}
              <div className="fade-in-up" style={{
                textAlign: isMobile ? 'center' : 'left'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(228, 177, 94, 0.2))',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  backdropFilter: 'blur(10px)',
                  color: '#f8dfa5',
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  fontWeight: '600',
                  marginBottom: '2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  boxShadow: '0 2px 8px rgba(248, 223, 165, 0.15)'
                }}>
                  🏆 Empfohlene Krypto-Börse
                </div>

                {/* Title */}
                <h1 className="hero-gradient-text" style={{
                  fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4.5rem',
                  fontWeight: '200',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em',
                  margin: '0 0 2rem 0'
                }}>
                  Bitvavo
                </h1>

                <p style={{
                  color: 'rgba(209, 213, 219, 0.9)',
                  fontSize: isMobile ? '1.1rem' : '1.35rem',
                  lineHeight: '1.7',
                  marginBottom: '3rem',
                  fontWeight: '300'
                }}>
                  Eine der größten Krypto-Börsen Europas mit Sitz in Amsterdam und Top-Adresse für sichere und günstige Krypto-Investments.
                </p>

                {/* CTA Button - mc-btn-primary style */}
                <button
                  onClick={handleBitvavoClick}
                  className="mc-btn-primary"
                  style={{
                    fontSize: '1rem',
                    padding: '1rem 2rem'
                  }}
                >
                  🚀 Jetzt bei Bitvavo starten
                </button>
              </div>

              {/* Premium Stats Cards - Right Side */}
              {!isMobile && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '2rem',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '320px',
                  position: 'relative'
                }}>
                  {/* Premium Rating Card - positioned far left */}
                  <div className="premium-card" style={{
                    borderRadius: '1rem',
                    padding: '1.2rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-60px) scale(0.9)',
                    marginTop: '-10px'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      marginBottom: '0.75rem'
                    }}>⭐</div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '0.25rem'
                    }}>4.8/5</div>
                    <div style={{
                      color: 'rgba(156, 163, 175, 0.8)',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>4M+ Nutzer vertrauen</div>
                  </div>

                  {/* Premium MiCA Badge - positioned far right */}
                  <div className="premium-card" style={{
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(22, 163, 74, 0.08))',
                    transform: 'translateX(100px)',
                    marginBottom: '70px',
                    marginTop: '-20px',
                    marginRight: '-50px'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      marginBottom: '0.75rem'
                    }}>🛡️</div>
                    <div style={{
                      color: '#22c55e',
                      fontWeight: '700',
                      fontSize: '1rem',
                      marginBottom: '0.25rem'
                    }}>MiCA-lizenziert</div>
                    <div style={{
                      color: 'rgba(156, 163, 175, 0.8)',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>EU-reguliert & sicher</div>
                  </div>

                  {/* Cool Background Logo - bottom right */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-100px',
                    right: '50px',
                    opacity: '0.05',
                    zIndex: -1,
                    transform: 'scale(2.5)',
                    pointerEvents: 'none'
                  }}>
                    <img
                      src="/logos/bitvavo.svg"
                      alt="Bitvavo Background Logo"
                      style={{
                        height: '120px',
                        width: 'auto',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Background Logo for Mobile */}
              {isMobile && (
                <div style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '45%',
                  transform: 'translateX(-50%)',
                  opacity: '0.05',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}>
                  <img
                    src="/logos/bitvavo.svg"
                    alt="Bitvavo Background Logo"
                    style={{
                      height: '100px',
                      width: 'auto',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>

        {/* Premium Highlight Section */}
        <section className="premium-card" style={{
          borderRadius: '1.5rem',
          padding: isMobile ? '2.5rem' : '3.5rem',
          marginTop: '4rem',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid rgba(248, 223, 165, 0.3)',
          background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.08) 0%, rgba(228, 177, 94, 0.12) 50%, rgba(26, 26, 46, 0.95) 100%)'
        }}>

          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 50%, #d4af37 100%)',
              color: '#1a1a2e',
              padding: '0.75rem 2rem',
              borderRadius: '2rem',
              fontSize: '1rem',
              fontWeight: '700',
              marginBottom: '2rem',
              boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              💡 HIGHLIGHT
            </div>
            <h2 style={{
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0',
              lineHeight: '1.3'
            }}>
              Bitvavo gehört zu den ersten Börsen in Europa mit einer offiziellen MiCA-Lizenz
            </h2>
            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              fontSize: '1.2rem',
              lineHeight: '1.7',
              margin: 0,
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: '300'
            }}>
              Damit erfüllt die Plattform die neuen EU-Standards für Krypto-Assets, was höchste Sicherheit, Transparenz und Anlegerschutz garantiert.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.25rem',
            fontWeight: '600',
            marginBottom: '3rem',
            color: 'white',
            margin: '0 0 3rem 0',
            textAlign: 'center'
          }}>
            Warum <span style={{
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Bitvavo?</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            {/* Premium Sicherheit & Regulierung */}
            <div className="premium-card fade-in-up" style={{
              borderRadius: '1.2rem',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 223, 165, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}>
              {/* Floating Icon */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.2))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                🛡️
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.3))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    🏦
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#f8dfa5',
                    margin: 0
                  }}>
                    Sicherheit & Regulierung
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(209, 213, 219, 0.9)',
                  lineHeight: '1.7',
                  margin: 0,
                  fontSize: '1rem',
                  fontWeight: '300'
                }}>
                  Die Registrierung bei Bitvavo ist unkompliziert und erfolgt über das VideoIdent-Verfahren. Als in Europa regulierte Plattform unterliegt Bitvavo der Aufsicht der niederländischen Zentralbank (DNB) und erfüllt seit 2025 zusätzlich alle Anforderungen der EU-weiten MiCA-Regulierung.
                </p>
              </div>
            </div>

            {/* Premium Zahlen & Fakten */}
            <div className="premium-card fade-in-up" style={{
              borderRadius: '1.2rem',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 223, 165, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}>
              {/* Floating Icon */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.2))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                📊
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.3))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    💰
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#f8dfa5',
                    margin: 0
                  }}>
                    Zahlen & Fakten
                  </h3>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1rem',
                  color: 'rgba(209, 213, 219, 0.9)',
                  fontSize: '1rem',
                  fontWeight: '300',
                  lineHeight: '1.6'
                }}>
                  <div>
                    <span style={{
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '600'
                    }}>0,25%</span> Standard-Handelsgebühren (reduzierbar bis 0,04% bei hohem Volumen)
                  </div>
                  <div>
                    <span style={{
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '600'
                    }}>400+</span> Kryptowährungen handelbar, darunter Bitcoin, Ethereum, XRP und Solana
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Vorteile für Anleger - Full Width */}
            <div className="premium-card fade-in-up" style={{
              borderRadius: '1.2rem',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
              gridColumn: isMobile ? '1' : '1 / -1',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 223, 165, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}>
              {/* Floating Icons */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '20px',
                fontSize: '3rem',
                opacity: '0.1',
                animation: 'float 6s ease-in-out infinite'
              }}>
                💎
              </div>

              <div style={{
                position: 'absolute',
                top: '20px',
                right: '80px',
                fontSize: '2rem',
                opacity: '0.15',
                animation: 'float 4s ease-in-out infinite reverse'
              }}>
                🚀
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(99, 102, 241, 0.3))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    ⚡
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    color: '#f8dfa5',
                    margin: 0
                  }}>
                    Vorteile für Anleger
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(209, 213, 219, 0.9)',
                  lineHeight: '1.7',
                  margin: 0,
                  fontSize: '1rem',
                  fontWeight: '300'
                }}>
                  Bitvavo kombiniert eine einfache Nutzeroberfläche mit professionellen Funktionen. Neben klassischem Krypto-Handel bietet die Plattform auch Sparpläne, Staking-Möglichkeiten und eine sehr übersichtliche Gebührenstruktur. Besonders attraktiv ist die Mobile App, mit der sich Käufe und Verkäufe von Kryptowährungen in wenigen Sekunden erledigen lassen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ marginTop: '4rem' }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.25rem',
            fontWeight: '600',
            marginBottom: '3rem',
            color: 'white',
            margin: '0 0 3rem 0',
            textAlign: 'center'
          }}>
            Häufig gestellte <span style={{
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Fragen</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              {
                question: "Ist Bitvavo sicher?",
                answer: "Ja, Bitvavo gehört zu den sichersten Krypto-Börsen in Europa. Die Plattform ist bei der niederländischen Zentralbank (DNB) registriert und seit 2025 zusätzlich nach der neuen MiCA-Verordnung in der EU lizenziert. Kundengelder werden getrennt auf Treuhandkonten verwahrt, digitale Assets liegen größtenteils im Cold Storage. Zusätzlich gibt es Schutzmechanismen wie Zwei-Faktor-Authentifizierung (2FA) und Anti-Phishing-Codes. Damit erfüllt Bitvavo höchste Standards für Sicherheit und Transparenz."
              },
              {
                question: "Welche Gebühren fallen bei Bitvavo an?",
                answer: "Bitvavo bietet ein sehr günstiges Gebührenmodell. Die Standard-Handelsgebühren liegen bei 0,25% für Käufer (Taker) und 0,15% für Verkäufer (Maker). Mit steigendem Handelsvolumen lassen sich die Gebühren weiter reduzieren – bis auf nur 0,04%. Ein- und Auszahlungen per SEPA sind kostenlos, was die Plattform besonders attraktiv für Anleger macht, die regelmäßig investieren möchten."
              },
              {
                question: "Kann man bei Bitvavo einen Sparplan einrichten?",
                answer: "Ja, Bitvavo bietet eine einfache Möglichkeit, Sparpläne für Kryptowährungen einzurichten. Nutzer können auswählen, welchen Betrag sie in regelmäßigen Abständen investieren möchten, und die Käufe laufen dann automatisch. Das ist ideal für Dollar-Cost-Averaging (DCA), also den langfristigen Vermögensaufbau durch regelmäßige Investitionen in Bitcoin oder andere Kryptowährungen."
              },
              {
                question: "Welche Kryptowährungen gibt es bei Bitvavo?",
                answer: "Bei Bitvavo stehen über 400 Kryptowährungen zur Verfügung – darunter die großen Coins wie Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Solana (SOL) oder Cardano (ADA). Zusätzlich finden Anleger auch viele kleinere Projekte und Trend-Assets. Die große Auswahl macht Bitvavo sowohl für Einsteiger als auch für fortgeschrittene Investoren interessant."
              },
              {
                question: "Was bedeutet die MiCA-Lizenz von Bitvavo?",
                answer: "Die MiCA-Regulierung (Markets in Crypto-Assets) ist seit 2025 der neue EU-Standard für Krypto-Börsen. Mit der MiCA-Lizenz erfüllt Bitvavo die strengsten europäischen Anforderungen in Bezug auf Verbraucherschutz, Transparenz und Sicherheit. Für Anleger bedeutet das: mehr Vertrauen, klare rechtliche Rahmenbedingungen und ein besonders hohes Schutzniveau."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="premium-card"
                style={{
                  borderRadius: '1rem',
                  padding: '0.6rem 1.2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: 'auto',
                  minHeight: '30px'
                }}
                onClick={() => {
                  const answer = document.getElementById(`faq-answer-${index}`);
                  const icon = document.getElementById(`faq-icon-${index}`);
                  if (answer && icon) {
                    const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
                    answer.style.maxHeight = isOpen ? '0px' : '500px';
                    answer.style.opacity = isOpen ? '0' : '1';
                    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.3rem'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#f8dfa5',
                    margin: 0,
                    flex: 1
                  }}>
                    {faq.question}
                  </h3>
                  <div
                    id={`faq-icon-${index}`}
                    style={{
                      fontSize: '1.5rem',
                      color: '#f8dfa5',
                      transition: 'transform 0.3s ease',
                      transform: 'rotate(0deg)'
                    }}
                  >
                    +
                  </div>
                </div>
                <div
                  id={`faq-answer-${index}`}
                  style={{
                    maxHeight: '0px',
                    opacity: '0',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    color: 'rgba(209, 213, 219, 0.9)',
                    lineHeight: '1.7',
                    fontSize: '0.95rem'
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Final CTA Section */}
        <section className="premium-card" style={{
          borderRadius: '2rem',
          padding: isMobile ? '3rem' : '4rem',
          textAlign: 'center',
          marginTop: '4rem',
          marginBottom: '4rem',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid rgba(248, 223, 165, 0.3)',
          background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.08) 0%, rgba(228, 177, 94, 0.12) 50%, rgba(26, 26, 46, 0.95) 100%)'
        }}>

          <div style={{ position: 'relative' }}>

            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Unser <span style={{
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Fazit</span> zu Bitvavo
            </h2>

            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2.5rem',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 2.5rem auto'
            }}>
              Bitvavo ist die ideale Wahl für alle, die eine <strong style={{
                color: 'rgba(34, 197, 94, 0.8)',
                textShadow: '0 0 10px rgba(34, 197, 94, 0.3)'
              }}>sichere, kostengünstige und benutzerfreundliche</strong> Krypto-Börse suchen. Mit der MiCA-Lizenz, niedrigsten Gebühren und über 400 verfügbaren Kryptowährungen bietet die Plattform alles, was moderne Anleger benötigen.
            </p>

            {/* Premium Feature Pills */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              {['0,25% Gebühren (bis 0,04%)', '400+ Kryptowährungen', 'MiCA-lizenziert', 'VideoIdent Registrierung'].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.15))',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '2rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  color: 'rgba(209, 213, 219, 0.9)',
                  fontWeight: '500'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.3)'
                  }}>✓</span>
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Button - mc-btn-primary style */}
            <button
              onClick={handleBitvavoClick}
              className="mc-btn-primary"
              style={{
                fontSize: '1rem',
                padding: '1rem 2rem'
              }}
            >
              Jetzt bei Bitvavo starten →
            </button>

            <p style={{
              color: 'rgba(156, 163, 175, 0.7)',
              fontSize: '0.9rem',
              marginTop: '1.5rem',
              margin: '1.5rem 0 0 0',
              fontWeight: '400'
            }}>
              MiCA-reguliert • DNB-lizenziert • 4+ Millionen Nutzer vertrauen bereits
            </p>
          </div>
        </section>

      </div>
    </div>
    </>
  );
};

export default BitvavoPage;