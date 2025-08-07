interface HighlightModuleProps {
  data: any;
  onChange: (data: any) => void;
  editingModuleId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function HighlightModule({
  data,
  onChange,
  editingModuleId,
  onSave,
  onCancel
}: HighlightModuleProps) {
  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: 'rgba(248, 223, 165, 0.1)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '6px',
            color: '#f8dfa5',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          ← Zurück
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Label
          </label>
          <input 
            type="text" 
            value={data.label || ''}
            onChange={(e) => onChange({...data, label: e.target.value})}
            placeholder="HIGHLIGHT"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '6px',
              color: '#f8dfa5',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Text
          </label>
          <textarea 
            value={data.text || ''}
            onChange={(e) => onChange({...data, text: e.target.value})}
            placeholder="Wichtiger Hinweis..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '6px',
              color: '#f8dfa5',
              fontSize: '0.875rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Vorschau
          </label>
          <div style={{
            padding: '1rem',
            background: 'rgba(248, 223, 165, 0.1)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '6px'
          }}>
            <div style={{
              color: '#f8dfa5',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              {data.label || 'HIGHLIGHT'}
            </div>
            <p style={{
              margin: 0,
              color: '#f8dfa5',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              {data.text || 'Wichtiger Hinweis...'}
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '1rem'
        }}>
          <button
            type="button"
            onClick={onSave}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '6px',
              color: '#22c55e',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            {editingModuleId ? 'Aktualisieren' : 'Einfügen'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'rgba(107, 114, 128, 0.1)',
              border: '1px solid rgba(107, 114, 128, 0.3)',
              borderRadius: '6px',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
} 