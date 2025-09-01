'use client';

import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Star, ExternalLink } from 'lucide-react';
import { walletData, faqs } from './walletData';

interface SharedSectionsProps {
  isMobile: boolean;
  isTablet: boolean;
}

// Hero Section Component
export function HeroSection({ isMobile, isTablet }: SharedSectionsProps) {
  return (
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
  );
}

// Why Own Wallet Section
export function WhyOwnWalletSection({ isMobile }: SharedSectionsProps) {
  return (
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
  );
}

// What is Wallet Section
export function WhatIsWalletSection({ isMobile }: SharedSectionsProps) {
  return (
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
  );
}

// MissCrypto Fazit Section
export function MissCryptoFazitSection({ isMobile, isTablet }: SharedSectionsProps) {
  return (
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
  );
}

// Extra Tipp Section
export function ExtraTippSection({ isMobile }: SharedSectionsProps) {
  return (
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
  );
}

// Security Tips Section
export function SecurityTipsSection({ isMobile }: SharedSectionsProps) {
  return (
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
  );
}

// FAQ Section
export function FAQSection({ isMobile }: SharedSectionsProps) {
  return (
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
  );
}

// Official Shops Section
export function OfficialShopsSection({ isMobile, isTablet }: SharedSectionsProps) {
  return (
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
            textAlign: 'center',
            position: 'relative'
          }}>
            {wallet.name === 'Tangem' && (
              <div style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.625rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                zIndex: 10
              }}>
                10% RABATT
              </div>
            )}
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
          fontSize: '0.875rem',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          💡 Die hier aufgeführten Links sind sogenannte Affiliate-Links. Wenn du über diese Links etwas kaufst, erhalte ich eine kleine Provision. Für dich entstehen dabei keine zusätzlichen Kosten – im Gegenteil: Ich versuche mit meinen Partnern exklusive Vorteile wie Rabatte oder Bonusaktionen für dich zu sichern. So unterstützt du meine Arbeit und profitierst selbst. Vielen Dank!
        </p>
      </div>
    </section>
  );
}
