'use client';

import React from 'react';

interface FAQSectionProps {
  isMobile: boolean;
}

export const FAQSection = ({ isMobile }: FAQSectionProps) => {
  const faqs = [
    {
      question: "Ist Kraken sicher?",
      answer: "Ja, Kraken gilt als eine der sichersten Krypto-Börsen weltweit. Seit der Gründung 2011 wurde die Plattform nie Opfer eines großen Hacks – ein seltener Rekord in der Branche. Über 95 % der Kundengelder werden in Cold Storage verwahrt. Zusätzlich gibt es starke Sicherheitsfeatures wie Zwei-Faktor-Authentifizierung (2FA), Master Key, API-Whitelisting und Withdrawal Whitelists. Mit der neuen MiCA-Lizenz der Central Bank of Ireland ist Kraken auch in Europa streng reguliert und bietet Anlegern höchste Rechtssicherheit."
    },
    {
      question: "Welche Gebühren fallen bei Kraken an?",
      answer: "Kraken arbeitet mit einem transparenten Gebührenmodell nach Maker-Taker-Prinzip. Die Standardgebühren starten bei 0,16 % für Maker und 0,26 % für Taker. Mit steigendem Handelsvolumen sinken die Kosten deutlich. Ein- und Auszahlungen per SEPA sind für europäische Kunden meist günstig oder kostenlos. Damit ist Kraken auch für aktive Trader attraktiv."
    },
    {
      question: "Welche Kryptowährungen gibt es bei Kraken?",
      answer: "Kraken bietet eine sehr breite Auswahl von über 200 Kryptowährungen. Neben den großen Projekten wie Bitcoin (BTC), Ethereum (ETH) und Ripple (XRP) finden Anleger auch viele kleinere Coins und DeFi-Token. Diese Vielfalt macht Kraken interessant für Einsteiger, die die Klassiker kaufen wollen, aber auch für erfahrene Trader, die Nischenprojekte handeln."
    },
    {
      question: "Kann man bei Kraken staken?",
      answer: "Ja, Kraken gehört zu den führenden Börsen für Krypto-Staking. Nutzer können verschiedene Coins wie Ethereum, Cardano, Polkadot oder Solana direkt über die Plattform staken und dafür regelmäßige Rewards erhalten. Das Staking läuft unkompliziert über das Kraken-Dashboard und eignet sich für alle, die zusätzlich passive Erträge erzielen möchten."
    },
    {
      question: "Was bedeutet die MiCA-Lizenz von Kraken?",
      answer: "Kraken hat 2025 die MiCA-Lizenz von der Central Bank of Ireland erhalten. Damit unterliegt die Plattform vollständig den neuen europäischen Krypto-Regeln. Für Anleger bedeutet das: klare Transparenzpflichten, höherer Verbraucherschutz und streng überwachte Sicherheitsstandards. Die MiCA-Lizenz ist ein wichtiges Signal für Seriosität und macht Kraken zu einer besonders vertrauenswürdigen Wahl im europäischen Markt."
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
          boxShadow: '0 8px 20px rgba(113, 49, 245, 0.3)'
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
            background: 'linear-gradient(135deg, #7131f5, #9c6bff)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Fragen</span> zu Kraken
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
          <details key={index} style={{
            borderRadius: '1.2rem',
            padding: '0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(113, 49, 245, 0.3)',
            background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.10), rgba(156, 107, 255, 0.06), rgba(26, 26, 46, 0.9))',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
                  background: 'linear-gradient(135deg, rgba(113, 49, 245, 0.25), rgba(156, 107, 255, 0.35))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  color: '#7131f5',
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
                background: 'rgba(113, 49, 245, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                flexShrink: 0
              }}>
                <span style={{
                  color: '#7131f5',
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
              borderTop: '1px solid rgba(113, 49, 245, 0.1)',
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
          background: 'linear-gradient(90deg, transparent, rgba(113, 49, 245, 0.5), transparent)'
        }}></div>
        <div style={{
          margin: '0 1rem',
          fontSize: '1.5rem'
        }}>🐙</div>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(113, 49, 245, 0.5), transparent)'
        }}></div>
      </div>
    </section>
  );
};