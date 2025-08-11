'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface DashboardStats {
  totalSubscribers: number;
  newSubscribersToday: number;
  lastNewsletterSent: string | null;
  topCrypto: {
    name: string;
    symbol: string;
    price: number;
    change24h: number;
  }[];
  websiteStats: {
    pageViews: number;
    uniqueVisitors: number;
    exchangeClicks: number;
  };
  pageViewsByPage: {
    page: string;
    views: number;
    uniqueVisitors: number;
  }[];
  exchangeClicks: {
    exchange: string;
    clicks: number;
    uniqueVisitors: number;
  }[];
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isUpdatingCrypto, setIsUpdatingCrypto] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Parallele API-Aufrufe für echte Daten
        const [coinsResponse, analyticsResponse, newsletterStatsResponse] = await Promise.all([
          fetch('/api/coins'),
          fetch('/api/analytics'),
          fetch('/api/newsletter-stats')
        ]);

        const coins = await coinsResponse.json();
        let websiteStats = {
          pageViews: 0,
          uniqueVisitors: 0,
          exchangeClicks: 0
        };
        let pageViewsByPage: any[] = [];
        let exchangeClicks: any[] = [];
        let newsletterStats = {
          totalSubscribers: 0,
          newSubscribersToday: 0,
          lastNewsletterSent: null
        };
        
        // Analytics-Daten laden
        if (analyticsResponse.ok) {
          const analytics = await analyticsResponse.json();
          websiteStats = {
            pageViews: analytics.summary.totalPageViews,
            uniqueVisitors: analytics.summary.uniqueVisitors,
            exchangeClicks: analytics.summary.totalExchangeClicks
          };
          pageViewsByPage = analytics.pageViews;
          exchangeClicks = analytics.exchangeClicks;
        }

        // Newsletter-Daten laden (MailerLite)
        if (newsletterStatsResponse.ok) {
          newsletterStats = await newsletterStatsResponse.json();
        }

        // Top 5 Crypto aus echten Daten
        const topCrypto = coins.slice(0, 5).map((coin: any) => ({
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          change24h: coin.price_changes?.['24h'] || 0
        }));

        setStats({
          totalSubscribers: newsletterStats.totalSubscribers,
          newSubscribersToday: newsletterStats.newSubscribersToday,
          lastNewsletterSent: newsletterStats.lastNewsletterSent,
          topCrypto,
          websiteStats,
          pageViewsByPage,
          exchangeClicks
        });
      } catch (error) {
        console.error('Fehler beim Laden der Dashboard-Daten:', error);
        // Fallback zu minimalen Daten ohne Mock-Werte
        setStats({
          totalSubscribers: 0,
          newSubscribersToday: 0,
          lastNewsletterSent: null,
          topCrypto: [
            { name: 'Bitcoin', symbol: 'BTC', price: 0, change24h: 0 },
            { name: 'Ethereum', symbol: 'ETH', price: 0, change24h: 0 },
            { name: 'Solana', symbol: 'SOL', price: 0, change24h: 0 },
            { name: 'Cardano', symbol: 'ADA', price: 0, change24h: 0 },
            { name: 'Avalanche', symbol: 'AVAX', price: 0, change24h: 0 }
          ],
          websiteStats: {
            pageViews: 0,
            uniqueVisitors: 0,
            exchangeClicks: 0
          },
          pageViewsByPage: [],
          exchangeClicks: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const triggerCryptoUpdate = async () => {
    setIsUpdatingCrypto(true);
    setUpdateMessage(null);
    
    try {
      console.log('🚀 Starte Krypto-Datenaktualisierung...');
      
      // 1. Lade Daten direkt von CoinGecko API
      console.log('📊 Lade Top 50 Coins von CoinGecko...');
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h,7d,30d,1y',
        {
          headers: {
            'User-Agent': 'MissCrypto-Bot/1.0 (https://misscrypto.de)',
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API Fehler: ${response.status} ${response.statusText}`);
      }

      const marketData = await response.json();
      console.log(`✅ ${marketData.length} Coins von CoinGecko geladen`);

      if (!Array.isArray(marketData)) {
        throw new Error('Ungültige API-Antwort von CoinGecko');
      }

      // 2. Filtere und sortiere Coins
      const stablecoins = [
        'tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd', 
        'paxos-standard', 'neutrino', 'fei-usd', 'terra-luna-2',
        'gemini-dollar', 'liquity-usd', 'magic-internet-money',
        'stasis-eurs', 'pax-gold'
      ];

      const filteredCoins = marketData
        .filter((coin: any) => !stablecoins.includes(coin.id))
        .filter((coin: any) => coin.price_change_percentage_1y_in_currency != null)
        .sort((a: any, b: any) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
        .slice(0, 25);

      console.log(`📈 ${filteredCoins.length} Top-Performer gefiltert`);
      
      // 3. Speichere in Firestore via API
      console.log('💾 Speichere Coins in Firestore...');
      const saveResponse = await fetch('/api/coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          coins: filteredCoins.map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            market_cap_rank: coin.market_cap_rank,
            price_changes: {
              '24h': coin.price_change_percentage_24h || 0,
              '7d': coin.price_change_percentage_7d_in_currency || 0,
              '30d': coin.price_change_percentage_30d_in_currency || 0,
              '1y': coin.price_change_percentage_1y_in_currency || 0
            },
            prices: {
              '24h': coin.sparkline_in_7d?.price?.slice(-24) || [],
              '7d': coin.sparkline_in_7d?.price || [],
              '30d': [],
              '1y': []
            },
            historical_prices_1y: [],
            last_updated: new Date().toISOString()
          }))
        })
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(errorData.error || `Speichern fehlgeschlagen: ${saveResponse.status}`);
      }

      const result = await saveResponse.json();
      console.log('✅ Update erfolgreich:', result);
      
      setUpdateMessage(`✅ ${filteredCoins.length} Krypto-Daten erfolgreich aktualisiert!`);
      
      // Dashboard nach 2 Sekunden neu laden
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error: any) {
      console.error('Fehler beim Update:', error);
      setUpdateMessage(`❌ Fehler: ${error.message || 'Unbekannter Fehler'}`);
    } finally {
      setIsUpdatingCrypto(false);
    }
  };

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: '#f8dfa5'
        }}>
          <svg 
            style={{ 
              animation: 'spin 1s linear infinite',
              width: '24px',
              height: '24px'
            }} 
            viewBox="0 0 24 24"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="32" 
              strokeDashoffset="32"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </svg>
          <span>Lade Dashboard-Daten...</span>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          Dashboard
        </h1>
        <p style={{
          color: '#d1d5db',
          fontSize: isMobile ? '1rem' : '1.1rem',
          marginBottom: '1rem'
        }}>
          Willkommen zurück, {session?.user?.name || 'Admin'}! Hier ist deine Übersicht.
        </p>
        
        {/* Manual Update Button */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={triggerCryptoUpdate}
            disabled={isUpdatingCrypto}
            style={{
              backgroundColor: isUpdatingCrypto ? '#6b7280' : '#f59e0b',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: isUpdatingCrypto ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            {isUpdatingCrypto ? (
              <>
                <svg style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32" />
                </svg>
                Aktualisiere...
              </>
            ) : (
              <>
                🔄 Krypto-Daten manuell aktualisieren
              </>
            )}
          </button>
          
          {updateMessage && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              backgroundColor: updateMessage.includes('✅') ? '#065f46' : '#7f1d1d',
              color: 'white',
              fontSize: '0.875rem'
            }}>
              {updateMessage}
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Newsletter Subscribers */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>📧</span>
            <div style={{
              background: 'rgba(34, 197, 94, 0.2)',
              color: '#22c55e',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              +{stats?.newSubscribersToday || 0} heute
            </div>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#f8dfa5',
            marginBottom: '0.5rem'
          }}>
            {stats?.totalSubscribers?.toLocaleString() || '0'}
          </div>
          <div style={{
            color: '#d1d5db',
            fontSize: '0.875rem'
          }}>
            Newsletter-Abonnenten
          </div>
        </div>

        {/* Page Views */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>👁️</span>
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#3b82f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              Diese Woche
            </div>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#f8dfa5',
            marginBottom: '0.5rem'
          }}>
            {stats?.websiteStats?.pageViews?.toLocaleString() || '0'}
          </div>
          <div style={{
            color: '#d1d5db',
            fontSize: '0.875rem'
          }}>
            Seitenaufrufe
          </div>
        </div>

        {/* Unique Visitors */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>👥</span>
            <div style={{
              background: 'rgba(168, 85, 247, 0.2)',
              color: '#a855f7',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              Unique
            </div>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#f8dfa5',
            marginBottom: '0.5rem'
          }}>
            {stats?.websiteStats?.uniqueVisitors?.toLocaleString() || '0'}
          </div>
          <div style={{
            color: '#d1d5db',
            fontSize: '0.875rem'
          }}>
            Eindeutige Besucher
          </div>
        </div>

        {/* Exchange Clicks */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🔗</span>
            <div style={{
              background: 'rgba(34, 197, 94, 0.2)',
              color: '#22c55e',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              Gesamt
            </div>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#f8dfa5',
            marginBottom: '0.5rem'
          }}>
            {stats?.websiteStats?.exchangeClicks?.toLocaleString() || '0'}
          </div>
          <div style={{
            color: '#d1d5db',
            fontSize: '0.875rem'
          }}>
            Börsen-Klicks
          </div>
        </div>
      </div>

      {/* Top Crypto & Recent Activity */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '2rem'
      }}>
        {/* Top Crypto */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#f8dfa5',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📊</span>
            Top Kryptowährungen
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {stats?.topCrypto?.map((crypto, index) => (
              <div key={crypto.symbol} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                background: 'rgba(248, 223, 165, 0.05)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(248, 223, 165, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#000'
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <div style={{
                      color: '#ffffff',
                      fontWeight: '500',
                      fontSize: '0.875rem'
                    }}>
                      {crypto.name}
                    </div>
                    <div style={{
                      color: '#d1d5db',
                      fontSize: '0.75rem'
                    }}>
                      {crypto.symbol}
                    </div>
                  </div>
                </div>
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    ${crypto.price.toLocaleString()}
                  </div>
                  <div style={{
                    color: crypto.change24h >= 0 ? '#22c55e' : '#ef4444',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#f8dfa5',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            Schnellaktionen
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <a
              href="/admin/newsletter/create"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                borderRadius: '0.75rem',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(248, 223, 165, 0.2), rgba(228, 177, 94, 0.2))';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>✉️</span>
              <div>
                <div style={{ fontWeight: '500' }}>Newsletter erstellen</div>
                <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                  Neuen Newsletter verfassen und versenden
                </div>
              </div>
            </a>

            <a
              href="/admin/newsletter"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.75rem',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>📧</span>
              <div>
                <div style={{ fontWeight: '500' }}>Newsletter verwalten</div>
                <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                  Bestehende Newsletter bearbeiten
                </div>
              </div>
            </a>

            <a
              href="/admin/stats"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '0.75rem',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>📈</span>
              <div>
                <div style={{ fontWeight: '500' }}>Detaillierte Statistiken</div>
                <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                  Ausführliche Analytics ansehen
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Page Views by Page */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#f8dfa5',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📊 Beliebteste Seiten
          </h3>
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            border: '1px solid rgba(248, 223, 165, 0.2)',
            borderRadius: '8px'
          }}>
            {stats?.pageViewsByPage && stats.pageViewsByPage.length > 0 ? (
              stats.pageViewsByPage.map((page, index) => (
                <div key={index} style={{
                  padding: '0.75rem 1rem',
                  borderBottom: index < stats.pageViewsByPage.length - 1 ? '1px solid rgba(248, 223, 165, 0.1)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#ffffff', fontWeight: '500', fontSize: '0.9rem' }}>
                      {page.page === '/' ? 'Startseite' : 
                       page.page === '/krypto-kaufen' ? 'Krypto kaufen' :
                       page.page === '/kontakt' ? 'Kontakt' :
                       page.page === '/ueber-mich' ? 'Über mich' :
                       page.page || 'Unbekannt'}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                      {page.uniqueVisitors} eindeutige Besucher
                    </div>
                  </div>
                  <div style={{
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    {page.views.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                color: '#9ca3af' 
              }}>
                Noch keine Seitenaufrufe aufgezeichnet
              </div>
            )}
          </div>
        </div>

        {/* Exchange Clicks */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#f8dfa5',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🏦 Börsen-Performance
          </h3>
          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto',
            border: '1px solid rgba(248, 223, 165, 0.2)',
            borderRadius: '8px'
          }}>
            {(() => {
              // Alle verfügbaren Börsen definieren
              const allExchanges = [
                { name: 'Bitvavo', emoji: '🇳🇱', description: 'EU-Lizenz, niedrige Gebühren' },
                { name: 'Bitpanda', emoji: '🇦🇹', description: 'EU-reguliert, PayPal' },
                { name: 'Kraken', emoji: '🇺🇸', description: 'Seit 2011, sehr sicher' },
                { name: 'Bison', emoji: '🇩🇪', description: 'BaFin-Lizenz, Deutsche Börse' },
                { name: 'Coinbase', emoji: '🇺🇸', description: 'Größte US-Börse' },
                { name: 'MEXC', emoji: '🏝️', description: '2000+ Coins' },
                { name: 'OKX', emoji: '🇸🇬', description: 'Professionelle Tools' },
                { name: 'Binance', emoji: '🌍', description: 'Weltgrößte Börse' }
              ];

              // Merge echte Klicks mit allen Börsen
              const mergedData = allExchanges.map(exchange => {
                const realData = stats?.exchangeClicks?.find(e => e.exchange === exchange.name);
                return {
                  ...exchange,
                  clicks: realData?.clicks || 0,
                  uniqueVisitors: realData?.uniqueVisitors || 0
                };
              });

              // Sortiere nach Klicks (höchste zuerst)
              mergedData.sort((a, b) => b.clicks - a.clicks);

              return mergedData.map((exchange, index) => (
                <div key={exchange.name} style={{
                  padding: '0.75rem 1rem',
                  borderBottom: index < mergedData.length - 1 ? '1px solid rgba(248, 223, 165, 0.1)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: exchange.clicks > 0 ? 'rgba(34, 197, 94, 0.05)' : 'transparent'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      color: exchange.clicks > 0 ? '#ffffff' : '#9ca3af', 
                      fontWeight: '500', 
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>{exchange.emoji}</span>
                      {exchange.name}
                      {index < 3 && exchange.clicks > 0 && (
                        <span style={{
                          background: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                          color: '#000',
                          padding: '0.1rem 0.3rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          #{index + 1}
                        </span>
                      )}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                      {exchange.description}
                      {exchange.clicks > 0 && (
                        <span> • {exchange.uniqueVisitors} eindeutige Klicker</span>
                      )}
                    </div>
                  </div>
                  <div style={{
                    color: exchange.clicks > 0 ? '#f8dfa5' : '#6b7280',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                  }}>
                    <span>{exchange.clicks.toLocaleString()}</span>
                    {exchange.clicks > 0 && (
                      <span style={{ fontSize: '0.7rem', color: '#22c55e' }}>
                        {((exchange.clicks / Math.max(1, stats?.websiteStats?.exchangeClicks || 1)) * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              ));
            })()}
          </div>
          
          {/* Exchange Summary */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: 'rgba(248, 223, 165, 0.05)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#d1d5db'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Gesamt-Klicks:</span>
              <span style={{ color: '#f8dfa5', fontWeight: '600' }}>
                {stats?.websiteStats?.exchangeClicks || 0}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
              <span>Aktive Börsen:</span>
              <span style={{ color: '#f8dfa5', fontWeight: '600' }}>
                {stats?.exchangeClicks?.length || 0} von 8
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}