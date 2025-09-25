'use client';

import React, { useState, useEffect } from 'react';

interface Exchange {
  id: string;
  name: string;
  logo: string;
  fees: number; // Prozentsatz als Dezimalzahl (z.B. 0.0149 für 1,49%)
  minDeposit: number;
  currency: string;
  url: string;
}

const exchanges: Exchange[] = [
  {
    id: 'bitvavo',
    name: 'Bitvavo',
    logo: '/logos/bitvavo.svg',
    fees: 0.0025, // 0,25%
    minDeposit: 1,
    currency: 'EUR',
    url: 'https://bitvavo.com/de/affiliate/misscrypto?a=05D0249945_misscryptoweb'
  },
  {
    id: 'bitpanda',
    name: 'Bitpanda',
    logo: '/logos/bitpanda.png',
    fees: 0.0025, // 0,25%
    minDeposit: 10,
    currency: 'EUR',
    url: 'https://www.bitpanda.com/de?irclickid=V3QSGnzSyxycT6HTSnRCMTJoUksXvVxdVxomz00&utm_source=Impact&utm_medium=Affiliates&utm_campaign=2051965&utm_content=Miss%20Crypto%20YT&utm_term=Brombacher%2C%20Deines%2C%20Kretzschmar%2C%20Morgenroth%20GbR&ref=615250356669422741&tag=affiliates&subid1=&subid3=2051965&irgwc=1'
  },
  /*
  {
    id: 'coinbase',
    name: 'Coinbase',
    logo: '/logos/coinbase.svg',
    fees: 0.0149, // 1,49%
    minDeposit: 2,
    currency: 'EUR',
    url: 'https://coinbase-consumer.sjv.io/B0gm7q'
  },
  {
    id: 'mexc',
    name: 'MEXC',
    logo: '/logos/mexc.png',
    fees: 0.001, // 0,1%
    minDeposit: 10,
    currency: 'EUR',
    url: 'https://www.mexc.com/acquisition/custom-sign-up?shareCode=mexc-2Xhb8'
  },
  {
    id: 'bingx',
    name: 'BingX',
    logo: '/logos/bingx.png',
    fees: 0.001, // 0,1%
    minDeposit: 50,
    currency: 'EUR',
    url: 'https://bingx.com/invite/OMAEVM/'
  },
  */
  {
    id: 'kraken',
    name: 'Kraken',
    logo: '/logos/kraken.png',
    fees: 0.0025, // 0,25%
    minDeposit: 1,
    currency: 'EUR',
    url: 'https://kraken.pxf.io/RGE3yg'
  },
  {
    id: 'bison',
    name: 'Bison',
    logo: '/cryptologos/Bison-Logo.svg',
    fees: 0.0125, // 1,25%
    minDeposit: 1,
    currency: 'EUR',
    url: 'https://bisonapp.com/affiliate/misscrypto/'
  }
];

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  market_cap_rank: number;
}

interface CryptoPurchaseCalculatorClientProps {
  coins: Coin[];
  defaultCrypto: Coin;
}

