'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [screenWidth, setScreenWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/admin/dashboard'
      });

      if (result?.error) {
        setError('Ungültige Anmeldedaten');
        setIsLoading(false);
      } else {
        // Sofortige Weiterleitung
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      setError('Ein Fehler ist aufgetreten');
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '2rem',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 20%, rgba(248, 223, 165, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(248, 223, 165, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: isMobile ? '2rem' : '3rem',
        border: '1px solid rgba(248, 223, 165, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            marginBottom: '1rem'
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            Admin Login
          </h1>
          <p style={{
            color: '#d1d5db',
            fontSize: '0.9rem'
          }}>
            MissCrypto Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#f8dfa5',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="admin@misscrypto.de"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: `1px solid ${error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(248, 223, 165, 0.3)'}`,
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffffff',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box' as const,
                opacity: isLoading ? 0.7 : 1
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f8dfa5';
                e.target.style.background = 'rgba(0, 0, 0, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(248, 223, 165, 0.3)';
                e.target.style.background = 'rgba(0, 0, 0, 0.3)';
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#f8dfa5',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="admin123"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: `1px solid ${error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(248, 223, 165, 0.3)'}`,
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffffff',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box' as const,
                opacity: isLoading ? 0.7 : 1
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f8dfa5';
                e.target.style.background = 'rgba(0, 0, 0, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(248, 223, 165, 0.3)';
                e.target.style.background = 'rgba(0, 0, 0, 0.3)';
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              color: '#fca5a5',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: isLoading 
                ? 'rgba(156, 163, 175, 0.5)' 
                : 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              color: isLoading ? '#6b7280' : '#000000',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 223, 165, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? (
              <>
                <svg 
                  style={{ 
                    animation: 'spin 1s linear infinite',
                    width: '16px',
                    height: '16px'
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
                Anmelden...
              </>
            ) : (
              'Anmelden'
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(248, 223, 165, 0.2)'
        }}>
          <Link href="/" style={{
            color: '#d1d5db',
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'color 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#f8dfa5';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#d1d5db';
          }}
          >
            ← Zurück zur Website
          </Link>
        </div>


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