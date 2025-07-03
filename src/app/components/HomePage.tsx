import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from './HeroSection';
import CryptoTicker from './CryptoTicker';

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const features = [
    {
      title: 'Krypto kaufen',
      description: 'Sicher und einfach in Bitcoin, Ethereum und andere Kryptowährungen investieren',
      icon: '💰',
      href: '/investieren',
    },
    {
      title: 'Trading lernen',
      description: 'Von Grundlagen bis Profi-Strategien - alles was du für erfolgreiches Trading brauchst',
      icon: '📈',
      href: '/trading',
    },
    {
      title: 'Börsen vergleichen',
      description: 'Die besten Krypto-Börsen im Test - finde die passende Plattform für dich',
      icon: '🏛️',
      href: '/boersen',
    },
    {
      title: 'News & Analysen',
      description: 'Aktuelle Marktanalysen, News und Prognosen von unseren Krypto-Experten',
      icon: '📰',
      href: '/news',
    },
  ];

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

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Crypto Prices Ticker */}
      <CryptoTicker />

      {/* Features Section */}
      <section className="mc-section">
        <div className="mc-container">
          <h2 className="mc-section-title">Was möchtest du erreichen?</h2>
          <p className="mc-section-subtitle">
            Egal ob Anfänger oder Profi - wir haben die richtigen Tools und Inhalte für dich
          </p>

          {isMobile ? (
            <div style={{
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              paddingRight: '1rem'
            }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: '1rem',
                paddingLeft: '1rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
                {features.map((feature) => (
                  <Link 
                    key={feature.title} 
                    href={feature.href} 
                    style={{
                      minWidth: '280px',
                      maxWidth: '280px',
                      scrollSnapAlign: 'start',
                      background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.5), rgba(17, 24, 39, 0.5))',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      border: '1px solid #374151',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'block',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      fontSize: '2rem',
                      marginBottom: '1rem'
                    }}>{feature.icon}</div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '500',
                      color: '#ffffff',
                      marginBottom: '0.75rem'
                    }}>{feature.title}</h3>
                    <p style={{
                      color: '#9ca3af',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      margin: 0
                    }}>{feature.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mc-features-grid">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href} className="mc-feature-card">
                  <div className="mc-feature-icon">{feature.icon}</div>
                  <h3 className="mc-feature-title">{feature.title}</h3>
                  <p className="mc-feature-description">{feature.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles */}
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

      {/* CTA Section */}
      <section className="mc-section">
        <div className="mc-container">
          <div style={{
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.2), rgba(248, 223, 165, 0.1), rgba(248, 223, 165, 0.2))',
            borderRadius: '1.5rem',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid rgba(248, 223, 165, 0.3)'
          }}>
            <h2 className="mc-section-title" style={{ marginBottom: '1rem' }}>
              Bereit für deine Krypto-Reise?
            </h2>
            <p className="mc-section-subtitle" style={{ marginBottom: '2rem' }}>
              Starte noch heute und werde Teil der Krypto-Revolution. 
              Kostenlos, einfach und sicher.
            </p>
            <div className="mc-hero-buttons">
              <Link href="/registrieren" className="mc-btn-primary">
                Kostenlos registrieren
              </Link>
              <Link href="/demo" className="mc-btn-secondary">
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