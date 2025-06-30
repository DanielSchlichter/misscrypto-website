'use client';

import React, { useState, useEffect } from 'react';
import InvestmentCalculatorClient from './InvestmentCalculatorClient';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1y: number;
  image: string;
  market_cap_rank: number;
  is_stablecoin?: boolean;
  historical_prices_1y?: number[];
}

const InvestmentCalculator = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('/api/coins');
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Krypto-Daten');
        }
        const data = await response.json();
        
        // Transformiere die Daten für den Investment-Calculator
        const transformedCoins: Coin[] = data.map((coin: any) => {
          // Berechne 1-Jahres-Performance aus verfügbaren Daten
          let yearlyChange = 0;
          let historicalPrices: number[] = [];
          
          if (coin.price_changes?.['30d']) {
            // Schätze basierend auf 30-Tage-Trend
            yearlyChange = coin.price_changes['30d'] * 8;
          } else if (coin.price_changes?.['7d']) {
            // Fallback: 7-Tage-Trend
            yearlyChange = coin.price_changes['7d'] * 20;
          }
          
          // Generiere realistische monatliche Preise
          const currentPrice = coin.current_price;
          const startPrice = currentPrice / (1 + yearlyChange / 100);
          
          for (let i = 0; i < 12; i++) {
            const progress = i / 11;
            const trend = startPrice + (currentPrice - startPrice) * progress;
            
            if (i === 0) {
              historicalPrices.push(startPrice);
            } else if (i === 11) {
              historicalPrices.push(currentPrice);
            } else {
              // Kleine Volatilität hinzufügen
              const volatility = (Math.random() - 0.5) * 0.2;
              historicalPrices.push(Math.max(trend * (1 + volatility), startPrice * 0.1));
            }
          }

          return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol?.toUpperCase(),
            current_price: coin.current_price,
            price_change_percentage_1y: yearlyChange,
            image: coin.image,
            market_cap_rank: coin.market_cap_rank,
            is_stablecoin: false,
            historical_prices_1y: historicalPrices
          };
        }).filter((coin: Coin) => 
          coin.id && 
          coin.name && 
          coin.current_price && 
          !coin.is_stablecoin
        ).slice(0, 20); // Top 20 für Calculator
        
        setCoins(transformedCoins);
      } catch (err) {
        console.error('Fehler beim Laden der Krypto-Daten für Rechner:', err);
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <section className="mc-section">
        <div className="mc-container">
          <div className="text-center p-4">Lade Investment-Rechner...</div>
        </div>
      </section>
    );
  }

  if (error || !coins || coins.length === 0) {
    return (
      <section className="mc-section">
        <div className="mc-container">
          <div className="text-center p-4">Investment-Rechner nicht verfügbar</div>
        </div>
      </section>
    );
  }

  return <InvestmentCalculatorClient coins={coins} />;
};

export default InvestmentCalculator; 