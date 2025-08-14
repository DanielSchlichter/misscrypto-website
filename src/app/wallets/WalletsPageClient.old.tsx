'use client';

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Shield, Smartphone, CheckCircle, AlertTriangle, Star, ExternalLink } from 'lucide-react'

const walletData = [
  {
    name: 'Ledger',
    model: 'Nano S/X',
    manufacturer: 'Frankreich (Ledger SAS)',
    coins: '5.000+ Coins & NFTs',
    interface: 'Über Desktop & mobile App (Ledger Live), sehr komfortabel',
    security: 'Closed Source Firmware + zertifizierter Sicherheitschip',
    form: 'USB-Stick mit Display und Tasten',
    connection: 'USB oder Bluetooth (je nach Modell)',
    battery: 'Mit Akku (Nano X)',
    target: 'Nutzer mit mehreren Coins, die Komfort wollen',
    price: '79–149 €',
    backup: 'Seed Phrase',
    link: 'https://shop.ledger.com/?r=71b3',
    ideal: 'Multi-Coin-Investor, der regelmäßig zugreift',
    recommendation: 'Für mich der Allrounder. Wenn du viele verschiedene Coins hältst und Wert auf eine starke App legst, ist Ledger ideal – ich nutze ihn fast täglich.'
  },
  {
    name: 'BitBox02',
    model: '',
    manufacturer: 'Schweiz (Shift Crypto)',
    coins: 'Zwei Versionen: Bitcoin-Only ODER Bitcoin + Ethereum & ERC-20',
    interface: 'Desktop-Software, ohne Mobile-App, technischer',
    security: 'Open Source Firmware, Fokus auf Transparenz',
    form: 'USB-Stick, minimalistisch mit Touch-Sensor',
    connection: 'USB-C',
    battery: 'Ohne Akku',
    target: 'Bitcoin-Maxis & sicherheitsbewusste Nutzer',
    price: 'ca. 139 €',
    backup: 'Seed Phrase',
    link: 'https://shop.bitbox.swiss/?ref=CroetxKLi2',
    ideal: 'Bitcoin-Maximalist, Technik-Fan, Open-Source-Verfechter',
    recommendation: 'Technisch, clean, auf Sicherheit fokussiert. Wenn du Bitcoin langfristig sichern willst – oder open source bevorzugst – ist BitBox top.'
  },
  {
    name: 'Tangem',
    model: 'Wallet',
    manufacturer: 'Schweiz (Tangem AG)',
    coins: 'Über 6.000 Coins inkl. Bitcoin, Ethereum, XRP, ADA etc.',
    interface: 'Über App + Karte (NFC), mobil und super einfach',
    security: 'Closed Source, aber mit Multi-Card-Backup',
    form: 'Kreditkarte mit NFC-Chip – kein Kabel, kein Display',
    connection: 'NFC (per Smartphone)',
    battery: 'Ohne Akku – Karte wird passiv über NFC aktiviert',
    target: 'Einsteiger & Minimalisten – mobil und unkompliziert',
    price: 'ca. 50–80 € (meist im 2er- oder 3er-Pack)',
    backup: '2./3. Karte als Backup – keine Seed Phrase nötig',
    link: 'https://tangem.com/pricing/?promocode=MISSCRYPTO',
    ideal: 'Einsteiger, Minimalist, Mobile-Only-Freunde',
    recommendation: 'Die einfachste Lösung, die ich je getestet habe: Karte draufhalten, App öffnen, fertig. Perfekt für unterwegs, als Geschenk oder für Krypto-Muffel.'
  }
]

