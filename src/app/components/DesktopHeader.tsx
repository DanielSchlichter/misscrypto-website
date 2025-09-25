'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import KryptoKaufenDropdown from './KryptoKaufenDropdown';

interface DesktopHeaderProps {
  isTablet: boolean;
}

const DesktopHeader = ({ isTablet }: DesktopHeaderProps) => {
  return (
    <header style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'transparent',
      padding: '1.5rem 0',
      fontFamily: 'Raleway, sans-serif'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
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

        {/* CTA Button - Desktop/Tablet */}
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
      </div>
    </header>
  );
};

export default DesktopHeader;