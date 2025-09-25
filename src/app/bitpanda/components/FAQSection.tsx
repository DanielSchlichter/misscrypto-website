'use client';

import React from 'react';

interface FAQSectionProps {
  isMobile: boolean;
}

export const FAQSection = ({ isMobile }: FAQSectionProps) => {
  const faqs = [
    {
      question: "Ist Bitpanda sicher?",
      answer: "Ja, Bitpanda gilt als eine der sichersten Krypto-Börsen Europas. Die Plattform hat ihren Sitz in Wien und ist durch die österreichische Finanzmarktaufsicht (FMA) als PSD2-Zahlungsdienstleister reguliert. Kundengelder werden getrennt verwahrt, digitale Assets liegen im Cold Storage. Zusätzlich bietet Bitpanda moderne Sicherheitsfunktionen wie Zwei-Faktor-Authentifizierung (2FA) und regelmäßige externe Prüfungen. Durch die klare Regulierung und den Standort in Österreich genießen Nutzer europäische Rechts- und Datenschutzstandards."
    },
    {
      question: "Welche Gebühren fallen bei Bitpanda an?",
      answer: "Bitpanda arbeitet mit fixen Spreads. Beim Kauf oder Verkauf von Kryptowährungen fallen in der Regel 1,49 % an. Für andere Anlageklassen wie Aktien oder Edelmetalle gelten ebenfalls transparente Kostenmodelle. Es gibt keine versteckten Ein- oder Auszahlungsgebühren. Wer den hauseigenen BEST-Token hält, profitiert zudem von Rabatten auf die Handelsgebühren und weiteren Vorteilen im Rewards-Programm."
    },
    {
      question: "Welche Kryptowährungen gibt es bei Bitpanda?",
      answer: "Bitpanda bietet eine sehr große Auswahl von über 400 digitalen Assets. Dazu gehören die bekanntesten Kryptowährungen wie Bitcoin (BTC), Ethereum (ETH) oder Ripple (XRP), aber auch kleinere Projekte und viele Trend-Coins. Zusätzlich können Anleger auf Bitpanda auch Aktien, ETFs und Edelmetalle kaufen. Damit ist Bitpanda eine der vielseitigsten Plattformen für europäische Anleger."
    },
    {
      question: "Kann man bei Bitpanda einen Sparplan einrichten?",
      answer: "Ja, Bitpanda ermöglicht Sparpläne auf Kryptowährungen, Aktien, ETFs und Edelmetalle. Nutzer können einen festen Betrag wählen, der regelmäßig automatisch investiert wird. Die Einrichtung ist unkompliziert und kann per SEPA-Lastschrift laufen. Das macht Bitpanda besonders interessant für Anleger, die langfristig Vermögen aufbauen möchten – egal ob in Bitcoin, Ethereum oder klassische Anlageklassen."
    },
    {
      question: "Was ist das Bitpanda BEST-Token-Programm?",
      answer: "Das BEST-Token-Programm ist ein Vorteilssystem für aktive Nutzer. Wer den Bitpanda Ecosystem Token (BEST) hält, erhält Gebührenrabatte beim Handel, Zugang zu exklusiven Vorteilen und kann an regelmäßigen Belohnungen teilnehmen. BEST stärkt die Bindung an die Plattform und lohnt sich vor allem für Anleger, die Bitpanda regelmäßig nutzen."
    }
  ];

  return (
    <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '0.75rem' : '1rem',
        marginBottom: isMobile ? '2rem' : '3rem',
        justifyContent: 'center'
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
          ❓
        </div>
        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2.25rem',
          fontWeight: '600',
          marginBottom: '0',
          color: 'white',
          margin: '0',
          textAlign: 'center'
        }}>
          Häufige <span style={{
            background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Fragen</span> zu Bitpanda
        </h2>
      </div>

      {/* FAQ Grid */}
      <div style={{
        display: 'grid',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {faqs.map((faq, index) => (
          <details key={index} className="premium-card" style={{
            borderRadius: '1.2rem',
            padding: '0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(228, 177, 94, 0.2)'
          }}>
            <summary style={{
              color: '#ffffff',
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '600',
              padding: isMobile ? '1.25rem' : '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              listStyle: 'none',
              borderRadius: '1.2rem',
              transition: 'all 0.3s ease'
            }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.2), rgba(248, 223, 165, 0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  color: '#e4b15e',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>
                {faq.question}
              </span>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(228, 177, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                flexShrink: 0
              }}>
                <span style={{
                  color: '#e4b15e',
                  fontSize: '0.875rem',
                  transform: 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>▼</span>
              </div>
            </summary>
            <div style={{
              padding: '0 1.5rem 1.5rem',
              color: 'rgba(209, 213, 219, 0.9)',
              lineHeight: '1.7',
              fontSize: isMobile ? '0.95rem' : '1rem',
              borderTop: '1px solid rgba(228, 177, 94, 0.1)',
              marginTop: '-1px',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      {/* Bottom decoration */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
        opacity: '0.3'
      }}>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(228, 177, 94, 0.5), transparent)'
        }}></div>
        <div style={{
          margin: '0 1rem',
          fontSize: '1.5rem'
        }}>✨</div>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(228, 177, 94, 0.5), transparent)'
        }}></div>
      </div>
    </section>
  );
};