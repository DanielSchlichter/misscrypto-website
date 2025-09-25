'use client';

import React from 'react';

interface ConclusionSectionProps {
  isMobile: boolean;
  onBybitClick: () => void;
}

export const ConclusionSection = ({ isMobile, onBybitClick }: ConclusionSectionProps) => {
  return (
    <section style={{
      padding: isMobile ? '4rem 0' : '6rem 0',
      position: 'relative'
    }}>
      {/* Main Conclusion Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(247, 166, 2, 0.10), rgba(15, 23, 42, 0.8))',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        borderRadius: '1.5rem',
        padding: isMobile ? '2.5rem' : '4rem',
        textAlign: 'center',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(247, 166, 2, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        {/* Trophy Icon */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '2rem'
        }}>🚀</div>

        <h2 style={{
          fontSize: isMobile ? '2rem' : '2.8rem',
          fontWeight: '200',
          lineHeight: '1.2',
          background: 'linear-gradient(135deg, #f7a602, #ffc107, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.5rem'
        }}>
          Bybit: MiCA-konforme Krypto-Börse
        </h2>

        <p style={{
          color: 'rgba(209, 213, 219, 0.9)',
          fontSize: isMobile ? '1.1rem' : '1.3rem',
          lineHeight: '1.7',
          marginBottom: '2rem',
          maxWidth: '700px',
          margin: '0 auto 2rem auto'
        }}>
          Bybit zählt zu den führenden internationalen Krypto-Börsen mit über 20 Millionen Nutzern weltweit. Bekannt für hohe Liquidität, schnelle Orderausführung und innovative Features wie Copy Trading.
        </p>

        {/* Key Benefits Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '1.5rem' : '2rem',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          <div>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>🚀</div>
            <div style={{
              color: '#f7a602',
              fontWeight: '700',
              fontSize: '0.9rem',
              marginBottom: '0.25rem'
            }}>
              MiCA-konform
            </div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.7)',
              fontSize: '0.8rem'
            }}>
              EU Standards 2025
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>⚡</div>
            <div style={{
              color: '#f7a602',
              fontWeight: '700',
              fontSize: '0.9rem',
              marginBottom: '0.25rem'
            }}>
              400+ Coins
            </div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.7)',
              fontSize: '0.8rem'
            }}>
              Große Auswahl
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>👥</div>
            <div style={{
              color: '#f7a602',
              fontWeight: '700',
              fontSize: '0.9rem',
              marginBottom: '0.25rem'
            }}>
              Copy Trading
            </div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.7)',
              fontSize: '0.8rem'
            }}>
              Für Einsteiger
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>🌍</div>
            <div style={{
              color: '#f7a602',
              fontWeight: '700',
              fontSize: '0.9rem',
              marginBottom: '0.25rem'
            }}>
              20M+ Nutzer
            </div>
            <div style={{
              color: 'rgba(209, 213, 219, 0.7)',
              fontSize: '0.8rem'
            }}>
              Weltweit
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={onBybitClick}
          className="mc-btn-primary"
          style={{
            fontSize: isMobile ? '1.1rem' : '1.2rem',
            padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
            background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
            boxShadow: '0 12px 35px rgba(228, 177, 94, 0.4)',
            marginBottom: '1.5rem',
            transform: 'scale(1.05)'
          }}
        >
          🚀 Jetzt kostenlos bei Bybit registrieren
        </button>

        <p style={{
          color: 'rgba(209, 213, 219, 0.6)',
          fontSize: '0.9rem',
          marginBottom: 0
        }}>
          ✨ Kostenlose Registrierung • MiCA-konform • 20+ Millionen Nutzer weltweit
        </p>
      </div>
    </section>
  );
};