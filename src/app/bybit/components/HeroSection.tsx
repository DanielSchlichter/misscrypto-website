'use client';

import React from 'react';

interface HeroSectionProps {
  isMobile: boolean;
  isTablet: boolean;
  onBybitClick: () => void;
}

export const HeroSection = ({ isMobile, isTablet, onBybitClick }: HeroSectionProps) => {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      zIndex: 10,
      paddingBottom: isMobile ? '3rem' : '4rem',
      paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
      background: 'radial-gradient(ellipse at top center, rgba(247, 166, 2, 0.12) 0%, rgba(59, 130, 246, 0.08) 30%, rgba(15, 23, 42, 0.8) 60%, #000000 100%)',
      minHeight: isMobile ? 'auto' : '88vh'
    }}>
      {/* Floating Particles Background - Bybit Orange Theme */}
      <div className="floating-particles">
        <div className="particle-bybit"></div>
        <div className="particle-bybit"></div>
        <div className="particle-bybit"></div>
        <div className="particle-bybit"></div>
        <div className="particle-bybit"></div>
        <div className="particle-bybit"></div>
      </div>

      {/* Enhanced Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 85% 75%, rgba(247, 166, 2, 0.12) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }}></div>

      {/* Bybit-inspired Decorative Elements */}
      <div className="float-element-reverse pulse-effect" style={{
        position: 'absolute',
        bottom: '20%',
        right: '8%',
        width: '90px',
        height: '90px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(247, 166, 2, 0.25), rgba(255, 193, 7, 0.2))',
        border: '2px solid rgba(247, 166, 2, 0.4)',
        backdropFilter: 'blur(15px)',
        transform: 'rotate(12deg)'
      }}></div>
      <div className="float-element glow-effect" style={{
        position: 'absolute',
        top: '55%',
        left: '4%',
        width: '70px',
        height: '70px',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.3), rgba(247, 166, 2, 0.25))',
        border: '1px solid rgba(255, 193, 7, 0.6)',
        backdropFilter: 'blur(8px)',
        transform: 'rotate(-8deg)'
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
          gridTemplateColumns: isMobile ? '1fr' : '1.3fr 0.7fr',
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
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(247, 166, 2, 0.15))',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              backdropFilter: 'blur(12px)',
              color: '#f7a602',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: '600',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              boxShadow: '0 4px 12px rgba(247, 166, 2, 0.2)'
            }}>
              🚀 MiCA-Konform
            </div>

            {/* Title */}
            <h1
              className="hero-gradient-text-bybit"
              itemProp="headline"
              style={{
                fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4.2rem',
                fontWeight: '200',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                margin: '0 0 2rem 0'
              }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #f7a602, #ffc107)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Bybit Test 2025</span>: MiCA-konforme Krypto-Börse
            </h1>

            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              fontSize: isMobile ? '1.1rem' : '1.35rem',
              lineHeight: '1.7',
              marginBottom: '3rem',
              fontWeight: '300'
            }}>
              Bybit zählt zu den führenden internationalen Krypto-Börsen mit über 20 Millionen Nutzern weltweit. Bekannt für hohe Liquidität, schnelle Orderausführung und innovative Features wie Copy Trading.
            </p>

            {/* CTA Button - mc-btn-primary style */}
            <button
              onClick={onBybitClick}
              className="mc-btn-primary"
              style={{
                fontSize: '1rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                boxShadow: '0 8px 25px rgba(228, 177, 94, 0.3)'
              }}
            >
              🚀 Jetzt bei Bybit starten
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
              maxWidth: '380px',
              position: 'relative'
            }}>
              {/* MiCA Konform Card */}
              <div className="premium-card-bybit" style={{
                borderRadius: '1rem',
                padding: '1.3rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateX(-45px) scale(0.95)',
                marginTop: '-20px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(247, 166, 2, 0.10), rgba(15, 23, 42, 0.9))',
                border: '1px solid rgba(59, 130, 246, 0.4)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem'
                }}>🚀</div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem'
                }}>MiCA-konform</div>
                <div style={{
                  color: 'rgba(156, 163, 175, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>EU-Standards 2025</div>
              </div>

              {/* Multi-Asset Card */}
              <div className="premium-card-bybit" style={{
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10), rgba(247, 166, 2, 0.08), rgba(15, 23, 42, 0.9))',
                transform: 'translateX(85px)',
                marginBottom: '50px',
                marginTop: '-30px',
                marginRight: '-25px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem'
                }}>⚡</div>
                <div style={{
                  color: '#f7a602',
                  fontWeight: '700',
                  fontSize: '1rem',
                  marginBottom: '0.25rem'
                }}>400+ Kryptos</div>
                <div style={{
                  color: 'rgba(156, 163, 175, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>+ Copy Trading</div>
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
          right: '280px',
          opacity: '0.15',
          zIndex: 1,
          transform: 'scale(5.5)',
          pointerEvents: 'none'
        }}>
          <svg width="87" height="34" viewBox="0 0 87 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: 'brightness(0.8) contrast(1.3)'
          }}>
            <path d="M62.0083 25.3572V3H66.5022V25.3572H62.0083Z" fill="#f7a602"/>
            <path d="M9.63407 31.9983H0V9.64111H9.24666C13.7406 9.64111 16.3591 12.0903 16.3591 15.9214C16.3591 18.4013 14.6774 20.0039 13.5134 20.5375C14.9028 21.1652 16.6813 22.5779 16.6813 25.5624C16.6813 29.7373 13.7406 31.9983 9.63407 31.9983ZM8.89096 13.5355H4.4939V18.6852H8.89096C10.7981 18.6852 11.8652 17.6488 11.8652 16.1095C11.8652 14.5719 10.7981 13.5355 8.89096 13.5355ZM9.18151 22.6104H4.4939V28.1056H9.18151C11.2189 28.1056 12.1874 26.8503 12.1874 25.3418C12.1874 23.835 11.2171 22.6104 9.18151 22.6104Z" fill="white"/>
            <path d="M30.3882 22.8293V31.9983H25.926V22.8293L19.0073 9.64111H23.8886L28.1888 18.6527L32.4239 9.64111H37.3052L30.3882 22.8293Z" fill="white"/>
            <path d="M50.0457 31.9983H40.4116V9.64111H49.6583C54.1522 9.64111 56.7707 12.0903 56.7707 15.9214C56.7707 18.4013 55.089 20.0039 53.925 20.5375C55.3144 21.1652 57.093 22.5779 57.093 25.5624C57.093 29.7373 54.1522 31.9983 50.0457 31.9983ZM49.3026 13.5355H44.9055V18.6852H49.3026C51.2097 18.6852 52.2768 17.6488 52.2768 16.1095C52.2768 14.5719 51.2097 13.5355 49.3026 13.5355ZM49.5931 22.6104H44.9055V28.1056H49.5931C51.6305 28.1056 52.599 26.8503 52.599 25.3418C52.599 23.835 51.6305 22.6104 49.5931 22.6104Z" fill="white"/>
            <path d="M80.986 13.5355V32H76.4921V13.5355H70.4785V9.64111H86.9996V13.5355H80.986Z" fill="white"/>
          </svg>
        </div>
      )}

      {/* Background Logo for Mobile */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%) scale(4.0)',
          opacity: '0.12',
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <svg width="87" height="34" viewBox="0 0 87 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: 'brightness(0.8) contrast(1.3)'
          }}>
            <path d="M62.0083 25.3572V3H66.5022V25.3572H62.0083Z" fill="#f7a602"/>
            <path d="M9.63407 31.9983H0V9.64111H9.24666C13.7406 9.64111 16.3591 12.0903 16.3591 15.9214C16.3591 18.4013 14.6774 20.0039 13.5134 20.5375C14.9028 21.1652 16.6813 22.5779 16.6813 25.5624C16.6813 29.7373 13.7406 31.9983 9.63407 31.9983ZM8.89096 13.5355H4.4939V18.6852H8.89096C10.7981 18.6852 11.8652 17.6488 11.8652 16.1095C11.8652 14.5719 10.7981 13.5355 8.89096 13.5355ZM9.18151 22.6104H4.4939V28.1056H9.18151C11.2189 28.1056 12.1874 26.8503 12.1874 25.3418C12.1874 23.835 11.2171 22.6104 9.18151 22.6104Z" fill="white"/>
            <path d="M30.3882 22.8293V31.9983H25.926V22.8293L19.0073 9.64111H23.8886L28.1888 18.6527L32.4239 9.64111H37.3052L30.3882 22.8293Z" fill="white"/>
            <path d="M50.0457 31.9983H40.4116V9.64111H49.6583C54.1522 9.64111 56.7707 12.0903 56.7707 15.9214C56.7707 18.4013 55.089 20.0039 53.925 20.5375C55.3144 21.1652 57.093 22.5779 57.093 25.5624C57.093 29.7373 54.1522 31.9983 50.0457 31.9983ZM49.3026 13.5355H44.9055V18.6852H49.3026C51.2097 18.6852 52.2768 17.6488 52.2768 16.1095C52.2768 14.5719 51.2097 13.5355 49.3026 13.5355ZM49.5931 22.6104H44.9055V28.1056H49.5931C51.6305 28.1056 52.599 26.8503 52.599 25.3418C52.599 23.835 51.6305 22.6104 49.5931 22.6104Z" fill="white"/>
            <path d="M80.986 13.5355V32H76.4921V13.5355H70.4785V9.64111H86.9996V13.5355H80.986Z" fill="white"/>
          </svg>
        </div>
      )}
    </section>
  );
};