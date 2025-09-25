'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
          gap: (isClient && isMobile) ? '1rem' : '2rem',
          alignItems: 'center',
          minHeight: (isClient && isMobile) ? '60vh' : '50vh'
        }}>
          
          {/* Text Content - Left Side */}
          <div style={{
            gridColumn: '1',
            gridRow: '2',
            textAlign: 'left'
          }}>
            <h1 style={{
              fontSize: (isClient && isMobile) ? '1.5rem' : '2rem',
              fontWeight: 'bold',
              marginBottom: '1.25rem',
              lineHeight: '1.2',
              color: '#ffffff'
            }}>
              Dein Einstieg in die<br />
              <span className="mc-hero-gradient">Krypto-Welt</span>.
            </h1>
            
            <p style={{
              fontSize: (isClient && isMobile) ? '1rem' : '1.125rem',
              color: '#d1d5db',
              marginBottom: '2rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 0 2rem 0'
            }}>
              Deine Anlaufstelle, um mit Krypto zu starten<br />
              – klar, sicher und mit Plan.
            </p>
            
            <div className="mc-hero-buttons" style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
              <Link 
                href="/krypto-kaufen?currency=bitcoin" 
                className="mc-btn-primary"
                style={{
                  fontSize: (isClient && isMobile) ? '0.875rem' : '1rem',
                  padding: (isClient && isMobile) ? '0.75rem 1.5rem' : '1rem 2rem'
                }}
              >
                Zum Börsenvergleich
              </Link>
              <button 
                onClick={() => {
                  // Scroll zum Sparplan Calculator
                  const sections = document.querySelectorAll('div');
                  let calculatorSection: Element | null = null;
                  
                  // Finde die Section mit dem Sparplan Calculator
                  sections.forEach(section => {
                    const title = section.querySelector('h2');
                    if (title && title.textContent?.includes('Sparplan')) {
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
                  fontSize: (isClient && isMobile) ? '0.875rem' : '1rem',
                  padding: (isClient && isMobile) ? '0.75rem 1.5rem' : '1rem 2rem'
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
                Sparplan Rechner
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
            height: (isClient && isMobile) ? '40vh' : '60vh'
          }}>
            {isClient && (
              <Image
                src="/logos/Steffi-Landingpage-Bild-scaled-1 2.webp"
                alt="Steffi - Deine Krypto-Expertin und Mentorin"
                width={isMobile ? 300 : 500}
                height={isMobile ? 360 : 600}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 0%',
                  maxHeight: isMobile ? '35vh' : '60vh',
                  width: 'auto',
                  marginBottom: isMobile ? '0px' : '-150px'
                }}
                priority
              />
            )}
          </div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection; 