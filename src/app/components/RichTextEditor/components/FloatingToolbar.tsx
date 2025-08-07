import { forwardRef } from 'react';

interface FloatingToolbarProps {
  onFormatText: (format: string, value?: string) => void;
  onClose: () => void;
}

const FloatingToolbar = forwardRef<HTMLDivElement, FloatingToolbarProps>(
  ({ onFormatText, onClose }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: 'fixed',
          zIndex: 1000,
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '6px',
          padding: '0.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <button
          type="button"
          onClick={() => onFormatText('bold')}
          style={{
            background: 'rgba(248, 223, 165, 0.1)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '4px',
            color: '#f8dfa5',
            padding: '0.375rem 0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            minWidth: '32px'
          }}
        >
          B
        </button>
        
        <button
          type="button"
          onClick={() => onFormatText('italic')}
          style={{
            background: 'rgba(248, 223, 165, 0.1)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '4px',
            color: '#f8dfa5',
            padding: '0.375rem 0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            minWidth: '32px'
          }}
        >
          I
        </button>
        
        <button
          type="button"
          onClick={() => onFormatText('underline')}
          style={{
            background: 'rgba(248, 223, 165, 0.1)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '4px',
            color: '#f8dfa5',
            padding: '0.375rem 0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            textDecoration: 'underline',
            minWidth: '32px'
          }}
        >
          U
        </button>

        <div style={{ width: '1px', height: '20px', background: '#333', margin: '0 0.25rem' }} />

        <select
          onChange={(e) => onFormatText('fontSize', e.target.value)}
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '4px',
            color: '#f8dfa5',
            padding: '0.25rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          <option value="">Größe</option>
          <option value="0.75rem">Klein</option>
          <option value="1rem">Normal</option>
          <option value="1.25rem">Groß</option>
          <option value="1.5rem">XL</option>
        </select>

        <input
          type="color"
          onChange={(e) => onFormatText('color', e.target.value)}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '4px',
            cursor: 'pointer',
            background: 'transparent'
          }}
        />

        <div style={{ width: '1px', height: '20px', background: '#333', margin: '0 0.25rem' }} />

        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '4px',
            color: '#ef4444',
            padding: '0.375rem 0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            minWidth: '32px'
          }}
        >
          ✕
        </button>
      </div>
    );
  }
);

FloatingToolbar.displayName = 'FloatingToolbar';

export default FloatingToolbar; 