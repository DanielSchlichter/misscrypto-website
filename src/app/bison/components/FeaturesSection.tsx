'use client';

import React from 'react';

interface FeaturesSectionProps {
  isMobile: boolean;
  onBisonClick: () => void;
}

export const FeaturesSection = ({ isMobile, onBisonClick }: FeaturesSectionProps) => {
  return (
    <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      {/* Detailed BISON Info Section */}
      <div className="premium-card-bison" style={{
        borderRadius: '1.5rem',
        padding: isMobile ? '2rem' : '3rem',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '3rem',
        border: '2px solid rgba(228, 177, 94, 0.4)',
        background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.10), rgba(115, 205, 221, 0.08), rgba(26, 26, 46, 0.85))'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(115, 205, 221, 0.1) 0%, transparent 70%)',
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
              boxShadow: '0 8px 20px rgba(115, 205, 221, 0.3)'
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
              }}>BISON</span> im Detail
            </h2>
          </div>

          <div style={{
            color: 'rgba(209, 213, 219, 0.9)',
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Besonders Einsteiger profitieren von der klaren Benutzeroberfläche, der deutschen Regulierung und dem engen Bezug zu einer der größten Börsen Deutschlands. BISON kombiniert die Sicherheit einer traditionellen deutschen Börse mit moderner Krypto-Technologie.
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
                Bei BISON gibt es <strong style={{ color: '#22c55e' }}>keine versteckten Gebühren</strong> – der angezeigte Preis ist immer der Endpreis. Alle Kosten sind bereits im Spread enthalten, was die Plattform für Einsteiger besonders transparent macht.
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
            <div className="premium-card-bison" style={{
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(228, 177, 94, 0.3)',
              background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.10), rgba(115, 205, 221, 0.08), rgba(26, 26, 46, 0.85))'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#73cddd',
                marginBottom: '0.5rem',
                textShadow: '0 0 20px rgba(115, 205, 221, 0.5)'
              }}>1,25%</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(209, 213, 219, 0.8)',
                lineHeight: '1.4'
              }}>Spread beim Kauf und Verkauf von Kryptowährungen</div>
            </div>

            <div className="premium-card-bison" style={{
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(228, 177, 94, 0.3)',
              background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.10), rgba(115, 205, 221, 0.08), rgba(26, 26, 46, 0.85))'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#73cddd',
                marginBottom: '0.5rem',
                textShadow: '0 0 20px rgba(115, 205, 221, 0.5)'
              }}>1,99€</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(209, 213, 219, 0.8)',
                lineHeight: '1.4'
              }}>Orderprovision für Aktien und ETFs</div>
            </div>
          </div>

          {/* Feature List */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              color: '#73cddd',
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
              <p style={{ marginBottom: '0.8rem' }}>• 1,25 % Spread beim Kauf und Verkauf von Kryptowährungen</p>
              <p style={{ marginBottom: '0.8rem' }}>• 1,99 € Orderprovision für Aktien und ETFs</p>
              <p style={{ marginBottom: '0.8rem' }}>• 0 € Ein- und Auszahlungsgebühren (SEPA kostenlos, Kreditkarte/Apple Pay/Google Pay 2,49 %)</p>
              <p style={{ marginBottom: '0.8rem' }}>• 40 Kryptowährungen (Bitcoin, Ethereum, XRP, Litecoin, Cardano)</p>
              <p style={{ marginBottom: '2rem' }}>• Deutscher Anbieter mit Sitz in Stuttgart</p>
            </div>

            <h3 style={{
              color: '#73cddd',
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
              BISON wird von der EUWAX AG, einer Tochtergesellschaft der Börse Stuttgart, betrieben. Verwahrt werden die Kryptowährungen durch die blocknox GmbH, die als regulierter Kryptoverwahrer von der deutschen BaFin lizenziert ist. Damit erfüllt BISON höchste Sicherheits- und Transparenzstandards, die in Deutschland gelten.
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
                background: 'rgba(115, 205, 221, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(115, 205, 221, 0.2)'
              }}>
                <span style={{ color: '#73cddd', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: 'rgba(209, 213, 219, 0.9)', fontSize: '0.95rem' }}>
                  BaFin-lizenzierte Kryptoverwahrung durch blocknox
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(115, 205, 221, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(115, 205, 221, 0.2)'
              }}>
                <span style={{ color: '#73cddd', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: 'rgba(209, 213, 219, 0.9)', fontSize: '0.95rem' }}>
                  Deutscher Anbieter mit Sitz in Stuttgart
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(115, 205, 221, 0.1), rgba(56, 189, 248, 0.15))',
            border: '1px solid rgba(115, 205, 221, 0.3)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#73cddd',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span>👉</span>
              <span>Jetzt BISON testen und starten</span>
            </div>

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
            BISON ist nicht nur eine Krypto-App, sondern bietet auch den Handel mit Aktien und ETFs zu einer festen Gebühr von nur 1,99 € pro Order. Damit können Anleger ihr Portfolio direkt in einer App breit diversifizieren – von Bitcoin bis zu globalen Unternehmen.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Die App ist übersichtlich gestaltet und richtet sich vor allem an Einsteiger, die unkompliziert investieren möchten. Funktionen wie Preisalarm, Musterdepot und ein integrierter Steuerreport erleichtern den Einstieg zusätzlich.
          </p>
        </div>
      </div>
    </section>
  );
};