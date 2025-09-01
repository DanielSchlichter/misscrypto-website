'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, Shield } from 'lucide-react';
import SparplanInfoSection from './SparplanInfoSection';
import WenLamboCalculator from './WenLamboCalculator';
import SparplanCalculator from './SparplanCalculator';





const SparplanRechnerClient = () => {
  const [screenWidth, setScreenWidth] = useState(0);

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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
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
              <h1 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.75rem' : '3.5rem',
                fontWeight: '600',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Sparplan Rechner</span>
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
                Du möchtest Bitcoin & andere Kryptowährungen regelmäßig kaufen, ohne dich von Kursschwankungen stressen zu lassen? Mit einem Sparplan setzt du monatlich (oder wöchentlich) einen festen Betrag ein. So baust du langfristig Vermögen auf und nutzt automatisch den Cost-Average-Effekt.
              </p>

              {/* Features */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: isMobile ? '0.5rem' : '1rem',
                marginTop: '2rem'
              }}>
                {[
                  { icon: <TrendingUp size={isMobile ? 16 : 20} />, text: 'Cost-Average-Effekt' },
                  { icon: <Calendar size={isMobile ? 16 : 20} />, text: 'Regelmäßig investieren' },
                  { icon: <Target size={isMobile ? 16 : 20} />, text: 'Rendite berechnen' }
                ].map((feature, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.05))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    borderRadius: isMobile ? '0.75rem' : '1rem',
                    padding: isMobile ? '0.75rem 0.5rem' : '1.25rem 1rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: isMobile ? '0.5rem' : '0.75rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(248, 223, 165, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                  }}>
                    {/* Subtle glow effect */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      background: 'radial-gradient(circle at center, rgba(248, 223, 165, 0.1) 0%, transparent 70%)',
                      pointerEvents: 'none'
                    }}></div>
                    
                    <div style={{ 
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      borderRadius: '50%',
                      width: isMobile ? '2rem' : '2.5rem',
                      height: isMobile ? '2rem' : '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1a1a2e',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {feature.icon}
                    </div>
                    
                    <div style={{ 
                      fontSize: isMobile ? '0.75rem' : '0.9rem',
                      color: '#ffffff',
                      fontWeight: '600',
                      lineHeight: '1.3',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {feature.text}
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
                  alt="Krypto Sparplan"
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
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(248, 223, 165, 0.3) 20%, rgba(248, 223, 165, 0.8) 50%, rgba(248, 223, 165, 0.3) 80%, transparent 100%)',
        margin: '0'
      }}></div>

      {/* Calculator Section */}
      <SparplanCalculator isMobile={isMobile} isTablet={isTablet} />

      {/* Recommended Providers Section */}
      <section 
        data-section="recommendations"
                    style={{
          padding: isMobile ? '2rem 0' : '3rem 0',
          background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)'
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2.5fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'start'
          }}>
            {/* Left Side - Title */}
            <div>
              <h2 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: '1rem'
              }}>
                Für dich{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative'
                }}>
                  Empfohlen
                  <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'repeating-linear-gradient(90deg, #f8dfa5 0px, #f8dfa5 8px, transparent 8px, transparent 16px)',
                    borderRadius: '2px'
                  }}></div>
                </span>
              </h2>
              <p style={{
                color: '#9ca3af',
                fontSize: isMobile ? '0.875rem' : '1rem',
                lineHeight: '1.6',
                marginTop: '1.5rem',
                marginBottom: '2rem'
              }}>
                Die besten Anbieter für Bitcoin Sparpläne
              </p>
              
              {/* Desktop CTA Button - nur auf Desktop/Tablet sichtbar */}
              {!isMobile && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h3 style={{
                    color: '#f8dfa5',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem'
                  }}>
                    📊 Brauchst du mehr Details?
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    marginBottom: '1rem'
                  }}>
                    Vergleiche alle Anbieter im Detail und finde den perfekten Broker für deine Bedürfnisse!
                  </p>
                  <a
                    href="/krypto-kaufen"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                      color: '#000000',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(248, 223, 165, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Zum ausführlichen Vergleich →
                  </a>
                </div>
              )}
            </div>

            {/* Right Side - Exchange Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch'
            }}>
              {/* Bitvavo Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: '2px solid rgba(248, 223, 165, 0.4)',
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '0 10px 25px rgba(248, 223, 165, 0.2)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  minWidth: '0',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(248, 223, 165, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(248, 223, 165, 0.2)';
                }}
              >
                {/* Bonus Badge */}
                <div style={{
                  position: 'absolute',
                  top: isMobile ? '-10px' : '-12px',
                  right: isMobile ? '10px' : '20px',
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  color: '#000000',
                  padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.75rem',
                  borderRadius: '16px',
                  fontSize: isMobile ? '0.625rem' : '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  zIndex: 3,
                  boxShadow: '0 3px 8px rgba(248, 223, 165, 0.3)'
                }}>
                  💰 10€ Bonus
                </div>

                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: 'fit-content'
                  }}>
                    <img 
                      src="/logos/bitvavo.svg" 
                      alt="Bitvavo Logo"
                      style={{
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Zahlungsmethoden */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Zahlungsmethoden:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/visa.svg" alt="Visa" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/banktransfer.png" alt="SEPA" style={{ height: '20px', objectFit: 'contain' }} />
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
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>1,00 €</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>0,25%</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Niederlande 🇳🇱</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>2018</div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', 
                    textAlign: 'center', 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                >
                  ZUM ANBIETER →
                </a>
              </div>

              {/* Bitpanda Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  minWidth: '0',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: 'fit-content'
                  }}>
                    <img 
                      src="/logos/bitpanda.png" 
                      alt="Bitpanda Logo"
                      style={{
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Zahlungsmethoden */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Zahlungsmethoden:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src="/payment-icons/paypal.svg" alt="PayPal" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/visa.svg" alt="Visa" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/giropay.svg" alt="GiroPay" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/banktransfer.png" alt="SEPA" style={{ height: '20px', objectFit: 'contain' }} />
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
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>10,00 €</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>0,25%</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Österreich 🇦🇹</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>2014</div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', 
                    textAlign: 'center', 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                >
                  ZUM ANBIETER →
                </a>
              </div>

              {/* Kraken Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  minWidth: '0',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: 'fit-content'
                  }}>
                    <img 
                      src="/logos/kraken.png" 
                      alt="Kraken Logo"
                      style={{
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Zahlungsmethoden */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Zahlungsmethoden:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src="/payment-icons/visa.svg" alt="Visa" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/banktransfer.png" alt="Bank Transfer" style={{ height: '20px', objectFit: 'contain' }} />
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
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>1,00 €</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>0,25%</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>USA 🇺🇸</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>2011</div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://kraken.pxf.io/RGE3yg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', 
                    textAlign: 'center', 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                >
                  ZUM ANBIETER →
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Wen Lambo Rechner Section */}
      <section style={{
        padding: isMobile ? '3rem 0' : '4rem 0',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center'
          }}>
            
            {/* Left Side - Content */}
            <div>
              <h2 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: '2rem'
              }}>
                "Wen Lambo" Rechner
              </h2>

              <div style={{
                color: '#d1d5db',
                fontSize: isMobile ? '1rem' : '1.125rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      background: '#f8dfa5',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginTop: '0.5rem',
                      flexShrink: 0
                    }}></div>
                    <span>Neupreis Lambo ca. <strong style={{ color: '#f8dfa5' }}>350.000€</strong></span>
                  </li>
                  
                  <li style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      background: '#f8dfa5',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginTop: '0.5rem',
                      flexShrink: 0
                    }}></div>
                    <span>Einmalinvest: <strong style={{ color: '#f8dfa5' }}>3.500 €</strong> (kann ich eingeben)</span>
                  </li>
                  
                  <li style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    marginBottom: '2rem',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      background: '#f8dfa5',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginTop: '0.5rem',
                      flexShrink: 0
                    }}></div>
                    <span>Einmal X benötigt: <strong style={{ color: '#f8dfa5' }}>100x</strong> (Errechnet sich automatisch 350000 / 3500)</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button zu krypto-kaufen */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginTop: '2rem'
          }}>
            <h3 style={{
              color: '#f8dfa5',
                  fontSize: '1.125rem',
              fontWeight: '600',
                  marginBottom: '0.75rem'
            }}>
                  🚀 Bereit für den nächsten Schritt?
            </h3>
            <p style={{
              color: '#d1d5db',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}>
                  Du hast dein Ziel berechnet? Jetzt erfahre, wie du mit dem richtigen Broker startest!
                </p>
                <a
                  href="/krypto-kaufen"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(248, 223, 165, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Jetzt Krypto kaufen lernen →
                </a>
                </div>
            </div>

            {/* Right Side - Calculator */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}>
              <WenLamboCalculator isMobile={isMobile} isTablet={isTablet} />
            </div>
            
            {/* Mobile CTA Button für Recommended Providers - nur auf mobilen Geräten sichtbar */}
            {isMobile && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h3 style={{
                  color: '#f8dfa5',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  📊 Brauchst du mehr Details?
                </h3>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}>
                  Vergleiche alle Anbieter im Detail und finde den perfekten Broker für deine Bedürfnisse!
                </p>
                <a
                  href="/krypto-kaufen"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(248, 223, 165, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Zum ausführlichen Vergleich →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Krypto-Sparplan Info Section */}
      <SparplanInfoSection isMobile={isMobile} isTablet={isTablet} />
    </div>
  );
};

export default SparplanRechnerClient;