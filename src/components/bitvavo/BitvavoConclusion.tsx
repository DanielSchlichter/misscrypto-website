'use client';

import React from 'react';

interface BitivavoConclusionProps {
  isMobile: boolean;
  onCtaClick: () => void;
}

export const BitvavoConclusion = ({ isMobile, onCtaClick }: BitivavoConclusionProps) => {
  return (
    <section className="premium-card" style={{
      borderRadius: '1.5rem',
      padding: isMobile ? '2.5rem' : '3.5rem',
      marginTop: '4rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.15), rgba(26, 26, 46, 0.9))',
      border: '2px solid rgba(248, 223, 165, 0.3)'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(45deg, transparent 30%, rgba(248, 223, 165, 0.05) 50%, transparent 70%)',
        animation: 'shine 3s ease-in-out infinite'
      }} />

      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          fontSize: isMobile ? '3rem' : '4rem',
          marginBottom: '1.5rem'
        }}>🎯</div>

        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Unser <span style={{
            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Fazit</span> zu Bitvavo
        </h2>

        <p style={{
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto 2.5rem auto'
        }}>
          Bitvavo ist die ideale Wahl für alle, die eine <strong style={{ color: '#22c55e' }}>sichere, kostengünstige und benutzerfreundliche</strong> Krypto-Börse suchen. Mit der MiCA-Lizenz, niedrigsten Gebühren und über 400 verfügbaren Kryptowährungen bietet die Plattform alles, was moderne Anleger benötigen.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <button
            onClick={onCtaClick}
            className="mc-btn-primary"
            style={{
              fontSize: '1rem',
              padding: '1rem 2rem',
              boxShadow: '0 8px 32px rgba(248, 223, 165, 0.3)'
            }}
          >
            🚀 Jetzt bei Bitvavo registrieren
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem'
          }}>
            <span style={{ color: '#22c55e' }}>✓</span>
            Kostenlose Registrierung in 2 Minuten
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '1rem' : '2rem',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.6)',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(248, 223, 165, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <span style={{ color: '#22c55e' }}>✓</span>
            MiCA-lizenziert & DNB-reguliert
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <span style={{ color: '#22c55e' }}>✓</span>
            Über 4 Millionen zufriedene Nutzer
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <span style={{ color: '#22c55e' }}>✓</span>
            Niedrigste Gebühren in Europa
          </div>
        </div>
      </div>
    </section>
  );
};