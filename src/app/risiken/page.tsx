'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const RisikenPage = () => {
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

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        paddingBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(248, 223, 165, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
            fontWeight: '500',
            marginBottom: '1.5rem',
            color: '#ffffff',
            lineHeight: '1.2'
          }}>
            Risikohinweise
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
            color: '#d1d5db',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Wichtige Informationen zu den Risiken beim Handel mit Kryptowährungen
          </p>
        </div>
      </section>

      {/* Warning Banner */}
      <section style={{ paddingBottom: '2rem' }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.3))',
            borderRadius: '1rem',
            padding: isMobile ? '1.25rem' : '1.5rem',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              marginBottom: '0.5rem'
            }}>⚠️</div>
            <h2 style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              Achtung: Hochrisikoanlage
            </h2>
            <p style={{
              color: '#fecaca',
              fontWeight: '500',
              fontSize: isMobile ? '0.875rem' : '0.95rem'
            }}>
              Kryptowährungen sind hochspekulative Finanzinstrumente mit erheblichen Verlustrisiken bis hin zum Totalverlust.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ paddingBottom: isMobile ? '4rem' : isTablet ? '5rem' : '6rem' }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '1.5rem',
            padding: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            
            {/* Allgemeine Warnung */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem'
              }}>
                Allgemeine Risikowarnung
              </h2>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.95rem' : '1rem',
                textAlign: 'justify',
                marginBottom: '1rem'
              }}>
                <strong style={{ color: '#f8dfa5' }}>Der Handel mit Kryptowährungen ist hochspekulativ und mit erheblichen Risiken verbunden.</strong> Sie sollten nur Geld investieren, dessen Verlust Sie sich leisten können. Es besteht die Möglichkeit des Totalverlusts Ihres eingesetzten Kapitals.
              </p>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.95rem' : '1rem',
                textAlign: 'justify'
              }}>
                Kryptowährungen unterliegen extremen Kursschwankungen und sind nicht durch staatliche Einlagensicherungen geschützt. Die vergangene Wertentwicklung ist kein verlässlicher Indikator für die zukünftige Entwicklung.
              </p>
            </div>

            {/* Spezifische Risiken */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem'
              }}>
                Spezifische Risiken
              </h2>
              
              {/* Volatilitätsrisiko */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '1.25rem' : '1.5rem', 
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    📈 Volatilitätsrisiko
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.875rem' : '0.95rem',
                    textAlign: 'justify'
                  }}>
                    Kryptowährungen unterliegen extremen Preisschwankungen. Kursverluste von 50% oder mehr innerhalb weniger Tage oder Stunden sind keine Seltenheit. Diese Volatilität kann zu erheblichen Verlusten führen.
                  </p>
                </div>
              </div>

              {/* Totalverlustrisiko */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  padding: isMobile ? '1.25rem' : '1.5rem', 
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#fca5a5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    💀 Totalverlustrisiko
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.875rem' : '0.95rem',
                    textAlign: 'justify'
                  }}>
                    Es besteht das Risiko eines Totalverlusts Ihrer Investition. Kryptowährungen können wertlos werden, Börsen können gehackt werden oder schließen, und private Schlüssel können verloren gehen.
                  </p>
                </div>
              </div>

              {/* Technische Risiken */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '1.25rem' : '1.5rem', 
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🔧 Technische Risiken
                  </h3>
                  <ul style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.875rem' : '0.95rem',
                    paddingLeft: '1.5rem',
                    listStyleType: 'disc'
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}>Hacker-Angriffe auf Börsen und Wallets</li>
                    <li style={{ marginBottom: '0.5rem' }}>Verlust von privaten Schlüsseln oder Passwörtern</li>
                    <li style={{ marginBottom: '0.5rem' }}>Technische Probleme bei Blockchain-Netzwerken</li>
                    <li>Software-Bugs und Smart Contract-Fehler</li>
                  </ul>
                </div>
              </div>

              {/* Regulatorische Risiken */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '1.25rem' : '1.5rem', 
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    ⚖️ Regulatorische Risiken
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.875rem' : '0.95rem',
                    textAlign: 'justify'
                  }}>
                    Regierungen können Kryptowährungen verbieten, stark regulieren oder besteuern. Solche regulatorischen Änderungen können den Wert von Kryptowährungen erheblich beeinträchtigen oder den Handel unmöglich machen.
                  </p>
                </div>
              </div>

              {/* Liquiditätsrisiko */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '1.25rem' : '1.5rem', 
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: '#f8dfa5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🌊 Liquiditätsrisiko
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.7',
                    fontSize: isMobile ? '0.875rem' : '0.95rem',
                    textAlign: 'justify'
                  }}>
                    Bei geringem Handelsvolumen kann es schwierig sein, Kryptowährungen zu gewünschten Preisen zu verkaufen. Dies kann besonders bei kleineren oder neueren Kryptowährungen problematisch sein.
                  </p>
                </div>
              </div>
            </div>

            {/* Rechtliche Hinweise */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem'
              }}>
                Rechtliche Hinweise
              </h2>
              
              <div style={{
                background: 'rgba(156, 163, 175, 0.1)',
                padding: isMobile ? '1.25rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(156, 163, 175, 0.2)'
              }}>
                <ul style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.875rem' : '0.95rem',
                  paddingLeft: '1.5rem',
                  listStyleType: 'disc'
                }}>
                  <li style={{ marginBottom: '1rem' }}>
                    <strong>Keine Anlageberatung:</strong> Die Inhalte dieser Website stellen keine individuelle Anlageberatung dar. Jede Anlageentscheidung sollte auf eigener Recherche und professioneller Beratung basieren.
                  </li>
                  <li style={{ marginBottom: '1rem' }}>
                    <strong>Keine Gewährleistung:</strong> Für die Richtigkeit, Vollständigkeit oder Aktualität der Informationen wird keine Gewähr übernommen.
                  </li>
                  <li style={{ marginBottom: '1rem' }}>
                    <strong>Steuerliche Aspekte:</strong> Gewinne aus Kryptowährungen können steuerpflichtig sein. Konsultieren Sie einen Steuerberater für Ihre individuelle Situation.
                  </li>
                  <li>
                    <strong>Jurisdiktion:</strong> Die rechtlichen Rahmenbedingungen für Kryptowährungen variieren je nach Land und können sich ändern.
                  </li>
                </ul>
              </div>
            </div>

            {/* Empfehlungen */}
            <div>
              <h2 style={{
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#ffffff',
                borderBottom: '2px solid #f8dfa5',
                paddingBottom: '0.5rem'
              }}>
                Unsere Empfehlungen
              </h2>
              
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                padding: isMobile ? '1.25rem' : '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <ul style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.875rem' : '0.95rem',
                  paddingLeft: '1.5rem',
                  listStyleType: 'disc'
                }}>
                  <li style={{ marginBottom: '1rem' }}>
                    <strong>Bildung zuerst:</strong> Informieren Sie sich umfassend über Kryptowährungen, bevor Sie investieren.
                  </li>
                  <li style={{ marginBottom: '1rem' }}>
                    <strong>Nur Risikokapital einsetzen:</strong> Investieren Sie niemals Geld, das Sie für andere Zwecke benötigen.
                  </li>
                  <li style={{ marginBottom: '1rem' }}>
                    <strong>Diversifikation:</strong> Verteilen Sie Ihr Risiko auf verschiedene Anlageklassen und Kryptowährungen.
                  </li>
                  <li style={{ marginBottom: '1rem' }}>
                    <strong>Sicherheit:</strong> Verwenden Sie sichere Wallets und aktivieren Sie Zwei-Faktor-Authentifizierung.
                  </li>
                  <li>
                    <strong>Professionelle Beratung:</strong> Konsultieren Sie Finanz- und Steuerberater für individuelle Beratung.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '4rem 0' : isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(228, 177, 94, 0.15), rgba(248, 223, 165, 0.08), rgba(228, 177, 94, 0.15))',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: isMobile ? '3rem 2rem' : isTablet ? '3.5rem 3rem' : '4rem',
            textAlign: 'center',
            border: '1px solid rgba(228, 177, 94, 0.3)',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
              fontWeight: '500',
              marginBottom: '1rem',
              color: '#ffffff',
              lineHeight: '1.2'
            }}>
              Bereit für{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                verantwortungsvolles
              </span> Investieren?
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
              color: '#d1d5db',
              marginBottom: '2rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Informiere dich ausführlich und beginne nur mit Kapital, 
              dessen Verlust du verkraften kannst.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: isMobile ? '1rem' : '1.5rem',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center'
            }}>
              <Link 
                href="/krypto-kaufen" 
                style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: isMobile ? '1rem 2rem' : isTablet ? '1.125rem 2.5rem' : '1.25rem 3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)',
                  display: 'inline-block',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(248, 223, 165, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
                }}
              >
                Seriöse Börsen entdecken
              </Link>
              <Link 
                href="/kontakt" 
                style={{
                  background: 'transparent',
                  color: '#f8dfa5',
                  padding: isMobile ? '1rem 2rem' : isTablet ? '1.125rem 2.5rem' : '1.25rem 3rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  display: 'inline-block',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Fragen stellen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RisikenPage; 