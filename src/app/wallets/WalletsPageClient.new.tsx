'use client';

import React, { useState, useEffect } from 'react';

// Import all modular components
import LedgerSection from './components/LedgerSection';
import BitBoxSection from './components/BitBoxSection';
import TangemSection from './components/TangemSection';
import WalletComparison from './components/WalletComparison';
import {
  HeroSection,
  WhyOwnWalletSection,
  WhatIsWalletSection,
  MissCryptoFazitSection,
  ExtraTippSection,
  SecurityTipsSection,
  FAQSection,
  OfficialShopsSection
} from './components/SharedSections';

export default function WalletsPageClient() {
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
      <HeroSection isMobile={isMobile} isTablet={isTablet} />

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        {/* Why Own Wallet Section */}
        <WhyOwnWalletSection isMobile={isMobile} isTablet={isTablet} />

        {/* What is Wallet Section */}
        <WhatIsWalletSection isMobile={isMobile} isTablet={isTablet} />

        {/* Wallet Comparison Section */}
        <WalletComparison isMobile={isMobile} isTablet={isTablet} />

        {/* Individual Wallet Feature Highlights */}
        <LedgerSection isMobile={isMobile} isTablet={isTablet} />
        <BitBoxSection isMobile={isMobile} isTablet={isTablet} />
        <TangemSection isMobile={isMobile} isTablet={isTablet} />

        {/* MissCrypto Fazit */}
        <MissCryptoFazitSection isMobile={isMobile} isTablet={isTablet} />

        {/* Extra Tipp */}
        <ExtraTippSection isMobile={isMobile} isTablet={isTablet} />

        {/* Security Tips */}
        <SecurityTipsSection isMobile={isMobile} isTablet={isTablet} />

        {/* FAQ */}
        <FAQSection isMobile={isMobile} isTablet={isTablet} />

        {/* Official Shops */}
        <OfficialShopsSection isMobile={isMobile} isTablet={isTablet} />
      </div>
    </div>
  );
}
