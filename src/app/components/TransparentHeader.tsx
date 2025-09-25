'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import KryptoKaufenDropdown from './KryptoKaufenDropdown';

const TransparentHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      // Schließe mobile Menu bei Desktop-Größe
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // Setze initiale Bildschirmbreite
    setScreenWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  return (
    <header style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'transparent',
      padding: isMobile ? '1rem' : '1.5rem 0',
      fontFamily: 'Raleway, sans-serif'
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
            {/* Start Link */}
            <Link
              href="/"
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
              Start
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

        {/* CTA Button - Desktop/Tablet */}
        {!isMobile && (
          <Link 
            href="/krypto-kaufen" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              color: '#000000',
              padding: isTablet ? '0.75rem 1.5rem' : '1rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: isTablet ? '0.875rem' : '1rem',
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
            <span style={{ fontSize: '1.25rem' }}>🏅</span>
            Krypto kaufen
          </Link>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
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
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          borderRadius: '0 0 1rem 1rem',
          padding: '1.5rem',
          zIndex: 1000,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Mobile Navigation Links */}
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s ease',
                  border: '1px solid transparent'
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
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA Button */}
          <Link 
            href="/krypto-kaufen" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              color: '#000000',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🏅</span>
            Krypto kaufen
            </Link>
        </div>
      )}
    </header>
  );
};

export default TransparentHeader; 