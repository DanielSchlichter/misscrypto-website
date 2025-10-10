'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import NewsfeedSlider from '../components/NewsfeedSlider';
import FeaturesSection from '../components/FeaturesSection';
import CryptoTicker from '../components/CryptoTicker';
import SparplanCalculator from '../sparplanrechner/SparplanCalculator';
import NewsletterForm from '../components/NewsletterForm';

const HomePage = () => {
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
    <div style={{ fontFamily: 'Raleway, sans-serif' }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Newsfeed Slider */}
      <NewsfeedSlider />

      {/* Features Section */}
      <FeaturesSection />

      {/* Crypto Ticker */}
      <CryptoTicker />

      {/* Sparplan Calculator */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        <SparplanCalculator isMobile={isMobile} isTablet={isTablet} />
      </div>

      {/* Newsletter Section */}
      <section style={{ 
        padding: isMobile ? '4rem 0' : isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(248, 223, 165, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '3rem' : '4rem',
            alignItems: 'center'
          }}>
            {/* Left Column - Text Content */}
            <div>
              <h2 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '2.75rem',
                fontWeight: '500',
                marginBottom: '1.5rem',
                color: '#ffffff',
                lineHeight: '1.2'
              }}>
                Bleib auf dem Laufenden.
              </h2>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.125rem',
                color: '#d1d5db',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Krypto-Wissen, Updates und Empfehlungen – direkt in dein Postfach.
              </p>
              <ul style={{ 
                marginBottom: '2rem',
                padding: 0,
                listStyle: 'none'
              }}>
                {[
                  '📰 Verständliche Artikel',
                  '🔍 Hintergründe & Einblicke',
                  '🛠️ Nützliche Tools & Tipps',
                  '📬 Krypto-Updates per Mail'
                ].map((item, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    padding: isMobile ? '0.5rem 0' : '0.75rem 0'
                  }}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Newsletter Form */}
            <NewsletterForm isMobile={isMobile} isTablet={isTablet} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '4rem 0' : isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.15), rgba(248, 223, 165, 0.08), rgba(228, 177, 94, 0.15))',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: isMobile ? '3rem 2rem' : isTablet ? '3.5rem 3rem' : '4rem',
            textAlign: 'center',
            border: '1px solid rgba(228, 177, 94, 0.3)',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(248, 223, 165, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}></div>

            <h2 style={{
              fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
              fontWeight: '500',
              marginBottom: '1rem',
              color: '#ffffff',
              lineHeight: '1.2',
              position: 'relative',
              zIndex: 1
            }}>
              Bereit für deinen ersten Schritt in Krypto?
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
              color: '#d1d5db',
              marginBottom: '2rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              position: 'relative',
              zIndex: 1
            }}>
              Finde die passende Börse und starte sicher mit Bitcoin, Ethereum & Co.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <Link 
                href="/krypto-kaufen" 
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isMobile ? '1rem 2.5rem' : isTablet ? '1.125rem 2.75rem' : '1.25rem 3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(248, 223, 165, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
                }}
              >
                Krypto kaufen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 