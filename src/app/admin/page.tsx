'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatische Weiterleitung zum Dashboard
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
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
            stroke="#f8dfa5" 
            strokeWidth="4" 
            fill="none" 
            strokeDasharray="32" 
            strokeDashoffset="32"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        </svg>
        <span>Weiterleitung zum Dashboard...</span>
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