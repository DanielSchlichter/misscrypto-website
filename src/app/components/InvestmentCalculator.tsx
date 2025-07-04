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
          return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol?.toUpperCase(),
            current_price: coin.current_price,
            price_change_percentage_1y: coin.price_changes?.['1y'] || 0, // Nutze echte 1y-Performance aus DB
            image: coin.image,
            market_cap_rank: coin.market_cap_rank,
            is_stablecoin: false,
            historical_prices_1y: coin.prices?.['1y'] || [] // Nutze echte historische Preise aus DB
          };
        }).filter((coin: Coin) => 
          coin.id && 
          coin.name && 
          coin.current_price && 
          !coin.is_stablecoin &&
          coin.price_change_percentage_1y !== 0 // Nur Coins mit echter Performance-Daten
        );
        
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