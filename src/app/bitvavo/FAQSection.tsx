'use client';

import React from 'react';

interface FAQSectionProps {
  isMobile: boolean;
}

const faqData = [
  {
    question: "Ist Bitvavo sicher?",
    answer: "Ja, Bitvavo gehört zu den sichersten Krypto-Börsen in Europa. Die Plattform ist bei der niederländischen Zentralbank (DNB) registriert und seit 2025 zusätzlich nach der neuen MiCA-Verordnung in der EU lizenziert. Kundengelder werden getrennt auf Treuhandkonten verwahrt, digitale Assets liegen größtenteils im Cold Storage. Zusätzlich gibt es Schutzmechanismen wie Zwei-Faktor-Authentifizierung (2FA) und Anti-Phishing-Codes. Damit erfüllt Bitvavo höchste Standards für Sicherheit und Transparenz."
  },
  {
    question: "Welche Gebühren fallen bei Bitvavo an?",
    answer: "Bitvavo bietet ein sehr günstiges Gebührenmodell. Die Standard-Handelsgebühren liegen bei 0,25% für Käufer (Taker) und 0,15% für Verkäufer (Maker). Mit steigendem Handelsvolumen lassen sich die Gebühren weiter reduzieren – bis auf nur 0,04%. Ein- und Auszahlungen per SEPA sind kostenlos, was die Plattform besonders attraktiv für Anleger macht, die regelmäßig investieren möchten."
  },
  {
    question: "Gibt es bei Bitvavo Sparpläne?",
    answer: "Ja, Bitvavo ermöglicht es, Sparpläne einzurichten. Nutzer können auswählen, welchen Betrag sie in regelmäßigen Abständen investieren möchten. Das ist ideal für langfristige Anlagestrategien und reduziert das Risiko durch Dollar-Cost-Averaging (DCA)."
  },
  {
    question: "Welche Kryptowährungen bietet Bitvavo?",
    answer: "Bitvavo bietet über 400 Kryptowährungen an. Darunter sind alle großen Coins wie Bitcoin (BTC), Ethereum (ETH), XRP, Cardano (ADA) und Solana (SOL). Auch kleinere Altcoins und neue Trend-Kryptowährungen sind verfügbar."
  },
  {
    question: "Was bedeutet die MiCA-Lizenz von Bitvavo?",
    answer: "Die MiCA-Regulierung (Markets in Crypto-Assets) ist seit 2025 der neue EU-Standard für Krypto-Börsen. Mit der MiCA-Lizenz erfüllt Bitvavo die strengsten europäischen Anforderungen in Bezug auf Verbraucherschutz, Transparenz und Sicherheit. Für Anleger bedeutet das: mehr Vertrauen, klare rechtliche Rahmenbedingungen und ein besonders hohes Schutzniveau."
  }
];

export const FAQSection = ({ isMobile }: FAQSectionProps) => {
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
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Fragen</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="premium-card"
            style={{
              borderRadius: '1rem',
              padding: '0.6rem 1.2rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: 'auto',
              minHeight: '30px'
            }}
            onClick={() => {
              const answer = document.getElementById(`faq-answer-${index}`);
              const icon = document.getElementById(`faq-icon-${index}`);
              if (answer && icon) {
                const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
                answer.style.maxHeight = isOpen ? '0px' : '500px';
                answer.style.opacity = isOpen ? '0' : '1';
                icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
              }
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.3rem'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#f8dfa5',
                margin: 0
              }}>
                {faq.question}
              </h3>
              <div
                id={`faq-icon-${index}`}
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  transition: 'transform 0.3s ease',
                  color: '#f8dfa5'
                }}
              >
                +
              </div>
            </div>
            <div
              id={`faq-answer-${index}`}
              style={{
                maxHeight: '0px',
                opacity: '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                color: 'rgba(209, 213, 219, 0.9)',
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};