const faqs = [
  {
    question: 'Was passiert, wenn ich meine Seed Phrase verliere?',
    answer: 'Deine Seed Phrase ist der einzige Weg, deine Coins wiederherzustellen. Wenn sie weg ist, sind auch deine Coins verloren. Deshalb: immer offline, sicher und mehrfach gesichert aufbewahren.'
  },
  {
    question: 'Sollte ich mehrere Wallets nutzen?',
    answer: 'Ja – vor allem, wenn du größere Summen hältst. Ich empfehle mindestens zwei Hardware Wallets: Eine als Hauptgerät, eine als Backup – an getrennten Orten. So bist du geschützt, falls eine Wallet verloren oder beschädigt wird.'
  },
  {
    question: 'Wie bewahre ich meine Seed Phrase am besten auf?',
    answer: 'Nicht auf dem Handy. Nicht in der Cloud. Und bitte kein Screenshot! Der sicherste Weg: Handschriftlich notieren (mehrfach), Metallplatte für Langzeitspeicherung, trocken & geschützt aufbewahren – z. B. im Safe.'
  },
  {
    question: 'Was passiert, wenn ich sterbe – kommen meine Angehörigen an die Coins?',
    answer: 'Ein sensibles, aber wichtiges Thema. Du solltest dafür sorgen, dass jemand aus deiner Familie weiß: wo deine Seed Phrase liegt und wie sie zu nutzen ist. Ich arbeite gerade an einem kleinen Leitfaden zur Krypto-Vererbung.'
  },
  {
    question: 'Was passiert, wenn meine Wallet kaputt oder verloren geht?',
    answer: 'Keine Sorge – deine Coins sind nicht weg. Solange du deine Seed Phrase sicher hast, kannst du sie jederzeit auf einer neuen, kompatiblen Wallet wiederherstellen. 💡 Ich nutze selbst zwei Wallets: Eine für den Alltag, eine für den Notfall.'
  }
]

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
          padding: isMobile ? '0 1rem' : '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4rem',
            fontWeight: '300',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8dfa5 50%, #e4b15e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Krypto sicher aufbewahren: Diese Wallets empfehle ich dir
          </h1>
          <p style={{
            fontSize: isMobile ? '1.125rem' : '1.25rem',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Wer Kryptowährungen besitzt, braucht vor allem eins: Sicherheit. 
            Und die beginnt mit der richtigen Aufbewahrung – fernab von Börsen, Apps oder zentralen Plattformen.
            In diesem Ratgeber zeige ich dir, warum eine eigene Wallet so wichtig ist, welche Möglichkeiten du hast – 
            und welche Geräte ich dir aus eigener Erfahrung empfehlen kann.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        {/* Warum eigene Wallet */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.3), rgba(17, 24, 39, 0.3))',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <Shield style={{ 
              width: '2rem', 
              height: '2rem', 
              color: '#f8dfa5',
              marginRight: isMobile ? '0' : '1rem',
              marginBottom: isMobile ? '1rem' : '0'
            }} />
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0
            }}>
              Warum du deine Coins nicht nur auf der Börse lassen solltest
            </h2>
          </div>
          
          <div style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <AlertTriangle style={{ 
                width: '1.5rem', 
                height: '1.5rem', 
                color: '#f59e0b',
                marginRight: isMobile ? '0' : '1rem',
                marginBottom: isMobile ? '1rem' : '0.25rem',
                flexShrink: 0
              }} />
              <div>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  "Not your keys, not your coins" – dieser Satz fasst alles zusammen.
                </p>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Solange deine Kryptowährungen auf einer Börse liegen, gehören sie nicht wirklich dir. 
                  Die Börse verwaltet die privaten Schlüssel und kann jederzeit gehackt werden, pleite gehen 
                  oder dein Konto sperren. Eine eigene Wallet gibt dir die vollständige Kontrolle zurück.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Was ist eine Wallet */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.3), rgba(17, 24, 39, 0.3))',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '1.5rem'
          }}>
            Was ist eine Wallet überhaupt?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Eine Wallet ist dein persönlicher digitaler Tresor für Kryptowährungen. Sie verwaltet deine privaten Schlüssel 
            und ermöglicht es dir, Transaktionen zu signieren und zu versenden.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{
                fontWeight: '600',
                color: '#60a5fa',
                marginBottom: '0.5rem',
                fontSize: '1.125rem'
              }}>
                🔥 Hot Wallet
              </h3>
              <p style={{
                color: '#93c5fd',
                lineHeight: '1.6',
                margin: 0
              }}>
                Mit dem Internet verbunden – praktisch für häufige Transaktionen, aber weniger sicher.
              </p>
            </div>
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{
                fontWeight: '600',
                color: '#4ade80',
                marginBottom: '0.5rem',
                fontSize: '1.125rem'
              }}>
                ❄️ Cold Wallet
              </h3>
              <p style={{
                color: '#86efac',
                lineHeight: '1.6',
                margin: 0
              }}>
                Offline gespeichert – maximale Sicherheit für langfristige Aufbewahrung.
              </p>
            </div>
          </div>
        </section>

        {/* Wallet Vergleich */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.3), rgba(17, 24, 39, 0.3))',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          padding: isMobile ? '0.5rem' : '3rem',
          marginBottom: '3rem',
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
            background: 'radial-gradient(circle at 20% 50%, rgba(248, 223, 165, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(248, 223, 165, 0.03) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8dfa5 50%, #e4b15e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Meine Top 3 Wallets im Vergleich
              </h2>
              <p style={{
                color: '#d1d5db',
                fontSize: '1.125rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                lineHeight: '1.6'
              }}>
                Aus eigener Erfahrung getestet – hier sind die Hardware Wallets, die ich wirklich empfehlen kann
              </p>

              {/* Wallet Preview Images */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isMobile ? '1rem' : '2rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                {/* Ledger Preview */}
                <div style={{
                  position: 'relative',
                  width: isMobile ? '100px' : '180px',
                  height: isMobile ? '100px' : '180px',
                  background: 'linear-gradient(145deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.1))',
                  borderRadius: '1rem',
                  padding: '0.75rem',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <img 
                    src="/images/LNSP_4_COL_1000x1000.png"
                    alt="Ledger Nano S Plus"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-0.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(34, 197, 94, 0.9)',
                    color: '#ffffff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.625rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    Ledger
                  </div>
                </div>

                {/* BitBox Preview */}
                <div style={{
                  position: 'relative',
                  width: isMobile ? '100px' : '180px',
                  height: isMobile ? '100px' : '180px',
                  background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
                  borderRadius: '1rem',
                  padding: '0.75rem',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <img 
                    src="/images/fckpntma-rendering00001.jpg"
                    alt="BitBox02 Hardware Wallet"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-0.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(59, 130, 246, 0.9)',
                    color: '#ffffff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.625rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    BitBox02
                  </div>
                </div>

                {/* Tangem Preview */}
                <div style={{
                  position: 'relative',
                  width: isMobile ? '100px' : '180px',
                  height: isMobile ? '100px' : '180px',
                  background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.1))',
                  borderRadius: '1rem',
                  padding: '0.75rem',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(168, 85, 247, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <img 
                    src="/images/ring-5.png"
                    alt="Tangem Wallet Cards"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-0.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(168, 85, 247, 0.9)',
                    color: '#ffffff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.625rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    Tangem
                  </div>
                </div>
              </div>
            </div>
          
          {/* Mobile Cards */}
          {isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {walletData.map((wallet, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(145deg, rgba(75, 85, 99, 0.8), rgba(55, 65, 81, 0.6))',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  width: '100%',
                  maxWidth: 'none'
                }}>
                  {/* Card Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: `radial-gradient(circle, ${index === 0 ? 'rgba(34, 197, 94, 0.1)' : index === 1 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(168, 85, 247, 0.1)'} 0%, transparent 70%)`,
                    pointerEvents: 'none'
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                        color: '#1a1a1a',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        alignSelf: 'flex-start',
                        marginTop: '-1rem',
                        marginBottom: '0.5rem'
                      }}>
                        {wallet.price}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.375rem',
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8dfa5 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {wallet.name}
                        </h3>
                        {wallet.model && (
                          <p style={{
                            fontSize: '0.875rem',
                            color: '#9ca3af',
                            margin: 0
                          }}>
                            {wallet.model}
                          </p>
                        )}
                      </div>
                    </div>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>🏢 Hersteller:</span> {wallet.manufacturer}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>🪙 Coins:</span> {wallet.coins}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>📱 Bedienung:</span> {wallet.interface}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>🔐 Sicherheit:</span> {wallet.security}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>💾 Form:</span> {wallet.form}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>🔌 Verbindung:</span> {wallet.connection}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>🔋 Akku:</span> {wallet.battery}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500' }}>💬 Zielgruppe:</span> {wallet.target}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontWeight: '500' }}>🌍 Backup:</span> {wallet.backup}
                    </div>
                  </div>
                  <div style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(156, 163, 175, 0.3)'
                  }}>
                    <a 
                      href={wallet.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                        color: '#1a1a1a',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Zum Shop <ExternalLink style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }} />
                    </a>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop Table - Modern */}
          {!isMobile && (
            <div style={{ 
              overflowX: 'auto',
              background: 'linear-gradient(145deg, rgba(75, 85, 99, 0.4), rgba(55, 65, 81, 0.2))',
              borderRadius: '1rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(248, 223, 165, 0.1)'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'separate',
                borderSpacing: '0',
                background: 'transparent'
              }}>
                <thead>
                  <tr style={{ 
                    background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(75, 85, 99, 0.6))',
                    borderRadius: '0.75rem'
                  }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '1.25rem 1rem',
                      fontWeight: '700',
                      fontSize: '1rem',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8dfa5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      borderTopLeftRadius: '0.75rem',
                      borderBottomLeftRadius: '0.75rem'
                    }}>
                      Eigenschaft
                    </th>
                    {walletData.map((wallet, index) => (
                      <th key={index} style={{
                        textAlign: 'center',
                        padding: '1.25rem 1rem',
                        fontWeight: '700',
                        fontSize: '1.125rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8dfa5 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        borderTopRightRadius: index === walletData.length - 1 ? '0.75rem' : '0',
                        borderBottomRightRadius: index === walletData.length - 1 ? '0.75rem' : '0',
                        position: 'relative'
                      }}>
                        <div style={{ marginBottom: '0.25rem' }}>{wallet.name}</div>
                        {wallet.model && (
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            fontWeight: '400'
                          }}>
                            {wallet.model}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.875rem' }}>
                  {[
                    { label: '🏢 Hersteller', key: 'manufacturer', color: '#f8dfa5' },
                    { label: '🪙 Unterstützte Coins', key: 'coins', color: '#10b981' },
                    { label: '📱 Bedienung', key: 'interface', color: '#3b82f6' },
                    { label: '🔐 Sicherheitsmodell', key: 'security', color: '#8b5cf6' },
                    { label: '💾 Physische Form', key: 'form', color: '#f59e0b' },
                    { label: '🔌 Verbindung', key: 'connection', color: '#06b6d4' },
                    { label: '🔋 Akku/Spannung', key: 'battery', color: '#84cc16' },
                    { label: '💬 Zielgruppe', key: 'target', color: '#ec4899' },
                    { label: '💰 Preis', key: 'price', color: '#f97316' },
                    { label: '🌍 Backup & Wiederherstellung', key: 'backup', color: '#6366f1' }
                  ].map((row, rowIndex) => (
                    <tr key={rowIndex} style={{
                      background: rowIndex % 2 === 0 
                        ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.4), rgba(75, 85, 99, 0.2))' 
                        : 'linear-gradient(135deg, rgba(75, 85, 99, 0.2), rgba(55, 65, 81, 0.4))',
                      transition: 'all 0.3s ease'
                    }} onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(75, 85, 99, 0.3))';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.background = rowIndex % 2 === 0 
                        ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.4), rgba(75, 85, 99, 0.2))' 
                        : 'linear-gradient(135deg, rgba(75, 85, 99, 0.2), rgba(55, 65, 81, 0.4))';
                    }}>
                      <td style={{
                        padding: '1rem',
                        fontWeight: '600',
                        color: row.color,
                        borderLeft: `3px solid ${row.color}`,
                        fontSize: '0.9rem'
                      }}>
                        {row.label}
                      </td>
                      {walletData.map((wallet, colIndex) => (
                        <td key={colIndex} style={{
                          padding: '1rem',
                          textAlign: 'center',
                          color: '#d1d5db',
                          fontSize: '0.85rem',
                          lineHeight: '1.4',
                          verticalAlign: 'top'
                        }}>
                          {wallet[row.key as keyof typeof wallet]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ 
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(75, 85, 99, 0.4))',
                    borderTop: '2px solid rgba(248, 223, 165, 0.3)'
                  }}>
                    <td style={{
                      padding: '1.5rem 1rem',
                      fontWeight: '700',
                      color: '#f8dfa5',
                      borderLeft: '3px solid #f8dfa5',
                      fontSize: '1rem'
                    }}>
                      🛒 Shop
                    </td>
                    {walletData.map((wallet, index) => (
                      <td key={index} style={{
                        padding: '1.5rem 1rem',
                        textAlign: 'center'
                      }}>
                        <a 
                          href={wallet.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                            color: '#1a1a1a',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            fontWeight: '700',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 16px rgba(248, 223, 165, 0.3)',
                            border: '2px solid transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 223, 165, 0.5)';
                            e.currentTarget.style.borderColor = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0px)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(248, 223, 165, 0.3)';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          Zum Shop <ExternalLink style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }} />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          </div>
        </section>

        {/* Ledger Feature Highlight */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1))',
          borderRadius: '1.5rem',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem',
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
            background: 'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(22, 163, 74, 0.08) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{ 
            position: 'relative', 
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center'
          }}>
            {/* Text Content */}
            <div style={{ order: isMobile ? 2 : 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                borderRadius: '2rem',
                padding: '0.5rem 1rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#4ade80' 
                }}>
                  🇫🇷 French Innovation • Market Leader
                </span>
              </div>

              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Ledger: Der <span style={{
                  color: '#4ade80',
                  fontWeight: '800'
                }}>Allrounder</span> für alle Coins
              </h2>

              <p style={{
                color: '#d1d5db',
                fontSize: '1.125rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Der Ledger ist mein täglicher Begleiter für über 5.000 Coins und NFTs. 
                Mit der erstklassigen Ledger Live App und jahrelanger Erfahrung ist er 
                perfekt für Multi-Coin-Investoren, die Komfort und Sicherheit vereinen wollen.
              </p>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>5.000+ Coins:</strong> Bitcoin, Ethereum, Altcoins & NFTs
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Ledger Live App:</strong> Erstklassige Desktop & Mobile Experience
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Bluetooth Option:</strong> Kabellos mit Nano X nutzen
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Market Leader:</strong> Millionen vertrauen weltweit auf Ledger
                  </span>
                </div>
              </div>

              <a 
                href="https://shop.ledger.com/?r=71b3"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #22c55e, #15803d)',
                  color: '#ffffff',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(34, 197, 94, 0.5)';
                  e.currentTarget.style.borderColor = '#4ade80';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                Ledger kaufen <ExternalLink style={{ marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem' }} />
              </a>
            </div>

            {/* Images Section - Overlapping Layout */}
            <div style={{ 
              order: isMobile ? 1 : 2,
              position: 'relative',
              height: isMobile ? '500px' : '600px',
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
                             {/* Multiple Ledger Models - Top Left */}
               <div style={{
                 position: 'absolute',
                 top: '0',
                 left: isMobile ? '-5%' : '0',
                 width: isMobile ? '85%' : '65%',
                zIndex: 2,
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                borderRadius: '1.5rem',
                padding: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                transform: 'rotate(-3deg)'
              }}>
                <img 
                  src="/images/LNSP_4_COL_1000x1000.png"
                  alt="Ledger Nano S Plus in verschiedenen Farben"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(34, 197, 94, 0.9)',
                  color: '#ffffff',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  Nano S Plus
                </div>
              </div>

                             {/* Black Ledger Models - Bottom Right */}
               <div style={{
                 position: 'absolute',
                 bottom: '0',
                 right: isMobile ? '-5%' : '0',
                 width: isMobile ? '85%' : '70%',
                zIndex: 1,
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(15px)',
                transform: 'rotate(2deg)',
                overflow: 'hidden'
              }}>
                {/* Background Pattern für Hardware */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
                
                <img 
                  src="/images/LNX_4_COL_BLACK_1000x1000.png"
                  alt="Ledger Nano X - Premium Bitcoin & Crypto Hardware Wallet"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(22, 163, 74, 0.9))',
                  color: '#ffffff',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
                  zIndex: 10
                }}>
                  🇫🇷 Nano X Premium
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BitBox Feature Highlight */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1))',
          borderRadius: '1.5rem',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem',
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
            background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{ 
            position: 'relative', 
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center'
          }}>
            {/* Text Content */}
            <div style={{ order: isMobile ? 2 : 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '2rem',
                padding: '0.5rem 1rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#60a5fa' 
                }}>
                  🇨🇭 Swiss Made • Open Source
                </span>
              </div>

              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                BitBox02: Bitcoin-Sicherheit <span style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>aus der Schweiz</span>
              </h2>

              <p style={{
                color: '#d1d5db',
                fontSize: '1.125rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Die BitBox02 verbindet minimalistisches Design mit maximaler Sicherheit. 
                Komplett Open Source, in der Schweiz entwickelt – für alle, die Bitcoin 
                und Ethereum langfristig und sicher aufbewahren wollen.
              </p>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Open Source:</strong> Vollständig transparenter Code
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Bitcoin-Only Version:</strong> Speziell für Bitcoin-Maximalisten
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Touch-Sensor:</strong> Intuitive Bedienung ohne komplexe Tasten
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Swiss Quality:</strong> Entwickelt und produziert in der Schweiz
                  </span>
                </div>
              </div>

              <a 
                href="https://shop.bitbox.swiss/?ref=CroetxKLi2"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                  color: '#ffffff',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.5)';
                  e.currentTarget.style.borderColor = '#60a5fa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                BitBox02 kaufen <ExternalLink style={{ marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem' }} />
              </a>
            </div>

            {/* Images Section - Overlapping Layout */}
            <div style={{ 
              order: isMobile ? 1 : 2,
              position: 'relative',
              height: isMobile ? '500px' : '600px',
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {/* App Interface Image - Top Left */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: isMobile ? '-10%' : '0',
                width: isMobile ? '90%' : '65%',
                zIndex: 2,
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                borderRadius: '1.5rem',
                padding: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                transform: 'rotate(-5deg)'
              }}>
                <img 
                  src="/images/afnpfruq-rendering00027.jpg"
                  alt="BitBox02 App Interface mit Portfolio-Übersicht"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(59, 130, 246, 0.9)',
                  color: '#ffffff',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  Software
                </div>
              </div>

              {/* Hardware Image - Bottom Right */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                right: isMobile ? '-10%' : '0',
                width: isMobile ? '90%' : '70%',
                zIndex: 1,
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(15px)',
                transform: 'rotate(3deg)',
                overflow: 'hidden'
              }}>
                {/* Background Pattern für Hardware */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
                
                <img 
                  src="/images/fckpntma-rendering00001.jpg"
                  alt="BitBox02 Hardware Wallet - Swiss Engineering"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(37, 99, 235, 0.9))',
                  color: '#ffffff',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                  zIndex: 10
                }}>
                  🇨🇭 Swiss Engineering
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tangem Feature Highlight */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(147, 51, 234, 0.1))',
          borderRadius: '1.5rem',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem',
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
            background: 'radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{ 
            position: 'relative', 
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center'
          }}>
            {/* Text Content */}
            <div style={{ order: isMobile ? 2 : 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(168, 85, 247, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: '2rem',
                padding: '0.5rem 1rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#c084fc' 
                }}>
                  🇨🇭 Swiss Innovation • NFC Technology
                </span>
              </div>

              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Tangem: Der <span style={{
                  color: '#c084fc',
                  fontWeight: '800'
                }}>Minimalist</span> für unterwegs
              </h2>

              <p style={{
                color: '#d1d5db',
                fontSize: '1.125rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Die einfachste Krypto-Wallet, die ich je getestet habe: Karte draufhalten, 
                App öffnen, fertig. Perfekt für Einsteiger, als Geschenk oder für alle, 
                die Krypto unkompliziert mobil nutzen wollen.
              </p>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>NFC Technology:</strong> Kein Kabel, kein Display - nur NFC
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Card Backup:</strong> 2./3. Karte als Backup - keine Seed Phrase
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Mobile First:</strong> Optimiert für Smartphone-Nutzung
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                  <span style={{ color: '#e5e7eb', fontSize: '1rem' }}>
                    <strong>Einsteiger-freundlich:</strong> Einfachste Bedienung am Markt
                  </span>
                </div>
              </div>

              <a 
                href="https://tangem.com/pricing/?promocode=MISSCRYPTO"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  color: '#ffffff',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(168, 85, 247, 0.5)';
                  e.currentTarget.style.borderColor = '#c084fc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.3)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                Tangem kaufen <ExternalLink style={{ marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem' }} />
              </a>
            </div>

            {/* Images Section - Overlapping Layout */}
            <div style={{ 
              order: isMobile ? 1 : 2,
              position: 'relative',
              height: isMobile ? '500px' : '600px',
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {/* App Interface with NFC Ring - Top Left */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: isMobile ? '-8%' : '0',
                width: isMobile ? '88%' : '65%',
                zIndex: 2,
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                borderRadius: '1.5rem',
                padding: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                transform: 'rotate(-2deg)'
              }}>
                <img 
                  src="/images/img_01JAZ92V5VY1M06RSGA42YM63Y.webp"
                  alt="Tangem App mit NFC Ring - Mobile Wallet Interface"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(168, 85, 247, 0.9)',
                  color: '#ffffff',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                  NFC App
                </div>
              </div>

              {/* Tangem Cards - Bottom Right */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                right: isMobile ? '-8%' : '0',
                width: isMobile ? '88%' : '70%',
                zIndex: 1,
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(15px)',
                transform: 'rotate(1deg)',
                overflow: 'hidden'
              }}>
                {/* Background Pattern für Hardware */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
                
                <img 
                  src="/images/ring-5.png"
                  alt="Tangem Wallet Karten - NFC Hardware Wallets"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(147, 51, 234, 0.9))',
                  color: '#ffffff',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                  zIndex: 10
                }}>
                  🇨🇭 Card Wallet
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MissCrypto Fazit */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            MissCrypto Fazit
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {walletData.map((wallet, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <Star style={{ 
                    width: '1.5rem', 
                    height: '1.5rem', 
                    color: '#fbbf24',
                    marginRight: '0.5rem'
                  }} />
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#f8dfa5',
                    margin: 0
                  }}>
                    {wallet.name}
                  </h3>
                </div>
                <p style={{
                  color: '#d1d5db',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  "{wallet.recommendation}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Extra Tipp */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.3), rgba(17, 24, 39, 0.3))',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '1.5rem'
          }}>
            MissCrypto's Extra-Tipp: Für wen ist welches Wallet ideal?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {walletData.map((wallet, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(55, 65, 81, 0.5)',
                borderRadius: '0.5rem',
                flexDirection: isMobile ? 'column' : 'row',
                textAlign: isMobile ? 'center' : 'left',
                gap: isMobile ? '0.5rem' : '0'
              }}>
                <span style={{
                  fontWeight: '600',
                  color: '#f8dfa5'
                }}>
                  {wallet.name}
                </span>
                <span style={{
                  color: '#d1d5db'
                }}>
                  {wallet.ideal}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sicherheitstipps */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.3), rgba(17, 24, 39, 0.3))',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '2rem'
          }}>
            So schützt du deine Coins richtig
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <CheckCircle style={{ 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  color: '#10b981',
                  marginRight: '0.75rem',
                  marginTop: '0.125rem',
                  flexShrink: 0
                }} />
                <div>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontSize: '1.125rem'
                  }}>
                    Seed Phrase sichern
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Am besten offline, mehrfach, nie digital!
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <CheckCircle style={{ 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  color: '#10b981',
                  marginRight: '0.75rem',
                  marginTop: '0.125rem',
                  flexShrink: 0
                }} />
                <div>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontSize: '1.125rem'
                  }}>
                    Kein Screenshot, keine Cloud
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Niemals digital speichern oder fotografieren
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <CheckCircle style={{ 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  color: '#10b981',
                  marginRight: '0.75rem',
                  marginTop: '0.125rem',
                  flexShrink: 0
                }} />
                <div>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontSize: '1.125rem'
                  }}>
                    Sicherer Verwahrungsort
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Tresor, Bankschließfach oder Metallplatte
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <CheckCircle style={{ 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  color: '#10b981',
                  marginRight: '0.75rem',
                  marginTop: '0.125rem',
                  flexShrink: 0
                }} />
                <div>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontSize: '1.125rem'
                  }}>
                    Backup-Strategie
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    3-2-1-Prinzip: 3 Kopien, 2 verschiedene Medien, 1 extern
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <CheckCircle style={{ 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  color: '#10b981',
                  marginRight: '0.75rem',
                  marginTop: '0.125rem',
                  flexShrink: 0
                }} />
                <div>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontSize: '1.125rem'
                  }}>
                    Recovery testen
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Evtl. mit Test-Wallet starten und Wiederherstellung üben
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.3), rgba(17, 24, 39, 0.3))',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '2rem'
          }}>
            🛟 Häufige Fragen zur Wallet-Sicherheit
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                paddingBottom: '1.5rem',
                borderBottom: index < faqs.length - 1 ? '1px solid rgba(156, 163, 175, 0.3)' : 'none'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}>
                  {faq.question}
                </h3>
                <p style={{
                  color: '#9ca3af',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Offizielle Shops */}
        <section style={{
          background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
          borderRadius: '1rem',
          padding: isMobile ? '2rem' : '3rem',
          color: '#1a1a1a',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '600',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Offizielle Shops
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {walletData.map((wallet, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  {wallet.name}
                </h3>
                <a 
                  href={wallet.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    color: '#1a1a1a',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🔗 Zum {wallet.name} Shop <ExternalLink style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }} />
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{
              color: 'rgba(26, 26, 26, 0.7)',
              fontSize: '0.875rem'
            }}>
              💡 Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. 
              Für dich entstehen keine zusätzlichen Kosten.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
} 