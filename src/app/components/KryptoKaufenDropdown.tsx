'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface KryptoKaufenDropdownProps {
  isTablet?: boolean;
  textColor?: string;
  hoverColor?: string;
}

const KryptoKaufenDropdown: React.FC<KryptoKaufenDropdownProps> = ({
  isTablet = false,
  textColor = '#ffffff',
  hoverColor = '#f8dfa5'
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div
      style={{ position: 'relative', zIndex: 9999 }}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <Link
        href="/krypto-kaufen"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: isDropdownOpen ? hoverColor : textColor,
          textDecoration: 'none',
          fontSize: isTablet ? '0.95rem' : '1rem',
          fontWeight: '500',
          padding: '0.5rem 0',
          position: 'relative',
          transition: 'all 0.3s ease'
        }}
      >
        Krypto kaufen
        <svg
          style={{
            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      {/* Mega Dropdown Panel */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 1rem)',
          left: '50%',
          transform: isDropdownOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)',
          width: '520px',
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          opacity: isDropdownOpen ? 1 : 0,
          visibility: isDropdownOpen ? 'visible' : 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 9999,
          padding: '2rem'
        }}
      >
        {/* Header */}
        <div style={{
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#f8dfa5',
            fontSize: '1.25rem',
            fontWeight: '600',
            margin: 0,
            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🏆 Die besten Krypto-Börsen
          </h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            margin: '0.5rem 0 0 0'
          }}>
            Sicher, reguliert und einsteigerfreundlich
          </p>
        </div>

        {/* Exchange Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {exchanges.map((exchange) => (
            <Link
              key={exchange.name}
              href={exchange.href}
              style={{
                display: 'block',
                padding: '1rem',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${exchange.color}15, ${exchange.color}08)`,
                border: `1px solid ${exchange.color}40`,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.border = `1px solid ${exchange.color}80`;
                e.currentTarget.style.background = `linear-gradient(135deg, ${exchange.color}25, ${exchange.color}15)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.border = `1px solid ${exchange.color}40`;
                e.currentTarget.style.background = `linear-gradient(135deg, ${exchange.color}15, ${exchange.color}08)`;
              }}
            >
              {/* Subtle glow effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 50% 0%, ${exchange.color}20, transparent 70%)`,
                opacity: 0.3,
                pointerEvents: 'none'
              }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{exchange.icon}</span>
                  <div>
                    <h4 style={{
                      color: exchange.color,
                      fontSize: '1rem',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {exchange.name}
                    </h4>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.75rem',
                      margin: '0.125rem 0 0 0'
                    }}>
                      {exchange.highlight}
                    </p>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.75rem'
                  }}>
                    Gebühren: {exchange.fees}
                  </span>
                  <div style={{
                    color: exchange.color,
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(248, 223, 165, 0.2)'
        }}>
          <Link
            href="/krypto-kaufen"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
              color: '#000',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(248, 223, 165, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            📊 Alle Börsen vergleichen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KryptoKaufenDropdown;