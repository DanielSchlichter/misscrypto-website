'use client';

import React, { useState } from 'react';

interface WenLamboCalculatorProps {
  isMobile: boolean;
  isTablet: boolean;
}

const WenLamboCalculator: React.FC<WenLamboCalculatorProps> = ({ isMobile, isTablet }) => {
  const [investment, setInvestment] = useState<number>(5000);
  const [multiplier, setMultiplier] = useState<number>(30);
  
  const lamboPrice = 350000;
  const requiredMultiplier = (lamboPrice / investment);
  const finalValue = investment * multiplier;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #000000, #1a1a1a)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(248, 223, 165, 0.3)',
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
        background: 'radial-gradient(circle at 20% 20%, rgba(248, 223, 165, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(248, 223, 165, 0.03) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            fontSize: '1.25rem'
          }}>🏎️</div>
          <h3 style={{
            color: '#f8dfa5',
            fontSize: '1rem',
            fontWeight: '700',
            margin: 0,
            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Lambo-Rechner
          </h3>
        </div>
        
        <div style={{
          color: '#9ca3af',
          fontSize: '0.8rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Wie viel x muss mein Investment machen?
        </div>
        
        {/* Investment Input */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(228, 177, 94, 0.08))',
              border: '2px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              textAlign: 'center',
              minWidth: '120px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(248, 223, 165, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#f8dfa5',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%',
                  outline: 'none'
                }}
              />
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600' }}>
                Euro
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#f8dfa5',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              ×
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(228, 177, 94, 0.08))',
              border: '2px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              textAlign: 'center',
              minWidth: '140px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(248, 223, 165, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <input
                type="number"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#f8dfa5',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%',
                  outline: 'none'
                }}
              />
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600' }}>
                fach
              </div>
            </div>
          </div>
        </div>
        
        {/* Equals Sign */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{
            color: '#f8dfa5',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            =
          </div>
        </div>
        
        {/* Result */}
        <div style={{
          background: finalValue >= lamboPrice 
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(34, 197, 94, 0.08))'
            : 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(228, 177, 94, 0.08))',
          border: finalValue >= lamboPrice 
            ? '2px solid rgba(16, 185, 129, 0.4)'
            : '2px solid rgba(248, 223, 165, 0.4)',
          borderRadius: '16px',
          padding: '1.25rem',
          textAlign: 'center',
          marginBottom: '1rem',
          boxShadow: finalValue >= lamboPrice 
            ? '0 10px 30px rgba(16, 185, 129, 0.2)'
            : '0 10px 30px rgba(248, 223, 165, 0.1)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            color: finalValue >= lamboPrice ? '#10b981' : '#f8dfa5',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            {finalValue.toLocaleString('de-DE')} €
          </div>
          
          {/* Lambo Image */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '0.5rem'
          }}>
            <img 
              src="/images/Lambo.png" 
              alt="Lamborghini" 
              style={{
                height: '60px',
                objectFit: 'contain',
                filter: finalValue >= lamboPrice ? 'brightness(1)' : 'brightness(0.7) grayscale(0.3)'
              }}
            />
          </div>
          
          {/* Disclaimer */}
          <div style={{
            fontSize: '0.7rem',
            color: '#9ca3af',
            textAlign: 'center',
            fontStyle: 'italic',
            marginBottom: '0.75rem'
          }}>
            *Unterhaltungstool. Keine Anlageberatung. Werte sind Modellrechnungen und können erheblich abweichen.
          </div>
          
          {finalValue >= lamboPrice ? (
            <div style={{
              color: '#10b981',
              fontSize: '1.25rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              animation: 'pulse 2s infinite'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🏎️</span>
              Lambo erreicht!
              <span style={{ fontSize: '1.5rem' }}>🎉</span>
            </div>
          ) : (
            <div style={{
              color: '#9ca3af',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Noch {((lamboPrice - finalValue) / 1000).toFixed(0)}k € bis zum Lambo
            </div>
          )}
        </div>
        
        {/* Info Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(26, 26, 26, 0.8))',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              Ein Lambo kostet
            </div>
            <div style={{
              color: '#ffffff',
              fontSize: '1.125rem',
              fontWeight: 'bold'
            }}>
              350.000 €
            </div>
          </div>
          
          <div style={{
            height: '1px',
            background: 'rgba(248, 223, 165, 0.2)',
            marginBottom: '0.75rem'
          }}></div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              Du brauchst
            </div>
            <div style={{
              color: '#f8dfa5',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {Math.round(requiredMultiplier)}x
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WenLamboCalculator;
