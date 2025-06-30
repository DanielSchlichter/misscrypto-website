import React from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import CryptoTicker from '../components/CryptoTicker';
import FeaturesSection from '../components/FeaturesSection';
import InvestmentCalculator from '../components/InvestmentCalculator';

const HomePage = () => {
  /* Auskommentiert: Latest Articles Section
  const latestArticles = [
    {
      title: 'Bitcoin über $107.000: MACD signalisiert weitere Stärke',
      excerpt: 'Bitcoin notiert wieder über 107.000 US-Dollar. Technische Indikatoren zeigen weiteres Potenzial.',
      category: 'Bitcoin',
      readTime: '3 min',
      href: '/artikel/bitcoin-macd-bullisch',
    },
    {
      title: 'Ethereum ETF-Zuflüsse treiben Kurs auf neue Hochs',
      excerpt: 'Über 960 Mio. USD flossen seit April in ETH-ETFs. Das Vertrauen in Ethereum wächst.',
      category: 'Ethereum',
      readTime: '4 min',
      href: '/artikel/ethereum-etf-zufluesse',
    },
    {
      title: 'XRP als neue Nummer 1 für Banken?',
      excerpt: 'Mit 1.500 TPS und niedrigen Gebühren positioniert sich XRP als ideale Lösung für Banken.',
      category: 'XRP',
      readTime: '5 min',
      href: '/artikel/xrp-banken-loesung',
    },
  ];
  */

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Crypto Prices Ticker */}
      <CryptoTicker />

      {/* Features Section */}
      <FeaturesSection />

      {/* Investment Calculator */}
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <InvestmentCalculator />
      </div>

      {/* Newsletter Section */}
      <section className="mc-section" style={{ 
        padding: '6rem 0'
      }}>
        <div className="mc-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Left Column - Text Content */}
            <div>
              <h2 style={{
                fontSize: '40px',
                fontWeight: '500',
                marginBottom: '1.5rem',
                color: '#ffffff',
                lineHeight: '1.2'
              }}>
                Bleib immer auf dem{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  neuesten Stand
                </span>
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#d1d5db',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Erhalte exklusive Einblicke, Marktanalysen und Trading-Strategien direkt in dein Postfach:
              </p>
              <ul style={{ marginBottom: '2rem' }}>
                {[
                  '🎯 Personalisierte Trading-Empfehlungen',
                  '📊 Wöchentliche Marktanalysen',
                  '🔔 Wichtige Krypto-News in Echtzeit',
                  '💡 Exklusive Trading-Strategien'
                ].map((item, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    fontSize: '1.125rem'
                  }}>
                    <span style={{ marginRight: '1rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Newsletter Form */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    Dein Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Max Mustermann"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    Deine E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="max@beispiel.de"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <input
                    type="checkbox"
                    id="datenschutz"
                    required
                    style={{
                      marginTop: '0.25rem',
                      accentColor: '#f8dfa5'
                    }}
                  />
                  <label
                    htmlFor="datenschutz"
                    style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af',
                      lineHeight: '1.4'
                    }}
                  >
                    Ich stimme den{' '}
                    <Link href="/datenschutz" style={{
                      color: '#f8dfa5',
                      textDecoration: 'underline',
                      transition: 'color 0.3s ease'
                    }}>
                      Datenschutzbestimmungen
                    </Link>
                    {' '}zu und akzeptiere den Erhalt des Newsletters.
                  </label>
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#000000',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Newsletter abonnieren
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section - Auskommentiert
      <section className="mc-section" style={{ background: 'linear-gradient(90deg, rgba(31, 41, 55, 0.5), rgba(0, 0, 0, 0.5))' }}>
        <div className="mc-container">
          <h2 className="mc-section-title">Neueste Artikel & Analysen</h2>
          <p className="mc-section-subtitle">
            Bleib auf dem Laufenden mit unseren aktuellen Marktanalysen und News
          </p>

          <div className="mc-features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {latestArticles.map((article, index) => (
              <Link key={index} href={article.href} className="mc-feature-card">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '0.75rem' 
                }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(248, 223, 165, 0.2)',
                    color: '#f8dfa5',
                    fontSize: '0.875rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(248, 223, 165, 0.3)'
                  }}>
                    {article.category}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{article.readTime}</span>
                </div>
                
                <h3 className="mc-feature-title" style={{ marginBottom: '0.75rem' }}>
                  {article.title}
                </h3>
                
                <p className="mc-feature-description" style={{ marginBottom: '1rem' }}>
                  {article.excerpt}
                </p>
                
                <div style={{ color: '#f8dfa5', fontWeight: '500' }}>
                  Weiterlesen →
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/news" className="mc-btn-secondary">
              Alle Artikel anzeigen
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="mc-section">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.2), rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.2))',
            borderRadius: '1.5rem',
            padding: '4rem',
            textAlign: 'center',
            border: '1px solid rgba(228, 177, 94, 0.3)',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.1)'
          }}>
            <h2 className="mc-section-title" style={{ marginBottom: '1rem' }}>
              Bereit für deine Krypto-Reise?
            </h2>
            <p className="mc-section-subtitle" style={{ marginBottom: '2rem' }}>
              Starte noch heute und werde Teil der Krypto-Revolution. 
              Kostenlos, einfach und sicher.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                href="/registrieren" 
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
              >
                Kostenlos registrieren
              </Link>
              <Link 
                href="/demo" 
                style={{
                  background: 'transparent',
                  color: '#f8dfa5',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
              >
                Demo ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 