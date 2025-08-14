'use client';

import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface BitBoxSectionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function BitBoxSection({ isMobile, isTablet }: BitBoxSectionProps) {
  return (
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
              color: '#60a5fa',
              fontWeight: '800'
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
  );
}
