'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const KontaktPage = () => {
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

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@MissCryptoGer/featured',
      icon: '🎥',
      description: 'Videos & Tutorials'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/misscryptoger/',
      icon: '📸',
      description: 'Behind the Scenes'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dr-stephanie-morgenroth/',
      icon: '💼',
      description: 'Professionelle Updates'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/MissCryptoGER',
      icon: '🐦',
      description: 'News & Thoughts'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@misscryptoger',
      icon: '🎵',
      description: 'Kurze Crypto-Tipps'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
      {/* Hero Section mit Text links und Formular rechts */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        paddingBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
            alignItems: isMobile ? 'stretch' : 'center',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
          }}>
            
            {/* Left Column - Text Content */}
            <div style={{ order: isMobile ? 2 : 0 }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Kontakt
              </div>
              
              <h1 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                lineHeight: '1.2',
                color: '#ffffff',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Lass uns{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  zusammenarbeiten
                </span>
              </h1>
              
              <div style={{
                fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                marginBottom: isMobile ? '2rem' : '3rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Hast du Fragen zu Kryptowährungen, Interesse an einer Zusammenarbeit 
                  oder möchtest du einfach nur Hallo sagen?
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Ich freue mich auf deine Nachricht und helfe dir gerne weiter!
                </p>
              </div>

              {/* Social Media Section in linker Spalte */}
              <div>
                <h2 style={{
                  fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                  fontWeight: '300',
                  marginBottom: '1.5rem',
                  color: '#ffffff',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Folge mir auf{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Social Media
                  </span>
                </h2>

                {/* Mobile: Alle Links untereinander, Tablet & Desktop: 2+3 Layout */}
                {isMobile ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {socialLinks.map((social) => (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.05))',
                          borderRadius: '0.75rem',
                          padding: '1rem',
                          border: '1px solid rgba(248, 223, 165, 0.2)',
                          transition: 'all 0.3s ease',
                          textDecoration: 'none',
                          textAlign: 'center',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          minHeight: '44px'
                        }}
                      >
                        <div style={{
                          fontSize: '1.5rem'
                        }}>
                          {social.icon}
                        </div>
                        <div style={{ textAlign: 'left', flex: 1 }}>
                          <h3 style={{
                            color: '#f8dfa5',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            marginBottom: '0.25rem',
                            fontFamily: 'Raleway, sans-serif'
                          }}>
                            {social.name}
                          </h3>
                          <p style={{
                            color: '#d1d5db',
                            fontSize: '0.75rem',
                            fontFamily: 'Raleway, sans-serif'
                          }}>
                            {social.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Erste Reihe - 2 Links über gesamte Breite */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginBottom: '1rem',
                      justifyContent: 'space-between'
                    }}>
                      {socialLinks.slice(0, 2).map((social) => (
                        <Link
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.05))',
                            borderRadius: '0.75rem',
                            padding: isTablet ? '0.875rem' : '1rem',
                            border: '1px solid rgba(248, 223, 165, 0.2)',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            textAlign: 'center',
                            backdropFilter: 'blur(10px)',
                            width: 'calc(50% - 0.5rem)',
                            minHeight: '48px'
                          }}
                        >
                          <div style={{
                            fontSize: isTablet ? '1.75rem' : '2rem',
                            marginBottom: '0.75rem'
                          }}>
                            {social.icon}
                          </div>
                          <h3 style={{
                            color: '#f8dfa5',
                            fontSize: isTablet ? '0.9rem' : '0.95rem',
                            fontWeight: '600',
                            marginBottom: '0.25rem',
                            fontFamily: 'Raleway, sans-serif'
                          }}>
                            {social.name}
                          </h3>
                          <p style={{
                            color: '#d1d5db',
                            fontSize: isTablet ? '0.7rem' : '0.75rem',
                            fontFamily: 'Raleway, sans-serif'
                          }}>
                            {social.description}
                          </p>
                        </Link>
                      ))}
                    </div>

                    {/* Zweite Reihe - 3 Links */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'space-between'
                    }}>
                      {socialLinks.slice(2).map((social) => (
                        <Link
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.05))',
                            borderRadius: '0.75rem',
                            padding: isTablet ? '0.875rem' : '1rem',
                            border: '1px solid rgba(248, 223, 165, 0.2)',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            textAlign: 'center',
                            backdropFilter: 'blur(10px)',
                            width: 'calc(33.333% - 0.67rem)',
                            minHeight: '48px'
                          }}
                        >
                          <div style={{
                            fontSize: isTablet ? '1.75rem' : '2rem',
                            marginBottom: '0.75rem'
                          }}>
                            {social.icon}
                          </div>
                          <h3 style={{
                            color: '#f8dfa5',
                            fontSize: isTablet ? '0.9rem' : '0.95rem',
                            fontWeight: '600',
                            marginBottom: '0.25rem',
                            fontFamily: 'Raleway, sans-serif'
                          }}>
                            {social.name}
                          </h3>
                          <p style={{
                            color: '#d1d5db',
                            fontSize: isTablet ? '0.7rem' : '0.75rem',
                            fontFamily: 'Raleway, sans-serif'
                          }}>
                            {social.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: isMobile ? '1rem' : '1.5rem',
              padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(20px)',
              order: isMobile ? 1 : 0
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#f8dfa5',
                textAlign: 'center',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Schreibe mir eine Nachricht
              </h3>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Dein Name"
                    required
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Raleway, sans-serif',
                      minHeight: '44px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                {/* E-Mail und Telefon - Mobile: Untereinander, Tablet+: Nebeneinander */}
                <div style={{ 
                  display: isMobile ? 'flex' : 'grid',
                  flexDirection: isMobile ? 'column' : undefined,
                  gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label htmlFor="email" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#f8dfa5',
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      fontWeight: '500',
                      textAlign: 'left',
                      fontFamily: 'Raleway, sans-serif'
                    }}>
                      E-Mail*
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="deine@email.de"
                      required
                      style={{
                        width: '100%',
                        padding: isMobile ? '0.875rem' : '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(248, 223, 165, 0.3)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        color: '#ffffff',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Raleway, sans-serif',
                        minHeight: '44px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#f8dfa5',
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      fontWeight: '500',
                      textAlign: 'left',
                      fontFamily: 'Raleway, sans-serif'
                    }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+49 123 456789"
                      style={{
                        width: '100%',
                        padding: isMobile ? '0.875rem' : '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(248, 223, 165, 0.3)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        color: '#ffffff',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Raleway, sans-serif',
                        minHeight: '44px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Betreff*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Worum geht es?"
                    required
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Raleway, sans-serif',
                      minHeight: '44px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Nachricht*
                  </label>
                  <textarea
                    id="message"
                    rows={isMobile ? 4 : 5}
                    placeholder="Deine Nachricht an mich..."
                    required
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      resize: 'vertical',
                      minHeight: isMobile ? '120px' : '140px',
                      fontFamily: 'Raleway, sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                {/* Datenschutz Checkbox */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    id="datenschutz"
                    required
                    style={{
                      marginTop: '0.25rem',
                      accentColor: '#f8dfa5',
                      minWidth: '16px',
                      minHeight: '16px'
                    }}
                  />
                  <label
                    htmlFor="datenschutz"
                    style={{
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      color: '#9ca3af',
                      lineHeight: '1.4',
                      textAlign: 'left',
                      fontFamily: 'Raleway, sans-serif'
                    }}
                  >
                    Ich akzeptiere die{' '}
                    <Link href="/datenschutz" style={{
                      color: '#f8dfa5',
                      textDecoration: 'underline',
                      transition: 'color 0.3s ease'
                    }}>
                      Datenschutzerklärung
                    </Link>
                    {' '}und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>
                
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.875rem' : '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#000000',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                    fontFamily: 'Raleway, sans-serif',
                    minHeight: '48px'
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
                  Nachricht senden →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        paddingBottom: isMobile ? '4rem' : isTablet ? '5rem' : '6rem'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
            borderRadius: isMobile ? '1rem' : '1.5rem',
            padding: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
            textAlign: 'center',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.1)'
          }}>
            <h3 style={{
              fontSize: isMobile ? '1.375rem' : isTablet ? '1.5rem' : '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Bereit für den nächsten Schritt?
            </h3>
            <p style={{
              color: '#d1d5db',
              marginBottom: '2rem',
              fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
              lineHeight: '1.6',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Entdecke die Welt der Kryptowährungen und starte deine Krypto-Reise noch heute.
            </p>
            <div style={{
              display: 'flex',
              gap: isMobile ? '0.75rem' : '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <Link
                href="/krypto-kaufen"
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isMobile ? '0.875rem 1.5rem' : isTablet ? '0.9375rem 1.75rem' : '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontFamily: 'Raleway, sans-serif',
                  minHeight: isMobile ? '44px' : '48px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                🚀 Krypto-Börsen entdecken
              </Link>
              <Link
                href="/ueber-mich"
                style={{
                  background: 'transparent',
                  color: '#f8dfa5',
                  padding: isMobile ? '0.875rem 1.5rem' : isTablet ? '0.9375rem 1.75rem' : '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontFamily: 'Raleway, sans-serif',
                  minHeight: isMobile ? '44px' : '48px'
                }}
              >
                👩‍💼 Mehr über mich
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontaktPage; 