'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
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

  const socialLinks = [
    { 
      name: 'YouTube', 
      href: 'https://www.youtube.com/@MissCryptoGer/featured', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/misscryptoger/', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      )
    },
    { 
      name: 'X', 
      href: 'https://x.com/MissCryptoGER', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/dr-stephanie-morgenroth/', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'TikTok', 
      href: 'https://www.tiktok.com/@misscryptoger', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    }
  ];

  const footerSections = {
    company: {
      title: 'Unternehmen',
      links: [
        { name: 'Über mich', href: '/ueber-mich' },
        { name: 'Presse', href: '/presse' },
        { name: 'Kontakt', href: '/kontakt' },
      ]
    },
    invest: {
      title: 'Investieren',
      links: [
        { name: 'Bitcoin kaufen', href: '/krypto-kaufen?currency=bitcoin' },
        { name: 'Ethereum kaufen', href: '/krypto-kaufen?currency=ethereum' },
        { name: 'BNB kaufen', href: '/krypto-kaufen?currency=bnb' },
        { name: 'Solana kaufen', href: '/krypto-kaufen?currency=solana' },
        { name: 'XRP kaufen', href: '/krypto-kaufen?currency=xrp' },
      ]
    },
    knowledge: {
      title: 'Wissen',
      links: [
        { name: 'Sparplanrechner', href: '/sparplanrechner' },
        { name: 'Krypto-Lexikon', href: '/lexikon' },
        { name: 'Krypto Academy', href: 'https://www.btc-echo.de/academy/schulungen/investieren-in-kryptowahrungen-in-5-schritten/' },
        { name: 'Börsen Vergleich', href: '/krypto-kaufen' },
        { name: 'Wallets', href: '/wallets' },
        { name: 'Newsfeed', href: '/newsfeed' },
      ]
    }
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
      color: '#ffffff',
      padding: isMobile ? '3rem 0 2rem' : isTablet ? '4rem 0 3rem' : '5rem 0 3rem',
      fontFamily: 'Raleway, sans-serif',
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
        background: 'radial-gradient(circle at 20% 50%, rgba(248, 223, 165, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '2.5rem' : '2rem',
          marginBottom: isMobile ? '2.5rem' : '3rem'
        }}>
          {/* Company Info */}
          <div style={{
            gridColumn: isMobile ? '1' : isTablet ? '1 / 3' : '1 / 2',
            marginBottom: isMobile ? '1rem' : '0'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <Logo />
            </div>
            
            <p style={{ 
              color: '#9ca3af', 
              marginBottom: '1.5rem', 
              lineHeight: '1.6',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>
              Ich helfe dir, Krypto zu verstehen – verständlich, ehrlich und mit Empfehlungen, auf die du dich verlassen kannst.
            </p>

            {/* Social Links */}
            <div>
              <p style={{ 
                color: '#f8dfa5', 
                fontWeight: '600', 
                fontSize: isMobile ? '1rem' : '1.125rem',
                marginBottom: '1rem' 
              }}>
                Folge mir für mehr.
              </p>
              <div style={{ 
                display: 'flex', 
                gap: isMobile ? '0.5rem' : '0.75rem', 
                flexWrap: 'wrap' 
              }}>
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Besuche uns auf ${social.name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: isMobile ? '40px' : '44px',
                      height: isMobile ? '40px' : '44px',
                      background: 'rgba(248, 223, 165, 0.1)',
                      borderRadius: '0.75rem',
                      color: '#f8dfa5',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(248, 223, 165, 0.2)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.values(footerSections).map((section) => (
            <div key={section.title}>
              <h3 style={{
                color: '#f8dfa5',
                fontWeight: '600',
                fontSize: isMobile ? '1rem' : '1.125rem',
                marginBottom: '1rem'
              }}>
                {section.title}
              </h3>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {section.links.map((link) => (
                  <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                    {link.href.startsWith('http') ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#d1d5db',
                          textDecoration: 'none',
                          fontSize: isMobile ? '0.875rem' : '0.95rem',
                          transition: 'all 0.3s ease',
                          display: 'block',
                          padding: '0.25rem 0'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#f8dfa5';
                          e.currentTarget.style.paddingLeft = '0.5rem';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#d1d5db';
                          e.currentTarget.style.paddingLeft = '0';
                        }}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        href={link.href}
                        style={{
                          color: '#d1d5db',
                          textDecoration: 'none',
                          fontSize: isMobile ? '0.875rem' : '0.95rem',
                          transition: 'all 0.3s ease',
                          display: 'block',
                          padding: '0.25rem 0'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#f8dfa5';
                          e.currentTarget.style.paddingLeft = '0.5rem';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#d1d5db';
                          e.currentTarget.style.paddingLeft = '0';
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={{
          paddingTop: isMobile ? '1.5rem' : '2rem',
          borderTop: '1px solid #374151',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '1.5rem' : '1rem'
        }}>
          {/* Legal Links */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '1rem' : '1.5rem',
            justifyContent: 'center'
          }}>
            {[
              { name: 'Impressum', href: '/impressum' },
              { name: 'Datenschutz', href: '/datenschutz' },
              { name: 'Cookie-Richtlinie', href: '/cookies' },
              { name: 'Risikohinweise', href: '/risiken' }
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.875rem' : '0.95rem',
                  fontWeight: '500',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#f8dfa5';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#9ca3af';
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright and Disclaimer */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              color: '#6b7280', 
              fontSize: isMobile ? '0.8rem' : '0.875rem', 
              marginBottom: '0.5rem' 
            }}>
              © 2024 MissCrypto. Alle Rechte vorbehalten.
            </p>
            <p style={{ 
              color: '#6b7280', 
              fontSize: isMobile ? '0.7rem' : '0.75rem', 
              lineHeight: '1.5',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <strong>Haftungsausschluss</strong><br />
              Die auf MissCrypto bereitgestellten Inhalte dienen ausschließlich Informations- und Bildungszwecken. Sie stellen keine Anlageberatung, Kauf- oder Verkaufsempfehlung dar. Es wird weder eine Zusicherung zu Kursentwicklungen noch eine Aufforderung zum Handeln ausgesprochen.<br /><br />
              Investitionen in Kryptowährungen und andere Finanzinstrumente sind mit erheblichen Risiken verbunden und können bis zum vollständigen Verlust des eingesetzten Kapitals führen. Alle Informationen ersetzen keine persönliche, auf individuelle Bedürfnisse zugeschnittene Beratung durch Fachleute.<br /><br />
              MissCrypto übernimmt keine Gewähr für Aktualität, Richtigkeit, Vollständigkeit oder Angemessenheit der bereitgestellten Inhalte. Eine Haftung für finanzielle Schäden ist ausgeschlossen.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 