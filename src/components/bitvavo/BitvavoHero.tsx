'use client';

import React from 'react';

interface BitvavoHeroProps {
  isMobile: boolean;
  isTablet: boolean;
  onCtaClick: () => void;
}

export const BitvavoHero = ({ isMobile, isTablet, onCtaClick }: BitvavoHeroProps) => {
  return (
    <section className="hero-section fade-in-up" style={{
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at top, rgba(248, 223, 165, 0.05) 0%, transparent 50%), linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      padding: isMobile ? '0 1rem' : '0'
    }}>
      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `rgba(248, 223, 165, ${Math.random() * 0.3 + 0.1})`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 6 + 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Background Logo - Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        width: isMobile ? '120px' : '180px',
        height: isMobile ? '120px' : '180px',
        opacity: 0.05,
        background: 'url(/logos/bitvavo.svg) no-repeat center center',
        backgroundSize: 'contain',
        zIndex: 1
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
          gap: isMobile ? '3rem' : '4rem',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Enhanced Text Content - Left Side */}
          <div className="fade-in-up" style={{
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(228, 177, 94, 0.2))',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              backdropFilter: 'blur(10px)',
              color: '#f8dfa5',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: '600',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderRadius: '2rem',
              padding: '0.75rem 1.5rem'
            }}>
              🇪🇺 MiCA-Lizenziert • DNB-Reguliert
            </div>

            <h1 style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4rem',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8dfa5 50%, #e4b15e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              margin: '0 0 1.5rem 0'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Bitvavo</span><br />
              Die führende Krypto-Börse Europas
            </h1>

            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '2.5rem',
              fontWeight: '300',
              maxWidth: '600px',
              margin: isMobile ? '0 0 2.5rem 0' : '0 0 2.5rem 0'
            }}>
              Eine der <strong style={{ color: '#f8dfa5' }}>größten Krypto-Börsen Europas</strong> mit Sitz in Amsterdam. MiCA-lizenziert, sicher und benutzerfreundlich mit nur <strong style={{ color: '#22c55e' }}>0,25% Gebühren</strong>.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '1rem',
              alignItems: isMobile ? 'center' : 'flex-start'
            }}>
              <button
                onClick={onCtaClick}
                className="mc-btn-primary"
                style={{
                  fontSize: '1rem',
                  padding: '1rem 2rem',
                  boxShadow: '0 8px 32px rgba(248, 223, 165, 0.25)',
                  transition: 'all 0.3s ease'
                }}
              >
                🚀 Jetzt bei Bitvavo anmelden
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  ⚡
                </div>
                <span>Keine Einrichtungsgebühr • SEPA-Überweisungen kostenlos</span>
              </div>
            </div>
          </div>

          {/* Premium Stats Cards - Right Side */}
          {!isMobile && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem',
              alignItems: 'center',
              width: '100%',
              maxWidth: '320px',
              position: 'relative'
            }}>
              {/* Premium Rating Card - positioned far left */}
              <div className="premium-card" style={{
                borderRadius: '1rem',
                padding: '1.2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateX(-60px) scale(0.9)',
                marginTop: '-10px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem'
                }}>⭐</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#f8dfa5',
                  marginBottom: '0.25rem'
                }}>4,8/5</div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.8rem'
                }}>über 100.000 Reviews</div>
              </div>

              {/* MiCA License Card - positioned far right */}
              <div className="premium-card" style={{
                borderRadius: '1rem',
                padding: '1.2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateX(100px) scale(0.85)',
                marginTop: '-40px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem'
                }}>🛡️</div>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#22c55e',
                  marginBottom: '0.25rem'
                }}>MiCA-Lizensiert</div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem'
                }}>EU-Regulierung 2025</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};