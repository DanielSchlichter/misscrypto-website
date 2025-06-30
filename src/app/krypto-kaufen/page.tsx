'use client';

import React, { useEffect, useState } from 'react';
import CryptoPurchaseCalculator from '../components/CryptoPurchaseCalculator';

interface Exchange {
  id: string;
  name: string;
  logo: string;
  rating: number;
  fees: string;
  features: string[];
  pros: string[];
  cons: string[];
  minDeposit: string;
  paymentMethods: string[];
  url: string;
  isRecommended?: boolean;
}

const exchanges: Exchange[] = [
  {
    id: 'bitvavo',
    name: 'Bitvavo',
    logo: '/logos/bitvavo.svg',
    rating: 4.5,
    fees: 'ab 0,03%',
    features: ['Beste Börse', 'Niedrigste Gebühren', 'EU-Lizenz', '300+ Währungen'],
    pros: ['Extrem niedrige Gebühren', 'Höchste Funktionalität', 'Maximale Einfachheit', 'Powered by Hyphe'],
    cons: ['Weniger Zahlungsmethoden', 'Professioneller Fokus'],
    minDeposit: 'ab 1 Euro',
    paymentMethods: ['Mastercard', 'Visa', 'SEPA'],
    url: 'https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb',
    isRecommended: true
  },
  {
    id: 'bitpanda',
    name: 'Bitpanda',
    logo: '/logos/bitpanda.png',
    rating: 4.25,
    fees: 'ab 0,25%',
    features: ['Bester Broker', 'EU-reguliert', 'Deutscher Support', '300+ Währungen'],
    pros: ['Höchste Sicherheit', 'Sehr benutzerfreundlich', 'Große Auswahl', 'EU-Regulierung'],
    cons: ['Höhere Gebühren', 'Weniger Trading-Tools'],
    minDeposit: 'ab 10 Euro',
    paymentMethods: ['PayPal', 'Mastercard', 'Visa', 'GiroPay', 'SEPA'],
    url: 'https://bitpanda.pxf.io/c/2051965/2007465/15871'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    logo: '/logos/coinbase.svg',
    rating: 4.0,
    fees: '1,99%',
    features: ['US-Börse', 'Einfach zu nutzen', 'Gute Sicherheit', '260+ Währungen'],
    pros: ['Sehr einfach', 'Gute Reputation', 'Mobile App', 'Höchste Sicherheit'],
    cons: ['Hohe Gebühren', 'Weniger Coins', 'Nicht EU-reguliert'],
    minDeposit: 'ab 1 Euro',
    paymentMethods: ['PayPal', 'Mastercard', 'Visa', 'SEPA', 'Sofort'],
    url: 'https://coinbase-consumer.sjv.io/c/2051965/1452448/9251'
  },
  {
    id: 'mexc',
    name: 'MEXC',
    logo: '/logos/mexc.png',
    rating: 3.85,
    fees: 'ab 0,1%',
    features: ['Weltweite Börse', 'Niedrige Gebühren', 'Mobile App', '1500+ Währungen'],
    pros: ['Niedrige Gebühren', 'Riesige Auswahl', 'Viele Features', 'Globale Präsenz'],
    cons: ['Komplex für Anfänger', 'Weniger EU-Fokus', 'Regulatory Risiken'],
    minDeposit: 'ab 1 Euro',
    paymentMethods: ['Visa', 'PayPal', 'Mastercard', 'GiroPay', 'SEPA'],
    url: 'https://promote.mexc.com/a/LAHPsgFk'
  }
];

const CryptoKaufenPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('bitpanda-broker');

  useEffect(() => {
    // Für statischen Export - keine URL-Parameter
    // Client-side URL-Parameter können später hinzugefügt werden
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const currency = urlParams.get('currency');
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['bitpanda-broker', 'bitvavo-exchange', 'mexc-trading'];
      const scrollPosition = window.scrollY + 300; // Increased offset
      
      // Find the section that's currently in view
      let currentSection = sections[0]; // Default to first section
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          
          if (scrollPosition >= elementTop) {
            currentSection = sections[i];
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{color: '#fbbf24'}}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" style={{color: '#fbbf24'}}>☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{color: '#4b5563'}}>★</span>);
    }

    return stars;
  };

  return (
    <>
      <style jsx>{`
        .gold-border {
          position: relative;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border-radius: 16px;
        }
        
        .gold-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #f8dfa5, #e4b15e, #f8dfa5, #e4b15e);
          border-radius: 18px;
          z-index: -1;
        }

        .shiny-divider {
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(248, 223, 165, 0.3) 20%, 
            rgba(248, 223, 165, 0.8) 50%, 
            rgba(248, 223, 165, 0.3) 80%, 
            transparent 100%
          );
          position: relative;
          overflow: hidden;
          margin: 0;
        }

        .shiny-divider::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.1) 20%, 
            rgba(255, 255, 255, 0.6) 50%, 
            rgba(255, 255, 255, 0.1) 80%, 
            transparent 100%
          );
          animation: shine 4s ease-in-out infinite;
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    <div style={{minHeight: '100vh'}}>
              {/* Hero Section */}
        <section className="mc-hero" style={{ position: 'relative', overflow: 'hidden', zIndex: 10, minHeight: 'auto', paddingBottom: '2rem' }}>
        
        <div className="mc-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            alignItems: 'center',
            minHeight: '50vh'
          }}
          className="mc-hero-grid"
          >
            
            {/* Text Content - Left Side */}
            <div style={{ textAlign: 'left', position: 'relative' }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {selectedCurrency 
                  ? `Die besten Börsen zum Kauf von ${selectedCurrency.charAt(0).toUpperCase() + selectedCurrency.slice(1)}`
                  : 'Die besten Börsen zum Kauf von Kryptowährungen'
                }
              </div>
              
              <h1 className="mc-hero-title" style={{ textAlign: 'left' }}>
                <span className="mc-hero-gradient">Krypto-Börsen</span> im Vergleich
              </h1>
              
              <p className="mc-hero-subtitle" style={{ 
                textAlign: 'left',
                marginLeft: '0',
                marginRight: '0',
                maxWidth: 'none',
                marginBottom: '2rem'
              }}>
                Wir haben die führenden Krypto-Börsen getestet und verglichen. Hier findest du die besten Anbieter 
                für den sicheren und günstigen Kauf von Kryptowährungen.
              </p>

              {/* Crypto Cards */}
              <div className="crypto-cards-container">
                {/* Bitcoin Card */}
                <div className="crypto-card crypto-card-1">
                  <div className="crypto-card-content">
                    <div className="crypto-card-logo" style={{
                      background: '#F7931A',
                      color: '#ffffff'
                    }}>₿</div>
                  </div>
                </div>
                
                {/* Ethereum Card */}
                <div className="crypto-card crypto-card-2">
                  <div className="crypto-card-content">
                    <div className="crypto-card-logo" style={{
                      background: '#627EEA',
                      color: '#ffffff'
                    }}>Ξ</div>
                  </div>
                </div>
                
                {/* XRP Card */}
                <div className="crypto-card crypto-card-3">
                  <div className="crypto-card-content">
                    <div className="crypto-card-logo" style={{
                      background: '#23292F',
                      color: '#ffffff'
                    }}>✕</div>
                  </div>
                </div>
                
                {/* Solana Card */}
                <div className="crypto-card crypto-card-4">
                  <div className="crypto-card-content">
                    <div className="crypto-card-logo" style={{
                      background: '#9945FF',
                      color: '#ffffff'
                    }}>◎</div>
                  </div>
                </div>
                
                {/* Cardano Card */}
                <div className="crypto-card crypto-card-5">
                  <div className="crypto-card-content">
                    <div className="crypto-card-logo" style={{
                      background: '#0033AD',
                      color: '#ffffff'
                    }}>₳</div>
                  </div>
                </div>
                
                {/* BNB Card */}
                <div className="crypto-card crypto-card-6">
                  <div className="crypto-card-content">
                    <div className="crypto-card-logo" style={{
                      background: '#F3BA2F',
                      color: '#ffffff'
                    }}>◆</div>
                  </div>
                </div>
                
                {/* Polkadot Card */}
                <div className="crypto-card crypto-card-7">
                  <div className="crypto-card-content">
                    <div className="crypto-card-logo" style={{
                      background: '#E6007A',
                      color: '#ffffff'
                    }}>●</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image - Right Side */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '60vh'
            }}>
              <img
                src="/krypto.png"
                alt="Kryptowährungen"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  maxHeight: '70vh',
                  width: 'auto',
                  borderRadius: '12px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shiny Divider */}
      <div className="shiny-divider"></div>

      {/* Krypto-Kauf Rechner Section */}
      <CryptoPurchaseCalculator selectedCrypto={selectedCurrency} />

      {/* Top Exchanges Section */}
      <div style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <h2 className="mc-section-title" style={{ marginBottom: '1rem', textAlign: 'left' }}>
            Unsere <span className="mc-hero-gradient">Topempfehlungen</span>
          </h2>
          <p className="mc-section-subtitle-left" style={{ marginBottom: '1.5rem' }}>
            Die besten Krypto-Börsen für sicheren und günstigen Handel von uns für Dich getestet.
          </p>
                  </div>
                </div>
                
      {/* Exchange Detail Cards */}
      <div style={{ paddingTop: '0' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {exchanges.map((exchange) => (
              <div
                key={exchange.id}
                className={exchange.isRecommended ? 'gold-border' : ''}
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: exchange.isRecommended ? undefined : '16px',
                  padding: '2rem',
                  border: exchange.isRecommended ? 'none' : '1px solid rgba(248, 223, 165, 0.2)',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {/* Bonus Badge - Positioned outside container */}
                {exchange.id === 'bitvavo' && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '20px',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                      alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 3,
                    boxShadow: '0 4px 12px rgba(248, 223, 165, 0.3)'
                  }}>
                    💰 10 Euro Neukundenbonus
                  </div>
                )}
                {exchange.id === 'coinbase' && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '20px',
                      background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                      color: '#000000',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 3,
                    boxShadow: '0 4px 12px rgba(248, 223, 165, 0.3)'
                  }}>
                    💰 15 Euro Startbonus in BTC
                  </div>
                )}
                
                                {/* Logo and Crypto Icons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: 'fit-content'
                  }}>
                    <img 
                      src={exchange.logo} 
                      alt={`${exchange.name} Logo`}
                      style={{
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Crypto Icons */}
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem', textAlign: 'right' }}>
                      KRYPTOWÄHRUNGEN
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {/* Bitcoin */}
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#F7931A',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                      }}>₿</div>
                      {/* Ethereum */}
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#627EEA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                      }}>Ξ</div>
                      {/* XRP */}
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#23292F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                      }}>✕</div>
                      {/* Plus Icon */}
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(248, 223, 165, 0.2)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#f8dfa5'
                      }}>+{exchange.id === 'mexc' ? '1500' : exchange.id === 'bitvavo' ? '300' : exchange.id === 'bitpanda' ? '300' : '260'}</div>
                    </div>
                  </div>
                </div>

                {/* Zahlungsmethoden */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Zahlungsmethoden:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {exchange.paymentMethods.map((method, idx) => {
                      const getPaymentIcon = (methodName: string) => {
                        const name = methodName.toLowerCase();
                        if (name.includes('visa')) return '/payment-icons/visa.svg';
                        if (name.includes('mastercard')) return '/payment-icons/mastercard.svg';
                        if (name.includes('paypal')) return '/payment-icons/paypal.svg';
                        if (name.includes('sepa') || name.includes('banktransfer')) return '/payment-icons/banktransfer.png';
                        if (name.includes('giropay')) return '/payment-icons/giropay.svg';
                        if (name.includes('sofort') || name.includes('klarna')) return '/payment-icons/sofort.svg';
                        return null;
                      };
                      
                      const icon = getPaymentIcon(method);
                      return icon ? (
                        <img 
                          key={idx}
                          src={icon}
                          alt={method}
                          style={{
                            height: '20px',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <div key={idx} style={{
                          background: 'rgba(248, 223, 165, 0.1)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: '#f8dfa5'
                        }}>
                          {method}
                    </div>
                      );
                    })}
                      </div>
                    </div>

                {/* Exchange Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600' }}>{exchange.minDeposit}</div>
                  </div>

                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600' }}>{exchange.fees}</div>
                  </div>

                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600' }}>
                      {exchange.id === 'bitvavo' ? 'Deutschland 🇩🇪' : 
                       exchange.id === 'bitpanda' ? 'Österreich 🇦🇹' :
                       exchange.id === 'coinbase' ? 'USA 🇺🇸' : 'Global 🌍'}
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600' }}>
                      {exchange.id === 'bitvavo' ? '2021' : 
                       exchange.id === 'bitpanda' ? '2014' :
                       exchange.id === 'coinbase' ? '2012' : '2019'}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                    <a
                      href={exchange.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block', 
                        textAlign: 'center', 
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                        borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    marginBottom: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ZUM ANBIETER →
                </a>

                {/* Accordions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  
                  {/* Pros and Cons Accordion */}
                  <details style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}>
                    <summary style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      listStyle: 'none'
                    }}>
                      📋 Vor- und Nachteile
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <div>
                          {(exchange.id === 'bitvavo' ? [
                            'Sehr günstige Trading-Gebühren ab 0,03%',
                            'Intuitive Benutzeroberfläche für Anfänger',
                            'Reguliert durch deutsche BaFin-Lizenz'
                          ] : exchange.id === 'bitpanda' ? [
                            'Benutzerfreundliche Plattform für Einsteiger',
                            'Vollständig EU-reguliert und sicher',
                            'Breites Portfolio: Krypto, Edelmetalle & Aktien'
                          ] : exchange.id === 'coinbase' ? [
                            'Sehr einfache Bedienung für Krypto-Neulinge',
                            'Große Krypto-Auswahl mit Trading-Features',
                            'Hohe Sicherheitsstandards mit Einlagenschutz'
                          ] : [
                            'Sehr niedrige Handelsgebühren',
                            'Über 1500 verschiedene Kryptowährungen',
                            'Weltweiter Zugang und Service'
                          ]).map((pro, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              marginBottom: '0.75rem',
                              fontSize: '0.875rem'
                            }}>
                              <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                              <span style={{ color: '#d1d5db' }}>{pro}</span>
                  </div>
                          ))}
                </div>
                        <div>
                          {(exchange.id === 'bitvavo' ? [
                            'Keine Margin- oder Futures-Trading Optionen',
                            'Begrenzte erweiterte Trading-Tools'
                          ] : exchange.id === 'bitpanda' ? [
                            'Etwas höhere Gebühren im Broker-Bereich',
                            'Weniger professionelle Trading-Features'
                          ] : exchange.id === 'coinbase' ? [
                            'Relativ hohe Gebühren im Vergleich zu Konkurrenten',
                            'Umfangreiche Datensammlung für US-Unternehmen'
                          ] : [
                            'Komplexe Oberfläche für Krypto-Einsteiger',
                            'Weniger Fokus auf europäische Nutzer'
                          ]).map((con, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              marginBottom: '0.75rem',
                              fontSize: '0.875rem'
                            }}>
                              <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗</span>
                              <span style={{ color: '#d1d5db' }}>{con}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>

                  {/* Target Audience Accordion */}
                  <details style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}>
                    <summary style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      listStyle: 'none'
                    }}>
                      💡 Für wen eignet sich {exchange.name}?
                      <span style={{ marginLeft: 'auto', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </summary>
                    <div style={{ padding: '0 1rem 1rem' }}>
                      <p style={{
                        color: '#9ca3af',
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {exchange.id === 'bitvavo' ? 
                          'Bitvavo eignet sich besonders für Einsteiger und Anleger, die eine einfache, benutzerfreundliche Plattform mit niedrigen Gebühren und BaFin-Lizenz suchen. Durch fehlende Trading-Produkte wie Futures oder Leverage-Token ist die Plattform weniger für erfahrene Trader geeignet. Hervorzuheben sind die vielen Kryptowährungen und die Sparplan-Funktion.' :
                         exchange.id === 'bitpanda' ?
                          'Bitpanda eignet sich sowohl für Krypto-Einsteiger als auch für Anleger, die ein vielseitiges Portfolio aus Kryptowährungen, Edelmetallen und Aktien aufbauen möchten. Die Plattform ist besonders für Nutzer aus Deutschland interessant, da Bitpanda eine Krypto-Verwahrlizenz durch die BaFin besitzt. Leider sind die Gebühren beim Bitpanda Broker etwas höher. Dafür sind die Gebühren bei One Trading (ehemals Bitpanda Pro) deutlich niedriger.' :
                         exchange.id === 'coinbase' ?
                          'Coinbase eignet sich vor allem für Krypto-Einsteiger und Anleger, die eine regulierte, benutzerfreundliche und sichere Plattform suchen. Die höheren Gebühren und Datenschutzbedenken könnten jedoch für preissensitive und datenschutzbewusste Nutzer ein Hindernis sein.' :
                          'MEXC eignet sich für erfahrene Trader, die Zugang zu einer großen Auswahl an Kryptowährungen und Trading-Features suchen. Weniger geeignet für Anfänger aufgrund der Komplexität.'}
                      </p>
                  </div>
                  </details>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="mc-section">
        <div className="mc-container">
          <div className="mc-feature-card" style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
            border: '2px solid rgba(248, 223, 165, 0.4)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <h2 className="mc-section-title" style={{marginBottom: '2rem'}}>
              <span className="mc-hero-gradient">Von MissCrypto empfohlen</span>
            </h2>
            
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
              <div style={{
                width: '250px', 
                height: '80px', 
                background: '#ffffff', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <img 
                  src="/logos/bitvavo.svg" 
                  alt="Bitvavo Logo" 
                  style={{height: '60px', width: 'auto'}}
                />
              </div>
            </div>

            <p style={{
              color: '#d1d5db', 
              marginBottom: '2rem', 
              padding: '0 5rem',
              fontSize: '1.125rem', 
              lineHeight: '1.7'
            }}>
              Bitvavo bietet die beste Kombination aus niedrigen Gebühren, EU-Regulierung und 
              großer Coin-Auswahl. Mit nur 0,25% Gebühren und über 175 verfügbaren Kryptowährungen 
              ist es unsere Top-Empfehlung für deutsche Nutzer.
            </p>

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <a
                href="https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb"
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn-primary"
                style={{
                  padding: '0.75rem 2rem', 
                  borderRadius: '12px', 
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Jetzt bei Bitvavo {selectedCurrency ? selectedCurrency.charAt(0).toUpperCase() + selectedCurrency.slice(1) : 'Krypto'} kaufen
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Table of Contents */}
      <div style={{ padding: '3rem 0' }}>
        <div className="mc-container">
          <div style={{ display: 'flex', gap: '3rem', position: 'relative' }}>
            
            {/* Main Content */}
            <div style={{ flex: '1', maxWidth: '800px' }}>
              
              <section id="bitpanda-broker" style={{ marginBottom: '3rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e'
                  }}>
                    1
                  </div>
                  <h2 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.75rem', 
                    fontWeight: '700', 
                    margin: 0,
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Empfohlener Krypto-Broker
                  </h2>
                </div>

                <div style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Bitpanda ist eine herausragende Krypto-Börse, die sich besonders für Anleger im europäischen Raum eignet. Als führender Krypto-Broker in Österreich bietet Bitpanda eine beeindruckende Auswahl an Kryptowährungen und zeichnet sich durch eine benutzerfreundliche Plattform aus.
                  </p>

                  {/* Feature Highlight Box */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '12px', 
                    padding: '1.5rem',
                    margin: '2rem 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '20px',
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      color: '#1a1a2e',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      💡 HIGHLIGHT
                    </div>
                    <p style={{ margin: 0, fontWeight: '500' }}>
                      <strong>Keine Ein- und Auszahlungsgebühren:</strong> Bitpanda erhebt keine Gebühren für Transaktionen, was die Plattform besonders attraktiv für regelmäßige Trader macht.
                    </p>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Die Registrierung erfolgt kostenfrei über das VideoIdent-Verfahren. Bitpanda ist durch die österreichische Finanzmarktaufsichtsbehörde (FMA) als PSD2-Zahlungsdienstleister lizenziert, was für zusätzliche Sicherheit sorgt.
                  </p>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    margin: '2rem 0'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>1,49%</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Handelsgebühren</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>400+</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Kryptowährungen</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>FMA</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Reguliert</div>
                    </div>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Ein wesentlicher Vorteil ist die breite Auswahl an Digitalwährungen und vielseitige Handelsmöglichkeiten. Neben Kryptowährungen können Nutzer auch mit Derivaten auf Rohstoffe und Aktien spekulieren.
                  </p>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Die benutzerfreundliche Oberfläche eignet sich für Anfänger und erfahrene Trader. Für Profis gibt es "One Trading" (ehemals Bitpanda Pro) mit erweiterten Funktionen.
                  </p>

                  {/* Security Section */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    margin: '2rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ fontSize: '2rem' }}>🔒</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#10b981', marginBottom: '0.25rem' }}>Höchste Sicherheit</div>
                      <div style={{ fontSize: '0.9rem' }}>Zwei-Faktor-Authentifizierung (2FA) und FMA-Regulierung für maximalen Schutz</div>
                    </div>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Zusammenfassend stellt Bitpanda eine hervorragende Wahl für europäische Anleger dar. Die Kombination aus Sicherheit, Benutzerfreundlichkeit und transparenten Gebühren macht die Plattform zur idealen Option für sicheres Krypto-Investment.
                  </p>
                </div>
              </section>

              <section id="bitvavo-exchange" style={{ marginBottom: '3rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e'
                  }}>
                    2
                  </div>
                  <h2 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.75rem', 
                    fontWeight: '700', 
                    margin: 0,
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Empfohlene Krypto-Börse
                  </h2>
                </div>

                <div style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Bitvavo powered by Hyphe hebt sich als die beste Krypto-Börse in unserem Vergleich hervor, da sie in den wesentlichen Kategorien das beste Gesamtpaket bietet.
                  </p>

                  {/* Feature Highlight Box */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    margin: '2rem 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '20px',
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      color: '#1a1a2e',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      🏆 TESTSIEGER
                    </div>
                    <p style={{ margin: 0, fontWeight: '500' }}>
                      <strong>Niedrigste Gebühren:</strong> Mit nur 0,25% Handelsgebühren und über 300 Kryptowährungen bietet Bitvavo das beste Preis-Leistungs-Verhältnis.
                    </p>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Für Einsteiger besticht die Plattform durch eine benutzerfreundliche Oberfläche. Erfahrene Trader finden im "Pro Mode" erweiterte Tools und Ordertypen.
                  </p>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    margin: '2rem 0'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>0,25%</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Handelsgebühren</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>300+</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Kryptowährungen</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>BaFin</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Reguliert</div>
                    </div>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Ein herausragendes Merkmal ist die Transparenz: Alle Gebühren werden klar aufgelistet und auch beim Kauf in Euro angezeigt. Transfer-Gebühren sind vergleichsweise niedrig.
                  </p>

                  {/* Security Section */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    margin: '2rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ fontSize: '2rem' }}>🔐</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#10b981', marginBottom: '0.25rem' }}>BaFin-Regulierung</div>
                      <div style={{ fontSize: '0.9rem' }}>Seit August 2024 über Hyphe (BaFin-reguliert) wieder für deutsche Kunden verfügbar</div>
                    </div>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Mit der Partnerschaft zwischen Bitvavo und Hyphe können deutsche Kunden wieder sicher handeln. Bitvavo liefert die Technologie, Hyphe die deutsche Regulierung.
                  </p>
                </div>
              </section>

              <section id="mexc-trading" style={{ marginBottom: '3rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e'
                  }}>
                    3
                  </div>
                  <h2 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.75rem', 
                    fontWeight: '700', 
                    margin: 0,
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Empfohlene Trading-Börse
                  </h2>
                </div>

                <div style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    MEXC ist eine empfehlenswerte Krypto-Börse, die durch niedrige Handelsgebühren und umfangreiche Trading-Funktionen überzeugt.
                  </p>

                  {/* Feature Highlight Box */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    margin: '2rem 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '20px',
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      color: '#1a1a2e',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      ⚡ TRADING-POWER
                    </div>
                    <p style={{ margin: 0, fontWeight: '500' }}>
                      <strong>0% Maker-Gebühren:</strong> Spot-Trading mit 0% Maker- und nur 0,10% Taker-Gebühren macht MEXC besonders kosteneffizient für aktive Trader.
                    </p>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Die Plattform bietet Futures-Handel, Staking und Copy-Trading. Besonders das Copy-Trading ermöglicht Anfängern, von erfahrenen Tradern zu lernen.
                  </p>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    margin: '2rem 0'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>0%</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Maker-Gebühren</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>1.500+</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Kryptowährungen</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>1,4M</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>TPS Engine</div>
                    </div>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Die leistungsstarke Handelsmaschine verarbeitet bis zu 1,4 Millionen Transaktionen pro Sekunde und sorgt für reibungslose Trading-Erfahrungen.
                  </p>

                  {/* Performance Section */}
                  <div style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    margin: '2rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ fontSize: '2rem' }}>📱</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#6366f1', marginBottom: '0.25rem' }}>Mobile Trading</div>
                      <div style={{ fontSize: '0.9rem' }}>Vollständige App mit allen Features für Trading unterwegs</div>
                    </div>
                  </div>

                  {/* Security Section */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    margin: '2rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ fontSize: '2rem' }}>🛡️</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#10b981', marginBottom: '0.25rem' }}>Sichere Verwahrung</div>
                      <div style={{ fontSize: '0.9rem' }}>Cold-Wallet-Speicherung und mehrstufige Authentifizierung</div>
                    </div>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Mit ihrer Kombination aus niedrigen Gebühren, großer Coin-Auswahl und erweiterten Trading-Features ist MEXC ideal für aktive Trader und Krypto-Enthusiasten.
                  </p>
                </div>
              </section>
            </div>

            {/* Table of Contents - Sticky Sidebar */}
            <div style={{ 
              width: '280px',
              position: 'sticky',
              top: '120px',
              height: 'fit-content'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
                border: '2px solid rgba(248, 223, 165, 0.4)',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid rgba(248, 223, 165, 0.3)'
                }}>
                  <div style={{ fontSize: '1.2rem' }}>📋</div>
                  <h3 style={{
                    color: '#f8dfa5',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    margin: 0,
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Inhaltsverzeichnis
                  </h3>
                </div>
                                <nav>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={{ marginBottom: '0.75rem' }}>
                      <a 
                        href="#bitpanda-broker"
                        className="toc-link"
                        style={{
                          color: activeSection === 'bitpanda-broker' ? '#f8dfa5' : '#d1d5db',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          lineHeight: '1.4',
                          display: 'block',
                          padding: '0.5rem 0 0.5rem 0.75rem',
                          marginLeft: '-1rem',
                          paddingLeft: '1rem',
                          borderLeft: activeSection === 'bitpanda-broker' ? '3px solid #f8dfa5' : '3px solid transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = '#f8dfa5';
                          target.style.borderLeftColor = '#f8dfa5';
                        }}
                        onMouseOut={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = '#d1d5db';
                          target.style.borderLeftColor = 'transparent';
                        }}
                      >
                        1. Empfohlener Krypto-Broker
                      </a>
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                      <a 
                        href="#bitvavo-exchange"
                        className="toc-link"
                        style={{
                          color: activeSection === 'bitvavo-exchange' ? '#f8dfa5' : '#d1d5db',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          lineHeight: '1.4',
                          display: 'block',
                          padding: '0.5rem 0 0.5rem 0.75rem',
                          marginLeft: '-1rem',
                          paddingLeft: '1rem',
                          borderLeft: activeSection === 'bitvavo-exchange' ? '3px solid #f8dfa5' : '3px solid transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = '#f8dfa5';
                          target.style.borderLeftColor = '#f8dfa5';
                        }}
                        onMouseOut={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = '#d1d5db';
                          target.style.borderLeftColor = 'transparent';
                        }}
                      >
                        2. Empfohlene Krypto-Börse
                      </a>
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                      <a 
                        href="#mexc-trading"
                        className="toc-link"
                        style={{
                          color: activeSection === 'mexc-trading' ? '#f8dfa5' : '#d1d5db',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          lineHeight: '1.4',
                          display: 'block',
                          padding: '0.5rem 0 0.5rem 0.75rem',
                          marginLeft: '-1rem',
                          paddingLeft: '1rem',
                          borderLeft: activeSection === 'mexc-trading' ? '3px solid #f8dfa5' : '3px solid transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = '#f8dfa5';
                          target.style.borderLeftColor = '#f8dfa5';
                        }}
                        onMouseOut={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.color = '#d1d5db';
                          target.style.borderLeftColor = 'transparent';
                        }}
                      >
                        3. Empfohlene Trading-Börse
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default CryptoKaufenPage; 