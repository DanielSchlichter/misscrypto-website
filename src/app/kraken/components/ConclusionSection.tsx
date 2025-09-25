'use client';

import React from 'react';

interface ConclusionSectionProps {
  isMobile: boolean;
  onKrakenClick: () => void;
}

export const ConclusionSection = ({ isMobile, onKrakenClick }: ConclusionSectionProps) => {
  return (
    <section style={{
      borderRadius: '1.5rem',
      padding: isMobile ? '3rem' : '4rem',
      textAlign: 'center',
      marginTop: '4rem',
      marginBottom: '0',
      position: 'relative',
      overflow: 'hidden',
      border: '2px solid rgba(113, 49, 245, 0.4)',
      background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.10) 0%, rgba(156, 107, 255, 0.15) 50%, rgba(26, 26, 46, 0.95) 100%)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
            background: 'linear-gradient(135deg, #7131f5, #9c6bff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Fazit</span> zu Kraken
        </h2>

        <p style={{
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto 2.5rem auto'
        }}>
          Kraken ist die perfekte Wahl für alle, die <strong style={{
            color: 'rgba(113, 49, 245, 0.8)',
            textShadow: '0 0 10px rgba(113, 49, 245, 0.3)'
          }}>globales Know-how mit europäischer Regulierung</strong> verbinden wollen. Dank der MiCA-Lizenz, hohen Sicherheitsstandards und einer breiten Auswahl an Coins ist Kraken sowohl für Einsteiger als auch für erfahrene Trader eine Top-Empfehlung.
        </p>

        {/* Premium Feature Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {['MiCA-lizenziert', '200+ Kryptowährungen', '95% Cold Storage', 'Seit 2011'].map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.15), rgba(156, 107, 255, 0.2))',
              border: '1px solid rgba(113, 49, 245, 0.4)',
              borderRadius: '2rem',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              color: 'rgba(209, 213, 219, 0.9)',
              fontWeight: '500'
            }}>
              <span style={{
                color: '#7131f5',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(113, 49, 245, 0.3)'
              }}>✓</span>
              {feature}
            </div>
          ))}
        </div>

        {/* CTA Button - mc-btn-primary style */}
        <button
          onClick={onKrakenClick}
          className="mc-btn-primary"
          style={{
            fontSize: '1rem',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
            boxShadow: '0 10px 30px rgba(228, 177, 94, 0.3)',
            display: 'inline-block'
          }}
        >
          🐙 Jetzt bei Kraken starten →
        </button>

        <p style={{
          color: '#9ca3af',
          fontSize: '0.8rem',
          marginTop: '1rem',
          margin: '1rem 0 0 0'
        }}>
          MiCA-lizenziert • Central Bank of Ireland • 200+ Kryptowährungen verfügbar
        </p>
      </div>
    </section>
  );
};