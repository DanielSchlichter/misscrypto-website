'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useDataStore } from './DataStore';

// Import all components directly - no lazy loading
import DashboardPage from './dashboard/page';
import NewsfeedPage from './newsfeed/page';
import CreateNewsfeedPage from './newsfeed/create/page';
import MediaPage from './media/page';
import UsersPage from './users/page';
import AuthorsPage from './authors/page';

// Import skeletons
import DashboardSkeleton from './components/DashboardSkeleton';
import NewsfeedSkeleton from './components/NewsfeedSkeleton';

function LoadingSpinner() {
  return (
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
        />
      </svg>
      <span>Lade Admin Panel...</span>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

interface AdminAppProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function AdminApp({ currentView, setCurrentView }: AdminAppProps) {
  const { data: session } = useSession();
  const { isLoading: dataLoading } = useDataStore();
  const [lastAuthCheck, setLastAuthCheck] = useState<number>(Date.now());
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const mountedComponents = useRef<Set<string>>(new Set());

  // Auth check nur alle 10 Minuten
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastAuthCheck > 600000) { // 10 Minuten
        console.log('🔐 Performing scheduled auth check...');
        if (!session || (session.user as any)?.role !== 'admin') {
          window.location.href = '/admin/login';
        }
        setLastAuthCheck(now);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [session, lastAuthCheck]);

  // Initial auth check
  useEffect(() => {
    if (!session || (session.user as any)?.role !== 'admin') {
      window.location.href = '/admin/login';
    }
  }, []);

  // Mark component as mounted
  useEffect(() => {
    mountedComponents.current.add(currentView);
    setIsInitialLoad(false);
  }, [currentView]);

  // Alle Komponenten werden gerendert aber nur die aktuelle angezeigt
  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      {/* Dashboard */}
      <div style={{
        display: currentView === 'dashboard' ? 'block' : 'none',
        width: '100%'
      }}>
        {(currentView === 'dashboard' || mountedComponents.current.has('dashboard')) && (
          <DashboardPage />
        )}
      </div>

      {/* Newsfeed */}
      <div style={{
        display: currentView === 'newsfeed' ? 'block' : 'none',
        width: '100%'
      }}>
        {dataLoading && currentView === 'newsfeed' ? (
          <NewsfeedSkeleton />
        ) : (
          (currentView === 'newsfeed' || mountedComponents.current.has('newsfeed')) && (
            <NewsfeedPage />
          )
        )}
      </div>

      {/* Create Newsfeed */}
      <div style={{
        display: currentView === 'newsfeed-create' ? 'block' : 'none',
        width: '100%'
      }}>
        {(currentView === 'newsfeed-create' || mountedComponents.current.has('newsfeed-create')) && (
          <CreateNewsfeedPage />
        )}
      </div>

      {/* Media */}
      <div style={{
        display: currentView === 'media' ? 'block' : 'none',
        width: '100%'
      }}>
        {(currentView === 'media' || mountedComponents.current.has('media')) && (
          <MediaPage />
        )}
      </div>

      {/* Users */}
      <div style={{
        display: currentView === 'users' ? 'block' : 'none',
        width: '100%'
      }}>
        {(currentView === 'users' || mountedComponents.current.has('users')) && (
          <UsersPage />
        )}
      </div>

      {/* Authors */}
      <div style={{
        display: currentView === 'authors' ? 'block' : 'none',
        width: '100%'
      }}>
        {(currentView === 'authors' || mountedComponents.current.has('authors')) && (
          <AuthorsPage />
        )}
      </div>

      {/* Initial Loading */}
      {isInitialLoad && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)'
        }}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}