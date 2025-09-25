'use client';

import React from 'react';

interface FeaturesSectionProps {
  isMobile: boolean;
  onKrakenClick: () => void;
}

export const FeaturesSection = ({ isMobile, onKrakenClick }: FeaturesSectionProps) => {
  return (
    <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      {/* Detailed Kraken Info Section */}
      <div style={{
        borderRadius: '1.5rem',
        padding: isMobile ? '2rem' : '3rem',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '3rem',
        border: '2px solid rgba(113, 49, 245, 0.4)',
        background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.10), rgba(156, 107, 255, 0.08), rgba(26, 26, 46, 0.85))',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(113, 49, 245, 0.15) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.75rem' : '1rem',
            marginBottom: isMobile ? '2rem' : '2.5rem'
          }}>
            <div style={{
              width: isMobile ? '50px' : '60px',
              height: isMobile ? '50px' : '60px',
              background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 8px 20px rgba(113, 49, 245, 0.3)'
            }}>
              🐙
            </div>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '600',
              marginBottom: '0',
              color: 'white',
              margin: '0'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #7131f5, #9c6bff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Kraken</span> im Detail
            </h2>
          </div>

          <div style={{
            color: 'rgba(209, 213, 219, 0.9)',
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Besonders bemerkenswert: Kraken hat als eine der ersten internationalen Börsen die MiCA-Lizenz von der Central Bank of Ireland erhalten und ist damit vollständig nach europäischem Recht reguliert.
            </p>

            {/* Highlight Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.2))',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              borderRadius: '12px',
              padding: '1.5rem',
              margin: '2rem 0',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '20px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💡 HIGHLIGHT
              </div>
              <p style={{ margin: 0, fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
                Mit der neuen <strong style={{ color: '#22c55e' }}>MiCA-Lizenz</strong> ist Kraken einer der am strengsten regulierten Krypto-Anbieter in Europa. Das bedeutet für Anleger: maximale Sicherheit, Rechtssicherheit und volle Transparenz – ein entscheidender Vorteil gegenüber nicht regulierten Plattformen.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(113, 49, 245, 0.3)',
              background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.10), rgba(156, 107, 255, 0.08), rgba(26, 26, 46, 0.85))',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#7131f5',
                marginBottom: '0.5rem',
                textShadow: '0 0 20px rgba(113, 49, 245, 0.5)'
              }}>0,16%</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(209, 213, 219, 0.8)',
                lineHeight: '1.4'
              }}>Maker-Gebühren ab</div>
            </div>

            <div style={{
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(113, 49, 245, 0.3)',
              background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.10), rgba(156, 107, 255, 0.08), rgba(26, 26, 46, 0.85))',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#7131f5',
                marginBottom: '0.5rem',
                textShadow: '0 0 20px rgba(113, 49, 245, 0.5)'
              }}>200+</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(209, 213, 219, 0.8)',
                lineHeight: '1.4'
              }}>Kryptowährungen handelbar</div>
            </div>
          </div>

          {/* Feature List */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              color: '#7131f5',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Zahlen & Fakten
            </h3>

            <div style={{
              color: 'rgba(209, 213, 219, 0.9)',
              lineHeight: '1.7',
              marginBottom: '2rem',
              fontSize: '0.95rem'
            }}>
              <p style={{ marginBottom: '0.8rem' }}>• Gegründet 2011, Hauptsitz in San Francisco</p>
              <p style={{ marginBottom: '0.8rem' }}>• 200+ Kryptowährungen handelbar</p>
              <p style={{ marginBottom: '0.8rem' }}>• MiCA-lizenziert durch die Central Bank of Ireland</p>
              <p style={{ marginBottom: '0.8rem' }}>• 95 % Cold Storage für Kundengelder</p>
              <p style={{ marginBottom: '0.8rem' }}>• Gebühren: ab 0,16 % (Maker) und 0,26 % (Taker)</p>
              <p style={{ marginBottom: '2rem' }}>• Profi-Features: Margin Trading, Futures, Staking, OTC-Desk</p>
            </div>

            <h3 style={{
              color: '#7131f5',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Sicherheit & Regulierung
            </h3>

            <p style={{
              color: 'rgba(209, 213, 219, 0.9)',
              lineHeight: '1.7',
              marginBottom: '2rem'
            }}>
              Kraken ist bekannt für seinen kompromisslosen Fokus auf Sicherheit. Über 95 % aller Kunden-Assets werden in Cold Storage verwahrt. Zusätzlich gibt es erweiterte Sicherheitsfunktionen wie Zwei-Faktor-Authentifizierung (2FA), API-Whitelisting und Withdrawal Whitelists.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(113, 49, 245, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(113, 49, 245, 0.2)'
              }}>
                <span style={{ color: '#7131f5', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: 'rgba(209, 213, 219, 0.9)', fontSize: '0.95rem' }}>
                  MiCA-Lizenz der Central Bank of Ireland
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(113, 49, 245, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(113, 49, 245, 0.2)'
              }}>
                <span style={{ color: '#7131f5', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: 'rgba(209, 213, 219, 0.9)', fontSize: '0.95rem' }}>
                  Seit 2011: Kein erfolgreicher Hack
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.15), rgba(156, 107, 255, 0.2))',
            border: '1px solid rgba(113, 49, 245, 0.4)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#7131f5',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span>🐙</span>
              <span>Jetzt Kraken testen und starten</span>
            </div>

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
              Kostenlos registrieren →
            </button>
          </div>
        </div>
      </div>

      {/* Additional Benefits Section */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{
          color: 'white',
          fontSize: isMobile ? '1.3rem' : '1.5rem',
          fontWeight: '600',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Vorteile für <span style={{
            background: 'linear-gradient(135deg, #7131f5, #9c6bff)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Anleger</span>
        </h3>

        <div style={{
          color: 'rgba(209, 213, 219, 0.9)',
          fontSize: isMobile ? '1rem' : '1.1rem',
          lineHeight: '1.7',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Kraken verbindet eine benutzerfreundliche Oberfläche für Einsteiger mit fortgeschrittenen Tools für Profis. Neben Spot-Handel und Sparplänen können Nutzer auch Kryptowährungen staken und Rewards verdienen.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Institutionelle Kunden nutzen Kraken zudem für den OTC-Handel – ein Vertrauenssignal, das die starke Marktposition unterstreicht. Mit der MiCA-Lizenz ist Kraken die perfekte Wahl für sicherheitsbewusste europäische Anleger.
          </p>
        </div>
      </div>
    </section>
  );
};