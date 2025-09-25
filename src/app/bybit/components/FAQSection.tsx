'use client';

import React, { useState } from 'react';

interface FAQSectionProps {
  isMobile: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
  icon: string;
}

export const FAQSection = ({ isMobile }: FAQSectionProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs: (FAQItem & { id: string })[] = [
    {
      id: "faq-sicherheit",
      question: "Ist Bybit sicher und reguliert?",
      answer: "Ja, Bybit hat 2025 eine MiCA-konforme Krypto-Börse in der EU gestartet und erfüllt damit die neuen europaweiten Standards für Krypto-Assets. Kundengelder werden überwiegend in Cold Wallets verwahrt, und moderne Sicherheitsfeatures wie Zwei-Faktor-Authentifizierung schützen vor unbefugtem Zugriff.",
      icon: "🛡️"
    },
    {
      id: "faq-kryptowaehrungen",
      question: "Welche Kryptowährungen kann man bei Bybit handeln?",
      answer: "Bybit bietet über 400 Kryptowährungen zum Handel an, darunter Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Ripple (XRP) und viele weitere. Die Plattform unterstützt sowohl Spot- als auch Futures-Handel mit hoher Liquidität.",
      icon: "💎"
    },
    {
      id: "faq-copy-trading",
      question: "Was ist Copy Trading bei Bybit?",
      answer: "Copy Trading bei Bybit ermöglicht es Anlegern, automatisch die Trades erfolgreicher Händler zu kopieren. Diese Funktion ist ideal für Einsteiger, die von der Erfahrung professioneller Trader profitieren möchten, ohne selbst tiefgreifende Marktanalysen durchführen zu müssen.",
      icon: "👥"
    },
    {
      id: "faq-nutzer",
      question: "Wie viele Nutzer hat Bybit?",
      answer: "Bybit hat weltweit über 20 Millionen registrierte Nutzer und zählt damit zu den führenden internationalen Krypto-Börsen. Die Plattform ist bekannt für ihre hohe Liquidität, schnelle Orderausführung und benutzerfreundliche Oberfläche.",
      icon: "🌍"
    },
    {
      id: "faq-mica",
      question: "Was bedeutet MiCA-konform für Bybit?",
      answer: "MiCA-Konformität bedeutet, dass Bybit die neuen europaweiten Standards für Krypto-Assets erfüllt. Für Nutzer bedeutet das mehr Rechtssicherheit, Transparenz und Anlegerschutz. Ein- und Auszahlungen sind klar nachvollziehbar und bankenfreundlich abgesichert.",
      icon: "🚀"
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section style={{
      padding: isMobile ? '4rem 0' : '6rem 0',
      position: 'relative'
    }}>
      {/* Section Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '3rem' : '4rem'
      }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '200',
          lineHeight: '1.2',
          background: 'linear-gradient(135deg, #f7a602, #ffc107, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Häufige Fragen zu Bybit
        </h2>
        <p style={{
          color: 'rgba(209, 213, 219, 0.8)',
          fontSize: isMobile ? '1rem' : '1.2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Alles was du über Bybit wissen musst – von Sicherheit bis zu Trading-Features
        </p>
      </div>

      {/* FAQ Accordion */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            id={faq.id}
            className="premium-card-bybit"
            itemScope
            itemType="https://schema.org/Question"
            style={{
              marginBottom: '1rem',
              borderRadius: '1rem',
              background: openFAQ === index
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(247, 166, 2, 0.10), rgba(15, 23, 42, 0.9))'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.06), rgba(247, 166, 2, 0.06), rgba(15, 23, 42, 0.9))',
              border: openFAQ === index
                ? '1px solid rgba(59, 130, 246, 0.5)'
                : '1px solid rgba(59, 130, 246, 0.2)',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Question Header */}
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: isMobile ? '1.5rem' : '2rem',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: 'white'
              }}
            >
              <div style={{
                fontSize: '1.5rem',
                minWidth: '2rem',
                textAlign: 'center'
              }}>
                {faq.icon}
              </div>

              <div style={{
                flex: 1
              }}>
                <h3
                  itemProp="name"
                  style={{
                    color: openFAQ === index ? '#f7a602' : 'white',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontWeight: '600',
                    margin: 0,
                    transition: 'color 0.3s ease'
                  }}
                >
                  {faq.question}
                </h3>
              </div>

              <div style={{
                fontSize: '1.2rem',
                color: '#f7a602',
                transform: openFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ➕
              </div>
            </button>

            {/* Answer Content */}
            <div style={{
              maxHeight: openFAQ === index ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              <div
                itemScope
                itemType="https://schema.org/Answer"
                style={{
                  padding: `0 ${isMobile ? '1.5rem' : '2rem'} ${isMobile ? '1.5rem' : '2rem'} ${isMobile ? '4.5rem' : '5rem'}`,
                  color: 'rgba(209, 213, 219, 0.8)',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  lineHeight: '1.6'
                }}
              >
                <span itemProp="text">{faq.answer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};