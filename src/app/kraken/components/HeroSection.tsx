'use client';

import React from 'react';

interface HeroSectionProps {
  isMobile: boolean;
  isTablet: boolean;
  onKrakenClick: () => void;
}

export const HeroSection = ({ isMobile, isTablet, onKrakenClick }: HeroSectionProps) => {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10,
      paddingBottom: isMobile ? '3rem' : '4rem',
      paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
      background: 'radial-gradient(ellipse at top center, rgba(113, 49, 245, 0.12) 0%, rgba(26, 26, 46, 0.8) 50%, #000000 100%)',
      minHeight: isMobile ? 'auto' : '85vh'
    }}>
      {/* Floating Particles Background - Kraken Purple Theme */}
      <div className="floating-particles">
        <div className="particle-kraken"></div>
        <div className="particle-kraken"></div>
        <div className="particle-kraken"></div>
        <div className="particle-kraken"></div>
        <div className="particle-kraken"></div>
        <div className="particle-kraken"></div>
      </div>

      {/* Enhanced Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(113, 49, 245, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(156, 107, 255, 0.10) 0%, transparent 40%),
          radial-gradient(circle at 60% 40%, rgba(113, 49, 245, 0.08) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }}></div>

      {/* Kraken-inspired Decorative Elements */}
      <div className="float-element pulse-effect" style={{
        position: 'absolute',
        bottom: '25%',
        right: '10%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.25), rgba(156, 107, 255, 0.2))',
        border: '2px solid rgba(113, 49, 245, 0.4)',
        backdropFilter: 'blur(15px)'
      }}></div>
      <div className="float-element-reverse" style={{
        position: 'absolute',
        top: '60%',
        left: '5%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(156, 107, 255, 0.3), rgba(113, 49, 245, 0.25))',
        border: '1px solid rgba(156, 107, 255, 0.6)',
        backdropFilter: 'blur(8px)'
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
          gap: isMobile ? '3rem' : '5rem',
          alignItems: 'center',
          width: '100%'
        }}>

          {/* Enhanced Text Content - Left Side */}
          <div className="fade-in-up" style={{
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.2), rgba(156, 107, 255, 0.25))',
              border: '1px solid rgba(113, 49, 245, 0.4)',
              backdropFilter: 'blur(12px)',
              color: '#7131f5',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: '600',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              boxShadow: '0 4px 12px rgba(113, 49, 245, 0.2)'
            }}>
              🐙 MiCA-Lizenziert
            </div>

            {/* Title */}
            <h1 className="hero-gradient-text-kraken" style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4.2rem',
              fontWeight: '200',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              margin: '0 0 2rem 0'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #7131f5, #9c6bff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Kraken Test 2025</span>: MiCA-lizenzierte Krypto-Börse
            </h1>

            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              fontSize: isMobile ? '1.1rem' : '1.35rem',
              lineHeight: '1.7',
              marginBottom: '3rem',
              fontWeight: '300'
            }}>
              Kraken zählt zu den ältesten und sichersten Krypto-Börsen der Welt. Mit der neuen MiCA-Lizenz ist Kraken vollständig nach europäischem Recht reguliert.
            </p>

            {/* CTA Button - mc-btn-primary style */}
            <button
              onClick={onKrakenClick}
              className="mc-btn-primary"
              style={{
                fontSize: '1rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                boxShadow: '0 8px 25px rgba(228, 177, 94, 0.3)'
              }}
            >
              🐙 Jetzt bei Kraken starten
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
              maxWidth: '360px',
              position: 'relative'
            }}>
              {/* MiCA Reguliert Card */}
              <div className="premium-card-kraken" style={{
                borderRadius: '1rem',
                padding: '1.3rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateX(-40px) scale(0.95)',
                marginTop: '-15px',
                background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.15), rgba(156, 107, 255, 0.12), rgba(26, 26, 46, 0.8))',
                border: '1px solid rgba(113, 49, 245, 0.4)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem'
                }}>🐙</div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem'
                }}>MiCA-Lizenz</div>
                <div style={{
                  color: 'rgba(156, 163, 175, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>Central Bank of Ireland</div>
              </div>

              {/* Multi-Asset Card */}
              <div className="premium-card-kraken" style={{
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(113, 49, 245, 0.4)',
                background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.08), rgba(156, 107, 255, 0.12), rgba(26, 26, 46, 0.9))',
                transform: 'translateX(80px)',
                marginBottom: '60px',
                marginTop: '-25px',
                marginRight: '-30px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem'
                }}>🎯</div>
                <div style={{
                  color: '#7131f5',
                  fontWeight: '700',
                  fontSize: '1rem',
                  marginBottom: '0.25rem'
                }}>200+ Kryptos</div>
                <div style={{
                  color: 'rgba(156, 163, 175, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>+ Staking & Trading</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background Logo for Desktop */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '90px',
          right: '350px',
          opacity: '0.12',
          zIndex: 1,
          transform: 'scale(4.5)',
          pointerEvents: 'none'
        }}>
          <svg height="24" viewBox="0 0 91 15" xmlns="http://www.w3.org/2000/svg" style={{
            fill: '#7131f5',
            filter: 'brightness(0.8) contrast(1.2)'
          }}>
            <path d="M79.5312 14.0147V0.785345H81.7917V2.48076C82.5367 1.19636 84.1036 0.400024 85.8761 0.400024C88.7789 0.400024 90.8853 1.94131 90.8853 5.92296V14.0147H88.5734V6.25691C88.5734 3.79085 87.366 2.58351 85.3624 2.58351C83.1018 2.58351 81.8431 4.12479 81.8431 6.33397V14.0147H79.5312Z"></path>
            <path d="M71.5676 14.4C67.4832 14.4 64.8887 11.6514 64.8887 7.3358C64.8887 3.20002 67.5345 0.400024 71.3621 0.400024C75.1639 0.400024 77.8354 2.96883 77.8354 6.64223C77.8354 7.69544 77.8354 7.92663 77.7841 8.15782H67.3033C67.4575 10.7523 69.0758 12.345 71.5932 12.345C73.3657 12.345 74.5987 11.5743 75.2153 10.1615H77.6042C76.9107 12.8074 74.6758 14.4 71.5676 14.4ZM67.3033 6.25691H75.3951C75.2923 3.8936 73.751 2.42938 71.3621 2.42938C69.0758 2.42938 67.5602 3.84223 67.3033 6.25691Z"></path>
            <path d="M44.523 14.4C41.8515 14.4 39.8992 12.9615 39.8992 10.4697C39.8992 7.97801 41.6717 6.84773 43.7524 6.46241L46.9891 5.8459C48.0937 5.64039 48.7359 5.35782 48.7359 4.35599C48.7359 3.20002 47.7597 2.42938 45.8074 2.42938C44.2148 2.42938 42.8276 3.07158 42.6478 4.5358H40.2588C40.4129 1.94131 42.7762 0.400024 45.8331 0.400024C49.5322 0.400024 51.0478 2.24957 51.0478 4.43305V11.2147C51.0478 11.8312 51.3304 12.1395 51.8441 12.1395C52.2808 12.1395 52.5377 12.0367 52.7689 11.8826V13.7578C52.4093 14.0661 51.7928 14.2716 51.0478 14.2716C49.9689 14.2716 49.0441 13.578 48.8129 12.4477C48.1964 13.3211 46.912 14.4 44.523 14.4ZM42.2882 10.3927C42.2882 11.7285 43.4184 12.3707 44.934 12.3707C47.0662 12.3707 48.7359 11.1633 48.7359 9.2881V7.15599C48.479 7.43856 47.6827 7.66975 46.7322 7.84957L44.5744 8.26057C43.0331 8.54314 42.2882 9.21103 42.2882 10.3927Z"></path>
            <path d="M32.9541 14.0147V0.785343H35.2146V2.99452C35.8568 1.42755 37.0128 0.502775 38.8366 0.502775C39.222 0.502775 39.6073 0.57984 39.8128 0.631215V2.99452C39.6073 2.94314 39.1706 2.86608 38.7339 2.86608C36.4733 2.86608 35.266 4.63856 35.266 7.46424V14.0147H32.9541Z"></path>
            <path d="M28.9027 0.785341H31.8825L26.5394 6.02571L32.1651 14.0147H29.4678L24.9724 7.61837L22.7633 9.72479V14.0147H20.4513V0.785341H22.7633V6.84773L28.9027 0.785341Z"></path>
            <path d="M62.2915 0.785341H65.2713L59.9282 6.02571L65.5538 14.0147H62.8566L58.3612 7.61837L56.152 9.72479V14.0147H53.8401V0.785341H56.152V6.84773L62.2915 0.785341Z"></path>
            <path d="M8.79521 0.400024C3.93757 0.400024 0 4.38923 0 9.31008V13.1284C0 13.8308 0.561922 14.3997 1.25558 14.3997C1.94923 14.3997 2.51527 13.8308 2.51527 13.1284V9.31008C2.51527 8.60561 3.07513 8.03662 3.77084 8.03662C4.4645 8.03662 5.02642 8.60561 5.02642 9.31008V13.1284C5.02642 13.8308 5.58834 14.3997 6.282 14.3997C6.97771 14.3997 7.53963 13.8308 7.53963 13.1284V9.31008C7.53963 8.60561 8.10155 8.03662 8.79521 8.03662C9.49092 8.03662 10.0549 8.60561 10.0549 9.31008V13.1284C10.0549 13.8308 10.6168 14.3997 11.3105 14.3997C12.0041 14.3997 12.5661 13.8308 12.5661 13.1284V9.31008C12.5661 8.60561 13.128 8.03662 13.8257 8.03662C14.5194 8.03662 15.0813 8.60561 15.0813 9.31008V13.1284C15.0813 13.8308 15.6432 14.3997 16.339 14.3997C17.0326 14.3997 17.5945 13.8308 17.5945 13.1284V9.31008C17.5945 4.38923 13.6549 0.400024 8.79521 0.400024Z"></path>
          </svg>
        </div>
      )}

      {/* Background Logo for Mobile */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%) scale(3.5)',
          opacity: '0.1',
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <svg height="24" viewBox="0 0 91 15" xmlns="http://www.w3.org/2000/svg" style={{
            fill: '#7131f5',
            filter: 'brightness(0.8) contrast(1.2)'
          }}>
            <path d="M79.5312 14.0147V0.785345H81.7917V2.48076C82.5367 1.19636 84.1036 0.400024 85.8761 0.400024C88.7789 0.400024 90.8853 1.94131 90.8853 5.92296V14.0147H88.5734V6.25691C88.5734 3.79085 87.366 2.58351 85.3624 2.58351C83.1018 2.58351 81.8431 4.12479 81.8431 6.33397V14.0147H79.5312Z"></path>
            <path d="M71.5676 14.4C67.4832 14.4 64.8887 11.6514 64.8887 7.3358C64.8887 3.20002 67.5345 0.400024 71.3621 0.400024C75.1639 0.400024 77.8354 2.96883 77.8354 6.64223C77.8354 7.69544 77.8354 7.92663 77.7841 8.15782H67.3033C67.4575 10.7523 69.0758 12.345 71.5932 12.345C73.3657 12.345 74.5987 11.5743 75.2153 10.1615H77.6042C76.9107 12.8074 74.6758 14.4 71.5676 14.4ZM67.3033 6.25691H75.3951C75.2923 3.8936 73.751 2.42938 71.3621 2.42938C69.0758 2.42938 67.5602 3.84223 67.3033 6.25691Z"></path>
            <path d="M44.523 14.4C41.8515 14.4 39.8992 12.9615 39.8992 10.4697C39.8992 7.97801 41.6717 6.84773 43.7524 6.46241L46.9891 5.8459C48.0937 5.64039 48.7359 5.35782 48.7359 4.35599C48.7359 3.20002 47.7597 2.42938 45.8074 2.42938C44.2148 2.42938 42.8276 3.07158 42.6478 4.5358H40.2588C40.4129 1.94131 42.7762 0.400024 45.8331 0.400024C49.5322 0.400024 51.0478 2.24957 51.0478 4.43305V11.2147C51.0478 11.8312 51.3304 12.1395 51.8441 12.1395C52.2808 12.1395 52.5377 12.0367 52.7689 11.8826V13.7578C52.4093 14.0661 51.7928 14.2716 51.0478 14.2716C49.9689 14.2716 49.0441 13.578 48.8129 12.4477C48.1964 13.3211 46.912 14.4 44.523 14.4ZM42.2882 10.3927C42.2882 11.7285 43.4184 12.3707 44.934 12.3707C47.0662 12.3707 48.7359 11.1633 48.7359 9.2881V7.15599C48.479 7.43856 47.6827 7.66975 46.7322 7.84957L44.5744 8.26057C43.0331 8.54314 42.2882 9.21103 42.2882 10.3927Z"></path>
            <path d="M32.9541 14.0147V0.785343H35.2146V2.99452C35.8568 1.42755 37.0128 0.502775 38.8366 0.502775C39.222 0.502775 39.6073 0.57984 39.8128 0.631215V2.99452C39.6073 2.94314 39.1706 2.86608 38.7339 2.86608C36.4733 2.86608 35.266 4.63856 35.266 7.46424V14.0147H32.9541Z"></path>
            <path d="M28.9027 0.785341H31.8825L26.5394 6.02571L32.1651 14.0147H29.4678L24.9724 7.61837L22.7633 9.72479V14.0147H20.4513V0.785341H22.7633V6.84773L28.9027 0.785341Z"></path>
            <path d="M62.2915 0.785341H65.2713L59.9282 6.02571L65.5538 14.0147H62.8566L58.3612 7.61837L56.152 9.72479V14.0147H53.8401V0.785341H56.152V6.84773L62.2915 0.785341Z"></path>
            <path d="M8.79521 0.400024C3.93757 0.400024 0 4.38923 0 9.31008V13.1284C0 13.8308 0.561922 14.3997 1.25558 14.3997C1.94923 14.3997 2.51527 13.8308 2.51527 13.1284V9.31008C2.51527 8.60561 3.07513 8.03662 3.77084 8.03662C4.4645 8.03662 5.02642 8.60561 5.02642 9.31008V13.1284C5.02642 13.8308 5.58834 14.3997 6.282 14.3997C6.97771 14.3997 7.53963 13.8308 7.53963 13.1284V9.31008C7.53963 8.60561 8.10155 8.03662 8.79521 8.03662C9.49092 8.03662 10.0549 8.60561 10.0549 9.31008V13.1284C10.0549 13.8308 10.6168 14.3997 11.3105 14.3997C12.0041 14.3997 12.5661 13.8308 12.5661 13.1284V9.31008C12.5661 8.60561 13.128 8.03662 13.8257 8.03662C14.5194 8.03662 15.0813 8.60561 15.0813 9.31008V13.1284C15.0813 13.8308 15.6432 14.3997 16.339 14.3997C17.0326 14.3997 17.5945 13.8308 17.5945 13.1284V9.31008C17.5945 4.38923 13.6549 0.400024 8.79521 0.400024Z"></path>
          </svg>
        </div>
      )}
    </section>
  );
};