'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Calculator, Euro, BarChart3, Target, Shield } from 'lucide-react';

interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

interface SparplanResult {
  totalInvested: number;
  totalValue: number;
  totalReturn: number;
  returnPercentage: number;
  coinAmount: number;
}

const WenLamboCalculator = () => {
  const [investment, setInvestment] = useState<number>(5000);
  const [multiplier, setMultiplier] = useState<number>(30);
  
  const lamboPrice = 350000;
  const requiredMultiplier = (lamboPrice / investment);
  const finalValue = investment * multiplier;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #000000, #1a1a1a)',
      borderRadius: '16px',
      padding: '1rem',
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

const SparplanRechnerClient = () => {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(100);
  const [timeFrame, setTimeFrame] = useState<number>(121); // Monate (wie im Screenshot)
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin');
  const [oneTimeInvestment, setOneTimeInvestment] = useState<number>(0); // Einmalinvest
  const [expectedReturn, setExpectedReturn] = useState<number>(8); // Jährliche Rendite %
  const [result, setResult] = useState<SparplanResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

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

  // Lade verfügbare Kryptowährungen über die API
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('/api/coins');
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Krypto-Daten');
        }
        const data = await response.json();
        
        // Filtere die gewünschten Kryptowährungen
        const selectedCoinIds = ['bitcoin', 'ethereum', 'ripple', 'solana', 'cardano', 'binancecoin', 'avalanche-2'];
        
        const filteredCoins = data
          .filter((coin: any) => selectedCoinIds.includes(coin.id))
          .map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol?.toUpperCase() || '',
            current_price: coin.current_price,
            image: coin.image || `/cryptologos/${coin.symbol?.toLowerCase()}-logo.png`
          }))
          .sort((a: any, b: any) => selectedCoinIds.indexOf(a.id) - selectedCoinIds.indexOf(b.id));
        
        setCoins(filteredCoins);
      } catch (error) {
        console.error('Fehler beim Laden der Coins von API, verwende Fallback:', error);
        
        // Fallback auf Mock-Daten bei API-Fehler
        const mockCoins = [
          {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            current_price: 107250,
            image: '/cryptologos/bitcoin-btc-logo.png'
          },
          {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            current_price: 4125,
            image: '/cryptologos/Ethereum ICON.png'
          },
          {
            id: 'ripple',
            name: 'XRP',
            symbol: 'XRP',
            current_price: 2.85,
            image: '/cryptologos/XRP.png'
          },
          {
            id: 'solana',
            name: 'Solana',
            symbol: 'SOL',
            current_price: 245,
            image: '/cryptologos/solana-sol-logo.png'
          },
          {
            id: 'cardano',
            name: 'Cardano',
            symbol: 'ADA',
            current_price: 1.15,
            image: '/cryptologos/Cardano.png'
          }
        ];
        setCoins(mockCoins);
      }
    };

    fetchCoins();
  }, []);

  // Berechnung des Sparplans basierend auf dem Screenshot
  const calculateSparplan = () => {
    setLoading(true);
    
    setTimeout(() => {
      const selectedCoin = coins.find(coin => coin.id === selectedCrypto);
      if (!selectedCoin) return;

      const totalMonthlyInvested = monthlyAmount * timeFrame;
      const totalInvested = totalMonthlyInvested + oneTimeInvestment;
      
      // Berechnung basierend auf erwarteter jährlicher Rendite
      const annualReturn = expectedReturn / 100;
      const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
      
      let portfolioValue = oneTimeInvestment; // Startwert mit Einmalinvestment
      let totalCoins = oneTimeInvestment / selectedCoin.current_price;
      const chartDataPoints = [];
      
      // Simuliere monatliche Käufe und Wertsteigerung
      for (let month = 0; month <= timeFrame; month++) {
        if (month > 0) {
          // Monatliche Sparrate hinzufügen
          const monthlyCoins = monthlyAmount / selectedCoin.current_price;
          totalCoins += monthlyCoins;
          
          // Portfolio-Wertsteigerung anwenden
          portfolioValue = portfolioValue * (1 + monthlyReturn) + monthlyAmount;
        }
        
        // Chart-Datenpunkt hinzufügen (alle 6 Monate für bessere Performance)
        if (month % 6 === 0) {
          chartDataPoints.push({
            month: month,
            value: portfolioValue,
            invested: oneTimeInvestment + (monthlyAmount * month)
          });
        }
      }

      const totalReturn = portfolioValue - totalInvested;
      const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
      
      // Aktuelle BTC-Menge und Preis berechnen
      const currentBTCPrice = selectedCoin.current_price;
      const currentBTCAmount = totalCoins;

      setResult({
        totalInvested,
        totalValue: portfolioValue,
        totalReturn,
        returnPercentage,
        coinAmount: currentBTCAmount
      });
      
      setChartData(chartDataPoints);
      setLoading(false);
    }, 1500);
  };

  const selectedCoinData = coins.find(coin => coin.id === selectedCrypto);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        minHeight: 'auto', 
        paddingBottom: isMobile ? '1.5rem' : '2rem',
        paddingTop: isMobile ? '6rem' : isTablet ? '7rem' : '8rem',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(248, 223, 165, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ 
          position: 'relative', 
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 0.8fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center',
            minHeight: isMobile ? 'auto' : '50vh'
          }}>
            
            {/* Text Content - Left Side */}
            <div style={{ 
              textAlign: isMobile ? 'center' : 'left', 
              position: 'relative'
            }}>
              <h1 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.75rem' : '3.5rem',
                fontWeight: '600',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Sparplan Rechner</span>
              </h1>
              
              <p style={{ 
                color: '#d1d5db',
                fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
                lineHeight: '1.6',
                textAlign: isMobile ? 'center' : 'left',
                marginLeft: '0',
                marginRight: '0',
                maxWidth: 'none',
                marginBottom: '2rem'
              }}>
                Du möchtest Bitcoin & andere Kryptowährungen regelmäßig kaufen, ohne dich von Kursschwankungen stressen zu lassen? Mit einem Sparplan setzt du monatlich (oder wöchentlich) einen festen Betrag ein. So baust du langfristig Vermögen auf und nutzt automatisch den Cost-Average-Effekt.
              </p>

              {/* Features */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                {[
                  { icon: <TrendingUp size={20} />, text: 'Cost-Average-Effekt' },
                  { icon: <Calendar size={20} />, text: 'Regelmäßig investieren' },
                  { icon: <Calculator size={20} />, text: 'Rendite berechnen' }
                ].map((feature, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.05))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    borderRadius: '1rem',
                    padding: isMobile ? '1rem 0.75rem' : '1.25rem 1rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(248, 223, 165, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                  }}>
                    {/* Subtle glow effect */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      background: 'radial-gradient(circle at center, rgba(248, 223, 165, 0.1) 0%, transparent 70%)',
                      pointerEvents: 'none'
                    }}></div>
                    
                    <div style={{ 
                      background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1a1a2e',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {feature.icon}
                    </div>
                    
                    <div style={{ 
                      fontSize: isMobile ? '0.875rem' : '0.9rem',
                      color: '#ffffff',
                      fontWeight: '600',
                      lineHeight: '1.3',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {feature.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image - Right Side */}
            {!isMobile && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: isTablet ? '50vh' : '60vh'
              }}>
                <img
                  src="/krypto.png"
                  alt="Krypto Sparplan"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    maxHeight: isTablet ? '60vh' : '70vh',
                    width: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shiny Divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(248, 223, 165, 0.3) 20%, rgba(248, 223, 165, 0.8) 50%, rgba(248, 223, 165, 0.3) 80%, transparent 100%)',
        margin: '0'
      }}></div>

      {/* Calculator Section */}
      <section style={{
        padding: isMobile ? '2rem 0' : '4rem 0',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3rem' }}>
            <h2 style={{
              color: '#ffffff',
              fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1rem'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Sparplan-Rechner</span>
            </h2>
            <p style={{
              color: '#d1d5db',
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Gib deine Parameter ein und berechne die potenzielle Entwicklung deines Krypto-Sparplans
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'start'
          }}>
            {/* Calculator Input */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{
                color: '#f8dfa5',
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Calculator size={24} />
                Sparplan konfigurieren
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Kryptowährung auswählen */}
                <div>
                  <label style={{
                    display: 'block',
                    color: '#d1d5db',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Kryptowährung
                  </label>
                  <select
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      background: 'rgba(0, 0, 0, 0.3)',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  >
                    {coins.map(coin => (
                      <option key={coin.id} value={coin.id} style={{ background: '#1a1a2e' }}>
                        {coin.name} ({coin.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monatlicher Betrag */}
                <div>
                  <label style={{
                    display: 'block',
                    color: '#d1d5db',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Monatlicher Betrag
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Euro
                      size={20}
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af'
                      }}
                    />
                    <input
                      type="number"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                      min="1"
                      max="10000"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(248, 223, 165, 0.2)',
                        background: 'rgba(0, 0, 0, 0.3)',
                        color: '#ffffff',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                {/* Einmalinvestment */}
                <div>
                  <label style={{
                    display: 'block',
                    color: '#d1d5db',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Einmalinvest (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Euro
                      size={20}
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af'
                      }}
                    />
                    <input
                      type="number"
                      value={oneTimeInvestment}
                      onChange={(e) => setOneTimeInvestment(Number(e.target.value))}
                      min="0"
                      max="100000"
                      placeholder="0"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(248, 223, 165, 0.2)',
                        background: 'rgba(0, 0, 0, 0.3)',
                        color: '#ffffff',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                {/* Laufzeit */}
                <div>
                  <label style={{
                    display: 'block',
                    color: '#d1d5db',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Anlagedauer: {timeFrame} Monate ({Math.round(timeFrame/12 * 10) / 10} Jahre)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="240"
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      outline: 'none'
                    }}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.75rem', 
                    color: '#9ca3af',
                    marginTop: '0.25rem'
                  }}>
                    <span>1 Monat</span>
                    <span>20 Jahre</span>
                  </div>
                </div>

                {/* Jährliche Rendite */}
                <div>
                  <label style={{
                    display: 'block',
                    color: '#d1d5db',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Jährliche Rendite: {expectedReturn}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      outline: 'none'
                    }}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.75rem', 
                    color: '#9ca3af',
                    marginTop: '0.25rem'
                  }}>
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Berechnen Button */}
                <button
                  onClick={calculateSparplan}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: loading 
                      ? 'rgba(248, 223, 165, 0.3)' 
                      : 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: loading ? '#9ca3af' : '#000000',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Berechne...' : 'Sparplan berechnen'}
                </button>
              </div>
            </div>

            {/* Results */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{
                color: '#f8dfa5',
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <BarChart3 size={24} />
                Ergebnis
              </h3>

              {result ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Hauptergebnis wie im Screenshot */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        background: '#f97316',
                        color: 'white',
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        ₿
                      </div>
                      <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                        Portfoliowert (Heute)
                      </span>
                    </div>
                    
                    <div style={{ 
                      color: '#ffffff', 
                      fontSize: isMobile ? '2rem' : '2.5rem', 
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}>
                      {result.totalValue.toLocaleString('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                    
                    <div style={{ 
                      color: '#10b981', 
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem'
                    }}>
                      <TrendingUp size={16} />
                      +{result.returnPercentage.toFixed(2).replace('.', ',')}%
                    </div>
                  </div>

                  {/* Detailstatistiken Grid wie im Screenshot */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.1)'
                    }}>
                      <div style={{ color: '#10b981', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        Gesamtrendite
                      </div>
                      <div style={{ 
                        color: '#10b981', 
                        fontSize: '1.125rem', 
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <TrendingUp size={14} />
                        +{result.returnPercentage.toFixed(2).replace('.', ',')} %
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.1)'
                    }}>
                      <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        Eingezahlt
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 'bold' }}>
                        {timeFrame} Monate
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.1)'
                    }}>
                      <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        {selectedCoinData?.symbol || 'BTC'} im Portfolio
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 'bold' }}>
                        {result.coinAmount.toFixed(3)} {selectedCoinData?.symbol || 'BTC'}
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(248, 223, 165, 0.1)'
                    }}>
                      <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        ⌀ Preis für 1 {selectedCoinData?.symbol || 'BTC'}
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 'bold' }}>
                        {selectedCoinData?.current_price.toLocaleString('de-DE', {
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Zusätzliche Statistiken */}
                  <div style={{
                    background: 'rgba(248, 223, 165, 0.05)',
                    border: '1px solid rgba(248, 223, 165, 0.2)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Kapital</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                        {result.totalInvested.toLocaleString('de-DE', {
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Gewinn</span>
                      <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                        +{result.totalReturn.toLocaleString('de-DE', {
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button wie im Screenshot */}
                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                      color: '#000000',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(248, 223, 165, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Sparplan anlegen →
                  </button>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#9ca3af'
                }}>
                  <Target size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>Konfiguriere deinen Sparplan und klicke auf "Berechnen", um die Ergebnisse zu sehen.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Providers Section */}
      <section style={{
        padding: isMobile ? '2rem 0' : '3rem 0',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2.5fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'start'
          }}>
            {/* Left Side - Title */}
            <div>
              <h2 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: '1rem'
              }}>
                Für dich{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative'
                }}>
                  Empfohlen
                  <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'repeating-linear-gradient(90deg, #f8dfa5 0px, #f8dfa5 8px, transparent 8px, transparent 16px)',
                    borderRadius: '2px'
                  }}></div>
                </span>
              </h2>
              <p style={{
                color: '#9ca3af',
                fontSize: isMobile ? '0.875rem' : '1rem',
                lineHeight: '1.6',
                marginTop: '1.5rem'
              }}>
                Die besten Anbieter für Bitcoin Sparpläne
              </p>
            </div>

            {/* Right Side - Exchange Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch'
            }}>
              {/* Bitvavo Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: '2px solid rgba(248, 223, 165, 0.4)',
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '0 10px 25px rgba(248, 223, 165, 0.2)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  minWidth: '0',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(248, 223, 165, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(248, 223, 165, 0.2)';
                }}
              >
                {/* Bonus Badge */}
                <div style={{
                  position: 'absolute',
                  top: isMobile ? '-10px' : '-12px',
                  right: isMobile ? '10px' : '20px',
                  background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                  color: '#000000',
                  padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.75rem',
                  borderRadius: '16px',
                  fontSize: isMobile ? '0.625rem' : '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  zIndex: 3,
                  boxShadow: '0 3px 8px rgba(248, 223, 165, 0.3)'
                }}>
                  💰 10€ Bonus
                </div>

                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: 'fit-content'
                  }}>
                    <img 
                      src="/logos/bitvavo.svg" 
                      alt="Bitvavo Logo"
                      style={{
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Zahlungsmethoden */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Zahlungsmethoden:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/visa.svg" alt="Visa" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/banktransfer.png" alt="SEPA" style={{ height: '20px', objectFit: 'contain' }} />
                  </div>
                </div>

                {/* Exchange Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: isMobile ? '1rem' : '1.5rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>1,00 €</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>0,25%</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Niederlande 🇳🇱</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>2018</div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', 
                    textAlign: 'center', 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                >
                  ZUM ANBIETER →
                </a>
              </div>

              {/* Bitpanda Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  minWidth: '0',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: 'fit-content'
                  }}>
                    <img 
                      src="/logos/bitpanda.png" 
                      alt="Bitpanda Logo"
                      style={{
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Zahlungsmethoden */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Zahlungsmethoden:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src="/payment-icons/paypal.svg" alt="PayPal" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/visa.svg" alt="Visa" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/giropay.svg" alt="GiroPay" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/banktransfer.png" alt="SEPA" style={{ height: '20px', objectFit: 'contain' }} />
                  </div>
                </div>

                {/* Exchange Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: isMobile ? '1rem' : '1.5rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>10,00 €</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>0,25%</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Österreich 🇦🇹</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>2014</div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', 
                    textAlign: 'center', 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                >
                  ZUM ANBIETER →
                </a>
              </div>

              {/* Kraken Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  borderRadius: '16px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  minWidth: '0',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: 'fit-content'
                  }}>
                    <img 
                      src="/logos/kraken.png" 
                      alt="Kraken Logo"
                      style={{
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Zahlungsmethoden */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    Zahlungsmethoden:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src="/payment-icons/visa.svg" alt="Visa" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" style={{ height: '20px', objectFit: 'contain' }} />
                    <img src="/payment-icons/banktransfer.png" alt="Bank Transfer" style={{ height: '20px', objectFit: 'contain' }} />
                  </div>
                </div>

                {/* Exchange Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: isMobile ? '1rem' : '1.5rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Mindesteinzahlung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>1,00 €</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gebühren:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>0,25%</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Firmensitz:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>USA 🇺🇸</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.625rem' : '0.75rem' }}>Gründung:</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>2011</div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://kraken.pxf.io/RGE3yg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', 
                    textAlign: 'center', 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                    color: '#000000',
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                >
                  ZUM ANBIETER →
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Wen Lambo Rechner Section */}
      <section style={{
        padding: isMobile ? '3rem 0' : '4rem 0',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center'
          }}>
            
            {/* Left Side - Content */}
            <div>
              <h2 style={{
                color: '#ffffff',
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: '2rem'
              }}>
                "Wen Lambo" Rechner
              </h2>

              <div style={{
                color: '#d1d5db',
                fontSize: isMobile ? '1rem' : '1.125rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      background: '#f8dfa5',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginTop: '0.5rem',
                      flexShrink: 0
                    }}></div>
                    <span>Neupreis Lambo ca. <strong style={{ color: '#f8dfa5' }}>350.000€</strong></span>
                  </li>
                  
                  <li style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      background: '#f8dfa5',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginTop: '0.5rem',
                      flexShrink: 0
                    }}></div>
                    <span>Einmalinvest: <strong style={{ color: '#f8dfa5' }}>3.500 €</strong> (kann ich eingeben)</span>
                  </li>
                  
                  <li style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    marginBottom: '2rem',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      background: '#f8dfa5',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginTop: '0.5rem',
                      flexShrink: 0
                    }}></div>
                    <span>Einmal X benötigt: <strong style={{ color: '#f8dfa5' }}>100x</strong> (Errechnet sich automatisch 350000 / 3500)</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Side - Calculator */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}>
              <WenLamboCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section style={{
        padding: isMobile ? '2rem 0' : '3rem 0',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
            border: '2px solid rgba(248, 223, 165, 0.4)',
            borderRadius: '16px',
            padding: isMobile ? '2rem' : '3rem',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#f8dfa5',
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Was ist ein Krypto-Sparplan?
            </h3>
            <p style={{
              color: '#d1d5db',
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              Ein Krypto-Sparplan nutzt die Dollar-Cost-Average-Strategie (DCA): Anstatt einmalig zu investieren, 
              kaufst du regelmäßig für den gleichen Betrag ein. Das reduziert das Risiko von ungünstigen Einstiegszeitpunkten 
              und glättet Kursschwankungen über die Zeit.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              {[
                {
                  title: 'Risiko reduzieren',
                  description: 'Schwankungen werden durch regelmäßige Käufe ausgeglichen',
                  icon: <Shield size={24} />
                },
                {
                  title: 'Disziplin fördern',
                  description: 'Automatische Investitionen ohne emotionale Entscheidungen',
                  icon: <Target size={24} />
                },
                {
                  title: 'Einfach starten',
                  description: 'Bereits ab kleinen Beträgen monatlich investieren',
                  icon: <TrendingUp size={24} />
                }
              ].map((benefit, index) => (
                <div key={index} style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <div style={{ color: '#f8dfa5', marginBottom: '1rem' }}>
                    {benefit.icon}
                  </div>
                  <h4 style={{
                    color: '#ffffff',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {benefit.title}
                  </h4>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SparplanRechnerClient;