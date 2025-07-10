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
    fees: '0,25%',
    features: ['Niederlande', 'EU-Lizenz', 'BaFin-Lizenz', '350+ Währungen'],
    pros: ['0,25% Maker/Taker', 'Höchste Funktionalität', 'Maximale Einfachheit', 'Powered by Hyphe'],
    cons: ['Weniger Zahlungsmethoden', 'Professioneller Fokus'],
    minDeposit: '1,00 €',
    paymentMethods: ['Mastercard', 'Visa', 'SEPA'],
    url: 'https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb',
    isRecommended: true
  },
  {
    id: 'bitpanda',
    name: 'Bitpanda',
    logo: '/logos/bitpanda.png',
    rating: 4.25,
    fees: '0,25%',
    features: ['Österreich', 'EU-reguliert', 'Deutscher Support', '500+ Währungen'],
    pros: ['Höchste Sicherheit', 'Sehr benutzerfreundlich', 'Große Auswahl', 'EU-Regulierung'],
    cons: ['Höhere Gebühren', 'Weniger Trading-Tools'],
    minDeposit: '10,00 €',
    paymentMethods: ['PayPal', 'Mastercard', 'Visa', 'GiroPay', 'SEPA'],
    url: 'https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    logo: '/logos/kraken.png',
    rating: 4.2,
    fees: '0,25%',
    features: ['US-Börse', 'Seit 2011', 'Hohe Sicherheit', '300+ Währungen'],
    pros: ['Sehr sicher', 'Lange Erfahrung', 'Professionell', 'Gute Reputation'],
    cons: ['Komplexere UI', 'Weniger EU-Fokus', 'Höhere Gebühren'],
    minDeposit: '1,00 €',
    paymentMethods: ['Visa', 'Mastercard', 'Bank Transfer', 'SEPA'],
    url: 'https://kraken.pxf.io/RGE3yg'
  }
];

const CryptoKaufenPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('bitpanda-broker');
  const [isInvestTab, setIsInvestTab] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  useEffect(() => {
    // Für statischen Export - keine URL-Parameter
    // Client-side URL-Parameter können später hinzugefügt werden
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const currency = urlParams.get('currency');
      const tab = urlParams.get('tab');
      
      if (currency) {
        setSelectedCurrency(currency);
      }
      
      if (tab === 'investieren') {
        setIsInvestTab(true);
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
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        minHeight: 'auto', 
        paddingBottom: isMobile ? '1.5rem' : '2rem',
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(248, 223, 165, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ 
          position: 'relative', 
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 0.8fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center',
            minHeight: isMobile ? 'auto' : '50vh'
          }}>
            
            {/* Text Content - Left Side */}
            <div style={{ 
              textAlign: isMobile ? 'center' : 'left', 
              position: 'relative'
            }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: isMobile ? '0.875rem' : isTablet ? '1rem' : '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {isInvestTab 
                  ? 'Investieren in Krypto-Börsen'
                  : selectedCurrency 
                    ? `Die besten Börsen zum Kauf von ${selectedCurrency.charAt(0).toUpperCase() + selectedCurrency.slice(1)}`
                    : 'Die besten Börsen zum Kauf von Kryptowährungen'
                }
              </div>
              
              <h1 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.75rem' : '3.5rem',
                fontWeight: '600',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                {isInvestTab 
                  ? <>
                      <span style={{
                        background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>Investieren</span> in Kryptowährungen
                    </>
                  : <>
                      <span style={{
                        background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>Krypto-Börsen</span> im Vergleich
                    </>
                }
              </h1>
              
              <p style={{ 
                color: '#d1d5db',
                fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
                lineHeight: '1.6',
                textAlign: isMobile ? 'center' : 'left',
                marginLeft: '0',
                marginRight: '0',
                maxWidth: 'none',
                marginBottom: '2rem'
              }}>
                Ich habe mir viele Krypto-Börsen genau angeschaut und eine Auswahl getroffen, die besonders einsteigerfreundlich, sicher und gut verständlich ist.<br />
                Hier findest du Anbieter, mit denen der Einstieg in Bitcoin, Ethereum & Co. einfach gelingt – ganz ohne Fachchinesisch.
              </p>

              {/* Crypto Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(4, 1fr)' : 'repeat(7, 1fr)',
                gap: isMobile ? '0.5rem' : '0.75rem',
                marginTop: '2rem',
                justifyContent: 'center'
              }}>
                {[
                  { src: '/cryptologos/bitcoin-btc-logo.png', name: 'Bitcoin' },
                  { src: '/cryptologos/Ethereum ICON.png', name: 'Ethereum' },
                  { src: '/cryptologos/XRP.png', name: 'XRP' },
                  { src: '/cryptologos/solana-sol-logo.png', name: 'Solana' },
                  { src: '/cryptologos/Cardano.png', name: 'Cardano' },
                  { src: '/cryptologos/binance-logo.png', name: 'BNB' },
                  { src: '/cryptologos/Avalanche Coin (AVAX).png', name: 'Avalanche' }
                ].slice(0, isMobile ? 4 : 7).map((crypto, index) => (
                  <div key={index} style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(248, 223, 165, 0.2)',
                    borderRadius: '0.75rem',
                    padding: isMobile ? '0.75rem' : '1rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
                  }}>
                    <div style={{
                      width: isMobile ? '2rem' : '2.5rem',
                      height: isMobile ? '2rem' : '2.5rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      background: '#18181b'
                    }}>
                      <img
                        src={crypto.src}
                        alt={crypto.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: '50%'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image - Right Side */}
            {!isMobile && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: isTablet ? '50vh' : '60vh'
              }}>
                <img
                  src="/krypto.png"
                  alt="Kryptowährungen"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    maxHeight: isTablet ? '60vh' : '70vh',
                    width: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shiny Divider */}
      <div className="shiny-divider"></div>

      {/* Krypto-Kauf Rechner Section */}
      <CryptoPurchaseCalculator selectedCrypto={selectedCurrency} />

      {/* Top Exchanges Section */}
      <div style={{ 
        paddingTop: isMobile ? '1.5rem' : '2rem', 
        paddingBottom: isMobile ? '0.75rem' : '1rem',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
            fontWeight: '600',
            lineHeight: '1.2',
            marginBottom: '1rem',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Meine <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
            }}>Empfehlungen</span>
          </h2>
          <p style={{
            color: '#d1d5db',
            fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: '800px'
          }}>
            Ich habe mir diese Börsen genauer angeschaut – sie sind fair, verständlich und gut für den Einstieg geeignet.
          </p>
        </div>
      </div>
                
      {/* Exchange Detail Cards */}
      <div style={{ 
        paddingTop: '0',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        minHeight: '100vh'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1.5rem' : '2rem'
        }}>
          {/* Exchange Cards Section */}
          <div style={{
            flex: isMobile ? '1' : '1',
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(2, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem',
            alignItems: isMobile ? 'center' : 'stretch'
          }}>
            {exchanges.map((exchange) => (
              <div
                key={exchange.id}
                style={{
                  background: exchange.isRecommended 
                    ? 'linear-gradient(135deg, #1a1a2e, #16213e)' 
                    : 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: exchange.isRecommended 
                    ? '2px solid rgba(248, 223, 165, 0.4)' 
                    : '1px solid rgba(248, 223, 165, 0.2)',
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: exchange.isRecommended 
                    ? '0 10px 25px rgba(248, 223, 165, 0.2)' 
                    : '0 10px 25px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  maxWidth: isMobile ? '380px' : 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = exchange.isRecommended 
                    ? '0 15px 35px rgba(248, 223, 165, 0.3)' 
                    : '0 15px 35px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = exchange.isRecommended 
                    ? '0 10px 25px rgba(248, 223, 165, 0.2)' 
                    : '0 10px 25px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Bonus Badge - Positioned above crypto icons */}
                {exchange.id === 'bitvavo' && (
                  <div style={{
                    position: 'absolute',
                    top: isMobile ? '-12px' : '-15px',
                    right: isMobile ? '10px' : '20px',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    padding: isMobile ? '0.4rem 0.75rem' : '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 3,
                    boxShadow: '0 4px 12px rgba(248, 223, 165, 0.3)'
                  }}>
                    💰 {isMobile ? '10€ Bonus' : '10 Euro Neukundenbonus'}
                  </div>
                )}
                {exchange.id === 'coinbase' && (
                  <div style={{
                    position: 'absolute',
                    top: isMobile ? '-12px' : '-15px',
                    right: isMobile ? '10px' : '20px',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    padding: isMobile ? '0.4rem 0.75rem' : '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 3,
                    boxShadow: '0 4px 12px rgba(248, 223, 165, 0.3)'
                  }}>
                    💰 {isMobile ? '15€ BTC Bonus' : '15 Euro Startbonus in BTC'}
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
                        maxWidth: exchange.id === 'coinbase' ? '80px' : 'none',
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
                      }}>+{exchange.id === 'mexc' ? '1500' : exchange.id === 'bitvavo' ? '350' : exchange.id === 'bitpanda' ? '500' : '260'}</div>
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
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: isMobile ? '1rem' : '1.5rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>{exchange.minDeposit}</div>
                  </div>

                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>{exchange.fees}</div>
                  </div>

                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                      {exchange.id === 'bitvavo' ? 'Niederlande 🇳🇱' : 
                       exchange.id === 'bitpanda' ? 'Österreich 🇦🇹' :
                       exchange.id === 'coinbase' ? 'USA 🇺🇸' :
                       exchange.id === 'mexc' ? 'Seychellen 🇸🇨' :
                       exchange.id === 'okx' ? 'Singapur 🇸🇬' :
                       exchange.id === 'kraken' ? 'USA 🇺🇸' : 'Global 🌍'}
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                      {exchange.id === 'bitvavo' ? '2018' : 
                       exchange.id === 'bitpanda' ? '2014' :
                       exchange.id === 'coinbase' ? '2012' :
                       exchange.id === 'mexc' ? '2018' :
                       exchange.id === 'okx' ? '2018' :
                       exchange.id === 'kraken' ? '2011' : '2019'}
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
                            'Transparente Trading-Gebühren 0,25% Maker/Taker',
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
                          ] : exchange.id === 'mexc' ? [
                            'Sehr niedrige Handelsgebühren (0,1%)',
                            'Über 2000 verschiedene Kryptowährungen',
                            'Weltweiter Zugang und Service'
                          ] : exchange.id === 'okx' ? [
                            'Niedrige Handelsgebühren (0,1%)',
                            'Über 1000 Kryptowährungen verfügbar',
                            'Professionelle Trading-Tools und Derivate'
                          ] : exchange.id === 'kraken' ? [
                            'Höchste Sicherheitsstandards seit 2011',
                            'Reguliert und etabliert in den USA',
                            'Starker Fokus auf institutionelle Kunden'
                          ] : [
                            'Niedrige Handelsgebühren',
                            'Große Auswahl an Kryptowährungen',
                            'Verschiedene Trading-Features'
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
                          ] : exchange.id === 'mexc' ? [
                            'Komplexe Oberfläche für Krypto-Einsteiger',
                            'Weniger Fokus auf europäische Nutzer'
                          ] : exchange.id === 'okx' ? [
                            'Komplexe Plattform für Anfänger',
                            'Höhere Mindesteinzahlung (50 €)'
                          ] : exchange.id === 'kraken' ? [
                            'Weniger benutzerfreundlich für Anfänger',
                            'Begrenzte Zahlungsmethoden in Europa'
                          ] : [
                            'Potentielle Komplexität für Einsteiger',
                            'Variierende regionale Verfügbarkeit'
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
                         exchange.id === 'mexc' ?
                          'MEXC eignet sich für erfahrene Trader, die Zugang zu einer großen Auswahl an Kryptowährungen (2000+) und niedrigen Gebühren suchen. Weniger geeignet für Anfänger aufgrund der Komplexität der Plattform.' :
                         exchange.id === 'okx' ?
                          'OKX eignet sich für fortgeschrittene Trader, die professionelle Trading-Features und eine große Auswahl an Kryptowährungen (1000+) mit niedrigen Gebühren suchen. Die Plattform bietet Futures, Optionen und andere Derivate.' :
                         exchange.id === 'kraken' ?
                          'Kraken eignet sich für sicherheitsbewusste Trader und institutionelle Anleger. Als eine der ältesten und etabliertesten Börsen (seit 2011) bietet Kraken hohe Sicherheitsstandards und ist in den USA reguliert.' :
                          'Diese Börse eignet sich für verschiedene Anlegertypen je nach ihren spezifischen Bedürfnissen.'}
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
      <div style={{ 
        paddingTop: isMobile ? '1.5rem' : '2rem', 
        paddingBottom: isMobile ? '1.5rem' : '2rem',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div className="mc-feature-card" style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
            border: '2px solid rgba(248, 223, 165, 0.4)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            padding: isMobile ? '2rem' : '3rem',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1280px'
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
              padding: isMobile ? '0' : isTablet ? '0 2rem' : '0 5rem',
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: '1.7'
            }}>
              Bitvavo bietet für mich die beste Kombination aus niedrigen Gebühren, EU-Regulierung und großer Coin-Auswahl. Mit nur 0,15 % bis 0,25 % Gebühren und über 350+ verfügbaren Kryptowährungen ist es meine Empfehlung für deinen Einstieg.
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
      <div style={{ padding: isMobile ? '2rem 0' : '3rem 0' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{ display: 'flex', gap: isMobile ? '2rem' : '3rem', position: 'relative' }}>
            
            {/* Main Content */}
            <div style={{ flex: '1', maxWidth: isMobile ? '100%' : '800px' }}>
              
                              <section id="bitpanda-broker" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.75rem' : '1rem',
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}>
                  <div style={{
                    width: isMobile ? '40px' : '60px',
                    height: isMobile ? '40px' : '60px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '1.125rem' : '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e'
                  }}>
                    1
                  </div>
                  <h2 style={{ 
                    color: '#ffffff', 
                    fontSize: isMobile ? '1.25rem' : '1.75rem',
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
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
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

              <section id="bitvavo-exchange" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.75rem' : '1rem',
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}>
                  <div style={{
                    width: isMobile ? '40px' : '60px',
                    height: isMobile ? '40px' : '60px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '1.125rem' : '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e'
                  }}>
                    2
                  </div>
                  <h2 style={{ 
                    color: '#ffffff', 
                    fontSize: isMobile ? '1.25rem' : '1.75rem',
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
                      <strong>Transparente Gebühren:</strong> Mit 0,25% Maker/Taker-Gebühren und über 350 Kryptowährungen bietet Bitvavo transparente Konditionen.
                    </p>
                  </div>

                  <p style={{ marginBottom: '1.5rem' }}>
                    Für Einsteiger besticht die Plattform durch eine benutzerfreundliche Oberfläche. Erfahrene Trader finden im "Pro Mode" erweiterte Tools und Ordertypen.
                  </p>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: isMobile ? '0.5rem' : '1rem',
                    margin: isMobile ? '1.5rem 0' : '2rem 0'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: isMobile ? '0.75rem 0.5rem' : '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: isMobile ? '1.125rem' : '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>0,25%</div>
                      <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#9ca3af' }}>Handelsgebühren</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: isMobile ? '0.75rem 0.5rem' : '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: isMobile ? '1.125rem' : '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>350+</div>
                      <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#9ca3af' }}>Kryptowährungen</div>
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '8px',
                      padding: isMobile ? '0.75rem 0.5rem' : '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: isMobile ? '1.125rem' : '1.5rem', fontWeight: 'bold', color: '#f8dfa5' }}>BaFin</div>
                      <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#9ca3af' }}>Reguliert</div>
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
            </div>

            {/* Table of Contents - Desktop Sidebar only */}
            {!isMobile && (
              <div style={{ 
                width: isTablet ? '240px' : '280px',
                position: 'sticky',
                top: '120px',
                height: 'fit-content',
                flexShrink: 0
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
                  border: '2px solid rgba(248, 223, 165, 0.4)',
                  borderRadius: '12px',
                  padding: isTablet ? '0.875rem' : '1rem',
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
                      fontSize: isTablet ? '1rem' : '1.1rem',
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
                          style={{
                            color: activeSection === 'bitpanda-broker' ? '#f8dfa5' : '#d1d5db',
                            textDecoration: 'none',
                            fontSize: isTablet ? '0.85rem' : '0.9rem',
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
                            target.style.color = activeSection === 'bitpanda-broker' ? '#f8dfa5' : '#d1d5db';
                            target.style.borderLeftColor = activeSection === 'bitpanda-broker' ? '#f8dfa5' : 'transparent';
                          }}
                        >
                          1. Empfohlener Krypto-Broker
                        </a>
                      </li>
                      <li style={{ marginBottom: '0.75rem' }}>
                        <a 
                          href="#bitvavo-exchange"
                          style={{
                            color: activeSection === 'bitvavo-exchange' ? '#f8dfa5' : '#d1d5db',
                            textDecoration: 'none',
                            fontSize: isTablet ? '0.85rem' : '0.9rem',
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
                            target.style.color = activeSection === 'bitvavo-exchange' ? '#f8dfa5' : '#d1d5db';
                            target.style.borderLeftColor = activeSection === 'bitvavo-exchange' ? '#f8dfa5' : 'transparent';
                          }}
                        >
                          2. Empfohlene Krypto-Börse
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CryptoKaufenPage; 