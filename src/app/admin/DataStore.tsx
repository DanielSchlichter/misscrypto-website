'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataStoreContextType {
  // Dashboard Data
  dashboardStats: any;
  setDashboardStats: (data: any) => void;

  // Newsfeed Data
  newsfeedItems: any[];
  setNewsfeedItems: (items: any[]) => void;

  // Media Data
  mediaFiles: any[];
  setMediaFiles: (files: any[]) => void;

  // Users Data
  users: any[];
  setUsers: (users: any[]) => void;

  // Authors Data
  authors: any[];
  setAuthors: (authors: any[]) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Preload all data
  preloadAllData: () => Promise<void>;

  // Refresh specific data
  refreshDashboard: () => Promise<void>;
  refreshNewsfeed: () => Promise<void>;
  refreshMedia: () => Promise<void>;
  refreshUsers: () => Promise<void>;
  refreshAuthors: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

export function DataStoreProvider({ children }: { children: ReactNode }) {
  // Data states
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [newsfeedItems, setNewsfeedItems] = useState<any[]>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Dashboard Data
  const refreshDashboard = async () => {
    try {
      console.log('📊 Lade Dashboard-Daten...');
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

      if (newsletterStatsResponse.ok) {
        newsletterStats = await newsletterStatsResponse.json();
      }

      const topCrypto = coins.slice(0, 5).map((coin: any) => ({
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change24h: coin.price_changes?.['24h'] || 0
      }));

      setDashboardStats({
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
    }
  };

  // Fetch Newsfeed Data
  const refreshNewsfeed = async () => {
    try {
      console.log('📰 Lade Newsfeed-Daten...');
      const response = await fetch('/api/newsfeed');
      if (response.ok) {
        const data = await response.json();
        setNewsfeedItems(data.items || []);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Newsfeed-Daten:', error);
    }
  };

  // Fetch Media Data
  const refreshMedia = async () => {
    try {
      console.log('🖼️ Lade Media-Daten...');
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMediaFiles(data.files || []);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Media-Daten:', error);
    }
  };

  // Fetch Users Data
  const refreshUsers = async () => {
    try {
      console.log('👥 Lade Benutzer-Daten...');
      const response = await fetch('/api/users-v2');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Benutzer-Daten:', error);
    }
  };

  // Fetch Authors Data
  const refreshAuthors = async () => {
    try {
      console.log('✍️ Lade Authoren-Daten...');
      const response = await fetch('/api/authors');
      if (response.ok) {
        const data = await response.json();
        setAuthors(data.authors || []);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Authoren-Daten:', error);
    }
  };

  // Preload all data
  const preloadAllData = async () => {
    console.log('🚀 Lade alle Admin-Daten vor...');
    setIsLoading(true);

    // Parallel alle Daten laden
    await Promise.all([
      refreshDashboard(),
      refreshNewsfeed(),
      refreshMedia(),
      refreshUsers(),
      refreshAuthors()
    ]);

    setIsLoading(false);
    console.log('✅ Alle Daten vorgeladen!');
  };

  // Initial load
  useEffect(() => {
    preloadAllData();
  }, []);

  const value = {
    dashboardStats,
    setDashboardStats,
    newsfeedItems,
    setNewsfeedItems,
    mediaFiles,
    setMediaFiles,
    users,
    setUsers,
    authors,
    setAuthors,
    isLoading,
    setIsLoading,
    preloadAllData,
    refreshDashboard,
    refreshNewsfeed,
    refreshMedia,
    refreshUsers,
    refreshAuthors
  };

  return (
    <DataStoreContext.Provider value={value}>
      {children}
    </DataStoreContext.Provider>
  );
}

export function useDataStore() {
  const context = useContext(DataStoreContext);
  if (context === undefined) {
    // Return default values instead of throwing error
    return {
      dashboardStats: null,
      setDashboardStats: () => {},
      newsfeedItems: [],
      setNewsfeedItems: () => {},
      mediaFiles: [],
      setMediaFiles: () => {},
      users: [],
      setUsers: () => {},
      authors: [],
      setAuthors: () => {},
      isLoading: false,
      setIsLoading: () => {},
      preloadAllData: async () => {},
      refreshDashboard: async () => {},
      refreshNewsfeed: async () => {},
      refreshMedia: async () => {},
      refreshUsers: async () => {},
      refreshAuthors: async () => {}
    };
  }
  return context;
}