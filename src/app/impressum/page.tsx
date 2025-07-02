'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TransparentHeader from '../components/TransparentHeader';

const ImpressumPage = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

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

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
      <TransparentHeader />
      
      {/* Hero Section */}
      <section style={{
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        paddingBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
            fontWeight: '500',
            marginBottom: isMobile ? '1rem' : '1.5rem',
            color: '#ffffff',
            lineHeight: '1.2',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Impressum
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
            color: '#d1d5db',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Rechtliche Informationen gemäß §5 TMG
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ 
        paddingBottom: isMobile ? '4rem' : isTablet ? '5rem' : '6rem'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: isMobile ? '1rem' : '1.5rem',
            padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            
            {/* Angaben gemäß TMG */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Angaben gemäß §5 TMG
              </h2>
              <div style={{
                color: '#d1d5db',
                lineHeight: '1.8',
                fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <p><strong style={{ color: '#f8dfa5' }}>Dr. Stephanie Morgenroth</strong></p>
                <p>c/o COCENTER</p>
                <p>Koppoldstr. 1</p>
                <p>86551 Aichach</p>
                <p>Germany</p>
              </div>
            </div>

            {/* Kontakt */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Kontakt
              </h2>
              <div style={{
                color: '#d1d5db',
                lineHeight: '1.8',
                fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <p>
                  <strong style={{ color: '#f8dfa5' }}>Telefon:</strong> 
                  <a 
                    href="tel:+491726715491" 
                    style={{ 
                      color: '#f8dfa5', 
                      textDecoration: 'underline',
                      marginLeft: '0.5rem'
                    }}
                  >
                    +49 1726715491
                  </a>
                </p>
                <p>
                  <strong style={{ color: '#f8dfa5' }}>E-Mail:</strong> 
                  <a 
                    href="mailto:contact@misscrypto.de" 
                    style={{ 
                      color: '#f8dfa5', 
                      textDecoration: 'underline',
                      marginLeft: '0.5rem',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}
                  >
                    contact@misscrypto.de
                  </a>
                </p>
                <p>
                  <strong style={{ color: '#f8dfa5' }}>Website:</strong> 
                  <a 
                    href="https://misscrypto.de" 
                    style={{ 
                      color: '#f8dfa5', 
                      textDecoration: 'underline',
                      marginLeft: '0.5rem',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}
                  >
                    https://misscrypto.de
                  </a>
                </p>
              </div>
            </div>

            {/* Haftungsausschluss */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.375rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: isMobile ? '1rem' : '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Haftungsausschluss
              </h2>
              
              {/* Verantwortlichkeit für den Inhalt */}
              <div style={{ 
                marginBottom: isMobile ? '1.5rem' : '2rem'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: '#f8dfa5',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Verantwortlichkeit für den Inhalt
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Gemäß den gesetzlichen Bestimmungen sind wir darüber hinaus für die eigenen Inhalte auf unseren Seiten verantwortlich. Wir weisen in diesem Zusammenhang darauf hin, dass wir nicht verpflichtet sind, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben nach den §§ 8 bis 10 TMG hiervon unberührt.
                </p>
              </div>

              {/* Verantwortlichkeit für Links */}
              <div style={{ 
                marginBottom: isMobile ? '1.5rem' : '2rem'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: '#f8dfa5',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Verantwortlichkeit für Links
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Für die Inhalte externer Links (zu Webseiten Dritter) sind ausschließlich die Betreiber der verlinkten Seiten verantwortlich. Zum Zeitpunkt der Verlinkung waren für uns keine Rechtsverstöße ersichtlich. Bei Bekanntwerden von Rechtsverstößen werden wir den entsprechenden Link umgehend entfernen.
                </p>
              </div>

              {/* Urheberrecht */}
              <div>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: '#f8dfa5',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Urheberrecht
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Unsere Webseiten und deren Inhalte unterliegen dem deutschen Urheberrecht. Jede Form der Verwertung, Vervielfältigung oder Bearbeitung urheberrechtlich geschützter Werke auf unseren Webseiten bedarf, soweit nicht ausdrücklich gesetzlich erlaubt, der vorherigen Zustimmung des jeweiligen Rechteinhabers. Einzelne Vervielfältigungen eines Werkes sind nur für den privaten Gebrauch gestattet. Die Materialien auf diesen Seiten sind urheberrechtlich geschützt und jede unerlaubte Nutzung kann gegen das Urheberrecht verstoßen.
                </p>
              </div>
            </div>

            {/* Back to Home Link */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link 
                href="/"
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isMobile ? '0.75rem 1.25rem' : isTablet ? '0.8rem 1.375rem' : '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                  fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                  fontFamily: 'Raleway, sans-serif',
                  minHeight: isMobile ? '44px' : '48px',
                  minWidth: isMobile ? '180px' : '200px'
                }}
              >
                Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpressumPage; 