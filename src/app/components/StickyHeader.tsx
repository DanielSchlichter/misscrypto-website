'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import KryptoKaufenDropdown from './KryptoKaufenDropdown';

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      // Schließe mobile Menu bei Desktop-Größe
      if (window.innerWidth >= 1190 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // Setze initiale Bildschirmbreite
    setScreenWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
      
      // Close mobile menu when scrolling
      if (scrollY > 100 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const isMobile = screenWidth < 1190;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  const filteredNavigationItems = [
    { name: '📖 Krypto Kompass', href: '/krypto-kompass' },
    { name: 'Sparplanrechner', href: '/sparplanrechner' },
    { name: 'Krypto-Lexikon', href: '/lexikon' },
    { name: 'Wallets', href: '/wallets' },
    { name: 'Newsfeed', href: '/newsfeed' }
  ];

  const exchanges = [
    {
      name: 'Bitvavo',
      href: '/bitvavo',
      icon: '🇳🇱',
      color: '#3B82F6',
      highlight: 'BaFin-reguliert',
      fees: '0,25%'
    },
    {
      name: 'Bitpanda',
      href: '/bitpanda',
      icon: '🇦🇹',
      color: '#10B981',
      highlight: 'EU-reguliert',
      fees: '1,49%'
    },
    {
      name: 'Kraken',
      href: '/kraken',
      icon: '🐙',
      color: '#8B5CF6',
      highlight: 'Seit 2011',
      fees: '0,25%'
    },
    {
      name: 'Bison',
      href: '/bison',
      icon: '🦬',
      color: '#73CDDD',
      highlight: 'Deutsche Börse',
      fees: '1,25%'
    },
    {
      name: 'Bybit',
      href: '/bybit',
      icon: '🚀',
      color: '#F7A602',
      highlight: 'MiCA-konform',
      fees: '0,25%'
    }
  ];


  if (!isVisible) return null;

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(248, 223, 165, 0.2)',
      padding: isMobile ? '0.75rem 1rem' : '1rem 0',
      fontFamily: 'Raleway, sans-serif',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0' : '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          zIndex: 1001
        }}>
          <Logo />
        </div>

        {/* Desktop/Tablet Navigation */}
        {!isMobile && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: isTablet ? '1.5rem' : '2rem'
          }}>
            {/* Krypto Kompass - First */}
            <Link
              href="/krypto-kompass"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: isTablet ? '0.95rem' : '1rem',
                fontWeight: '500',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#f8dfa5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              📖 Krypto Kompass
            </Link>

            {/* Krypto kaufen Dropdown */}
            <KryptoKaufenDropdown
              isTablet={isTablet}
              textColor="#ffffff"
              hoverColor="#f8dfa5"
            />

            {/* Rest of Navigation Links */}
            <Link
              href="/sparplanrechner"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: isTablet ? '0.95rem' : '1rem',
                fontWeight: '500',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#f8dfa5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Sparplanrechner
            </Link>
            <Link
              href="/lexikon"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: isTablet ? '0.95rem' : '1rem',
                fontWeight: '500',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#f8dfa5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Krypto-Lexikon
            </Link>
            <Link
              href="/wallets"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: isTablet ? '0.95rem' : '1rem',
                fontWeight: '500',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#f8dfa5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Wallets
            </Link>
            <Link
              href="/newsfeed"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: isTablet ? '0.95rem' : '1rem',
                fontWeight: '500',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#f8dfa5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Newsfeed
            </Link>
          </nav>
        )}

        {/* Desktop CTA Button */}
        {screenWidth >= 1190 && (
          <Link
            href="/krypto-kaufen"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              color: '#000000',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 223, 165, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
            }}
          >
            <span style={{ fontSize: '1rem' }}>🏅</span>
            Krypto kaufen
          </Link>
        )}

        {/* Tablet/Mobile: CTA Button + Hamburger Menu */}
        {screenWidth < 1190 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {/* CTA Button */}
            <Link
              href="/krypto-kaufen"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                color: '#000000',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                fontSize: '0.75rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 223, 165, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>🏅</span>
              Krypto kaufen
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '0.5rem',
                zIndex: 1001,
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#f8dfa5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          left: '1rem',
          right: '1rem',
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(22, 33, 62, 0.95) 25%, rgba(15, 23, 42, 0.98) 50%, rgba(30, 41, 59, 0.95) 75%, rgba(51, 65, 85, 0.98) 100%)',
          backdropFilter: 'blur(40px) !important',
          border: '2px solid rgba(248, 223, 165, 0.4)',
          borderRadius: '16px',
          padding: '2rem',
          zIndex: 999,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(248, 223, 165, 0.1)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {/* Mobile Navigation Links */}
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>

            {/* Krypto kaufen Dropdown */}
            <div style={{
              marginTop: '0.5rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(248, 223, 165, 0.2)'
            }}>
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid transparent',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                  e.currentTarget.style.color = '#f8dfa5';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <span>Krypto kaufen</span>
                <svg
                  style={{
                    transform: isMobileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dropdown Content */}
              {isMobileDropdownOpen && (
                <div style={{
                  marginTop: '0.5rem',
                  paddingLeft: '0.5rem',
                  background: 'rgba(248, 223, 165, 0.02)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  border: '1px solid rgba(248, 223, 165, 0.1)'
                }}>
                  {exchanges.map((exchange) => (
                    <Link
                      key={exchange.name}
                      href={exchange.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        borderLeft: `3px solid ${exchange.color}`,
                        background: 'rgba(255, 255, 255, 0.02)',
                        transition: 'all 0.3s ease',
                        marginBottom: '0.75rem',
                        border: `1px solid ${exchange.color}20`
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = `${exchange.color}15`;
                        e.currentTarget.style.borderColor = exchange.color;
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                        e.currentTarget.style.borderColor = `${exchange.color}20`;
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{exchange.icon}</span>
                      <div>
                        <div style={{ color: exchange.color, fontWeight: '600' }}>
                          {exchange.name}
                        </div>
                        <div style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '0.75rem',
                          marginTop: '0.125rem'
                        }}>
                          {exchange.highlight} • {exchange.fees}
                        </div>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/krypto-kaufen"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      color: '#f8dfa5',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      marginTop: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(248, 223, 165, 0.05)',
                      border: '1px solid rgba(248, 223, 165, 0.2)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    📊 Alle Börsen vergleichen
                  </Link>
                </div>
              )}
            </div>

            {/* Weitere Navigation Items */}
            {filteredNavigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  marginBottom: '0.5rem',
                  display: 'block',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(228, 177, 94, 0.1))';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.4)';
                  e.currentTarget.style.color = '#f8dfa5';
                  e.currentTarget.style.transform = 'translateX(8px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(248, 223, 165, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* CSS Animation für das Dropdown */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </header>
  );
};

export default StickyHeader; 