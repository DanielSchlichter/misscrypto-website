'use client';

import { useState, useEffect, useCallback } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const STORAGE_KEY = 'cookie-consent';
const STORAGE_DATE_KEY = 'cookie-consent-date';

export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  const loadScripts = useCallback((prefs: CookiePreferences) => {
    // Google Analytics laden
    if (prefs.analytics && !document.querySelector('[data-gtag]')) {
      const script1 = document.createElement('script');
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      script1.async = true;
      script1.setAttribute('data-gtag', 'true');
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.setAttribute('data-gtag', 'true');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      `;
      document.head.appendChild(script2);
    }

    // Marketing Scripts laden
    if (prefs.marketing && !document.querySelector('[data-marketing]')) {
      // AFFILAE oder andere Marketing-Scripts hier einfügen
      console.log('Marketing scripts loaded');
    }

    // Funktionale Scripts laden
    if (prefs.functional && !document.querySelector('[data-functional]')) {
      // Funktionale Scripts hier einfügen
      console.log('Functional scripts loaded');
    }
  }, []);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (consent) {
        try {
          const savedPreferences = JSON.parse(consent);
          setPreferences(savedPreferences);
          setHasConsent(true);
          // Lade Scripts basierend auf gespeicherten Präferenzen
          loadScripts(savedPreferences);
        } catch (error) {
          console.error('Error parsing cookie consent:', error);
          setHasConsent(false);
        }
      } else {
        setHasConsent(false);
      }
    };

    checkConsent();
  }, [loadScripts]);

  const removeScripts = useCallback(() => {
    // Entferne alle Tracking-Scripts
    const scripts = document.querySelectorAll('[data-gtag], [data-marketing], [data-functional]');
    scripts.forEach(script => script.remove());
    
    // Google Analytics deaktivieren
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  }, []);

  const saveConsent = useCallback((prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      localStorage.setItem(STORAGE_DATE_KEY, new Date().toISOString());
      
      // Cookie für 13 Monate setzen (Deutschland Anforderung)
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 13);
      document.cookie = `${STORAGE_KEY}=${JSON.stringify(prefs)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
      
      setPreferences(prefs);
      setHasConsent(true);
      
      // Scripts entsprechend laden
      removeScripts();
      loadScripts(prefs);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  }, [loadScripts, removeScripts]);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    saveConsent(allAccepted);
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    saveConsent(onlyNecessary);
  }, [saveConsent]);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_DATE_KEY);
      document.cookie = `${STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      
      removeScripts();
      
      setPreferences({
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false
      });
      setHasConsent(false);
      
      // Seite neu laden um Cookie-Banner zu zeigen
      window.location.reload();
    } catch (error) {
      console.error('Error resetting cookie consent:', error);
    }
  }, [removeScripts]);

  const updatePreferences = useCallback((key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Notwendige Cookies können nicht deaktiviert werden
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const getConsentDate = useCallback(() => {
    const dateString = localStorage.getItem(STORAGE_DATE_KEY);
    return dateString ? new Date(dateString) : null;
  }, []);

  return {
    preferences,
    hasConsent,
    acceptAll,
    rejectAll,
    saveConsent,
    resetConsent,
    updatePreferences,
    getConsentDate
  };
}; 