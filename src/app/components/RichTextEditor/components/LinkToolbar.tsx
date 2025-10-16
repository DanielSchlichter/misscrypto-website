'use client';

import { useState, useEffect, useRef } from 'react';

interface LinkToolbarProps {
  isVisible: boolean;
  selectedText: string;
  onCreateLink: (url: string) => void;
  onCancel: () => void;
}

export default function LinkToolbar({
  isVisible,
  selectedText,
  onCreateLink,
  onCancel
}: LinkToolbarProps) {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  // Reset URL when component becomes visible
  useEffect(() => {
    if (isVisible) {
      setUrl('');
      setIsValidUrl(false);
    }
  }, [isVisible]);

  // Validate URL
  useEffect(() => {
    if (!url.trim()) {
      setIsValidUrl(false);
      return;
    }

    try {
      // Check if it's a valid URL or starts with http/https
      const urlPattern = /^(https?:\/\/)|(www\.)|([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)/;
      setIsValidUrl(urlPattern.test(url.trim()));
    } catch {
      setIsValidUrl(false);
    }
  }, [url]);

  const handleCreateLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidUrl) return;

    let finalUrl = url.trim();

    // Add https:// if no protocol is specified
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      if (finalUrl.startsWith('www.') || finalUrl.includes('.')) {
        finalUrl = `https://${finalUrl}`;
      }
    }

    onCreateLink(finalUrl);
  };


  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(248, 223, 165, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem',
        zIndex: 10000,
        minWidth: '400px',
        maxWidth: '90vw',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{
          color: '#f8dfa5',
          fontSize: '1.1rem',
          fontWeight: '600',
          margin: '0 0 0.5rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🔗 Link erstellen
        </h3>
        {selectedText && (
          <p style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            margin: '0',
            background: 'rgba(248, 223, 165, 0.1)',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid rgba(248, 223, 165, 0.2)'
          }}>
            <strong>Ausgewählter Text:</strong> "{selectedText}"
          </p>
        )}
      </div>

      {/* Input Section */}
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>
            URL eingeben
          </label>
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onCancel();
              } else if (e.key === 'Enter') {
                e.preventDefault();
                if (isValidUrl) {
                  handleCreateLinkClick(e as any);
                }
              }
            }}
            placeholder="https://example.com oder www.example.com"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${isValidUrl ? 'rgba(34, 197, 94, 0.5)' : 'rgba(248, 223, 165, 0.3)'}`,
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              boxSizing: 'border-box'
            }}
          />
          {url && !isValidUrl && (
            <p style={{
              color: '#ef4444',
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              margin: '0.25rem 0 0 0'
            }}>
              ⚠️ Bitte geben Sie eine gültige URL ein
            </p>
          )}
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCancel();
            }}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(156, 163, 175, 0.2)',
              border: '1px solid rgba(156, 163, 175, 0.3)',
              borderRadius: '6px',
              color: '#9ca3af',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={handleCreateLinkClick}
            disabled={!isValidUrl}
            style={{
              padding: '0.5rem 1rem',
              background: isValidUrl
                ? 'linear-gradient(135deg, #f8dfa5, #e4b15e)'
                : 'rgba(156, 163, 175, 0.3)',
              border: 'none',
              borderRadius: '6px',
              color: isValidUrl ? '#000000' : '#6b7280',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: isValidUrl ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            🔗 Link erstellen
          </button>
        </div>
      </div>

      {/* Tips */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: 'rgba(248, 223, 165, 0.05)',
        borderRadius: '6px',
        border: '1px solid rgba(248, 223, 165, 0.1)'
      }}>
        <p style={{
          color: '#9ca3af',
          fontSize: '0.75rem',
          margin: '0',
          lineHeight: '1.4'
        }}>
          💡 <strong>Tipp:</strong> Sie können URLs mit oder ohne "https://" eingeben.
          Externe Links öffnen automatisch in einem neuen Tab.
        </p>
      </div>
    </div>
  );
}