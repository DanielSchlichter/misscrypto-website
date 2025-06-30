'use client';

import React, { useState, useEffect } from 'react';
import CryptoTickerClient from './CryptoTickerClient';

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

const CryptoTicker = () => {
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
        setCoins(data);
      } catch (err) {
        console.error('Fehler beim Laden der Krypto-Daten:', err);
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <div className="mc-crypto-ticker">
        <div className="mc-container">
          <div className="text-center p-4">Lade Krypto-Daten...</div>
        </div>
      </div>
    );
  }

  if (error || !coins || coins.length === 0) {
    return (
      <div className="mc-crypto-ticker">
        <div className="mc-container">
          <div className="text-center p-4">Keine Krypto-Daten verfügbar</div>
        </div>
      </div>
    );
  }

  return <CryptoTickerClient initialCoins={coins} />;
};

export default CryptoTicker; 