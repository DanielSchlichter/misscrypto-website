'use client';

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { HeroSection } from './components/HeroSection';
import { WhyKrakenSection } from './components/WhyKrakenSection';
import { FeaturesSection } from './components/FeaturesSection';
import { FAQSection } from './components/FAQSection';
import { ConclusionSection } from './components/ConclusionSection';

export default function KrakenModular() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleKrakenClick = () => {
    trackEvent('kraken_cta_click', {
      section: 'kraken_page',
      button_type: 'affiliate_link'
    });
    window.open('https://kraken.pxf.io/RGE3yg', '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      color: 'white',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative' }}>
        {/* Hero Section */}
        <HeroSection
          isMobile={isMobile}
          isTablet={isTablet}
          onKrakenClick={handleKrakenClick}
        />

        {/* Animated Background Elements for Kraken */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden'
        }}>
          {/* Floating Kraken-themed particles */}
          <div className="kraken-particle" style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '8px',
            height: '8px',
            background: 'linear-gradient(45deg, #7131f5, #9c6bff)',
            borderRadius: '50%',
            animation: 'krakenFloat 8s ease-in-out infinite',
            opacity: '0.6'
          }}></div>
          <div className="kraken-particle" style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '12px',
            height: '12px',
            background: 'linear-gradient(45deg, #7131f5, #a77cff)',
            borderRadius: '50%',
            animation: 'krakenFloat 10s ease-in-out infinite reverse',
            opacity: '0.4'
          }}></div>
          <div className="kraken-particle" style={{
            position: 'absolute',
            top: '40%',
            left: '80%',
            width: '6px',
            height: '6px',
            background: '#7131f5',
            borderRadius: '50%',
            animation: 'krakenFloat 12s ease-in-out infinite',
            opacity: '0.5'
          }}></div>
        </div>

        {/* Container for other sections */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: isMobile ? '1rem' : '2rem',
          paddingRight: isMobile ? '1rem' : '2rem',
          paddingTop: '3rem',
          paddingBottom: '20px'
        }}>

          {/* Why Kraken Section */}
          <WhyKrakenSection isMobile={isMobile} />

          {/* Features Section */}
          <FeaturesSection
            isMobile={isMobile}
            onKrakenClick={handleKrakenClick}
          />

          {/* FAQ Section */}
          <FAQSection isMobile={isMobile} />

          {/* Conclusion Section */}
          <ConclusionSection
            isMobile={isMobile}
            onKrakenClick={handleKrakenClick}
          />

        </div> {/* End Container */}
      </div> {/* End Main */}

      <style jsx>{`
        @keyframes krakenFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }

        .kraken-particle {
          filter: blur(0.5px);
        }

        .premium-card-kraken {
          background: linear-gradient(135deg, rgba(113, 49, 245, 0.08), rgba(156, 107, 255, 0.12), rgba(26, 26, 46, 0.9));
          border: 1px solid rgba(113, 49, 245, 0.3);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .premium-card-kraken:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 48px rgba(113, 49, 245, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4);
          border-color: rgba(113, 49, 245, 0.5);
        }

        .hero-gradient-text-kraken {
          background: linear-gradient(135deg, #7131f5, #9c6bff, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .particle-kraken {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #7131f5, #9c6bff);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle-kraken:nth-child(1) {
          left: 20%;
          animation-delay: 0s;
        }

        .particle-kraken:nth-child(2) {
          left: 40%;
          animation-delay: 2s;
        }

        .particle-kraken:nth-child(3) {
          left: 60%;
          animation-delay: 4s;
        }

        .particle-kraken:nth-child(4) {
          left: 80%;
          animation-delay: 1s;
        }

        .particle-kraken:nth-child(5) {
          left: 10%;
          animation-delay: 3s;
        }

        .particle-kraken:nth-child(6) {
          left: 90%;
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-10vh) rotate(180deg);
          }
        }

        .pulse-effect {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .float-element {
          animation: floatElement 4s ease-in-out infinite;
        }

        .float-element-reverse {
          animation: floatElement 4s ease-in-out infinite reverse;
        }

        @keyframes floatElement {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}