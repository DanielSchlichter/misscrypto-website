'use client';

import React, { useState } from 'react';

interface BitvavoFAQProps {
  isMobile: boolean;
}

const faqData = [
  {
    question: "Ist Bitvavo sicher?",
    answer: "Ja, Bitvavo gehört zu den sichersten Krypto-Börsen in Europa. Die Plattform ist bei der niederländischen Zentralbank (DNB) registriert und seit 2025 zusätzlich nach der neuen MiCA-Verordnung in der EU lizenziert. Kundengelder werden getrennt auf Treuhandkonten verwahrt, digitale Assets liegen größtenteils im Cold Storage. Zusätzlich gibt es Schutzmechanismen wie Zwei-Faktor-Authentifizierung (2FA) und Anti-Phishing-Codes. Damit erfüllt Bitvavo höchste Standards für Sicherheit und Transparenz."
  },
  {
    question: "Wie hoch sind die Gebühren bei Bitvavo?",
    answer: "Bitvavo bietet ein sehr günstiges Gebührenmodell. Die Standard-Handelsgebühren liegen bei 0,25% für Käufer (Taker) und 0,15% für Verkäufer (Maker). Mit steigendem Handelsvolumen lassen sich die Gebühren weiter reduzieren – bis auf nur 0,04%. Ein- und Auszahlungen per SEPA sind kostenlos, was die Plattform besonders attraktiv für Anleger macht, die regelmäßig investieren möchten."
  },
  {
    question: "Kann man bei Bitvavo einen Sparplan einrichten?",
    answer: "Ja, Bitvavo bietet eine einfache Möglichkeit, Sparpläne für Kryptowährungen einzurichten. Nutzer können auswählen, welchen Betrag sie in regelmäßigen Abständen investieren möchten, und die Käufe laufen dann automatisch. Das ist ideal für Dollar-Cost-Averaging (DCA), also den langfristigen Vermögensaufbau durch regelmäßige Investitionen in Bitcoin oder andere Kryptowährungen."
  },
  {
    question: "Welche Kryptowährungen gibt es bei Bitvavo?",
    answer: "Bei Bitvavo stehen über 400 Kryptowährungen zur Verfügung – darunter die großen Coins wie Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Solana (SOL) oder Cardano (ADA). Zusätzlich finden Anleger auch viele kleinere Projekte und Trend-Assets. Die große Auswahl macht Bitvavo sowohl für Einsteiger als auch für fortgeschrittene Investoren interessant."
  },
  {
    question: "Was bedeutet die MiCA-Lizenz von Bitvavo?",
    answer: "Die MiCA-Regulierung (Markets in Crypto-Assets) ist seit 2025 der neue EU-Standard für Krypto-Börsen. Mit der MiCA-Lizenz erfüllt Bitvavo die strengsten europäischen Anforderungen in Bezug auf Verbraucherschutz, Transparenz und Sicherheit. Für Anleger bedeutet das: mehr Vertrauen, klare rechtliche Rahmenbedingungen und ein besonders hohes Schutzniveau."
  }
];

export const BitvavoFAQ = ({ isMobile }: BitvavoFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ marginTop: '4rem' }}>
      <h2 style={{
        fontSize: isMobile ? '1.75rem' : '2.25rem',
        fontWeight: '600',
        marginBottom: '3rem',
        color: 'white',
        margin: '0 0 3rem 0',
        textAlign: 'center'
      }}>
        Häufig gestellte <span style={{
          background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Fragen zu Bitvavo</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem'
      }}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="premium-card fade-in-up"
            style={{
              borderRadius: '1.2rem',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              ...(index === 4 && !isMobile ? { gridColumn: '1 / -1' } : {})
            }}
            onClick={() => toggleFAQ(index)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 223, 165, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
          >
            {/* Animated Background Glow */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'linear-gradient(45deg, transparent 30%, rgba(248, 223, 165, 0.03) 50%, transparent 70%)',
              animation: 'shine 4s ease-in-out infinite',
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#f8dfa5',
                  margin: '0',
                  lineHeight: '1.4',
                  paddingRight: '1rem'
                }}>
                  {faq.question}
                </h3>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: openIndex === index
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}>
                  {openIndex === index ? '−' : '+'}
                </div>
              </div>

              <div style={{
                maxHeight: openIndex === index ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-out',
                opacity: openIndex === index ? 1 : 0.7
              }}>
                <p style={{
                  color: 'rgba(209, 213, 219, 0.9)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: '0',
                  paddingTop: openIndex === index ? '0.5rem' : '0',
                  transition: 'padding-top 0.3s ease'
                }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};