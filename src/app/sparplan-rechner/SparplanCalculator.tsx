'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Euro, BarChart3, Target, TrendingUp } from 'lucide-react';

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

interface SparplanCalculatorProps {
  isMobile: boolean;
  isTablet: boolean;
}

const SparplanCalculator: React.FC<SparplanCalculatorProps> = ({ isMobile, isTablet }) => {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(100);
  const [timeFrame, setTimeFrame] = useState<number>(121);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin');
  const [oneTimeInvestment, setOneTimeInvestment] = useState<number>(0);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [result, setResult] = useState<SparplanResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

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

  // Berechnung des Sparplans
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
      
      let portfolioValue = oneTimeInvestment;
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
                {/* Hauptergebnis */}
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

                {/* Detailstatistiken Grid */}
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

                {/* CTA Button */}
                <button
                  onClick={() => {
                    // Scrolle zur nächsten Sektion (Empfehlungen)
                    const nextSection = document.querySelector('[data-section="recommendations"]');
                    if (nextSection) {
                      nextSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
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
  );
};

export default SparplanCalculator;
