'use client';

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { HeroSection } from './components/HeroSection';
import { WhyBybitSection } from './components/WhyBybitSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TradingCalculator } from './components/TradingCalculator';
import { FAQSection } from './components/FAQSection';
import { ConclusionSection } from './components/ConclusionSection';

export default function BybitModular() {
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

  const handleBybitClick = () => {
    trackEvent('bybit_cta_click', {
      section: 'bybit_page',
      button_type: 'affiliate_link'
    });
    window.open('https://partner.bybit.com/b/misscrypto', '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #000000 0%, #0f1629 30%, #1e293b 50%, #1a0f00 70%, #000000 100%)',
      color: 'white',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative' }}>
        {/* Hero Section */}
        <HeroSection
          isMobile={isMobile}
          isTablet={isTablet}
          onBybitClick={handleBybitClick}
        />

        {/* Animated Background Elements for Bybit */}
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
          {/* Floating Bybit-themed particles */}
          <div className="bybit-particle" style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '10px',
            height: '10px',
            background: 'linear-gradient(45deg, #f7a602, #ffc107)',
            borderRadius: '50%',
            animation: 'bybitFloat 7s ease-in-out infinite',
            opacity: '0.7'
          }}></div>
          <div className="bybit-particle" style={{
            position: 'absolute',
            top: '65%',
            right: '12%',
            width: '14px',
            height: '14px',
            background: 'linear-gradient(45deg, #f7a602, #ff9800)',
            borderRadius: '50%',
            animation: 'bybitFloat 9s ease-in-out infinite reverse',
            opacity: '0.5'
          }}></div>
          <div className="bybit-particle" style={{
            position: 'absolute',
            top: '35%',
            left: '85%',
            width: '8px',
            height: '8px',
            background: '#f7a602',
            borderRadius: '50%',
            animation: 'bybitFloat 11s ease-in-out infinite',
            opacity: '0.6'
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

          {/* Features Section */}
          <FeaturesSection
            isMobile={isMobile}
            onBybitClick={handleBybitClick}
          />

          {/* Trading Calculator */}
          <TradingCalculator isMobile={isMobile} />

          {/* FAQ Section */}
          <FAQSection isMobile={isMobile} />

          {/* Conclusion Section */}
          <ConclusionSection
            isMobile={isMobile}
            onBybitClick={handleBybitClick}
          />

        </div> {/* End Container */}
      </div> {/* End Main */}

      <style jsx>{`
        @keyframes bybitFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-25px) rotate(90deg);
          }
          50% {
            transform: translateY(-50px) rotate(180deg);
          }
          75% {
            transform: translateY(-25px) rotate(270deg);
          }
        }

        .bybit-particle {
          filter: blur(0.3px);
        }

        .premium-card-bybit {
          background: linear-gradient(135deg, rgba(247, 166, 2, 0.08), rgba(59, 130, 246, 0.08), rgba(15, 23, 42, 0.9));
          border: 1px solid rgba(59, 130, 246, 0.3);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .premium-card-bybit:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 50px rgba(59, 130, 246, 0.3), 0 8px 32px rgba(247, 166, 2, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .hero-gradient-text-bybit {
          background: linear-gradient(135deg, #f7a602, #ffc107, #ffffff);
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

        .particle-bybit {
          position: absolute;
          width: 7px;
          height: 7px;
          background: linear-gradient(45deg, #f7a602, #ffc107);
          border-radius: '50%';
          animation: float 6s ease-in-out infinite;
        }

        .particle-bybit:nth-child(1) {
          left: 15%;
          animation-delay: 0s;
        }

        .particle-bybit:nth-child(2) {
          left: 35%;
          animation-delay: 2s;
        }

        .particle-bybit:nth-child(3) {
          left: 55%;
          animation-delay: 4s;
        }

        .particle-bybit:nth-child(4) {
          left: 75%;
          animation-delay: 1s;
        }

        .particle-bybit:nth-child(5) {
          left: 25%;
          animation-delay: 3s;
        }

        .particle-bybit:nth-child(6) {
          left: 85%;
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
            transform: translateY(-20vh) rotate(180deg);
          }
        }

        .pulse-effect {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        .float-element {
          animation: floatElement 5s ease-in-out infinite;
        }

        .float-element-reverse {
          animation: floatElement 5s ease-in-out infinite reverse;
        }

        @keyframes floatElement {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(8deg);
          }
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(247, 166, 2, 0.3);
        }
      `}</style>
    </div>
  );
}