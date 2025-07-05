'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    { name: 'Start', href: '/' },
    { name: 'Krypto kaufen', href: '/krypto-kaufen' },
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
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="mc-nav-link">
              {item.name}
            </Link>
          ))}
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