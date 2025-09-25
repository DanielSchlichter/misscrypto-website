'use client';

import React from 'react';

interface WhyKrakenSectionProps {
  isMobile: boolean;
}

export const WhyKrakenSection = ({ isMobile }: WhyKrakenSectionProps) => {
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
          background: 'linear-gradient(135deg, #7131f5, #9c6bff)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Kraken</span>?
      </h2>

      <p style={{
        color: '#d1d5db',
        fontSize: isMobile ? '1rem' : '1.25rem',
        lineHeight: '1.6',
        marginBottom: '3rem',
        textAlign: isMobile ? 'center' : 'left',
        maxWidth: '800px'
      }}>
        Kraken zählt zu den ältesten und sichersten Krypto-Börsen der Welt und hat als eine der ersten die MiCA-Lizenz erhalten.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem'
      }}>
        {/* MiCA-Regulierung & Sicherheit */}
        <div className="premium-card-kraken fade-in-up" style={{
          borderRadius: '1.2rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.12), rgba(156, 107, 255, 0.08), rgba(26, 26, 46, 0.85))',
          border: '1px solid rgba(113, 49, 245, 0.3)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(113, 49, 245, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
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
            background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.2), rgba(156, 107, 255, 0.3))',
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
                background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.25), rgba(156, 107, 255, 0.3))',
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
                color: '#7131f5',
                margin: 0
              }}>
                MiCA-Regulierung
              </h3>
            </div>
            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              lineHeight: '1.7',
              margin: 0,
              fontSize: '1rem',
              fontWeight: '300'
            }}>
              Mit der MiCA-Lizenz der Central Bank of Ireland unterliegt Kraken den strengsten europäischen Krypto-Vorgaben. Das bedeutet maximale Sicherheit und Rechtssicherheit für deutsche Anleger.
            </p>
          </div>
        </div>

        {/* Sicherheit & Cold Storage */}
        <div className="premium-card-kraken fade-in-up" style={{
          borderRadius: '1.2rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.12), rgba(156, 107, 255, 0.08), rgba(26, 26, 46, 0.85))',
          border: '1px solid rgba(113, 49, 245, 0.3)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(113, 49, 245, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
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
            background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.2), rgba(156, 107, 255, 0.3))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            ❄️
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
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(22, 163, 74, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
              🔒
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#7131f5',
                margin: 0
              }}>
                95% Cold Storage
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
                }}>Seit 2011:</span> Kein erfolgreicher Hack in der gesamten Firmengeschichte
              </div>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>Security:</span> 2FA, API-Whitelisting, Withdrawal Whitelists
              </div>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>Cold Storage:</span> 95% aller Assets offline gesichert
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};