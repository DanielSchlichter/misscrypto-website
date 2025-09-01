'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { walletData } from './walletData';

interface WalletComparisonProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function WalletComparison({ isMobile, isTablet }: WalletComparisonProps) {
  return (
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
            <a 
              href={walletData[0].link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                width: isMobile ? '100px' : '180px',
                height: isMobile ? '100px' : '180px',
                background: 'linear-gradient(145deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.1))',
                borderRadius: '1rem',
                padding: '0.75rem',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block'
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
            </a>

            {/* BitBox Preview */}
            <a 
              href={walletData[1].link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                width: isMobile ? '100px' : '180px',
                height: isMobile ? '100px' : '180px',
                background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
                borderRadius: '1rem',
                padding: '0.75rem',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block'
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
            </a>

            {/* Tangem Preview */}
            <a 
              href={walletData[2].link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                width: isMobile ? '100px' : '180px',
                height: isMobile ? '100px' : '180px',
                background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.1))',
                borderRadius: '1rem',
                padding: '0.75rem',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block'
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
              <div style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.5rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                -10% RABATT
              </div>
            </a>
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
  );
}
