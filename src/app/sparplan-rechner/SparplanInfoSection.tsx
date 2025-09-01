'use client';

import React from 'react';

interface SparplanInfoSectionProps {
  isMobile: boolean;
  isTablet: boolean;
}

const SparplanInfoSection: React.FC<SparplanInfoSectionProps> = ({ isMobile, isTablet }) => {
  return (
    <section style={{
      padding: '3rem 0',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2rem' : '3rem',
          position: 'relative'
        }}>
          
          {/* Mobile Inhaltsverzeichnis - nur auf mobilen Geräten über dem Inhalt */}
          {isMobile && (
            <div style={{
              background: 'linear-gradient(135deg, rgb(26, 26, 46) 0%, rgb(22, 33, 62) 25%, rgb(15, 23, 42) 50%, rgb(30, 41, 59) 75%, rgb(51, 65, 85) 100%)',
              border: '2px solid rgba(248, 223, 165, 0.4)',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: 'rgba(0, 0, 0, 0.3) 0px 10px 25px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(248, 223, 165, 0.3)'
              }}>
                <div style={{ fontSize: '1.2rem' }}>📋</div>
                <h3 style={{
                  color: 'rgb(248, 223, 165)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: '0px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Inhaltsverzeichnis</h3>
              </div>
              <nav>
                <ul style={{
                  listStyle: 'none',
                  margin: '0px',
                  padding: '0px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem'
                }}>
                  <li>
                    <a href="#krypto-sparplan-info" style={{
                      color: 'rgb(248, 223, 165)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      display: 'block',
                      padding: '0.75rem',
                      background: 'rgba(248, 223, 165, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      transition: '0.3s'
                    }}>
                      1. Was ist ein Krypto-Sparplan?
                    </a>
                  </li>
                  <li>
                    <a href="#dca-erklaerung" style={{
                      color: 'rgb(209, 213, 219)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      display: 'block',
                      padding: '0.75rem',
                      background: 'rgba(248, 223, 165, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      transition: '0.3s'
                    }}>
                      2. Dollar-Cost-Averaging (DCA)
                    </a>
                  </li>
                  <li>
                    <a href="#beispiel-1-bitcoin" style={{
                      color: 'rgb(209, 213, 219)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      display: 'block',
                      padding: '0.75rem',
                      background: 'rgba(248, 223, 165, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      transition: '0.3s'
                    }}>
                      3. Beispiel: Weg zu 1 Bitcoin
                    </a>
                  </li>
                  <li>
                    <a href="#warum-sparplan-sinnvoll" style={{
                      color: 'rgb(209, 213, 219)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      display: 'block',
                      padding: '0.75rem',
                      background: 'rgba(248, 223, 165, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      transition: '0.3s'
                    }}>
                      4. Warum ein Sparplan sinnvoll ist
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
          
          <div style={{
            flex: '1 1 0%',
            maxWidth: isMobile ? '100%' : '800px'
          }}>
            <section id="krypto-sparplan-info" style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: isMobile ? '40px' : '60px',
                  height: isMobile ? '40px' : '60px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  fontWeight: 'bold',
                  color: 'rgb(26, 26, 46)'
                }}>📊</div>
                <h2 style={{
                  color: 'rgb(255, 255, 255)',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  margin: '0px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Was ist ein Krypto-Sparplan?</h2>
              </div>
              <div style={{
                color: 'rgb(209, 213, 219)',
                fontSize: '1rem',
                lineHeight: '1.7'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Ein Krypto-Sparplan ist eine besonders einfache und beliebte Möglichkeit, in Bitcoin oder andere Kryptowährungen zu investieren. Anstatt einmalig eine große Summe auf den Markt zu werfen, investierst du regelmäßig einen festen Betrag – zum Beispiel 50 €, 100 € oder 250 € pro Monat. Das Ganze läuft automatisiert, du musst dich also nicht ständig um Kurse, Ein- und Ausstiege kümmern.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Der große Vorteil eines Sparplans liegt in seiner Einfachheit und Disziplin. Gerade Einsteiger im Krypto-Investieren profitieren davon, weil sie nicht in die typische Falle tappen, ständig nach dem „perfekten" Zeitpunkt zu suchen. Ein Sparplan nimmt dir diese Entscheidung ab: Es wird immer zu einem festen Termin gekauft, egal ob der Bitcoin-Kurs gerade hoch oder niedrig steht.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Dadurch entsteht langfristig ein gleichmäßiger Vermögensaufbau. Viele Anleger vergleichen einen Bitcoin-Sparplan mit klassischen ETF-Sparplänen, die schon seit Jahren erfolgreich genutzt werden. Der Ansatz ist derselbe – nur dass es hier um digitale Assets wie Bitcoin oder Ethereum geht.
                </p>
              </div>
            </section>

            <section id="dca-erklaerung" style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: isMobile ? '40px' : '60px',
                  height: isMobile ? '40px' : '60px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  fontWeight: 'bold',
                  color: 'rgb(26, 26, 46)'
                }}>📈</div>
                <h2 style={{
                  color: 'rgb(255, 255, 255)',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  margin: '0px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Dollar-Cost-Averaging (DCA) erklärt</h2>
              </div>
              <div style={{
                color: 'rgb(209, 213, 219)',
                fontSize: '1rem',
                lineHeight: '1.7'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Der Fachbegriff hinter einem Sparplan lautet Dollar-Cost-Averaging (DCA). Die Strategie bedeutet, dass du in regelmäßigen Abständen mit einem festen Betrag investierst, unabhängig davon, wie der Markt gerade steht.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Nehmen wir ein Beispiel: Du kaufst monatlich für 100 € Bitcoin. Mal liegt der Kurs bei 70.000 €, mal bei 90.000 €, mal vielleicht bei 98.000 €. Dadurch erhältst du unterschiedlich viele Satoshis (die kleinste Einheit von Bitcoin). Auf lange Sicht ergibt sich so ein Durchschnittspreis, der oft günstiger ist, als wenn du zu einem einzigen Zeitpunkt gekauft hättest.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Das Prinzip DCA ist besonders im volatilen Krypto-Markt sinnvoll, da starke Schwankungen die Regel sind. Während Market Timing – also der Versuch, den perfekten Kauf- und Verkaufszeitpunkt zu treffen – selbst für Profis extrem schwer ist, nimmt dir DCA diese Last ab. Du setzt auf eine disziplinierte, langfristige Investmentstrategie, die sich schon in klassischen Märkten wie Aktien und ETFs bewährt hat.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Viele erfahrene Bitcoin-Investoren schwören auf DCA, weil es das Risiko von Fehlentscheidungen minimiert und eine verlässliche Struktur in den eigenen Vermögensaufbau bringt.
                </p>
              </div>
            </section>

            <section id="beispiel-1-bitcoin" style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: isMobile ? '40px' : '60px',
                  height: isMobile ? '40px' : '60px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  fontWeight: 'bold',
                  color: 'rgb(26, 26, 46)'
                }}>🎯</div>
                <h2 style={{
                  color: 'rgb(255, 255, 255)',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  margin: '0px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Beispiel: Dein Weg zu 1 Bitcoin</h2>
              </div>
              <div style={{
                color: 'rgb(209, 213, 219)',
                fontSize: '1rem',
                lineHeight: '1.7'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Viele Neueinsteiger im Krypto-Markt denken, dass es längst zu spät ist, um noch Bitcoin zu kaufen. 1 ganzer Bitcoin liegt heute bei sechsstelligen Summen – und wirkt für viele unerreichbar. Doch die gute Nachricht ist: Du musst nicht sofort 1 BTC besitzen. Denn jeder Satoshi zählt.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Ein Satoshi ist die kleinste Einheit von Bitcoin. Ein Bitcoin besteht aus 100 Millionen Satoshis. Mit einem Krypto-Sparplan kannst du regelmäßig investieren – zum Beispiel 50 €, 100 € oder 500 € im Monat – und dir Monat für Monat mehr Satoshis sichern. Mal sind es weniger, wenn der Kurs hoch ist, mal mehr, wenn der Kurs gefallen ist. Durch den Cost-Average-Effekt (DCA) ergibt sich über die Zeit ein fairer Durchschnittspreis.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Das Schöne daran: Jeder Kauf bringt dich deinem Ziel näher, egal ob du langfristig 0,01 BTC, 0,1 BTC oder vielleicht sogar 1 ganzen Bitcoin aufbauen möchtest. Mit einem Sparplan sammelst du automatisch Satoshis, ohne dich von kurzfristigen Kursschwankungen stressen zu lassen.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Die Strategie ist nicht nur einfach und diszipliniert, sondern auch psychologisch entspannend. Du musst nicht versuchen, den perfekten Zeitpunkt zu erwischen – du bist immer investiert. Und am Ende zeigt die Erfahrung: Es sind oft die stetigen, kleinen Schritte, die zu großem Erfolg führen.
                </p>
              </div>
            </section>

            <section id="warum-sparplan-sinnvoll" style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: isMobile ? '40px' : '60px',
                  height: isMobile ? '40px' : '60px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  fontWeight: 'bold',
                  color: 'rgb(26, 26, 46)'
                }}>💡</div>
                <h2 style={{
                  color: 'rgb(255, 255, 255)',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  margin: '0px',
                  background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Warum ein Krypto-Sparplan sinnvoll ist</h2>
              </div>
              <div style={{
                color: 'rgb(209, 213, 219)',
                fontSize: '1rem',
                lineHeight: '1.7'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Ein Sparplan bringt Ruhe in deinen Krypto-Alltag – und langfristig oft die besseren Ergebnisse. Hier sind die wichtigsten Vorteile:
                </p>
                
                <div style={{
                  background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  margin: '2rem 0px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                    color: 'rgb(26, 26, 46)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    Vorteile
                  </div>
                  
                  <div style={{
                    color: 'rgb(209, 213, 219)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6'
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: 'rgb(248, 223, 165)' }}>1. Automatisch mal günstig, mal teurer – im Schnitt aber stabil.</strong><br />
                      Durch regelmäßige Käufe profitierst du von den Marktschwankungen, ohne den perfekten Zeitpunkt erwischen zu müssen.
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: 'rgb(248, 223, 165)' }}>2. Schon mit kleinen Beträgen möglich</strong><br />
                      Du brauchst kein großes Kapital. Ein Sparplan funktioniert schon ab 25€ im Monat – ideal für Einsteiger.
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: 'rgb(248, 223, 165)' }}>3. Automatisch & zeitsparend</strong><br />
                      Einmal eingerichtet, läuft dein Sparplan automatisch im Hintergrund. Kein Stress mit täglichen Kursbewegungen.
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: 'rgb(248, 223, 165)' }}>4. Disziplin & Langfristigkeit</strong><br />
                      Du bleibst dran – ohne Emotionen oder Panikverkäufe. Und das ist oft der Schlüssel zu echten Vermögenszuwächsen.
                    </div>
                    <div style={{ marginBottom: '0' }}>
                      <strong style={{ color: 'rgb(248, 223, 165)' }}>5. Perfekt für volatile Märkte wie Krypto</strong><br />
                      Gerade in einem schwankenden Markt wie bei Bitcoin & Ethereum ist der Durchschnittskosteneffekt besonders wertvoll.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Desktop Inhaltsverzeichnis - nur auf Desktop/Tablet sichtbar */}
          {!isMobile && (
            <div style={{
              width: '240px',
              position: 'sticky',
              top: '120px',
              height: 'fit-content',
              flexShrink: '0'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgb(26, 26, 46) 0%, rgb(22, 33, 62) 25%, rgb(15, 23, 42) 50%, rgb(30, 41, 59) 75%, rgb(51, 65, 85) 100%)',
                border: '2px solid rgba(248, 223, 165, 0.4)',
                borderRadius: '12px',
                padding: '0.875rem',
                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 10px 25px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid rgba(248, 223, 165, 0.3)'
                }}>
                  <div style={{ fontSize: '1.2rem' }}>📋</div>
                  <h3 style={{
                    color: 'rgb(248, 223, 165)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0px',
                    background: 'linear-gradient(135deg, rgb(248, 223, 165), rgb(228, 177, 94))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>Inhaltsverzeichnis</h3>
                </div>
                <nav>
                  <ul style={{
                    listStyle: 'none',
                    margin: '0px',
                    padding: '0px'
                  }}>
                    <li style={{ marginBottom: '0.75rem' }}>
                      <a href="#krypto-sparplan-info" style={{
                        color: 'rgb(248, 223, 165)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        lineHeight: '1.4',
                        display: 'block',
                        padding: '0.5rem 0px 0.5rem 1rem',
                        marginLeft: '-1rem',
                        borderLeft: '3px solid rgb(248, 223, 165)',
                        transition: '0.3s'
                      }}>
                        1. Was ist ein Krypto-Sparplan?
                      </a>
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                      <a href="#dca-erklaerung" style={{
                        color: 'rgb(209, 213, 219)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        lineHeight: '1.4',
                        display: 'block',
                        padding: '0.5rem 0px 0.5rem 1rem',
                        marginLeft: '-1rem',
                        borderLeft: '3px solid transparent',
                        transition: '0.3s'
                      }}>
                        2. Dollar-Cost-Averaging (DCA)
                      </a>
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                      <a href="#beispiel-1-bitcoin" style={{
                        color: 'rgb(209, 213, 219)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        lineHeight: '1.4',
                        display: 'block',
                        padding: '0.5rem 0px 0.5rem 1rem',
                        marginLeft: '-1rem',
                        borderLeft: '3px solid transparent',
                        transition: '0.3s'
                      }}>
                        3. Beispiel: Weg zu 1 Bitcoin
                      </a>
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                      <a href="#warum-sparplan-sinnvoll" style={{
                        color: 'rgb(209, 213, 165)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        lineHeight: '1.4',
                        display: 'block',
                        padding: '0.5rem 0px 0.5rem 1rem',
                        marginLeft: '-1rem',
                        borderLeft: '3px solid transparent',
                        transition: '0.3s'
                      }}>
                        4. Warum ein Sparplan sinnvoll ist
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SparplanInfoSection;