const CryptoPurchaseCalculatorClient: React.FC<CryptoPurchaseCalculatorClientProps> = ({ coins, defaultCrypto }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [selectedCrypto, setSelectedCrypto] = useState<Coin>(defaultCrypto);
  const [results, setResults] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Update selectedCrypto when defaultCrypto changes (from URL parameter)
  useEffect(() => {
    setSelectedCrypto(defaultCrypto);
  }, [defaultCrypto]);

  // Berechnung für jeden Exchange
  const calculatePurchaseResults = () => {
    if (investmentAmount <= 0 || !selectedCrypto) {
      setResults([]);
      return;
    }

    const calculationResults = exchanges.map(exchange => {
      // Prüfen ob Mindesteinzahlung erfüllt ist
      if (investmentAmount < exchange.minDeposit) {
        return {
          exchange,
          tooLow: true,
          investmentAmount,
          fees: 0,
          netAmount: 0,
          cryptoAmount: 0,
          pricePerCoin: selectedCrypto.current_price
        };
      }

      const fees = investmentAmount * exchange.fees;
      const netAmount = investmentAmount - fees;
      const cryptoAmount = netAmount / selectedCrypto.current_price;

      return {
        exchange,
        tooLow: false,
        investmentAmount,
        fees,
        netAmount,
        cryptoAmount,
        pricePerCoin: selectedCrypto.current_price
      };
    });

    // Sortiere mit Bitvavo oben, dann nach bestem Wert (meiste Crypto für das Geld)
    const validResults = calculationResults.filter(r => !r.tooLow);
    const invalidResults = calculationResults.filter(r => r.tooLow);
    
    // Bitvavo immer oben, dann nach Crypto-Menge sortieren
    const sortedValid = validResults.sort((a, b) => {
      // Bitvavo immer oben
      if (a.exchange.id === 'bitvavo') return -1;
      if (b.exchange.id === 'bitvavo') return 1;
      
      // Dann nach Crypto-Menge sortieren (mehr Crypto = besser)
      return b.cryptoAmount - a.cryptoAmount;
    });
    
    setResults([...sortedValid, ...invalidResults]);
  };

  useEffect(() => {
    calculatePurchaseResults();
  }, [investmentAmount, selectedCrypto]);

  // Format Funktionen
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatCrypto = (amount: number) => {
    if (amount < 0.000001) {
      return amount.toExponential(6);
    }
    return amount.toFixed(8);
  };

  const formatPercentage = (decimal: number) => {
    return `${(decimal * 100).toFixed(2)}%`;
  };

  const bestResult = results.find(r => !r.tooLow);

  return (
    <section className="mc-section">
      <div className="mc-container">
        <div style={{ 
          textAlign: isMobile ? 'center' : 'left', 
          marginBottom: '1rem'
        }}>
          {selectedCrypto.image && (
            <img 
              src={selectedCrypto.image} 
              alt={`${selectedCrypto.name} Logo`}
              style={{
                width: isMobile ? '36px' : '48px',
                height: isMobile ? '36px' : '48px',
                borderRadius: '50%',
                marginBottom: isMobile ? '0.5rem' : '0',
                marginRight: isMobile ? '0' : '1rem',
                display: isMobile ? 'block' : 'inline-block',
                margin: isMobile ? '0 auto 0.5rem auto' : '0 1rem 0 0'
              }}
            />
          )}
          <h2 className="mc-section-title" style={{ 
            textAlign: isMobile ? 'center' : 'left',
            fontSize: isMobile ? '1.5rem' : '2.5rem',
            margin: 0,
            display: 'inline-block'
          }}>
            {selectedCrypto.name}-Kauf <span className="mc-hero-gradient">Rechner</span>
          </h2>
        </div>
        <p className="mc-section-subtitle-left">
          Vergleiche, wie viel {selectedCrypto.name} du bei welchem Anbieter erhältst – ganz einfach.
        </p>

        {/* Zwei-spaltiges Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2rem'
        }}>
          
          {/* Linke Spalte: Input-Bereich und Informationen */}
          <div style={{
            background: 'rgba(248, 223, 165, 0.1)',
            borderRadius: '1rem',
            padding: isMobile ? '1.5rem' : '2rem',
            border: '1px solid rgba(248, 223, 165, 0.3)'
          }}>
            {/* Investment-Betrag */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                color: '#f8dfa5',
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                💰 Investment-Betrag
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={investmentAmount === 0 ? '' : investmentAmount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || val === '0') {
                      setInvestmentAmount(0);
                    } else {
                      setInvestmentAmount(Number(val));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem 3rem 1rem 1rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                  min="1"
                  step="10"
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
                Gib den Betrag ein, den du investieren möchtest
              </p>
            </div>

            {/* Crypto-Auswahl */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                color: '#f8dfa5',
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                💎 Kryptowährung auswählen
              </label>
              <select
                value={selectedCrypto.id}
                onChange={(e) => {
                  const crypto = coins.find(c => c.id === e.target.value);
                  if (crypto) setSelectedCrypto(crypto);
                }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  outline: 'none'
                }}
              >
                {coins.map(coin => (
                  <option key={coin.id} value={coin.id} style={{ background: '#1f2937', color: '#ffffff' }}>
                    {coin.name} ({coin.symbol}) - {formatCurrency(coin.current_price)}
                  </option>
                ))}
              </select>
              <p style={{ 
                color: '#9ca3af', 
                fontSize: '0.875rem', 
                margin: '0.5rem 0 0 0'
              }}>
                Aktueller Preis: {formatCurrency(selectedCrypto.current_price)}
              </p>
            </div>


          </div>

          {/* Rechte Spalte: Ergebnisse und Vergleich */}
          {results.length > 0 && (
            <div className="mc-feature-card" style={{
              padding: isMobile ? '1.5rem' : '2rem',
              maxHeight: isMobile ? '350px' : '400px',
              overflowY: 'auto'
            }}>
                <div style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem' 
              }}>
                  {results.map((result, index) => (
                    <div
                      key={result.exchange.id}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        border: result.exchange.id === 'bitvavo' && !result.tooLow ? '2px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(248, 223, 165, 0.3)',
                        opacity: result.tooLow ? 0.6 : 1
                      }}
                    >
                      {/* Exchange Header */}
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: '#ffffff',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '0.75rem'
                        }}>
                          <img 
                            src={result.exchange.logo} 
                            alt={`${result.exchange.name} Logo`}
                            style={{
                              width: '24px', 
                              height: '24px', 
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            margin: 0
                          }}>
                            {result.exchange.name}
                          </h4>
                          {(index === 0 || result.exchange.id === 'bitvavo') && !result.tooLow && (
                            <span style={{
                              background: 'linear-gradient(135deg, #e4b15e, #f8dfa5)',
                              color: '#000000',
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '10px',
                              marginTop: '0.25rem',
                              display: 'inline-block'
                            }}>
                              EMPFOHLEN
                            </span>
                          )}
                          {(() => {
                            // Finde den günstigsten Preis (niedrigste Gebühren)
                            const validResults = results.filter(r => !r.tooLow);
                            const cheapestResult = validResults.reduce((min, curr) => 
                              curr.exchange.fees < min.exchange.fees ? curr : min
                            );
                            return result.exchange.id === cheapestResult.exchange.id && 
                                   result.exchange.id !== 'bitvavo' && 
                                   !result.tooLow;
                          })() && (
                            <span style={{
                              background: 'linear-gradient(135deg, #10b981, #059669)',
                              color: '#ffffff',
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '10px',
                              marginTop: '0.25rem',
                              display: 'inline-block'
                            }}>
                              GÜNSTIGSTER PREIS
                            </span>
                          )}
                        </div>
                        
                        {/* Crypto-Menge rechtsbündig */}
                        {!result.tooLow && (
                          <div style={{ textAlign: 'right' }}>
                            <div style={{
                              color: '#f8dfa5',
                              fontSize: '1rem',
                              fontWeight: '700'
                            }}>
                              {formatCrypto(result.cryptoAmount)}
                            </div>
                            <div style={{
                              color: '#9ca3af',
                              fontSize: '0.75rem'
                            }}>
                              {selectedCrypto.symbol}
                            </div>
                          </div>
                        )}
                      </div>

                      {result.tooLow ? (
                        <div style={{ textAlign: 'center', color: '#ef4444' }}>
                          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                            Mindesteinzahlung nicht erreicht
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                            Minimum: {formatCurrency(result.exchange.minDeposit)}
                          </p>
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.85rem', color: '#d1d5db' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.4rem'
                          }}>
                            <span>Investment:</span>
                            <span style={{ color: '#ffffff' }}>
                              {formatCurrency(result.investmentAmount)}
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.4rem'
                          }}>
                            <span>Gebühren ({formatPercentage(result.exchange.fees)}):</span>
                            <span style={{ color: '#ef4444' }}>
                              -{formatCurrency(result.fees)}
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '0.4rem',
                            borderTop: '1px solid rgba(248, 223, 165, 0.2)',
                            marginBottom: '1rem'
                          }}>
                            <span style={{ fontWeight: '600' }}>Netto für Krypto:</span>
                            <span style={{ color: '#10b981', fontWeight: '600' }}>
                              {formatCurrency(result.netAmount)}
                            </span>
                          </div>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.5rem'
                          }}>
                            <a
                              href={result.exchange.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '0.5rem 0.5rem',
                                background: result.exchange.id === 'bitvavo' && !result.tooLow ?
                                  'linear-gradient(135deg, #e4b15e, #f8dfa5)' :
                                  'rgba(248, 223, 165, 0.2)',
                                color: result.exchange.id === 'bitvavo' && !result.tooLow ? '#000000' : '#f8dfa5',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                border: result.exchange.id === 'bitvavo' && !result.tooLow ?
                                  'none' :
                                  '1px solid rgba(248, 223, 165, 0.3)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              ZUM ANBIETER →
                            </a>
                            <a
                              href={
                                result.exchange.id === 'bitvavo' ? '/bitvavo' :
                                result.exchange.id === 'bitpanda' ? '/bitpanda' :
                                result.exchange.id === 'kraken' ? '/kraken' :
                                result.exchange.id === 'bison' ? '/bison' : '#'
                              }
                              style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '0.5rem 0.5rem',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: '#f8dfa5',
                                border: '1px solid rgba(248, 223, 165, 0.3)',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.6)';
                                e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                              }}
                            >
                              MEHR INFOS →
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CryptoPurchaseCalculatorClient; 