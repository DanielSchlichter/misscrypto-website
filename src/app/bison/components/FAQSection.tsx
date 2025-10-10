'use client';

import React from 'react';

interface FAQSectionProps {
  isMobile: boolean;
}

export const FAQSection = ({ isMobile }: FAQSectionProps) => {
  const faqs = [
    {
      question: "Ist BISON sicher?",
      answer: "Ja, BISON gehört zu den sichersten Plattformen in Deutschland. Die App wird von der EUWAX AG, einer Tochter der Börse Stuttgart, betrieben. Die Verwahrung der Kryptowährungen übernimmt die blocknox GmbH, die von der BaFin reguliert ist. Kundengelder werden getrennt verwahrt und digitale Assets sicher im Cold Storage aufbewahrt. Damit erfüllt BISON höchste deutsche Sicherheits- und Transparenzstandards."
    },
    {
      question: "Welche Gebühren fallen bei BISON an?",
      answer: "Bei BISON gibt es keine klassischen Handelsgebühren. Beim Kauf und Verkauf von Kryptowährungen wird ein transparenter Spread von 1,25 % berechnet. Für den Handel mit Aktien und ETFs fällt eine fixe Orderprovision von 1,99 € pro Trade an. Ein- und Auszahlungen per SEPA sind kostenlos, für Zahlungen per Kreditkarte, Apple Pay oder Google Pay werden 2,49 % berechnet."
    },
    {
      question: "Welche Kryptowährungen gibt es bei BISON?",
      answer: "BISON bietet eine bewusst übersichtliche Auswahl von derzeit über 40 Kryptowährungen, darunter Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Litecoin (LTC) und Cardano (ADA). Die Auswahl ist ideal für Einsteiger, die sich auf die größten und etabliertesten Coins konzentrieren möchten."
    },
    {
      question: "Kann man bei BISON einen Sparplan einrichten?",
      answer: "Ja, BISON ermöglicht die Einrichtung von Krypto-Sparplänen. Nutzer können einen festen Betrag auswählen, der automatisch und regelmäßig investiert wird. Damit eignet sich BISON hervorragend für das Dollar-Cost-Averaging (DCA) – also den langfristigen Vermögensaufbau durch regelmäßige Käufe."
    },
    {
      question: "Kann man bei BISON auch Aktien und ETFs handeln?",
      answer: "Ja, seit 2023 bietet BISON zusätzlich den Handel mit Aktien und ETFs an. Pro Kauf oder Verkauf fällt eine fixe Gebühr von 1,99 € an, unabhängig vom Ordervolumen. Damit ist BISON nicht nur eine Krypto-App, sondern auch ein günstiger Einstieg in den klassischen Wertpapierhandel – praktisch für Anleger, die Krypto und traditionelle Anlagen in einer App kombinieren möchten."
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
          color: 'white',
          boxShadow: '0 8px 20px rgba(115, 205, 221, 0.3)'
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
          }}>Fragen</span> zu BISON
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
          <details key={index} className="premium-card-bison" style={{
            borderRadius: '1.2rem',
            padding: '0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(228, 177, 94, 0.3)',
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.10), rgba(115, 205, 221, 0.06), rgba(26, 26, 46, 0.9))'
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
                  background: 'linear-gradient(135deg, rgba(115, 205, 221, 0.2), rgba(56, 189, 248, 0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  color: '#73cddd',
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
                background: 'rgba(115, 205, 221, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                flexShrink: 0
              }}>
                <span style={{
                  color: '#73cddd',
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
              borderTop: '1px solid rgba(115, 205, 221, 0.1)',
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
          background: 'linear-gradient(90deg, transparent, rgba(115, 205, 221, 0.5), transparent)'
        }}></div>
        <div style={{
          margin: '0 1rem',
          fontSize: '1.5rem'
        }}>✨</div>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(115, 205, 221, 0.5), transparent)'
        }}></div>
      </div>
    </section>
  );
};