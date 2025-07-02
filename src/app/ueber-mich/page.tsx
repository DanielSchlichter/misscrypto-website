'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const UeberMichPage = () => {
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
        minHeight: 'auto', 
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        paddingBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem'
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
          position: 'relative', 
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
            alignItems: 'center',
            minHeight: isMobile ? 'auto' : '70vh'
          }}>
            
            {/* Image - Top on Mobile, Right on Desktop */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: isMobile ? '50vh' : '60vh',
              order: isMobile ? 1 : 2
            }}>
              <Image
                src="/steffi-about.webp"
                alt="Dr. Stephanie Morgenroth - MissCrypto Gründerin"
                width={isMobile ? 300 : 400}
                height={isMobile ? 400 : 500}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '20px',
                  maxHeight: isMobile ? '50vh' : '60vh',
                  width: 'auto',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  border: '2px solid rgba(248, 223, 165, 0.3)'
                }}
                priority
              />
            </div>

            {/* Text Content - Bottom on Mobile, Left on Desktop */}
            <div style={{
              textAlign: isMobile ? 'center' : 'left',
              order: isMobile ? 2 : 1
            }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Über mich
              </div>
              
              <h1 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1.25rem',
                lineHeight: '1.2',
                color: '#ffffff'
              }}>
                Meine Reise von der{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Medizin
                </span>{' '}
                zur Kryptowelt
              </h1>
              
              <div style={{
                fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                color: '#d1d5db',
                marginBottom: '2rem',
                lineHeight: '1.6',
                maxWidth: isMobile ? '100%' : '700px'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  <strong style={{ color: '#f8dfa5' }}>Mein Name ist Dr. Stephanie Morgenroth (Jahrgang 1994).</strong>
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Mit 25 Jahren schloss ich erfolgreich mein Medizinstudium ab.
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Im Jahr 2021 gründete ich den YouTube-Kanal „MissCrypto", um möglichst 
                  vielen Menschen den Zugang zu Kryptowährungen zu erleichtern.
                </p>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: isMobile ? '1rem' : '1.5rem',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-start'
              }}>
                <Link 
                  href="/krypto-kaufen" 
                  style={{
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#000000',
                    padding: isMobile ? '1rem 2rem' : '1.125rem 2.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)',
                    display: 'inline-block',
                    width: isMobile ? '100%' : 'auto',
                    textAlign: 'center'
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
                  Krypto-Börsen entdecken
                </Link>
                <Link 
                  href="#social-media" 
                  style={{ 
                    background: 'transparent',
                    color: '#f8dfa5',
                    padding: isMobile ? '1rem 2rem' : '1.125rem 2.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    display: 'inline-block',
                    width: isMobile ? '100%' : 'auto',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Social Media folgen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section style={{ 
        padding: isMobile ? '4rem 0' : isTablet ? '4.5rem 0' : '5rem 0',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 50%, #1a1a1a 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '3rem' : '4rem',
            alignItems: 'center'
          }}>
            
            {/* Chart Element */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
              borderRadius: '20px',
              padding: isMobile ? '2rem' : '3rem',
              border: '2px solid rgba(248, 223, 165, 0.3)',
              textAlign: 'center',
              order: isMobile ? 2 : 1
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: '2rem',
                color: '#f8dfa5'
              }}>
                Krypto-Reise
              </h3>
              
              {/* Simple Chart */}
              <div style={{
                height: isMobile ? '150px' : '200px',
                position: 'relative',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 300 160" style={{ overflow: 'visible' }}>
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="30" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(248, 223, 165, 0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Chart line with ups and downs */}
                  <path
                    d="M 10 140 L 40 120 L 70 130 L 100 90 L 130 105 L 160 70 L 190 85 L 220 50 L 250 65 L 280 30"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#f8dfa5', stopOpacity: 0.8}} />
                      <stop offset="50%" style={{stopColor: '#e4b15e', stopOpacity: 0.9}} />
                      <stop offset="100%" style={{stopColor: '#f8dfa5', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Data points */}
                  <circle cx="10" cy="140" r="3" fill="#f8dfa5" />
                  <circle cx="40" cy="120" r="3" fill="#f8dfa5" />
                  <circle cx="70" cy="130" r="3" fill="#e4b15e" />
                  <circle cx="100" cy="90" r="3" fill="#f8dfa5" />
                  <circle cx="130" cy="105" r="3" fill="#e4b15e" />
                  <circle cx="160" cy="70" r="3" fill="#f8dfa5" />
                  <circle cx="190" cy="85" r="3" fill="#e4b15e" />
                  <circle cx="220" cy="50" r="3" fill="#f8dfa5" />
                  <circle cx="250" cy="65" r="3" fill="#e4b15e" />
                  <circle cx="280" cy="30" r="3" fill="#f8dfa5" />
                </svg>
              </div>
              
              <p style={{
                color: '#d1d5db',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                lineHeight: '1.6'
              }}>
                Langfristiger Aufwärtstrend trotz Volatilität
              </p>
            </div>

            {/* Text Content */}
            <div style={{ order: isMobile ? 1 : 2 }}>
              <h2 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem',
                fontWeight: '600',
                marginBottom: '2rem',
                color: '#ffffff',
                lineHeight: '1.2',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Meine <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Mission</span>
              </h2>
              
              <div style={{
                fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Ich glaube fest daran, dass ein besseres Verständnis für digitale 
                  Vermögenswerte die Grundlage dafür bildet, sich eigenverantwortlich mit 
                  finanziellen Zielen auseinanderzusetzen und mehr Chancen für den 
                  eigenen Weg zu begeben.
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Da die Blockchain-Technologie ein wichtiger Teil zukünftiger Infrastrukturen 
                  unserer modernen Netzwerke sein wird, möchte ich Menschen auf 
                  diesem Weg begleiten.
                </p>
                
                <p style={{ 
                  color: '#f8dfa5', 
                  fontWeight: '600', 
                  fontSize: isMobile ? '1.125rem' : '1.25rem' 
                }}>
                  Ich freue mich, auch dir auf dieser Reise durch die Kryptowelt zu unterstützen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="social-media" style={{ 
        background: 'rgba(0, 0, 0, 0.2)', 
        padding: isMobile ? '3rem 0' : '4rem 0' 
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            color: '#f8dfa5', 
            fontSize: isMobile ? '1.25rem' : '1.5rem', 
            marginBottom: isMobile ? '2rem' : '3rem',
            fontWeight: '600'
          }}>
            Bekannt aus der ganzen Welt
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: isMobile ? '1.5rem' : '2rem',
            marginBottom: isMobile ? '3rem' : '4rem'
          }}>
            {[
              { name: 'BTC Echo', logo: '/logos/btc-echo.svg' },
              { name: 'Crypto Insiders', logo: '/logos/crypto-insiders.svg' },
              { name: 'Wirtschafts Woche', logo: '/logos/wirtschafts-woche.svg' },
              { name: 'Invest', logo: '/logos/invest.svg' }
            ].map((partner, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: isMobile ? '1rem' : '1.5rem',
                border: '1px solid rgba(248, 223, 165, 0.1)',
                width: isMobile ? '120px' : '150px',
                height: isMobile ? '80px' : '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  src={partner.logo}
                  alt={`${partner.name} Logo`}
                  width={isMobile ? 80 : 100}
                  height={isMobile ? 40 : 50}
                  style={{
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    filter: 'brightness(0.8)'
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem',
            marginTop: isMobile ? '2rem' : '3rem'
          }}>
            {[
              { 
                platform: 'YouTube', 
                handle: '@MissCryptoGer', 
                url: 'https://www.youtube.com/@MissCryptoGer/featured',
                icon: '🎥',
                color: '#ff0000'
              },
              { 
                platform: 'Instagram', 
                handle: '@misscryptoger', 
                url: 'https://www.instagram.com/misscryptoger/',
                icon: '📸',
                color: '#e4405f'
              },
              { 
                platform: 'LinkedIn', 
                handle: 'Dr. Stephanie Morgenroth', 
                url: 'https://www.linkedin.com/in/dr-stephanie-morgenroth/',
                icon: '💼',
                color: '#0077b5'
              },
              { 
                platform: 'X (Twitter)', 
                handle: '@MissCryptoGER', 
                url: 'https://x.com/MissCryptoGER',
                icon: '🐦',
                color: '#1da1f2'
              }
            ].map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.05))',
                  borderRadius: '1rem',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  display: 'block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  marginBottom: '1rem'
                }}>
                  {social.icon}
                </div>
                <h3 style={{
                  color: '#f8dfa5',
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {social.platform}
                </h3>
                <p style={{
                  color: '#d1d5db',
                  fontSize: isMobile ? '0.8rem' : '0.875rem',
                  fontWeight: '500'
                }}>
                  {social.handle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '4rem 0' : isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.15), rgba(248, 223, 165, 0.08), rgba(228, 177, 94, 0.15))',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: isMobile ? '3rem 2rem' : isTablet ? '3.5rem 3rem' : '4rem',
            textAlign: 'center',
            border: '1px solid rgba(228, 177, 94, 0.3)',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
              fontWeight: '500',
              marginBottom: '1rem',
              color: '#ffffff',
              lineHeight: '1.2'
            }}>
              Bereit für deine{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Krypto-Reise?
              </span>
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
              color: '#d1d5db',
              marginBottom: '2rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Starte noch heute und werde Teil der Krypto-Revolution. 
              Sicher und einfach zu den besten Konditionen.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center'
            }}>
              <Link 
                href="/krypto-kaufen" 
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isMobile ? '1rem 2.5rem' : isTablet ? '1.125rem 2.75rem' : '1.25rem 3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
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
                Krypto kaufen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UeberMichPage;
