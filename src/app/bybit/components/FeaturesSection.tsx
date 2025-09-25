'use client';

import React from 'react';

interface FeaturesSectionProps {
  isMobile: boolean;
  onBybitClick: () => void;
}

export const FeaturesSection = ({ isMobile, onBybitClick }: FeaturesSectionProps) => {
  return (
    <section style={{
      padding: isMobile ? '4rem 0' : '6rem 0',
      position: 'relative'
    }}>
      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(247, 166, 2, 0.10), rgba(15, 23, 42, 0.8))',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        borderRadius: '1rem',
        padding: isMobile ? '2rem' : '3rem',
        textAlign: 'center',
        backdropFilter: 'blur(12px)'
      }}>
        <h2 style={{
          color: '#f7a602',
          fontSize: isMobile ? '1.8rem' : '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}>
          Bybit Test 2025
        </h2>
        <p style={{
          color: 'rgba(209, 213, 219, 0.8)',
          fontSize: isMobile ? '1rem' : '1.2rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          MiCA-konform in EU • 400+ Kryptowährungen • 20+ Mio Nutzer • Copy Trading • Futures & Spot Trading
        </p>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '1rem' : '1.5rem',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem 0.5rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{
              color: '#f7a602',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '0.25rem'
            }}>20M+</div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.8)',
              fontSize: '0.8rem'
            }}>Nutzer</div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem 0.5rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{
              color: '#f7a602',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '0.25rem'
            }}>400+</div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.8)',
              fontSize: '0.8rem'
            }}>Kryptowährungen</div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem 0.5rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{
              color: '#f7a602',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '0.25rem'
            }}>MiCA</div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.8)',
              fontSize: '0.8rem'
            }}>Konform</div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem 0.5rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{
              color: '#f7a602',
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '0.25rem'
            }}>Copy</div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.8)',
              fontSize: '0.8rem'
            }}>Trading</div>
          </div>
        </div>

        <button
          onClick={onBybitClick}
          className="mc-btn-primary"
          style={{
            fontSize: '1rem',
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
            boxShadow: '0 8px 25px rgba(228, 177, 94, 0.3)'
          }}
        >
          Jetzt bei Bybit registrieren
        </button>
      </div>
    </section>
  );
};