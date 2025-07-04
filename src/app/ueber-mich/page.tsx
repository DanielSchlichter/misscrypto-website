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
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem',
            marginTop: isMobile ? '2rem' : '3rem'
          }}>
            {[
              { 
                platform: 'YouTube', 
                handle: '@MissCryptoGer', 
                url: 'https://www.youtube.com/@MissCryptoGer/featured',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                ),
                color: '#ff0000'
              },
              { 
                platform: 'Instagram', 
                handle: '@misscryptoger', 
                url: 'https://www.instagram.com/misscryptoger/',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                ),
                color: '#e4405f'
              },
              { 
                platform: 'LinkedIn', 
                handle: 'Dr. Stephanie Morgenroth', 
                url: 'https://www.linkedin.com/in/dr-stephanie-morgenroth/',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                color: '#0077b5'
              },
              { 
                platform: 'X (Twitter)', 
                handle: '@MissCryptoGER', 
                url: 'https://x.com/MissCryptoGER',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ),
                color: '#1da1f2'
              },
              { 
                platform: 'TikTok', 
                handle: '@misscryptoger', 
                url: 'https://www.tiktok.com/@misscryptoger',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                ),
                color: '#ff0050'
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
                  marginBottom: '1rem',
                  color: social.color,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
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
