'use client';

import React from 'react';

interface WhyBitpandaSectionProps {
  isMobile: boolean;
}

export const WhyBitpandaSection = ({ isMobile }: WhyBitpandaSectionProps) => {
  return (
    <section style={{ marginTop: '4rem' }}>
      <h2 style={{
        fontSize: isMobile ? '1.75rem' : '2.25rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: 'white',
        margin: '0 0 1rem 0',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        Warum <span style={{
          background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Bitpanda</span>?
      </h2>

      <p style={{
        color: '#d1d5db',
        fontSize: isMobile ? '1rem' : '1.25rem',
        lineHeight: '1.6',
        marginBottom: '3rem',
        textAlign: isMobile ? 'center' : 'left',
        maxWidth: '800px'
      }}>
        Bitpanda ist eine der bekanntesten Krypto-Börsen Europas und bietet neben Kryptowährungen auch Aktien, ETFs und Edelmetalle.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem'
      }}>
        {/* Regulierung & Sicherheit */}
        <div className="premium-card fade-in-up" style={{
          borderRadius: '1.2rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(228, 177, 94, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        }}>
          {/* Floating Icon */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.1), rgba(248, 223, 165, 0.2))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            🏛️
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🛡️
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#e4b15e',
                margin: 0
              }}>
                FMA-Regulierung
              </h3>
            </div>
            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              lineHeight: '1.7',
              margin: 0,
              fontSize: '1rem',
              fontWeight: '300'
            }}>
              Als österreichische Plattform ist Bitpanda von der FMA (Finanzmarktaufsicht) reguliert und bietet damit höchste Sicherheitsstandards für europäische Anleger.
            </p>
          </div>
        </div>

        {/* Multi-Asset Plattform */}
        <div className="premium-card fade-in-up" style={{
          borderRadius: '1.2rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(228, 177, 94, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        }}>
          {/* Floating Icon */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.1), rgba(248, 223, 165, 0.2))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            📊
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(99, 102, 241, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📈
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#e4b15e',
                margin: 0
              }}>
                650+ Assets
              </h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1rem',
              color: 'rgba(209, 213, 219, 0.9)',
              fontSize: '1rem',
              fontWeight: '300',
              lineHeight: '1.6'
            }}>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>Kryptowährungen:</span> Bitcoin, Ethereum, Solana und 500+ weitere
              </div>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>Aktien & ETFs:</span> Über 3000 Titel von Apple bis Tesla
              </div>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>Edelmetalle:</span> Gold, Silber, Palladium und Platin physisch hinterlegt
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};