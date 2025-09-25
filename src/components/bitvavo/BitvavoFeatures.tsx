'use client';

import React from 'react';

interface BitvavoFeaturesProps {
  isMobile: boolean;
  onCtaClick: () => void;
}

export const BitvavoFeatures = ({ isMobile, onCtaClick }: BitvavoFeaturesProps) => {
  return (
    <>
      {/* Premium Highlight Section */}
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
            onClick={onCtaClick}
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

      {/* Premium Content Sections */}
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
                marginBottom: '1.25rem'
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
                lineHeight: '1.6',
                margin: 0,
                fontSize: '1rem'
              }}>
                MiCA-Lizenz seit 2025, DNB-Regulierung, Kundengelder auf Treuhandkonten, 95% Cold Storage, 2FA-Authentifizierung.
                Höchste europäische Sicherheitsstandards für über 4 Millionen Nutzer.
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
                marginBottom: '1.25rem'
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
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#f8dfa5',
                  margin: 0
                }}>
                  Perfekt für moderne Anleger
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '2rem',
                color: 'rgba(209, 213, 219, 0.9)',
                fontSize: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.3))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    🏦
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#22c55e',
                      marginBottom: '0.5rem'
                    }}>Kostenlose SEPA-Überweisungen</div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Ein- und Auszahlungen ohne Gebühren – ideal für regelmäßiges Investieren
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.3))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    📱
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#a855f7',
                      marginBottom: '0.5rem'
                    }}>Mobile & Desktop Apps</div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Intuitive Apps für iOS, Android und Web – handeln von überall
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.3))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    🔄
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#f8dfa5',
                      marginBottom: '0.5rem'
                    }}>Automatische Sparpläne</div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Dollar-Cost-Averaging für langfristigen Vermögensaufbau
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};