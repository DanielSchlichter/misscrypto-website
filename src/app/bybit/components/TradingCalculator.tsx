'use client';

import React, { useState, useEffect } from 'react';

interface TradingCalculatorProps {
  isMobile: boolean;
}

interface TraderProfile {
  name: string;
  roi: number;
  winRate: number;
  avgTrade: number;
  risk: 'Niedrig' | 'Mittel' | 'Hoch';
  specialty: string;
  color: string;
}

interface SimulationResult {
  trader: string;
  finalAmount: number;
  totalReturn: number;
  totalTrades: number;
  winningTrades: number;
  monthlyGrowth: number[];
}

export const TradingCalculator = ({ isMobile }: TradingCalculatorProps) => {
  const [startAmount, setStartAmount] = useState<number>(1000);
  const [timeframe, setTimeframe] = useState<number>(12);
  const [selectedTraders, setSelectedTraders] = useState<string[]>(['crypto_pro', 'day_trader']);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);

  const traderProfiles: Record<string, TraderProfile> = {
    crypto_pro: {
      name: "Crypto Pro",
      roi: 15.2,
      winRate: 72,
      avgTrade: 2.3,
      risk: 'Mittel',
      specialty: 'BTC/ETH',
      color: '#10b981'
    },
    day_trader: {
      name: "Day Trader Max",
      roi: 22.8,
      winRate: 65,
      avgTrade: 3.1,
      risk: 'Hoch',
      specialty: 'Scalping',
      color: '#f59e0b'
    },
    safe_investor: {
      name: "Safe Investor",
      roi: 8.5,
      winRate: 82,
      avgTrade: 1.2,
      risk: 'Niedrig',
      specialty: 'Swing Trade',
      color: '#3b82f6'
    },
    altcoin_hunter: {
      name: "Altcoin Hunter",
      roi: 35.4,
      winRate: 58,
      avgTrade: 4.8,
      risk: 'Hoch',
      specialty: 'Altcoins',
      color: '#8b5cf6'
    },
    futures_master: {
      name: "Futures Master",
      roi: 28.1,
      winRate: 68,
      avgTrade: 3.8,
      risk: 'Hoch',
      specialty: 'Leverage',
      color: '#ef4444'
    }
  };

  const calculateROI = (trader: TraderProfile, amount: number, months: number): SimulationResult => {
    const monthlyReturn = trader.roi / 12;
    const tradesPerMonth = 20;
    let currentAmount = amount;
    const monthlyGrowth: number[] = [];

    let totalTrades = 0;
    let winningTrades = 0;

    for (let month = 0; month < months; month++) {
      const monthTrades = tradesPerMonth;
      const winTrades = Math.floor(monthTrades * (trader.winRate / 100));
      const lossTrades = monthTrades - winTrades;

      // Simuliere realistische Schwankungen
      const volatilityFactor = 0.8 + Math.random() * 0.4; // 0.8 - 1.2
      const monthlyGain = (monthlyReturn / 100) * volatilityFactor;

      currentAmount = currentAmount * (1 + monthlyGain);
      monthlyGrowth.push(currentAmount);

      totalTrades += monthTrades;
      winningTrades += winTrades;
    }

    return {
      trader: trader.name,
      finalAmount: Math.round(currentAmount),
      totalReturn: Math.round(((currentAmount - amount) / amount) * 100),
      totalTrades,
      winningTrades,
      monthlyGrowth
    };
  };

  const runSimulation = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const newResults = selectedTraders.map(traderId => {
        const trader = traderProfiles[traderId];
        return calculateROI(trader, startAmount, timeframe);
      });

      setResults(newResults);
      setIsCalculating(false);
    }, 1500);
  };

  const toggleTrader = (traderId: string) => {
    setSelectedTraders(prev => {
      if (prev.includes(traderId)) {
        return prev.filter(id => id !== traderId);
      } else if (prev.length < 3) {
        return [...prev, traderId];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (selectedTraders.length > 0) {
      runSimulation();
    }
  }, [startAmount, timeframe, selectedTraders]);

  return (
    <section style={{
      padding: isMobile ? '4rem 0' : '6rem 0',
      position: 'relative'
    }}>
      {/* Section Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '3rem' : '4rem'
      }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '200',
          lineHeight: '1.2',
          background: 'linear-gradient(135deg, #f7a602, #ffc107, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          🎯 Copy Trading Simulator
        </h2>
        <p style={{
          color: 'rgba(209, 213, 219, 0.8)',
          fontSize: isMobile ? '1rem' : '1.2rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Simuliere deine Rendite mit verschiedenen Top-Tradern und finde die perfekte Copy Trading Strategie
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(247, 166, 2, 0.08), rgba(15, 23, 42, 0.9))',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '1rem',
        padding: isMobile ? '2rem' : '3rem',
        backdropFilter: 'blur(12px)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>

        {/* Input Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Startkapital */}
          <div>
            <label style={{
              color: '#f7a602',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'block',
              marginBottom: '1rem'
            }}>
              💰 Startkapital
            </label>
            <div style={{
              position: 'relative'
            }}>
              <input
                type="range"
                min="100"
                max="50000"
                step="100"
                value={startAmount}
                onChange={(e) => setStartAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(247, 166, 2, 0.3))',
                  borderRadius: '4px',
                  outline: 'none',
                  marginBottom: '0.5rem'
                }}
              />
              <div style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700',
                textAlign: 'center'
              }}>
                €{new Intl.NumberFormat('de-DE').format(startAmount)}
              </div>
            </div>
          </div>

          {/* Zeitraum */}
          <div>
            <label style={{
              color: '#f7a602',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'block',
              marginBottom: '1rem'
            }}>
              📅 Zeitraum
            </label>
            <div style={{
              position: 'relative'
            }}>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(247, 166, 2, 0.3))',
                  borderRadius: '4px',
                  outline: 'none',
                  marginBottom: '0.5rem'
                }}
              />
              <div style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700',
                textAlign: 'center'
              }}>
                {timeframe} {timeframe === 1 ? 'Monat' : 'Monate'}
              </div>
            </div>
          </div>
        </div>

        {/* Trader Selection */}
        <div style={{
          marginBottom: '3rem'
        }}>
          <h3 style={{
            color: '#f7a602',
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            👥 Wähle bis zu 3 Trader zum Vergleich
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(traderProfiles).map(([id, trader]) => (
              <div
                key={id}
                onClick={() => toggleTrader(id)}
                style={{
                  background: selectedTraders.includes(id)
                    ? `linear-gradient(135deg, ${trader.color}20, ${trader.color}10)`
                    : 'rgba(15, 23, 42, 0.5)',
                  border: selectedTraders.includes(id)
                    ? `2px solid ${trader.color}`
                    : '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedTraders.includes(id) ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h4 style={{
                      color: selectedTraders.includes(id) ? trader.color : 'white',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {trader.name}
                    </h4>
                    <div style={{
                      color: trader.risk === 'Niedrig' ? '#10b981' : trader.risk === 'Mittel' ? '#f59e0b' : '#ef4444',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {trader.risk} Risiko
                    </div>
                  </div>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: selectedTraders.includes(id) ? trader.color : 'transparent',
                    border: `2px solid ${trader.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {selectedTraders.includes(id) && (
                      <div style={{
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>✓</div>
                    )}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  fontSize: '0.85rem'
                }}>
                  <div>
                    <span style={{ color: 'rgba(209, 213, 219, 0.6)' }}>ROI:</span>
                    <span style={{ color: trader.color, fontWeight: '600', marginLeft: '0.5rem' }}>
                      +{trader.roi}%
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(209, 213, 219, 0.6)' }}>Erfolgsrate:</span>
                    <span style={{ color: 'white', fontWeight: '600', marginLeft: '0.5rem' }}>
                      {trader.winRate}%
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(209, 213, 219, 0.6)' }}>Typ:</span>
                    <span style={{ color: 'white', fontWeight: '600', marginLeft: '0.5rem' }}>
                      {trader.specialty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{
            borderTop: '1px solid rgba(59, 130, 246, 0.3)',
            paddingTop: '2rem'
          }}>
            <h3 style={{
              color: '#f7a602',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              📊 Simulation Ergebnisse
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : results.length <= 3 ? `repeat(${results.length}, 1fr)` : 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {results.map((result, index) => {
                const trader = Object.values(traderProfiles).find(t => t.name === result.trader);
                return (
                  <div
                    key={index}
                    style={{
                      background: `linear-gradient(135deg, ${trader?.color}15, rgba(15, 23, 42, 0.9))`,
                      border: `1px solid ${trader?.color}40`,
                      borderRadius: '1rem',
                      padding: '2rem',
                      textAlign: 'center'
                    }}
                  >
                    <h4 style={{
                      color: trader?.color,
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}>
                      {result.trader}
                    </h4>

                    <div style={{
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                      }}>
                        €{new Intl.NumberFormat('de-DE').format(result.finalAmount)}
                      </div>
                      <div style={{
                        color: result.totalReturn > 0 ? '#10b981' : '#ef4444',
                        fontSize: '1.3rem',
                        fontWeight: '600'
                      }}>
                        {result.totalReturn > 0 ? '+' : ''}{result.totalReturn}%
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      fontSize: '0.9rem'
                    }}>
                      <div>
                        <div style={{ color: 'rgba(209, 213, 219, 0.6)' }}>Trades:</div>
                        <div style={{ color: 'white', fontWeight: '600' }}>{result.totalTrades}</div>
                      </div>
                      <div>
                        <div style={{ color: 'rgba(209, 213, 219, 0.6)' }}>Gewonnen:</div>
                        <div style={{ color: '#10b981', fontWeight: '600' }}>{result.winningTrades}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Best Performer Highlight */}
            {results.length > 1 && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.9))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '1rem',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <h4 style={{
                  color: '#10b981',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  🏆 Beste Performance
                </h4>
                {(() => {
                  const bestResult = results.reduce((best, current) =>
                    current.totalReturn > best.totalReturn ? current : best
                  );
                  const profit = bestResult.finalAmount - startAmount;

                  return (
                    <div>
                      <div style={{
                        color: 'white',
                        fontSize: '1.2rem',
                        marginBottom: '0.5rem'
                      }}>
                        <strong>{bestResult.trader}</strong> hätte aus <strong>€{new Intl.NumberFormat('de-DE').format(startAmount)}</strong> in {timeframe} Monaten
                      </div>
                      <div style={{
                        color: '#10b981',
                        fontSize: '2rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                      }}>
                        €{new Intl.NumberFormat('de-DE').format(bestResult.finalAmount)}
                      </div>
                      <div style={{
                        color: 'rgba(209, 213, 219, 0.8)',
                        fontSize: '1.1rem'
                      }}>
                        gemacht (+€{new Intl.NumberFormat('de-DE').format(profit)} Gewinn)
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isCalculating && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#f7a602'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem'
            }}>⚡</div>
            <div>Berechne deine Rendite...</div>
          </div>
        )}
      </div>
    </section>
  );
};