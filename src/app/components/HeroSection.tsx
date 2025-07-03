'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <section className="mc-hero">
      <div className="mc-hero-content">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: isMobile ? '1rem' : '2rem',
          alignItems: 'center',
          minHeight: isMobile ? '60vh' : '50vh'
        }}>
          
          {/* Text Content - Left Side */}
          <div style={{
            gridColumn: '1',
            gridRow: '2',
            textAlign: 'left'
          }}>
            <div style={{
              color: '#f8dfa5',
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              MissCrypto
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 'bold',
              marginBottom: '1.25rem',
              lineHeight: '1.2',
              color: '#ffffff'
            }}>
              Deine Reise in die Welt der{' '}
              <span className="mc-hero-gradient">Kryptowährungen</span>{' '}
              beginnt HIER.
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: '#d1d5db',
              marginBottom: '2rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 0 2rem 0'
            }}>
              Erlebe die Zukunft der digitalen Assets mit meinem Kurs für deinen erfolgreichen Einstieg in Kryptowährungen! 
              Ich zeige dir Schritt für Schritt, wie du dein eigenes Portfolio aufbaust und souverän in die Welt von Bitcoin, 
              Ethereum & Co. startest.
            </p>
            
            <div className="mc-hero-buttons" style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
              <Link 
                href="/krypto-kaufen?currency=bitcoin" 
                className="mc-btn-primary"
                style={{
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem'
                }}
              >
                Zum Börsenvergleich
              </Link>
              <button 
                onClick={() => {
                  // Scroll zum Investment Calculator (Was wäre wenn Rechner)
                  const sections = document.querySelectorAll('.mc-section');
                  let calculatorSection: Element | null = null;
                  
                  // Finde die Section mit dem "Was wäre wenn" Titel
                  sections.forEach(section => {
                    const title = section.querySelector('h2');
                    if (title && title.textContent?.includes('Was wäre wenn')) {
                      calculatorSection = section;
                    }
                  });
                  
                  if (calculatorSection) {
                    (calculatorSection as HTMLElement).scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mc-btn-secondary"
                style={{ 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'visible',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem'
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-4px',
                  right: '-4px',
                  bottom: '-4px',
                  border: '1px solid #e4b15e',
                  borderRadius: '16px',
                  opacity: 0.6,
                  pointerEvents: 'none'
                }}></span>
                Was wäre wenn Rechner
              </button>
            </div>
          </div>

          {/* Image - Right Side */}
          <div style={{
            gridColumn: '1',
            gridRow: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: isMobile ? '40vh' : '60vh'
          }}>
            <Image
              src="/logos/Steffi-Landingpage-Bild-scaled-1 2.webp"
              alt="Steffi - Deine Krypto-Expertin und Mentorin"
              width={isMobile ? 300 : 500}
              height={isMobile ? 360 : 600}
              style={{
                objectFit: 'cover',
                objectPosition: 'center 0%',
                maxHeight: isMobile ? '35vh' : '70vh',
                width: 'auto',
                marginBottom: isMobile ? '0px' : '-72px'
              }}
              priority
            />
          </div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection; 