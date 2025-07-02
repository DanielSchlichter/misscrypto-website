'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NewsletterFormProps {
  isMobile?: boolean;
  isTablet?: boolean;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ isMobile = false, isTablet = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [datenschutz, setDatenschutz] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Fehler zurücksetzen, wenn der User tippt
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!datenschutz) {
      setError('Bitte akzeptiere die Datenschutzbestimmungen.');
      return false;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Bitte fülle alle Felder aus.');
      return false;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '' });
        setDatenschutz(false);
      } else {
        setError(data.error || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Newsletter Anmeldung Fehler:', error);
      setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.');
    } finally {
      setIsLoading(false);
    }
    
    return false;
  };

  if (isSuccess) {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1.5rem',
        padding: isMobile ? '2rem' : '2.5rem',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center' as const
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.5rem'
        }}>
          🎉
        </div>
        <h3 style={{
          color: '#22c55e',
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          🎊 Erfolgreich angemeldet!
        </h3>
        <p style={{
          color: '#d1d5db',
          fontSize: isMobile ? '0.9rem' : '1rem',
          lineHeight: '1.6',
          marginBottom: '1.5rem'
        }}>
          🎉 Du hast dich erfolgreich für den Newsletter angemeldet! Du erhältst eine E-Mail zur Bestätigung.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          style={{
            background: 'rgba(248, 223, 165, 0.1)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            color: '#f8dfa5',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
          }}
        >
          Weitere Anmeldung
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1.5rem',
      padding: isMobile ? '2rem' : '2.5rem',
      border: '1px solid rgba(248, 223, 165, 0.3)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}>
      <form 
        onSubmit={handleSubmit} 
        method="POST"
        action="#"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem' 
        }}
      >
        <div>
          <label htmlFor="name" style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Dein Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Max Mustermann"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              padding: isMobile ? '0.875rem' : '1rem',
              borderRadius: '0.75rem',
              border: `1px solid ${error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(248, 223, 165, 0.3)'}`,
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#ffffff',
              fontSize: isMobile ? '0.9rem' : '1rem',
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
          <label htmlFor="email" style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Deine E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="max@beispiel.de"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              padding: isMobile ? '0.875rem' : '1rem',
              borderRadius: '0.75rem',
              border: `1px solid ${error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(248, 223, 165, 0.3)'}`,
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#ffffff',
              fontSize: isMobile ? '0.9rem' : '1rem',
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

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            color: '#fca5a5',
            fontSize: isMobile ? '0.8rem' : '0.875rem'
          }}>
            {error}
          </div>
        )}
        
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <input
            type="checkbox"
            id="datenschutz"
            checked={datenschutz}
            onChange={(e) => setDatenschutz(e.target.checked)}
            required
            disabled={isLoading}
            style={{
              marginTop: '0.25rem',
              accentColor: '#f8dfa5',
              transform: isMobile ? 'scale(1.1)' : 'scale(1.2)'
            }}
          />
          <label
            htmlFor="datenschutz"
            style={{
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              color: '#9ca3af',
              lineHeight: '1.4'
            }}
          >
            Ich stimme den{' '}
            <Link href="/datenschutz" style={{
              color: '#f8dfa5',
              textDecoration: 'underline',
              transition: 'color 0.3s ease'
            }}>
              Datenschutzbestimmungen
            </Link>
            {' '}zu und akzeptiere den Erhalt des Newsletters.
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          onClick={(e) => {
            if (!formData.name.trim() || !formData.email.trim() || !datenschutz) {
              e.preventDefault();
              return;
            }
          }}
          style={{
            width: '100%',
            padding: isMobile ? '0.875rem' : '1rem',
            borderRadius: '0.75rem',
            border: 'none',
            background: isLoading 
              ? 'rgba(156, 163, 175, 0.5)' 
              : 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            color: isLoading ? '#6b7280' : '#000000',
            fontSize: isMobile ? '0.95rem' : '1rem',
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
              Wird angemeldet...
            </>
          ) : (
            'Newsletter abonnieren'
          )}
        </button>
      </form>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NewsletterForm; 