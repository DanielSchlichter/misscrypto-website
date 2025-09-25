'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PressePage = () => {
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = isClient ? screenWidth < 768 : false;
  const isTablet = isClient ? (screenWidth >= 768 && screenWidth < 1024) : false;

  const pressItems = [
    {
      id: 1,
      title: "Crypto Insiders",
      date: "25.07.2024",
      description: "Dr. Stephanie Morgenroth, Krypto- und Web 3.0-Expertin, veröffentlicht als Gastautorin bei Crypto Insiders Beiträge.",
      color: "linear-gradient(135deg, #f8dfa5, #e4b15e)",
      url: "https://www.crypto-insiders.de/author/stephanie-morgenroth/",
      category: "Gastautor",
      logo: "/logos/crypto-insiders.svg"
    },
    {
      id: 2,
      title: "Invest",
      date: "27.04.2024",
      description: "Beim Female Finance Day referierte Dr. Stephanie Morgenroth über \"Aktien, Krypto, Anleihen und Co – das gehört 2024 ins Depot!\"",
      color: "linear-gradient(135deg, #4f46e5, #3b82f6)",
      url: "https://www.messe-stuttgart.de/invest/programm/buehnen-events/female-finance-day",
      category: "Vortrag",
      logo: "/logos/invest.svg"
    },
    {
      id: 3,
      title: "Sparkassen Innovation Hub",
      date: "28.06.2023",
      description: "Dr. Stephanie Morgenroth präsentierte auf dem Metaverse-Gipfel der Sparkassen-Finanzgruppe über die Rolle der Finanzinstitute im Metaverse",
      color: "linear-gradient(135deg, #dc2626, #ef4444)",
      url: "https://fi-magazin.de/Metaverse-Gipfel-der-Sparkassen-Finanzgruppe-im-Re-Livestream",
      category: "Präsentation",
      logo: "/logos/sparkassen-innovation-hub.png"
    },
    {
      id: 4,
      title: "BTC Echo",
      date: "01.03.2023",
      description: "Als Gastautorin bei BTC-Echo teilte Dr. Stephanie Morgenroth ihr Krypto-Wissen umfassend. In Zusammenarbeit mit BTC-Echo ist zudem eine Masterclass entstanden.",
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
      url: "https://www.btc-echo.de/news/author/stephaniemorgenroth/",
      category: "Gastautor",
      logo: "/logos/btc-echo.svg"
    },
    {
      id: 5,
      title: "Wirtschafts Woche",
      date: "02.08.2022",
      description: "Die Wirtschaftswoche interviewte Dr. Stephanie Morgenroth zu \"Keine Angst vorm Krypto-Crash\"",
      color: "linear-gradient(135deg, #059669, #10b981)",
      url: "https://www.wiwo.de/my/finanzen/geldanlage/bitcoin-enthusiasten-mit-bitcoin-am-bambambeach/28555510-3.html",
      category: "Interview",
      logo: "/logos/wirtschafts-woche.svg"
    },
    {
      id: 6,
      title: "Blockchain-Millionär",
      date: "07.07.2022",
      description: "Dr. Stephanie Morgenroth schrieb das Vorwort für das Buch \"Blockchain-Millionär: Blockchain 4.0 einfach verstehen und einfach umsetzen\".",
      color: "linear-gradient(135deg, #7c3aed, #a855f7)",
      url: "#",
      category: "Buchvorwort",
      logo: "/logos/blockchain-millionaer.jpg"
    },
    {
      id: 7,
      title: "Finance Summit",
      date: "2024",
      description: "Business Insider Finance Summit Berlin - Die wichtigste Konferenz für Finance und Investment in Deutschland.",
      color: "linear-gradient(135deg, #3b82f6, #1e40af)",
      url: "https://hs.businessinsider.de/de/de/summit/finance-summit-berlin",
      category: "Summit",
      logo: "/logos/business-insider.png"
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        paddingTop: isClient && isMobile ? '6rem' : isClient && isTablet ? '7rem' : '8rem',
        paddingBottom: isClient && isMobile ? '2rem' : isClient && isTablet ? '3rem' : '4rem'
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

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: isClient && isMobile ? 'flex' : 'grid',
            flexDirection: isClient && isMobile ? 'column' : undefined,
            gridTemplateColumns: isClient && isMobile ? undefined : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isClient && isMobile ? '2rem' : isClient && isTablet ? '3rem' : '4rem',
            alignItems: isClient && isMobile ? 'stretch' : 'center',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isClient && isMobile ? '0 1rem' : isClient && isTablet ? '0 1.5rem' : '0 2rem'
          }}>
            
            {/* Left Column - Text Content */}
            <div style={{ order: isClient && isMobile ? 2 : 0 }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: isClient && isMobile ? '1rem' : isClient && isTablet ? '1.075rem' : '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                MissCrypto
              </div>
              
              <h1 style={{
                fontSize: isClient && isMobile ? '2rem' : isClient && isTablet ? '2.5rem' : '3rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                lineHeight: '1.2',
                color: '#ffffff'
              }}>
                Presseartikel und{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Interviews
                </span>
              </h1>
              
              <div style={{
                fontSize: isClient && isMobile ? '1rem' : isClient && isTablet ? '1.075rem' : '1.125rem',
                color: '#d1d5db',
                marginBottom: isClient && isMobile ? '2rem' : '2rem',
                lineHeight: '1.6'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Du möchtest ein Interview führen, an einer Zusammenarbeit arbeiten oder hast Fragen rund um Krypto, Blockchain oder Web3?<br />
                  Dann schreib mir gern direkt hier.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Ich freue mich auf deine Nachricht!
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: isClient && isMobile ? 'center' : 'flex-start',
                  alignItems: 'center',
                  marginTop: '2rem'
                }}>
                  <Image
                    src="/logos/Logweiß.png"
                    alt="MissCrypto Logo"
                    width={isClient && isMobile ? 150 : 200}
                    height={isClient && isMobile ? 75 : 100}
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: isClient && isMobile ? '1rem' : '1.5rem',
              padding: isClient && isMobile ? '1.5rem' : isClient && isTablet ? '2rem' : '2.5rem',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(20px)',
              order: isClient && isMobile ? 1 : 0
            }}>
              <h3 style={{
                fontSize: isClient && isMobile ? '1.25rem' : isClient && isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                color: '#f8dfa5',
                marginBottom: '2rem',
                textAlign: isClient && isMobile ? 'center' : 'left'
              }}>
                Ich freue mich auf deine Nachricht.
              </h3>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="press-name" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isClient && isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}>
                    Name*
                  </label>
                  <input
                    type="text"
                    id="press-name"
                    placeholder="Max Mustermann"
                    required
                    style={{
                      width: '100%',
                      padding: isClient && isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isClient && isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      minHeight: '44px',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f8dfa5';
                      e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                      e.target.style.background = 'rgba(0, 0, 0, 0.2)';
                    }}
                  />
                </div>
                
                {/* E-Mail und Telefon - Mobile: Untereinander, Desktop: Nebeneinander */}
                <div style={{ 
                  display: isClient && isMobile ? 'flex' : 'grid',
                  flexDirection: isClient && isMobile ? 'column' : undefined,
                  gridTemplateColumns: isClient && isMobile ? undefined : '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label htmlFor="press-email" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#f8dfa5',
                      fontSize: isClient && isMobile ? '0.8rem' : '0.875rem',
                      fontWeight: '500',
                      textAlign: 'left'
                    }}>
                      E-Mail-Adresse*
                    </label>
                    <input
                      type="email"
                      id="press-email"
                      placeholder="max@beispiel.de"
                      required
                      style={{
                        width: '100%',
                        padding: isClient && isMobile ? '0.875rem' : '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(248, 223, 165, 0.3)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        color: '#ffffff',
                        fontSize: isClient && isMobile ? '0.9rem' : '1rem',
                        transition: 'all 0.3s ease',
                        minHeight: '44px',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f8dfa5';
                        e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                        e.target.style.background = 'rgba(0, 0, 0, 0.2)';
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="press-phone" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#f8dfa5',
                      fontSize: isClient && isMobile ? '0.8rem' : '0.875rem',
                      fontWeight: '500',
                      textAlign: 'left'
                    }}>
                      Rufnummer
                    </label>
                    <input
                      type="tel"
                      id="press-phone"
                      placeholder="+49 123 456789"
                      style={{
                        width: '100%',
                        padding: isClient && isMobile ? '0.875rem' : '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(248, 223, 165, 0.3)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        color: '#ffffff',
                        fontSize: isClient && isMobile ? '0.9rem' : '1rem',
                        transition: 'all 0.3s ease',
                        minHeight: '44px',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f8dfa5';
                        e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                        e.target.style.background = 'rgba(0, 0, 0, 0.2)';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="press-subject" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isClient && isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}>
                    Betreff*
                  </label>
                  <input
                    type="text"
                    id="press-subject"
                    placeholder="Worum geht es?"
                    required
                    style={{
                      width: '100%',
                      padding: isClient && isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isClient && isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      minHeight: '44px',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f8dfa5';
                      e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                      e.target.style.background = 'rgba(0, 0, 0, 0.2)';
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="press-message" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isClient && isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}>
                    Nachricht*
                  </label>
                  <textarea
                    id="press-message"
                    rows={isClient && isMobile ? 4 : 5}
                    placeholder="Deine Nachricht an mich..."
                    required
                    style={{
                      width: '100%',
                      padding: isClient && isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isClient && isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      minHeight: isClient && isMobile ? '100px' : '120px',
                      fontFamily: 'Raleway, sans-serif'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f8dfa5';
                      e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                      e.target.style.background = 'rgba(0, 0, 0, 0.2)';
                    }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <input
                    type="checkbox"
                    id="press-datenschutz"
                    required
                    style={{
                      marginTop: '0.25rem',
                      accentColor: '#f8dfa5',
                      transform: isClient && isMobile ? 'scale(1.1)' : 'scale(1.2)'
                    }}
                  />
                  <label
                    htmlFor="press-datenschutz"
                    style={{
                      fontSize: isClient && isMobile ? '0.8rem' : '0.875rem',
                      color: '#9ca3af',
                      lineHeight: '1.4'
                    }}
                  >
                    Ich stimme den{' '}
                    <Link href="/datenschutz" style={{
                      color: '#f8dfa5',
                      textDecoration: 'underline',
                      transition: 'color 0.3s ease'
                    }}>
                      Datenschutzbestimmungen
                    </Link>
                    {' '}zu und erlaube die Kontaktaufnahme.
                  </label>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: isClient && isMobile ? '0.875rem' : '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#000000',
                    fontSize: isClient && isMobile ? '0.95rem' : '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 223, 165, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Press Articles Section */}
      <section style={{ 
        padding: isClient && isMobile ? '4rem 0' : isClient && isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 50%, #1a1a1a 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isClient && isMobile ? '0 1rem' : isClient && isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isClient && isMobile ? '3rem' : '4rem'
          }}>
            <h2 style={{
              fontSize: isClient && isMobile ? '2rem' : isClient && isTablet ? '2.5rem' : '2.75rem',
              fontWeight: '500',
              marginBottom: '1rem',
              color: '#ffffff',
              lineHeight: '1.2'
            }}>
              Presseartikel & <span style={{
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Auftritte</span>
            </h2>
            <p style={{
              fontSize: isClient && isMobile ? '1rem' : '1.125rem',
              color: '#d1d5db',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Eine Auswahl meiner Auftritte in den Medien und bei wichtigen Branchenevents
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isClient && isMobile ? '1fr' : isClient && isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isClient && isMobile ? '2rem' : '2.5rem',
            gridAutoRows: '1fr'
          }}>
            {pressItems.map((item) => (
              <article key={item.id} style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '1.5rem',
                padding: isClient && isMobile ? '1.5rem' : '2rem',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Header with Logo and Date */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem',
                  gap: '1rem'
                }}>
                  <div style={{ flex: '1' }}>
                    <h3 style={{
                      fontSize: isClient && isMobile ? '1.125rem' : '1.25rem',
                      fontWeight: '600',
                      color: '#ffffff',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3'
                    }}>
                      {item.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: isClient && isMobile ? '0.8rem' : '0.875rem',
                        color: '#9ca3af',
                        fontWeight: '500'
                      }}>
                        {item.date}
                      </span>
                      <span style={{
                        fontSize: isClient && isMobile ? '0.75rem' : '0.8rem',
                        color: '#f8dfa5',
                        background: 'rgba(248, 223, 165, 0.1)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontWeight: '500'
                      }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {item.logo && (
                    <div style={{
                      width: isClient && isMobile ? '60px' : '80px',
                      height: isClient && isMobile ? '60px' : '80px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '0.5rem'
                    }}>
                      <Image
                        src={item.logo}
                        alt={`${item.title} Logo`}
                        width={isClient && isMobile ? 40 : 60}
                        height={isClient && isMobile ? 40 : 60}
                        style={{
                          objectFit: 'contain',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    fontSize: isClient && isMobile ? '0.9rem' : '1rem',
                    marginBottom: '1.5rem',
                    flex: '1'
                  }}>
                    {item.description}
                  </p>

                  {/* CTA Button */}
                  {item.url !== '#' && (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                        color: '#000000',
                        padding: isClient && isMobile ? '0.75rem 1.25rem' : '0.875rem 1.5rem',
                        borderRadius: '0.75rem',
                        fontWeight: '600',
                        fontSize: isClient && isMobile ? '0.875rem' : '0.95rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        width: 'fit-content',
                        alignSelf: 'flex-start'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Artikel lesen
                      <span style={{ fontSize: '0.875rem' }}>↗</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isClient && isMobile ? '4rem 0' : isClient && isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isClient && isMobile ? '0 1rem' : isClient && isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.15), rgba(248, 223, 165, 0.08), rgba(228, 177, 94, 0.15))',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: isClient && isMobile ? '3rem 2rem' : isClient && isTablet ? '3.5rem 3rem' : '4rem',
            textAlign: 'center',
            border: '1px solid rgba(228, 177, 94, 0.3)',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{
              fontSize: isClient && isMobile ? '1.75rem' : isClient && isTablet ? '2.25rem' : '2.5rem',
              fontWeight: '500',
              marginBottom: '1rem',
              color: '#ffffff',
              lineHeight: '1.2'
            }}>
              Lust auf eine{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Zusammenarbeit?
              </span>
            </h2>
            <p style={{
              fontSize: isClient && isMobile ? '1rem' : isClient && isTablet ? '1.125rem' : '1.25rem',
              color: '#d1d5db',
              marginBottom: '2rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Ob Interview, Gastbeitrag oder Kooperation – ich freue mich, von dir zu hören.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center'
            }}>
              <Link 
                href="/kontakt" 
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isClient && isMobile ? '1rem 2.5rem' : isClient && isTablet ? '1.125rem 2.75rem' : '1.25rem 3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  fontSize: isClient && isMobile ? '1rem' : isClient && isTablet ? '1.075rem' : '1.125rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(248, 223, 165, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
                }}
              >
                Jetzt kontaktieren
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressePage; 