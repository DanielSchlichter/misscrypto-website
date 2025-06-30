'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Navigation from './Navigation';

const TransparentHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="mc-header-transparent">
      <div className="mc-header-content">
        {/* Logo */}
        <Logo 
          className="mc-logo"
          iconClassName="mc-logo-icon"
          textClassName="mc-logo-text"
        />

        {/* Desktop Navigation */}
        <Navigation 
          className="mc-nav"
          linkClassName="mc-nav-link"
        />

        {/* CTA Button */}
        <div className="mc-nav">
          <Link href="/boersen" className="mc-cta-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🏅</span>
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
          <Navigation 
            className="mc-mobile-nav"
            linkClassName="mc-mobile-nav-link"
            onLinkClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="mc-mobile-cta">
            <Link href="/boersen" className="mc-cta-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🏦</span>
              Kryptobörsen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default TransparentHeader; 