'use client';

import React from 'react';

interface WhyBitvavoSectionProps {
  isMobile: boolean;
}

export const WhyBitvavoSection = ({ isMobile }: WhyBitvavoSectionProps) => {
  return (
    <section style={{ marginTop: '4rem' }}>
      <h2 style={{
        fontSize: isMobile ? '1.75rem' : '2.25rem',
        fontWeight: '600',
        marginBottom: '3rem',
        color: 'white',
        margin: '0 0 3rem 0',
        textAlign: 'center'
      }}>
        Warum <span style={{
          background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Bitvavo?</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem'
      }}>
        {/* Premium Sicherheit & Regulierung */}
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
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 223, 165, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
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
            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.2))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            🛡️
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
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
                🏦
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#f8dfa5',
                margin: 0
              }}>
                Sicherheit & Regulierung
              </h3>
            </div>
            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              lineHeight: '1.7',
              margin: 0,
              fontSize: '1rem',
              fontWeight: '300'
            }}>
              Die Registrierung bei Bitvavo ist unkompliziert und erfolgt über das VideoIdent-Verfahren. Als in Europa regulierte Plattform unterliegt Bitvavo der Aufsicht der niederländischen Zentralbank (DNB) und erfüllt seit 2025 zusätzlich alle Anforderungen der EU-weiten MiCA-Regulierung.
            </p>
          </div>
        </div>

        {/* Premium Zahlen & Fakten */}
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
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 223, 165, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
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
            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.2))',
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
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                💰
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#f8dfa5',
                margin: 0
              }}>
                Zahlen & Fakten
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
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>0,25%</span> Standard-Handelsgebühren (reduzierbar bis 0,04% bei hohem Volumen)
              </div>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>400+</span> verfügbare Kryptowährungen
              </div>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>4+ Millionen</span> aktive Nutzer in Europa
              </div>
            </div>
          </div>
        </div>

        {/* Premium Vorteile für Anleger - Full Width */}
        <div className="premium-card fade-in-up" style={{
          borderRadius: '1.2rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          gridColumn: isMobile ? '1' : '1 / -1',
          transition: 'all 0.4s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 223, 165, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        }}>
          {/* Floating Icons */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '20px',
            fontSize: '3rem',
            opacity: '0.1',
            animation: 'float 6s ease-in-out infinite'
          }}>
            💎
          </div>

          <div style={{
            position: 'absolute',
            top: '20px',
            right: '80px',
            fontSize: '2rem',
            opacity: '0.15',
            animation: 'float 4s ease-in-out infinite reverse'
          }}>
            🚀
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(99, 102, 241, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                ⚡
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                color: '#f8dfa5',
                margin: 0
              }}>
                Vorteile für Anleger
              </h3>
            </div>
            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              lineHeight: '1.7',
              margin: 0,
              fontSize: '1rem',
              fontWeight: '300'
            }}>
              Bitvavo kombiniert eine einfache Nutzeroberfläche mit professionellen Funktionen. Neben klassischem Krypto-Handel bietet die Plattform auch Sparpläne, Staking-Möglichkeiten und eine sehr übersichtliche Gebührenstruktur. Besonders attraktiv ist die Mobile App, mit der sich Käufe und Verkäufe von Kryptowährungen in wenigen Sekunden erledigen lassen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};