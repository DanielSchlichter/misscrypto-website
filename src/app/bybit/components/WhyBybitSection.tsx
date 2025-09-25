'use client';

import React from 'react';

interface WhyBybitSectionProps {
  isMobile: boolean;
}

export const WhyBybitSection = ({ isMobile }: WhyBybitSectionProps) => {
  return (
    <section style={{
      padding: isMobile ? '4rem 0' : '6rem 0',
      position: 'relative'
    }}>
      {/* Section Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '3rem' : '4rem'
      }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '200',
          lineHeight: '1.2',
          background: 'linear-gradient(135deg, #f7a602, #ffc107, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Bybit Test 2025
        </h2>
        <p style={{
          color: 'rgba(209, 213, 219, 0.8)',
          fontSize: isMobile ? '1rem' : '1.2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          MiCA-konform in EU • 400+ Kryptowährungen • 20+ Mio Nutzer • Copy Trading • Futures & Spot Trading
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? '1.5rem' : '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(247, 166, 2, 0.08), rgba(15, 23, 42, 0.9))',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '1rem',
          padding: '2rem 1rem',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            color: '#f7a602',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>20M+</div>
          <div style={{
            color: 'rgba(209, 213, 219, 0.8)',
            fontSize: '0.9rem'
          }}>Nutzer</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(247, 166, 2, 0.08), rgba(15, 23, 42, 0.9))',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '1rem',
          padding: '2rem 1rem',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            color: '#f7a602',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>400+</div>
          <div style={{
            color: 'rgba(209, 213, 219, 0.8)',
            fontSize: '0.9rem'
          }}>Kryptowährungen</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(247, 166, 2, 0.08), rgba(15, 23, 42, 0.9))',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '1rem',
          padding: '2rem 1rem',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            color: '#f7a602',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>MiCA</div>
          <div style={{
            color: 'rgba(209, 213, 219, 0.8)',
            fontSize: '0.9rem'
          }}>Konform</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(247, 166, 2, 0.08), rgba(15, 23, 42, 0.9))',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '1rem',
          padding: '2rem 1rem',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            color: '#f7a602',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>Copy</div>
          <div style={{
            color: 'rgba(209, 213, 219, 0.8)',
            fontSize: '0.9rem'
          }}>Trading</div>
        </div>
      </div>
    </section>
  );
};