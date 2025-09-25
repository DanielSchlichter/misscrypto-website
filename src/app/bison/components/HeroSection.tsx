'use client';

import React from 'react';

interface HeroSectionProps {
  isMobile: boolean;
  isTablet: boolean;
  onBisonClick: () => void;
}

export const HeroSection = ({ isMobile, isTablet, onBisonClick }: HeroSectionProps) => {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10,
      paddingBottom: isMobile ? '3rem' : '4rem',
      paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
      background: 'radial-gradient(ellipse at top center, rgba(115, 205, 221, 0.08) 0%, rgba(26, 26, 46, 0.8) 50%, #000000 100%)',
      minHeight: isMobile ? 'auto' : '90vh'
    }}>
      {/* Floating Particles Background - BISON Pink/Red Theme */}
      <div className="floating-particles">
        <div className="particle-bison"></div>
        <div className="particle-bison"></div>
        <div className="particle-bison"></div>
        <div className="particle-bison"></div>
        <div className="particle-bison"></div>
        <div className="particle-bison"></div>
      </div>

      {/* Enhanced Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 25% 25%, rgba(115, 205, 221, 0.12) 0%, transparent 40%),
          radial-gradient(circle at 75% 75%, rgba(56, 189, 248, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(115, 205, 221, 0.05) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }}></div>

      {/* Stuttgart-inspired Decorative Elements */}
      <div className="float-element-reverse pulse-effect" style={{
        position: 'absolute',
        bottom: '20%',
        right: '8%',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(115, 205, 221, 0.2), rgba(56, 189, 248, 0.15))',
        border: '2px solid rgba(115, 205, 221, 0.4)',
        backdropFilter: 'blur(10px)'
      }}></div>
      <div className="float-element" style={{
        position: 'absolute',
        top: '55%',
        left: '3%',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(115, 205, 221, 0.2))',
        border: '1px solid rgba(56, 189, 248, 0.6)',
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
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
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
              background: 'linear-gradient(135deg, rgba(115, 205, 221, 0.15), rgba(56, 189, 248, 0.2))',
              border: '1px solid rgba(115, 205, 221, 0.3)',
              backdropFilter: 'blur(10px)',
              color: '#73cddd',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: '600',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.5rem 1rem',
              borderRadius: '1.5rem',
              boxShadow: '0 2px 8px rgba(115, 205, 221, 0.15)'
            }}>
              🏛️ Börse Stuttgart
            </div>

            {/* Title */}
            <h1 className="hero-gradient-text-bison" style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4.5rem',
              fontWeight: '200',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              margin: '0 0 2rem 0'
            }}>
              Empfohlene Krypto-Börse: <span style={{
                background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>BISON</span>
            </h1>

            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              fontSize: isMobile ? '1.1rem' : '1.35rem',
              lineHeight: '1.7',
              marginBottom: '3rem',
              fontWeight: '300'
            }}>
              BISON ist die Krypto-Plattform der Börse Stuttgart und gehört damit zu den seriösesten und vertrauenswürdigsten Anbietern im deutschsprachigen Raum.
            </p>

            {/* CTA Button - mc-btn-primary style */}
            <button
              onClick={onBisonClick}
              className="mc-btn-primary"
              style={{
                fontSize: '1rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                boxShadow: '0 8px 25px rgba(228, 177, 94, 0.3)'
              }}
            >
              🚀 Jetzt bei BISON starten
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
              maxWidth: '340px',
              position: 'relative'
            }}>
              {/* BaFin Reguliert Card */}
              <div className="premium-card-bison" style={{
                borderRadius: '1rem',
                padding: '1.2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateX(-50px) scale(0.9)',
                marginTop: '-10px',
                background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.15), rgba(115, 205, 221, 0.12), rgba(26, 26, 46, 0.8))',
                border: '1px solid rgba(115, 205, 221, 0.4)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem'
                }}>🏛️</div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem'
                }}>BaFin-reguliert</div>
                <div style={{
                  color: 'rgba(156, 163, 175, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>Börse Stuttgart Tochter</div>
              </div>

              {/* Multi-Asset Card */}
              <div className="premium-card-bison" style={{
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(228, 177, 94, 0.4)',
                background: 'linear-gradient(135deg, rgba(115, 205, 221, 0.08), rgba(228, 177, 94, 0.12), rgba(26, 26, 46, 0.9))',
                transform: 'translateX(90px)',
                marginBottom: '70px',
                marginTop: '-20px',
                marginRight: '-40px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem'
                }}>📱</div>
                <div style={{
                  color: '#73cddd',
                  fontWeight: '700',
                  fontSize: '1rem',
                  marginBottom: '0.25rem'
                }}>32 Kryptowährungen</div>
                <div style={{
                  color: 'rgba(156, 163, 175, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>+ Aktien & ETFs</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background Logo for Desktop */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '150px',
          opacity: '0.25',
          zIndex: 1,
          transform: 'scale(2.5)',
          pointerEvents: 'none'
        }}>
          <img
            src="/cryptologos/Bison-Logo.svg"
            alt="BISON Background Logo"
            style={{
              height: '120px',
              width: 'auto',
              filter: 'brightness(0.7) contrast(1.2)'
            }}
          />
        </div>
      )}

      {/* Background Logo for Mobile */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: '0.25',
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <img
            src="/cryptologos/Bison-Logo.svg"
            alt="BISON Background Logo"
            style={{
              height: '110px',
              width: 'auto',
              filter: 'brightness(0.7) contrast(1.2)'
            }}
          />
        </div>
      )}
    </section>
  );
};