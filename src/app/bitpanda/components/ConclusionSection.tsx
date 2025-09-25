'use client';

import React from 'react';

interface ConclusionSectionProps {
  isMobile: boolean;
  onBitpandaClick: () => void;
}

export const ConclusionSection = ({ isMobile, onBitpandaClick }: ConclusionSectionProps) => {
  return (
    <section className="premium-card" style={{
      borderRadius: '1.5rem',
      padding: isMobile ? '3rem' : '4rem',
      textAlign: 'center',
      marginTop: '4rem',
      marginBottom: '4rem',
      position: 'relative',
      overflow: 'hidden',
      border: '2px solid rgba(228, 177, 94, 0.3)',
      background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.08) 0%, rgba(248, 223, 165, 0.12) 50%, rgba(26, 26, 46, 0.95) 100%)'
    }}>
      <div style={{ position: 'relative' }}>
        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Unser <span style={{
            background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Fazit</span> zu Bitpanda
        </h2>

        <p style={{
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto 2.5rem auto'
        }}>
          Bitpanda ist eine <strong style={{
            color: 'rgba(228, 177, 94, 0.8)',
            textShadow: '0 0 10px rgba(228, 177, 94, 0.3)'
          }}>ideale Wahl für alle, die eine breit aufgestellte Investment-Plattform</strong> suchen, die Krypto mit klassischen Anlageklassen verbindet. Dank Regulierung durch die FMA, einer benutzerfreundlichen App und einer enormen Asset-Auswahl ist Bitpanda besonders für europäische Anleger interessant, die auf Sicherheit und Vielfalt setzen.
        </p>

        {/* Premium Feature Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {['FMA-reguliert', '650+ Assets', 'Keine Ein-/Auszahlungsgebühren', 'Mobile App'].map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.1), rgba(248, 223, 165, 0.15))',
              border: '1px solid rgba(228, 177, 94, 0.3)',
              borderRadius: '2rem',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              color: 'rgba(209, 213, 219, 0.9)',
              fontWeight: '500'
            }}>
              <span style={{
                color: '#e4b15e',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(228, 177, 94, 0.3)'
              }}>✓</span>
              {feature}
            </div>
          ))}
        </div>

        {/* CTA Button - mc-btn-primary style */}
        <button
          onClick={onBitpandaClick}
          className="mc-btn-primary"
          style={{
            fontSize: '1rem',
            padding: '1rem 2rem',
            boxShadow: '0 10px 30px rgba(228, 177, 94, 0.3)',
            display: 'inline-block'
          }}
        >
          🚀 Jetzt bei Bitpanda starten →
        </button>

        <p style={{
          color: '#9ca3af',
          fontSize: '0.8rem',
          marginTop: '1rem',
          margin: '1rem 0 0 0'
        }}>
          FMA-reguliert • Sicher • Über 650 Assets verfügbar
        </p>
      </div>
    </section>
  );
};