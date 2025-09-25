'use client';

import React from 'react';

interface HeroSectionProps {
  isMobile: boolean;
  isTablet: boolean;
  handleBitvavoClick: () => void;
}

export const HeroSection = ({ isMobile, isTablet, handleBitvavoClick }: HeroSectionProps) => {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10,
      paddingBottom: isMobile ? '3rem' : '4rem',
      paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
      background: 'radial-gradient(ellipse at top center, rgba(248, 223, 165, 0.05) 0%, rgba(26, 26, 46, 0.8) 50%, #000000 100%)',
      minHeight: isMobile ? 'auto' : '90vh'
    }}>
      {/* Floating Particles Background */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Enhanced Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 15% 20%, rgba(248, 223, 165, 0.12) 0%, transparent 40%),
          radial-gradient(circle at 85% 80%, rgba(228, 177, 94, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(248, 223, 165, 0.03) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }}></div>

      <div className="float-element-reverse pulse-effect" style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.15), rgba(212, 175, 55, 0.2))',
        border: '2px solid rgba(228, 177, 94, 0.4)',
        backdropFilter: 'blur(10px)'
      }}></div>
      <div className="float-element" style={{
        position: 'absolute',
        top: '60%',
        left: '5%',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.15))',
        border: '1px solid rgba(248, 223, 165, 0.5)',
        backdropFilter: 'blur(5px)'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem',
        height: '100%',
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
              padding: '0.5rem 1rem',
              borderRadius: '1.5rem',
              boxShadow: '0 2px 8px rgba(248, 223, 165, 0.15)'
            }}>
              🏆 Empfohlene Krypto-Börse
            </div>

            {/* Title */}
            <h1 className="hero-gradient-text" style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4.5rem',
              fontWeight: '200',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              margin: '0 0 2rem 0'
            }}>
              Bitvavo
            </h1>

            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              fontSize: isMobile ? '1.1rem' : '1.35rem',
              lineHeight: '1.7',
              marginBottom: '3rem',
              fontWeight: '300'
            }}>
              Eine der größten Krypto-Börsen Europas mit Sitz in Amsterdam und Top-Adresse für sichere und günstige Krypto-Investments.
            </p>

            {/* CTA Button - mc-btn-primary style */}
            <button
              onClick={handleBitvavoClick}
              className="mc-btn-primary"
              style={{
                fontSize: '1rem',
                padding: '1rem 2rem'
              }}
            >
              🚀 Jetzt bei Bitvavo starten
            </button>
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

      {/* Background Logo - Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '5rem',
        width: isMobile ? '120px' : '180px',
        height: isMobile ? '120px' : '180px',
        opacity: 0.05,
        background: 'url(/logos/bitvavo.svg) no-repeat center center',
        backgroundSize: 'contain',
        zIndex: 1
      }} />
    </section>
  );
};