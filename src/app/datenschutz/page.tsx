'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TransparentHeader from '../components/TransparentHeader';

const DatenschutzPage = () => {
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
            Datenschutzerklärung
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
            color: '#d1d5db',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Datenschutzerklärung von www.misscrypto.de
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ 
        paddingBottom: isMobile ? '4rem' : isTablet ? '5rem' : '6rem'
      }}>
        <div style={{ 
          maxWidth: '900px', 
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
            
            {/* Einleitung */}
            <div style={{ 
              marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
            }}>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                marginBottom: '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Diese Website erhebt personenbezogene Daten von ihren Nutzern.
              </p>
              <p style={{
                color: '#9ca3af',
                lineHeight: '1.6',
                fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Dieses Dokument kann zu Zwecken der Aufbewahrung über den Befehl "Drucken" im Browser ausgedruckt werden.
              </p>
            </div>

            {/* Anbieter und Verantwortlicher */}
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
                Anbieter und Verantwortlicher
              </h2>
              <div style={{
                color: '#d1d5db',
                lineHeight: '1.8',
                fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <p><strong style={{ color: '#f8dfa5' }}>Brombacher, Deines, Kretzschmar, Morgenroth GbR</strong></p>
                <p>Hallandstr. 16</p>
                <p>13189 Berlin</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong style={{ color: '#f8dfa5' }}>E-Mail-Adresse des Anbieters:</strong>{' '}
                  <a 
                    href="mailto:contact@misscrypto.de" 
                    style={{ 
                      color: '#f8dfa5', 
                      textDecoration: 'underline',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}
                  >
                    contact@misscrypto.de
                  </a>
                </p>
              </div>
            </div>

            {/* Arten der erhobenen Daten */}
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
                Arten der erhobenen Daten
              </h2>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                textAlign: 'justify',
                marginBottom: '1.5rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Zu den personenbezogenen Daten, die diese Website selbstständig oder durch Dritte verarbeitet, gehören: Tracker; Nutzungsdaten; Anzahl der Nutzer; Sitzungsstatistiken; Nutzername.
              </p>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                textAlign: 'justify',
                marginBottom: '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Vollständige Details zu jeder Art von verarbeiteten personenbezogenen Daten werden in den dafür vorgesehenen Abschnitten dieser Datenschutzerklärung oder punktuell durch Erklärungstexte bereitgestellt, die vor der Datenerhebung angezeigt werden.
              </p>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                textAlign: 'justify',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Personenbezogene Daten können vom Nutzer freiwillig angegeben oder, im Falle von Nutzungsdaten, automatisch erhoben werden, wenn diese Website genutzt wird. Die Nutzer sind für alle personenbezogenen Daten Dritter verantwortlich, die durch diese Website beschafft, veröffentlicht oder weitergegeben werden.
              </p>
            </div>

            {/* Art und Ort der Datenverarbeitung */}
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
                Art und Ort der Datenverarbeitung
              </h2>
              
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
                  Verarbeitungsmethoden
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  marginBottom: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Der Anbieter verarbeitet die personenbezogenen Daten der Nutzer auf ordnungsgemäße Weise und ergreift angemessene Sicherheitsmaßnahmen, um den unbefugten Zugriff und die unbefugte Weiterleitung, Veränderung oder Vernichtung von Daten zu vermeiden.
                </p>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Die Datenverarbeitung wird mittels Computern oder IT-basierten Systemen nach organisatorischen Verfahren und Verfahrensweisen durchgeführt, die gezielt auf die angegebenen Zwecke abstellen.
                </p>
              </div>

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
                  Ort
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Die Daten werden in der Niederlassung des Anbieters und an allen anderen Orten, an denen sich die an der Datenverarbeitung beteiligten Stellen befinden, verarbeitet.
                </p>
              </div>

              <div>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: '#f8dfa5',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Speicherdauer
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Sofern in diesem Dokument nicht anderweitig festgelegt, werden personenbezogene Daten so lange verarbeitet und gespeichert, wie es der Zweck erfordert, zu dem sie erhoben wurden.
                </p>
              </div>
            </div>

            {/* Zwecke der Verarbeitung */}
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
                Zwecke der Verarbeitung
              </h2>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                textAlign: 'justify',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Personenbezogene Daten über den Nutzer werden erhoben, damit der Anbieter den Dienst erbringen und des Weiteren seinen gesetzlichen Verpflichtungen nachkommen, auf Durchsetzungsforderungen reagieren, seine Rechte und Interessen schützen kann. Darüber hinaus werden Daten zu folgenden Zwecken erhoben: Analytik, Werbung, Kommentarfunktion und Tag-Verwaltung.
              </p>
            </div>

            {/* Ausführliche Angaben über die Verarbeitung */}
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
                Ausführliche Angaben über die Verarbeitung personenbezogener Daten
              </h2>
              
              {/* Analytik */}
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
                  Analytik
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                  textAlign: 'justify',
                  marginBottom: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Mit den in diesem Abschnitt aufgeführten Dienstleistungen kann der Anbieter den Datenverkehr überwachen und analysieren sowie das Verhalten von Nutzern nachverfolgen.
                </p>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '0.75rem' : isTablet ? '0.875rem' : '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h4 style={{ 
                    color: '#f8dfa5', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Google Analytics 4 (Google Ireland Limited)
                  </h4>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    marginBottom: '0.5rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Google Analytics 4 ist ein Webanalysedienst zur Nachverfolgung und Untersuchung der Website-Nutzung.
                  </p>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.85rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <strong>Verarbeitete Daten:</strong> Anzahl der Nutzer; Nutzungsdaten; Sitzungsstatistiken; Tracker.<br/>
                    <strong>Verarbeitungsort:</strong> Irland
                  </p>
                </div>
              </div>

              {/* Kommentarfunktion */}
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
                  Kommentarfunktion
                </h3>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '0.75rem' : isTablet ? '0.875rem' : '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h4 style={{ 
                    color: '#f8dfa5', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Eigenes Kommentarsystem (diese Website)
                  </h4>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    marginBottom: '0.5rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Diese Website verfügt über ihre eigene interne Kommentarfunktion.
                  </p>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.85rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <strong>Verarbeitete Daten:</strong> Nutzername
                  </p>
                </div>
              </div>

              {/* Tag-Verwaltung */}
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
                  Tag-Verwaltung
                </h3>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '0.75rem' : isTablet ? '0.875rem' : '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h4 style={{ 
                    color: '#f8dfa5', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Google Tag Manager
                  </h4>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    marginBottom: '0.5rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Google Tag Manager ist ein Dienst zur Verwaltung von Tags.
                  </p>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.85rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <strong>Verarbeitete Daten:</strong> Nutzungsdaten; Tracker<br/>
                    <strong>Verarbeitungsort:</strong> Vereinigte Staaten; Irland
                  </p>
                </div>
              </div>

              {/* Werbung */}
              <div>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.075rem' : '1.125rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: '#f8dfa5',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Werbung
                </h3>
                <div style={{ 
                  background: 'rgba(248, 223, 165, 0.1)', 
                  padding: isMobile ? '0.75rem' : isTablet ? '0.875rem' : '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <h4 style={{ 
                    color: '#f8dfa5', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500',
                    fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    AFFILAE (NETILUM SARL)
                  </h4>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                    marginBottom: '0.5rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    AFFILAE ist ein Werbedienst der NETILUM SARL.
                  </p>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.85rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    <strong>Verarbeitete Daten:</strong> Nutzungsdaten; Tracker<br/>
                    <strong>Verarbeitungsort:</strong> Frankreich
                  </p>
                </div>
              </div>
            </div>

            {/* Cookie-Richtlinie */}
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
                Cookie-Richtlinie
              </h2>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                textAlign: 'justify',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Diese Website verwendet Tracker. Weitere Informationen ergeben sich aus der Cookie-Richtlinie.
              </p>
            </div>

            {/* Rechte der Nutzer */}
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
                Die Rechte der Nutzer nach der Datenschutz-Grundverordnung (DSGVO)
              </h2>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                textAlign: 'justify',
                marginBottom: '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Die Nutzer können bestimmte Rechte in Bezug auf ihre vom Anbieter verarbeiteten Daten ausüben.
              </p>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                marginBottom: '1rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Nutzer haben im gesetzlich zulässigen Umfang insbesondere das Recht:
              </p>
              <ul style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.95rem',
                paddingLeft: isMobile ? '1rem' : '1.5rem',
                listStyleType: 'disc',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>Die Einwilligungen jederzeit zu widerrufen</li>
                <li style={{ marginBottom: '0.5rem' }}>Widerspruch gegen die Verarbeitung ihrer Daten einzulegen</li>
                <li style={{ marginBottom: '0.5rem' }}>Auskunft bezüglich ihrer Daten zu erhalten</li>
                <li style={{ marginBottom: '0.5rem' }}>Überprüfung und Berichtigung zu verlangen</li>
                <li style={{ marginBottom: '0.5rem' }}>Einschränkung der Verarbeitung zu verlangen</li>
                <li style={{ marginBottom: '0.5rem' }}>Löschung der personenbezogenen Daten zu verlangen</li>
                <li style={{ marginBottom: '0.5rem' }}>Datenübertragbarkeit zu verlangen</li>
                <li>Beschwerde bei der Aufsichtsbehörde einzureichen</li>
              </ul>
            </div>

            {/* Begriffsbestimmungen */}
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
                Begriffsbestimmungen und rechtliche Hinweise
              </h2>
              <div style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                fontSize: isMobile ? '0.8rem' : isTablet ? '0.85rem' : '0.9rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#f8dfa5' }}>Personenbezogene Daten (oder Daten):</strong>{' '}
                  Alle Informationen, durch die direkt oder in Verbindung mit weiteren Informationen die Identität einer natürlichen Person bestimmt wird oder werden kann.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#f8dfa5' }}>Nutzungsdaten:</strong>{' '}
                  Informationen, die diese Website automatisch erhebt, z. B. IP-Adressen, Domain-Namen, URI-Adressen, Zeitpunkt der Anfrage, etc.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#f8dfa5' }}>Nutzer:</strong>{' '}
                  Die diese Website verwendende Person, die, soweit nicht anders bestimmt, mit dem Betroffenen übereinstimmt.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#f8dfa5' }}>Cookie:</strong>{' '}
                  Cookies sind Tracker, die aus einem kleinen, im Browser des Nutzers abgelegten Datensatz bestehen.
                </p>
                <p>
                  <strong style={{ color: '#f8dfa5' }}>Tracker:</strong>{' '}
                  Jede Technologie durch die Nutzer nachverfolgt werden können, z. B. indem der Zugriff auf oder die Speicherung von Informationen auf dem Nutzergerät ermöglicht wird.
                </p>
              </div>
            </div>

            {/* Letzte Aktualisierung */}
            <div style={{ 
              marginBottom: '2rem',
              padding: isMobile ? '0.75rem' : '1rem',
              background: 'rgba(248, 223, 165, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#f8dfa5',
                fontWeight: '500',
                fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '0.95rem',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Letzte Aktualisierung: 27. Januar 2025
              </p>
            </div>

            {/* Back to Home Link */}
            <div style={{ textAlign: 'center' }}>
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

export default DatenschutzPage; 