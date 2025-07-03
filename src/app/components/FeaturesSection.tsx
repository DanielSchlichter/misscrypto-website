'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const FeaturesSection = () => {
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

  return (
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
  );
};

export default FeaturesSection; 