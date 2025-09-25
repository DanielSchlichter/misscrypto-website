'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import KryptoKaufenDropdown from './KryptoKaufenDropdown';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: '📖 Krypto Kompass', href: '/krypto-kompass' },
    { name: 'Sparplanrechner', href: '/sparplanrechner' },
    { name: 'Krypto-Lexikon', href: '/lexikon' },
    { name: 'Wallets', href: '/wallets' },
    { name: 'Newsfeed', href: '/newsfeed' },
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


  return (
    <header className={`mc-header ${isScrolled ? 'mc-scrolled' : ''}`}>
      <div className="mc-header-content">
        {/* Logo */}
        <Link href="/" className="mc-logo">
          <div className="mc-logo-icon">
            <span style={{ color: '#000', fontWeight: 'bold', fontSize: '1.25rem' }}>MC</span>
          </div>
          <span className="mc-logo-text">MissCrypto</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="mc-nav">
          {/* Krypto Kompass - First */}
          <Link href="/krypto-kompass" className="mc-nav-link">
            📖 Krypto Kompass
          </Link>

          {/* Krypto kaufen Dropdown */}
          <KryptoKaufenDropdown />

          {/* Rest of Navigation Links */}
          <Link href="/sparplanrechner" className="mc-nav-link">
            Sparplanrechner
          </Link>
          <Link href="/lexikon" className="mc-nav-link">
            Krypto-Lexikon
          </Link>
          <Link href="/wallets" className="mc-nav-link">
            Wallets
          </Link>
          <Link href="/newsfeed" className="mc-nav-link">
            Newsfeed
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="mc-nav">
          <Link href="/krypto-kaufen?currency=bitcoin" className="mc-cta-button" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ fontSize: '1rem' }}>🏅</span>
            Kryptobörsen
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mc-mobile-menu-button"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mc-mobile-menu">
          <nav className="mc-mobile-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="mc-mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Krypto Kaufen Section */}
            <div style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(248, 223, 165, 0.2)'
            }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '1rem',
                paddingLeft: '1rem'
              }}>
                Krypto kaufen
              </div>

              {exchanges.map((exchange) => (
                <Link
                  key={exchange.name}
                  href={exchange.href}
                  className="mc-mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingLeft: '2rem',
                    borderLeft: `3px solid ${exchange.color}40`
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
                className="mc-mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  marginTop: '0.5rem',
                  paddingLeft: '2rem',
                  color: '#f8dfa5',
                  fontWeight: '600'
                }}
              >
                📊 Alle Börsen vergleichen
              </Link>
            </div>
          </nav>
          <div className="mc-mobile-cta">
            <Link href="/krypto-kaufen?currency=bitcoin" className="mc-cta-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🏦</span>
              Kryptobörsen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 