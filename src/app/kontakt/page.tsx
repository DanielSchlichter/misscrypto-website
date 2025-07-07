'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const KontaktPage = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    datenschutz: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

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
  const isDesktop = screenWidth >= 1024;

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@MissCryptoGer/featured',
      icon: '🎥',
      description: 'Videos & Tutorials'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/misscryptoger/',
      icon: '📸',
      description: 'Behind the Scenes'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dr-stephanie-morgenroth/',
      icon: '💼',
      description: 'Professionelle Updates'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/MissCryptoGER',
      icon: '🐦',
      description: 'News & Thoughts'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@misscryptoger',
      icon: '🎵',
      description: 'Kurze Crypto-Tipps'
    }
  ];

  // Handler für Formularänderungen
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    if (error) setError('');
  };

  // Handler für Formular-Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.datenschutz) {
      setError('Bitte akzeptiere die Datenschutzbestimmungen.');
      return;
    }
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Bitte fülle alle Pflichtfelder aus.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', datenschutz: false });
      } else {
        setError(data.error || 'Ein Fehler ist aufgetreten.');
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
      {/* Hero Section mit Text links und Formular rechts */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        paddingBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
            alignItems: isMobile ? 'stretch' : 'center',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
          }}>
            
            {/* Left Column - Text Content */}
            <div style={{ order: isMobile ? 2 : 0 }}>
              <div style={{
                color: '#f8dfa5',
                fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Kontakt
              </div>
              
              <h1 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                lineHeight: '1.2',
                color: '#ffffff',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Ich freue mich, von dir zu hören.
              </h1>
              
              <div style={{
                fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                marginBottom: isMobile ? '2rem' : '3rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Du hast Fragen zu Kryptowährungen, planst eine Kooperation oder willst einfach mal Hallo sagen?
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Ich freue mich auf deine Nachricht – und melde mich so schnell wie möglich zurück.
                </p>
              </div>

              {/* Social Media Section in linker Spalte */}
              <div>
                <h2 style={{
                  fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                  fontWeight: '300',
                  marginBottom: '1.5rem',
                  color: '#ffffff',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Folge mir auch auf{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Social Media
                  </span>
                </h2>

                {/* Social Media Links mit echten Icons wie im Footer */}
                  <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  {/* YouTube */}
                  <a href="https://www.youtube.com/@MissCryptoGer/featured" target="_blank" rel="noopener noreferrer" style={{
                    background: 'rgba(248, 223, 165, 0.1)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    border: '1px solid rgba(248, 223, 165, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: '#f8dfa5',
                    transition: 'all 0.3s ease',
                  }}>
                    {/* YouTube SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <span style={{ color: '#f8dfa5', fontWeight: '600', marginTop: '0.75rem' }}>YouTube</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: '0.25rem' }}>Videos & Tutorials</span>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/misscryptoger/" target="_blank" rel="noopener noreferrer" style={{
                    background: 'rgba(248, 223, 165, 0.1)',
                          borderRadius: '0.75rem',
                    padding: '1.25rem',
                          border: '1px solid rgba(248, 223, 165, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: '#f8dfa5',
                          transition: 'all 0.3s ease',
                  }}>
                    {/* Instagram SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                    <span style={{ color: '#f8dfa5', fontWeight: '600', marginTop: '0.75rem' }}>Instagram</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: '0.25rem' }}>Behind the Scenes</span>
                  </a>
                  {/* X */}
                  <a href="https://x.com/MissCryptoGER" target="_blank" rel="noopener noreferrer" style={{
                    background: 'rgba(248, 223, 165, 0.1)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    border: '1px solid rgba(248, 223, 165, 0.2)',
                          display: 'flex',
                    flexDirection: 'column',
                          alignItems: 'center',
                    textDecoration: 'none',
                            color: '#f8dfa5',
                    transition: 'all 0.3s ease',
                  }}>
                    {/* X SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    <span style={{ color: '#f8dfa5', fontWeight: '600', marginTop: '0.75rem' }}>X</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: '0.25rem' }}>News & Thoughts</span>
                  </a>
                  </div>
                    <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                      gap: '1rem',
                  marginBottom: '2rem'
                    }}>
                  {/* Zweite Reihe: LinkedIn, TikTok */}
                  <a href="https://www.linkedin.com/in/dr-stephanie-morgenroth/" target="_blank" rel="noopener noreferrer" style={{
                    background: 'rgba(248, 223, 165, 0.1)',
                            borderRadius: '0.75rem',
                    padding: '1.25rem',
                            border: '1px solid rgba(248, 223, 165, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                            textDecoration: 'none',
                            color: '#f8dfa5',
                    transition: 'all 0.3s ease',
                  }}>
                    {/* LinkedIn SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span style={{ color: '#f8dfa5', fontWeight: '600', marginTop: '0.75rem' }}>LinkedIn</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: '0.25rem' }}>Professionelle Updates</span>
                  </a>
                  <a href="https://www.tiktok.com/@misscryptoger" target="_blank" rel="noopener noreferrer" style={{
                    background: 'rgba(248, 223, 165, 0.1)',
                            borderRadius: '0.75rem',
                    padding: '1.25rem',
                            border: '1px solid rgba(248, 223, 165, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                            textDecoration: 'none',
                            color: '#f8dfa5',
                    transition: 'all 0.3s ease',
                  }}>
                    {/* TikTok SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    <span style={{ color: '#f8dfa5', fontWeight: '600', marginTop: '0.75rem' }}>TikTok</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: '0.25rem' }}>Kurze Crypto-Tipps</span>
                  </a>
                    </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: isMobile ? '1rem' : '1.5rem',
              padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(20px)',
              order: isMobile ? 1 : 0
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#f8dfa5',
                textAlign: 'center',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Schreibe mir eine Nachricht
              </h3>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Dein Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Raleway, sans-serif',
                      minHeight: '44px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                {/* E-Mail und Telefon - Mobile: Untereinander, Tablet+: Nebeneinander */}
                <div style={{ 
                  display: isMobile ? 'flex' : 'grid',
                  flexDirection: isMobile ? 'column' : undefined,
                  gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label htmlFor="email" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#f8dfa5',
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      fontWeight: '500',
                      textAlign: 'left',
                      fontFamily: 'Raleway, sans-serif'
                    }}>
                      E-Mail*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="deine@email.de"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: isMobile ? '0.875rem' : '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(248, 223, 165, 0.3)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        color: '#ffffff',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Raleway, sans-serif',
                        minHeight: '44px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#f8dfa5',
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      fontWeight: '500',
                      textAlign: 'left',
                      fontFamily: 'Raleway, sans-serif'
                    }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+49 123 456789"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: isMobile ? '0.875rem' : '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(248, 223, 165, 0.3)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        color: '#ffffff',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Raleway, sans-serif',
                        minHeight: '44px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Betreff*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Worum geht es?"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Raleway, sans-serif',
                      minHeight: '44px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#f8dfa5',
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    fontWeight: '500',
                    textAlign: 'left',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Nachricht*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={isMobile ? 4 : 5}
                    placeholder="Deine Nachricht an mich..."
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem' : '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#ffffff',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      transition: 'all 0.3s ease',
                      resize: 'vertical',
                      minHeight: isMobile ? '120px' : '140px',
                      fontFamily: 'Raleway, sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                {/* Datenschutz Checkbox */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    id="datenschutz"
                    name="datenschutz"
                    required
                    checked={formData.datenschutz}
                    onChange={handleInputChange}
                    style={{
                      marginTop: '0.25rem',
                      accentColor: '#f8dfa5',
                      minWidth: '16px',
                      minHeight: '16px'
                    }}
                  />
                  <label
                    htmlFor="datenschutz"
                    style={{
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      color: '#9ca3af',
                      lineHeight: '1.4',
                      textAlign: 'left',
                      fontFamily: 'Raleway, sans-serif'
                    }}
                  >
                    Ich akzeptiere die{' '}
                    <Link href="/datenschutz" style={{
                      color: '#f8dfa5',
                      textDecoration: 'underline',
                      transition: 'color 0.3s ease'
                    }}>
                      Datenschutzerklärung
                    </Link>
                    {' '}und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>
                
                {/* Fehleranzeige */}
                {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem' }}>{error}</div>}
                {/* Erfolgsanzeige */}
                {isSuccess && <div style={{ color: '#22c55e', background: 'rgba(34,197,94,0.08)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem' }}>Deine Nachricht wurde erfolgreich versendet!</div>}
                
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(90deg, #f8dfa5 0%, #e4b15e 100%)',
                    color: '#222',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: isMobile ? '1rem' : '1.25rem 2.5rem',
                    fontSize: isMobile ? '1.1rem' : '1.2rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                    transition: 'background 0.3s, color 0.3s',
                    marginTop: '0.5rem',
                    letterSpacing: '0.01em',
                    transform: 'translateY(0)',
                    fontFamily: 'Raleway, sans-serif',
                    minHeight: '48px'
                  }}
                  disabled={isLoading}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #e4b15e 0%, #f8dfa5 100%)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(90deg, #f8dfa5 0%, #e4b15e 100%)';
                  }}
                >
                  {isLoading ? 'Wird gesendet...' : 'Nachricht senden →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        paddingBottom: isMobile ? '4rem' : isTablet ? '5rem' : '6rem'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
            borderRadius: isMobile ? '1rem' : '1.5rem',
            padding: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
            textAlign: 'center',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.1)'
          }}>
            <h3 style={{
              fontSize: isMobile ? '1.375rem' : isTablet ? '1.5rem' : '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Bereit für den nächsten Schritt?
            </h3>
            <p style={{
              color: '#d1d5db',
              marginBottom: '2rem',
              fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
              lineHeight: '1.6',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Entdecke die Welt der Kryptowährungen und starte deine Krypto-Reise noch heute.
            </p>
            <div style={{
              display: 'flex',
              gap: isMobile ? '0.75rem' : '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <Link
                href="/krypto-kaufen"
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isMobile ? '0.875rem 1.5rem' : isTablet ? '0.9375rem 1.75rem' : '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontFamily: 'Raleway, sans-serif',
                  minHeight: isMobile ? '44px' : '48px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                🚀 Krypto-Börsen entdecken
              </Link>
              <Link
                href="/ueber-mich"
                style={{
                  background: 'transparent',
                  color: '#f8dfa5',
                  padding: isMobile ? '0.875rem 1.5rem' : isTablet ? '0.9375rem 1.75rem' : '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontFamily: 'Raleway, sans-serif',
                  minHeight: isMobile ? '44px' : '48px'
                }}
              >
                👩‍💼 Mehr über mich
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontaktPage; 