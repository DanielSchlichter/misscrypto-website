'use client';

import React, { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const TransparentHeader = () => {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = isClient ? screenWidth < 1190 : false;
  const isTablet = isClient ? (screenWidth >= 768 && screenWidth < 1024) : false;

  // Direktes Rendern basierend auf Bildschirmgröße
  if (!isClient) {
    // Während der Server-Side Render Phase - zeige nichts an
    return null;
  }

  return isMobile ? <MobileHeader /> : <DesktopHeader isTablet={isTablet} />;
};

export default TransparentHeader; 