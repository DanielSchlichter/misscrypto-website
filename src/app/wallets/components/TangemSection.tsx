'use client';

import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface TangemSectionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function TangemSection({ isMobile, isTablet }: TangemSectionProps) {
  return (
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
  );
}
