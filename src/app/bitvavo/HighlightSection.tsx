'use client';

import React from 'react';

interface HighlightSectionProps {
  isMobile: boolean;
  handleBitvavoClick: () => void;
}

export const HighlightSection = ({ isMobile, handleBitvavoClick }: HighlightSectionProps) => {
  return (
    <section className="premium-card" style={{
      borderRadius: '1.5rem',
      padding: isMobile ? '2.5rem' : '3.5rem',
      marginTop: '4rem',
      position: 'relative',
      overflow: 'hidden',
      border: '2px solid rgba(248, 223, 165, 0.3)',
      background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.08) 0%, rgba(228, 177, 94, 0.12) 50%, rgba(26, 26, 46, 0.95) 100%)'
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
        }}>🏆</div>

        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Europas <span style={{
            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Testsieger</span> 2024
        </h2>

        <p style={{
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '2rem',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto 2rem auto'
        }}>
          Bitvavo überzeugt mit <strong style={{ color: '#22c55e' }}>niedrigsten Gebühren</strong>,
          höchster Sicherheit und einer <strong style={{ color: '#f8dfa5' }}>intuitiven Benutzeroberfläche</strong>.
          Über 4 Millionen Nutzer vertrauen bereits auf Europas modernste Krypto-Börse.
        </p>

        <button
          onClick={handleBitvavoClick}
          className="mc-btn-primary"
          style={{
            fontSize: '1rem',
            padding: '1rem 2rem',
            boxShadow: '0 8px 32px rgba(248, 223, 165, 0.3)'
          }}
        >
          ⭐ Jetzt kostenfrei registrieren
        </button>
      </div>
    </section>
  );
};