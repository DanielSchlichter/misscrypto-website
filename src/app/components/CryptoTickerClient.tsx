'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registriere alle Chart.js-Komponenten
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = '24h' | '7d' | '30d';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_changes: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  prices: {
    '24h': number[];
    '7d': number[];
    '30d': number[];
  };
  image: string;
  market_cap_rank: number;
  last_updated: string;
}

interface CryptoTickerClientProps {
  initialCoins: Coin[];
}

const CryptoTickerClient = ({ initialCoins }: CryptoTickerClientProps) => {
  const [selectedTimeRanges, setSelectedTimeRanges] = useState<Record<string, TimeRange>>({});
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const timeRangeOptions: TimeRange[] = ['24h', '7d', '30d'];

  const handleTimeRangeChange = useCallback((coinId: string, timeRange: TimeRange) => {
    setSelectedTimeRanges(prev => ({
      ...prev,
      [coinId]: timeRange
    }));
  }, []);

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 300;
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      const scrollLeft = scrollRef.current.scrollLeft;
      
      scrollRef.current.scrollTo({
        left: direction === 'left' 
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  const getChartData = useCallback((coin: Coin) => {
    const selectedRange = selectedTimeRanges[coin.id] || '24h';
    const values = coin.prices[selectedRange];
    
    // Wenn keine Chart-Daten vorhanden sind, erstelle statische Dummy-Daten
    if (!values || values.length === 0) {
      // Verwende coin.id als Seed für konsistente Dummy-Daten
      const seed = coin.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const dummyValues = Array.from({ length: 24 }, (_, i) => {
        const variation = Math.sin((seed + i) * 0.1) * 0.02; // Deterministische Variation
        return coin.current_price * (1 + variation);
      });
      
      return {
        labels: Array.from({ length: dummyValues.length }, (_, i) => i.toString()),
        datasets: [
          {
            label: coin.name,
            data: dummyValues,
            borderColor: 'rgba(228, 177, 94, 0.8)',
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
            fill: false
          }
        ]
      };
    }

    const labels = Array.from({ length: values.length }, (_, i) => i.toString());

    return {
      labels,
      datasets: [
        {
          label: coin.name,
          data: values,
          borderColor: 'rgba(228, 177, 94, 0.8)',
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2,
          fill: false
        }
      ]
    };
  }, [selectedTimeRanges]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(228, 177, 94, 0.3)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: function() {
            return '';
          },
          label: function(context: any) {
            let value = context.raw;
            return formatPrice(value);
          }
        }
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: 'rgba(228, 177, 94, 0.8)',
        fill: false
      },
      point: {
        radius: 0,
        hitRadius: 5,
        hoverRadius: 5
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatPercentage = (percentage: number | undefined | null) => {
    if (percentage === undefined || percentage === null || isNaN(percentage)) {
      return '+0.00%';
    }
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const getTimeRangeLabel = (timeRange: TimeRange): string => {
    switch (timeRange) {
      case '24h':
        return '24h';
      case '7d':
        return '7T';
      case '30d':
        return '30T';
      default:
        return '24h';
    }
  };

  useEffect(() => {
    // Überprüfe Scroll-Buttons beim initialen Laden
    checkScrollButtons();
  }, [initialCoins, checkScrollButtons]);

  return (
    <div className="mc-crypto-ticker">
      <div className="mc-container">
        <div className="mc-ticker-carousel-container">
          {canScrollLeft && (
            <button
              onClick={() => scrollCarousel('left')}
              className="mc-carousel-nav mc-carousel-prev"
            >
              ←
            </button>
          )}

          <div className="mc-ticker-carousel" ref={scrollRef} onScroll={checkScrollButtons}>
            {initialCoins.map((coin, index) => {
              const selectedRange = selectedTimeRanges[coin.id] || '24h';
              const chartData = getChartData(coin);
              
              if (!coin || !coin.id) {
                return null;
              }

              const priceChange = coin.price_changes?.[selectedRange] || 0;

              return (
                <div key={`ticker-${coin.id}-${index}`} className="mc-ticker-item">
                  <div className="mc-ticker-header">
                    <img src={coin.image} alt={coin.name} className="mc-ticker-icon" />
                    <div className="mc-ticker-info">
                      <div className="mc-ticker-name-row">
                        <h2 className="mc-ticker-name">{coin.name}</h2>
                        <div className="mc-time-range-selector">
                          {timeRangeOptions.map((option) => (
                            <button
                              key={`${coin.id}-${option}`}
                              onClick={() => handleTimeRangeChange(coin.id, option)}
                              className={`mc-time-range-btn ${selectedRange === option ? 'active' : ''}`}
                            >
                              {getTimeRangeLabel(option)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="mc-ticker-symbol">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="mc-ticker-price">
                    {formatPrice(coin.current_price)}
                  </div>
                  <div className={`mc-ticker-change ${priceChange >= 0 ? 'mc-ticker-change-positive' : 'mc-ticker-change-negative'}`}>
                    {formatPercentage(priceChange)}
                  </div>

                  <div className="mc-ticker-chart">
                    <Line data={chartData} options={chartOptions} />
                  </div>

                  {/* Kaufen Button */}
                  <div className="mc-ticker-actions">
                    <Link 
                      href={`/krypto-kaufen?currency=${coin.name.toLowerCase()}`}
                      className="mc-btn-small mc-btn-primary mc-btn-full mc-btn-with-icon"
                    >
                      <img src={coin.image} alt={coin.name} className="mc-btn-icon" />
                      {coin.name} kaufen
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollCarousel('right')}
              className="mc-carousel-nav mc-carousel-next"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoTickerClient; 