'use client';

import React from 'react';
import Link from 'next/link';

const FeaturesSection = () => {
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

        <div className="mc-features-grid">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="mc-feature-card">
              <div className="mc-feature-icon">{feature.icon}</div>
              <h3 className="mc-feature-title">{feature.title}</h3>
              <p className="mc-feature-description">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 