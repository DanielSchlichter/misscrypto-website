'use client';

import React from 'react';

interface FeaturesSectionProps {
  isMobile: boolean;
  onBitpandaClick: () => void;
}

export const FeaturesSection = ({ isMobile, onBitpandaClick }: FeaturesSectionProps) => {
  return (
    <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      {/* Detailed Bitpanda Info Section */}
      <div className="premium-card" style={{
        borderRadius: '1.5rem',
        padding: isMobile ? '2rem' : '3rem',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '3rem',
        border: '2px solid rgba(228, 177, 94, 0.3)'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(228, 177, 94, 0.1) 0%, transparent 70%)',
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
              color: '#1a1a2e',
              boxShadow: '0 8px 20px rgba(228, 177, 94, 0.3)'
            }}>
              🏛️
            </div>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '600',
              marginBottom: '0',
              color: 'white',
              margin: '0'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Bitpanda</span> im Detail
            </h2>
          </div>

          <div style={{
            color: 'rgba(209, 213, 219, 0.9)',
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Bitpanda ist eine der bekanntesten Krypto-Börsen in Europa und hat ihren Hauptsitz in Wien. Gegründet 2014, bietet die Plattform heute weit mehr als nur den Handel mit Kryptowährungen: Neben Bitcoin, Ethereum oder XRP können Anleger auch Aktien, ETFs und Edelmetalle kaufen. Damit ist Bitpanda ein echter All-in-One-Investment-Anbieter, der sich sowohl für Einsteiger als auch für erfahrene Trader eignet.
            </p>

            {/* Highlight Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.15))',
              border: '1px solid rgba(34, 197, 94, 0.3)',
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
                Bitpanda erhebt <strong style={{ color: '#22c55e' }}>keine Ein- und Auszahlungsgebühren</strong> und punktet mit einer besonders einfachen Benutzeroberfläche, die auch Anfängern den Einstieg in die Welt der Kryptowährungen erleichtert.
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
            <div className="premium-card" style={{
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(228, 177, 94, 0.2)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#e4b15e',
                marginBottom: '0.5rem',
                textShadow: '0 0 20px rgba(228, 177, 94, 0.5)'
              }}>ab 0,25%</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(209, 213, 219, 0.8)',
                lineHeight: '1.4'
              }}>Handelsgebühren beim Kauf und Verkauf von Kryptowährungen</div>
            </div>

            <div className="premium-card" style={{
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(228, 177, 94, 0.2)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#e4b15e',
                marginBottom: '0.5rem',
                textShadow: '0 0 20px rgba(228, 177, 94, 0.5)'
              }}>650+</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(209, 213, 219, 0.8)',
                lineHeight: '1.4'
              }}>digitale Assets (Kryptowährungen, Aktien, ETFs, Edelmetalle)</div>
            </div>
          </div>

          {/* Feature List */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              color: '#e4b15e',
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
              Bitpanda ist durch die österreichische Finanzmarktaufsichtsbehörde (FMA) als PSD2-Zahlungsdienstleister lizenziert. Damit erfüllt die Plattform strenge europäische Vorgaben und bietet ein hohes Maß an Sicherheit und Transparenz. Kundengelder werden separat verwahrt, digitale Assets sind über Cold Storage abgesichert.
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
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: 'rgba(209, 213, 219, 0.9)', fontSize: '0.95rem' }}>
                  Regulierung durch die FMA in Österreich
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: 'rgba(209, 213, 219, 0.9)', fontSize: '0.95rem' }}>
                  Sitz in Wien, europäische Rechts- und Datenschutzstandards
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.1), rgba(248, 223, 165, 0.15))',
            border: '1px solid rgba(228, 177, 94, 0.3)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#e4b15e',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span>👉</span>
              <span>Jetzt Bitpanda testen und starten</span>
            </div>

            <button
              onClick={onBitpandaClick}
              className="mc-btn-primary"
              style={{
                fontSize: '1rem',
                padding: '1rem 2rem',
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
            background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
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
            Ein wesentlicher Vorteil von Bitpanda ist die große Auswahl: Anleger können nicht nur in Kryptowährungen investieren, sondern auch in klassische Anlageklassen wie Gold, Silber oder globale Aktien. Damit eignet sich die Plattform perfekt für alle, die ihr Portfolio breit diversifizieren wollen.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Zudem bietet Bitpanda ein Rewards-Programm, bei dem Nutzer durch den Besitz des hauseigenen BEST-Tokens Gebührenrabatte und weitere Vorteile erhalten. Die intuitive Mobile App rundet das Angebot ab und ermöglicht Investitionen per Smartphone in wenigen Sekunden.
          </p>
        </div>
      </div>
    </section>
  );
};