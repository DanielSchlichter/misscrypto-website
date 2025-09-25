'use client';

import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { HeroSection } from './components/HeroSection';
import { WhyBitpandaSection } from './components/WhyBitpandaSection';
import { FeaturesSection } from './components/FeaturesSection';
import { FAQSection } from './components/FAQSection';
import { ConclusionSection } from './components/ConclusionSection';

const BitpandaModular = () => {
  const [screenWidth, setScreenWidth] = useState(1024); // Desktop-first für SSR
  const [isClient, setIsClient] = useState(false);
  const { trackExchangeClick } = useAnalytics();

  // Hydration-safe responsive handling
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = isClient && screenWidth < 768;
  const isTablet = isClient && screenWidth >= 768 && screenWidth < 1024;

  const handleBitpandaClick = () => {
    trackExchangeClick('Bitpanda');
    window.open('https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Global animations and styles */}
      <style jsx global>{`
        /* Floating particles animation */
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .particle-alt {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(228, 177, 94, 0.4);
          border-radius: 50%;
          animation: particleFloat 8s linear infinite;
        }

        .particle-alt:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
          animation-duration: 12s;
        }

        .particle-alt:nth-child(2) {
          left: 25%;
          animation-delay: 2s;
          animation-duration: 10s;
          background: rgba(248, 223, 165, 0.3);
        }

        .particle-alt:nth-child(3) {
          left: 45%;
          animation-delay: 4s;
          animation-duration: 14s;
        }

        .particle-alt:nth-child(4) {
          left: 65%;
          animation-delay: 1s;
          animation-duration: 9s;
          background: rgba(228, 177, 94, 0.5);
        }

        .particle-alt:nth-child(5) {
          left: 80%;
          animation-delay: 3s;
          animation-duration: 11s;
          background: rgba(248, 223, 165, 0.4);
        }

        .particle-alt:nth-child(6) {
          left: 90%;
          animation-delay: 5s;
          animation-duration: 13s;
        }

        @keyframes particleFloat {
          0% {
            opacity: 0;
            transform: translateY(100vh) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(10vh) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-10vh) scale(0);
          }
        }

        /* Premium card styles */
        .premium-card {
          background: linear-gradient(135deg,
            rgba(26, 26, 46, 0.9) 0%,
            rgba(31, 41, 55, 0.8) 25%,
            rgba(17, 24, 39, 0.85) 50%,
            rgba(30, 41, 59, 0.9) 75%,
            rgba(51, 65, 85, 0.8) 100%
          );
          border: 1px solid rgba(228, 177, 94, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        /* Float animations */
        .float-element {
          animation: float 6s ease-in-out infinite;
        }

        .float-element-reverse {
          animation: float 6s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-3deg);
          }
        }

        /* Pulse effect */
        .pulse-effect {
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        /* Fade in animations */
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hero gradient text */
        .hero-gradient-text-alt {
          background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* Button styles */
        .mc-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #e4b15e, #f8dfa5);
          color: #000000;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(228, 177, 94, 0.25);
          position: relative;
          overflow: hidden;
        }

        .mc-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(228, 177, 94, 0.4);
          background: linear-gradient(135deg, #f8dfa5, #e4b15e);
        }

        .mc-btn-primary:active {
          transform: translateY(0);
        }

        /* Details/Summary styling for FAQ */
        details[open] summary span:last-child {
          transform: rotate(180deg);
        }

        details summary::-webkit-details-marker {
          display: none;
        }

        details summary {
          outline: none;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        fontFamily: 'Raleway, sans-serif',
        background: 'linear-gradient(180deg, #000000 0%, #1a1a2e 50%, #000000 100%)'
      }}>
        {/* Hero Section - Full Width */}
        <HeroSection
          isMobile={isMobile}
          isTablet={isTablet}
          onBitpandaClick={handleBitpandaClick}
        />

        {/* Shiny Divider - Full Width directly after Hero */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(228, 177, 94, 0.3) 20%, rgba(228, 177, 94, 0.8) 50%, rgba(228, 177, 94, 0.3) 80%, transparent 100%)',
          margin: '0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)',
            animation: 'shine 4s ease-in-out infinite'
          }}></div>
        </div>

        {/* Container for other sections */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem',
          paddingTop: '3rem'
        }}>

          {/* Why Bitpanda Section */}
          <WhyBitpandaSection isMobile={isMobile} />

          {/* Features Section */}
          <FeaturesSection
            isMobile={isMobile}
            onBitpandaClick={handleBitpandaClick}
          />

          {/* FAQ Section */}
          <FAQSection isMobile={isMobile} />

          {/* Conclusion Section */}
          <ConclusionSection
            isMobile={isMobile}
            onBitpandaClick={handleBitpandaClick}
          />

        </div> {/* End Container */}
      </div> {/* End Main */}

      <style jsx>{`
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
    </>
  );
};

export default BitpandaModular;