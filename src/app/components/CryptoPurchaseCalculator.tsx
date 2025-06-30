'use client';

import React, { useState, useEffect } from 'react';
import CryptoPurchaseCalculatorClient from './CryptoPurchaseCalculatorClient';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  market_cap_rank: number;
}

interface CryptoPurchaseCalculatorProps {
  selectedCrypto?: string;
}

const CryptoPurchaseCalculator: React.FC<CryptoPurchaseCalculatorProps> = ({ selectedCrypto }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lade Krypto-Daten von der API
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/coins');
        
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Krypto-Daten');
        }

        const data = await response.json();
        
        // Filtere und sortiere die ersten 20 Coins
        const filteredCoins = data
          .filter((coin: any) => coin.id && coin.name && coin.current_price)
          .slice(0, 20)
          .map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol?.toUpperCase() || '',
            current_price: coin.current_price,
            image: coin.image,
            market_cap_rank: coin.market_cap_rank
          }));

        setCoins(filteredCoins);
      } catch (err) {
        console.error('Fehler beim Laden der Coins:', err);
        setError('Fehler beim Laden der Krypto-Daten');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <section className="mc-section">
        <div className="mc-container">
          <div className="text-center p-4">
            <h2 className="mc-section-title">Krypto-Kauf Rechner</h2>
            <p>Lade Krypto-Daten...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !coins || coins.length === 0) {
    return (
      <section className="mc-section">
        <div className="mc-container">
          <div className="text-center p-4">
            <h2 className="mc-section-title">Krypto-Kauf Rechner</h2>
            <p>{error || 'Krypto-Kauf Rechner nicht verfügbar'}</p>
          </div>
        </div>
      </section>
    );
  }

  // Finde das ausgewählte Crypto oder nimm Bitcoin als Standard
  const defaultCrypto = selectedCrypto ? 
    coins.find(coin => 
      coin.id.toLowerCase() === selectedCrypto.toLowerCase() ||
      coin.name.toLowerCase() === selectedCrypto.toLowerCase() || 
      coin.symbol.toLowerCase() === selectedCrypto.toLowerCase()
    ) ||
    coins.find(coin => coin.symbol.toLowerCase() === 'btc') ||
    coins[0]
    : 
    coins.find(coin => coin.symbol.toLowerCase() === 'btc') ||
    coins[0];

  return <CryptoPurchaseCalculatorClient coins={coins} defaultCrypto={defaultCrypto} />;
};

export default CryptoPurchaseCalculator; 