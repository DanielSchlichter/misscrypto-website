'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js registrieren
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1y: number;
  image: string;
  market_cap_rank: number;
  historical_prices_1y?: number[];
}

interface InvestmentCalculatorClientProps {
  coins: Coin[];
}

type SelectionMode = 'top10' | 'top5';

const InvestmentCalculatorClient: React.FC<InvestmentCalculatorClientProps> = ({ coins }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('top10');
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  // Top Coins basierend auf Performance sortieren
  const getTopPerformers = (count: number) => {
    return coins
      .sort((a, b) => b.price_change_percentage_1y - a.price_change_percentage_1y)
      .slice(0, count);
  };

  const getTop10 = () => getTopPerformers(10);
  const getTop5 = () => getTopPerformers(5);

  // Berechnung der Investment-Ergebnisse
  const calculateInvestmentResults = () => {
    let coinsToCalculate: Coin[] = [];

    switch (selectionMode) {
      case 'top10':
        coinsToCalculate = getTop10();
        break;
      case 'top5':
        coinsToCalculate = getTop5();
        break;
    }

    // Gleichmäßige Verteilung des Investments
    const amountPerCoin = investmentAmount / coinsToCalculate.length;
    
    const calculationResults = coinsToCalculate.map(coin => {
      const initialValue = amountPerCoin;
      const currentValue = initialValue * (1 + coin.price_change_percentage_1y / 100);
      const profit = currentValue - initialValue;
      const profitPercentage = coin.price_change_percentage_1y;

      return {
        coin,
        initialValue,
        currentValue,
        profit,
        profitPercentage
      };
    });

    setResults(calculationResults.sort((a, b) => b.currentValue - a.currentValue));
  };

  useEffect(() => {
    calculateInvestmentResults();
  }, [investmentAmount, selectionMode, selectedCoins]);

  const handleCustomCoinToggle = (coinId: string) => {
    setSelectedCoins(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  const totalCurrentValue = results.reduce((sum, r) => sum + r.currentValue, 0);
  const totalInitialValue = results.reduce((sum, r) => sum + r.initialValue, 0);
  const totalProfit = totalCurrentValue - totalInitialValue;
  const totalProfitPercentage = totalInitialValue > 0 ? (totalProfit / totalInitialValue) * 100 : 0;

  // Chart-Daten für realistische Portfolio-Entwicklung (monatlich)
  const generatePortfolioChart = () => {
    if (results.length === 0) return { labels: [], datasets: [] };

    // Erstelle Monatslabels für 1 Jahr
    const months = [
      'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
      'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
    ];
    
    // Berechne Portfolio-Werte für jeden Monat
    const portfolioValues: number[] = [];
    
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      let monthlyPortfolioValue = 0;
      
      results.forEach(result => {
        const amountPerCoin = result.initialValue;
        const coin = result.coin;
        
                 if (coin.historical_prices_1y && coin.historical_prices_1y[monthIndex]) {
           // Verwende echte historische Preise
           const historicalPrice = coin.historical_prices_1y[monthIndex];
           const originalPrice = coin.historical_prices_1y[0]; // Preis vor 1 Jahr
           const coinsOwned = amountPerCoin / originalPrice;
           monthlyPortfolioValue += coinsOwned * historicalPrice;
        } else {
          // Fallback: Schätze basierend auf linearer Entwicklung
          const progressPercent = monthIndex / 11; // 0 bis 1
          const startValue = amountPerCoin;
          const endValue = result.currentValue;
          monthlyPortfolioValue += startValue + (endValue - startValue) * progressPercent;
        }
      });
      
      portfolioValues.push(monthlyPortfolioValue);
    }

    return {
      labels: months,
      datasets: [
        {
          label: 'Portfolio-Wert in €',
          data: portfolioValues,
          backgroundColor: 'rgba(248, 223, 165, 0.2)',
          borderColor: 'rgba(248, 223, 165, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(248, 223, 165, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    };
  };

  const chartData = generatePortfolioChart();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: `Portfolio-Entwicklung (${investmentAmount}€ Investment)`,
        color: '#ffffff'
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(248, 223, 165, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            return `Portfolio-Wert: ${value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#ffffff',
          callback: function(value: any) {
            return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <section className="mc-section">
      <div className="mc-container">
        <h2 className="mc-section-title">Was wäre wenn... Rechner</h2>
        <p className="mc-section-subtitle">
          Entdecke, wie sich dein Investment vor einem Jahr entwickelt hätte
        </p>

        {/* Investment-Eingabe */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Linke Spalte: Betrag + Strategie */}
          <div style={{
            background: 'rgba(248, 223, 165, 0.1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(248, 223, 165, 0.3)'
          }}>
            {/* Investment-Betrag */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                color: '#f8dfa5', 
                fontWeight: '600', 
                marginBottom: '1rem',
                fontSize: '1.125rem'
              }}>
                💰 Investment-Betrag
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  min="1"
                  style={{
                    width: '100%',
                    padding: '1rem 3rem 1rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontSize: '1.125rem',
                    fontWeight: '600'
                  }}
                  placeholder="z.B. 1000"
                />
                <span style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#f8dfa5',
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}>
                  €
                </span>
              </div>
              <p style={{ 
                color: '#9ca3af', 
                fontSize: '0.875rem', 
                margin: '0.5rem 0 0 0'
              }}>
                Gib den Betrag ein, den du vor einem Jahr investiert hättest
              </p>
            </div>

            {/* Strategie-Auswahl */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#f8dfa5', 
                fontWeight: '600', 
                marginBottom: '1rem',
                fontSize: '1.125rem'
              }}>
                🎯 Strategie wählen
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { mode: 'top10', label: 'Top 10 Performer', icon: '🏆' },
                  { mode: 'top5', label: 'Top 5 Performer', icon: '⭐' }
                ].map(({ mode, label, icon }) => {
                  const isActive = selectionMode === mode;
                  const coinsToShow = mode === 'top10' ? getTop10() : mode === 'top5' ? getTop5() : [];
                  
                                    return (
                    <button
                      key={mode}
                      onClick={() => setSelectionMode(mode as SelectionMode)}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        background: isActive 
                          ? 'rgba(248, 223, 165, 0.3)' 
                          : 'rgba(0, 0, 0, 0.3)',
                        color: isActive ? '#f8dfa5' : '#ffffff',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detaillierte Ergebnisse direkt unter den Buttons */}
            {results.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: '#f8dfa5', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
                  📋 Detaillierte Coin-Ergebnisse
                </h3>
                <div style={{
                  background: 'rgba(248, 223, 165, 0.05)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  maxHeight: '280px',
                  overflowY: 'auto',
                  overflowX: 'hidden'
                }}>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                  }}>
                  {results.map((result, index) => (
                    <div key={result.coin.id} style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      minHeight: '140px'
                    }}>
                      {/* Header mit Coin Info und Gewinn/Verlust */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                          <span style={{ 
                            color: '#9ca3af', 
                            fontSize: '0.8rem',
                            minWidth: '20px'
                          }}>
                            #{index + 1}
                          </span>
                          <img 
                            src={result.coin.image} 
                            alt={result.coin.name}
                            style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                          />
                          <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                              {result.coin.symbol}
                            </div>
                            <div style={{ 
                              color: '#9ca3af', 
                              fontSize: '0.75rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {result.coin.name}
                            </div>
                          </div>
                        </div>
                        
                        {/* Gewinn/Verlust rechtsbündig */}
                        <div style={{ 
                          textAlign: 'right',
                          minWidth: '80px'
                        }}>
                          <div style={{ 
                            color: result.profit >= 0 ? '#f8dfa5' : '#ef4444',
                            fontWeight: 'bold',
                            fontSize: '0.85rem'
                          }}>
                            {result.profit >= 0 ? '+' : ''}{result.profitPercentage.toFixed(1)}%
                          </div>
                          <div style={{ 
                            color: result.profit >= 0 ? '#f8dfa5' : '#ef4444',
                            fontWeight: '600',
                            fontSize: '0.75rem'
                          }}>
                            {result.profit >= 0 ? '+' : ''}{result.profit.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Investment Details */}
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        fontSize: '0.75rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#9ca3af', marginBottom: '0.25rem' }}>Investiert:</div>
                          <div style={{ color: '#ffffff', fontWeight: '600' }}>
                            {result.initialValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                          </div>
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#9ca3af', marginBottom: '0.25rem' }}>Wert heute:</div>
                          <div style={{ color: '#ffffff', fontWeight: '600' }}>
                            {result.currentValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                  
                  {/* Custom Scrollbar Styles */}
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      width: 6px;
                    }
                    div::-webkit-scrollbar-track {
                      background: rgba(248, 223, 165, 0.1);
                      border-radius: 3px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background: rgba(248, 223, 165, 0.5);
                      border-radius: 3px;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: rgba(248, 223, 165, 0.7);
                    }
                  `}</style>
                </div>
              </div>
            )}
          </div>

          {/* Rechte Spalte: Gesamtergebnis + Chart */}
          {results.length > 0 && (
            <div className="mc-feature-card" style={{
              padding: '2rem'
            }}>
              {/* Gesamt-Zusammenfassung */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>
                  📊 Dein Ergebnis
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: '1rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Investiert</div>
                    <div style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 'bold' }}>
                      {totalInitialValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Aktueller Wert</div>
                    <div style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 'bold' }}>
                      {totalCurrentValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Gewinn/Verlust</div>
                    <div style={{ 
                      color: totalProfit >= 0 ? '#f8dfa5' : '#ef4444', 
                      fontSize: '1.125rem', 
                      fontWeight: 'bold' 
                    }}>
                      {totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      <br />
                      <span style={{ fontSize: '0.875rem' }}>
                        ({totalProfitPercentage >= 0 ? '+' : ''}{totalProfitPercentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart ohne Beschriftung */}
              <div style={{ marginBottom: '1.5rem' }}>
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Hinweis in der rechten Spalte */}
              <div style={{
                background: 'rgba(248, 223, 165, 0.1)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(248, 223, 165, 0.3)'
              }}>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
                  ⚠️ Hinweis: Diese Berechnung basiert auf simulierten historischen Daten und dient nur zu Demonstrationszwecken. 
                  Vergangene Performance ist kein Indikator für zukünftige Ergebnisse.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculatorClient; 