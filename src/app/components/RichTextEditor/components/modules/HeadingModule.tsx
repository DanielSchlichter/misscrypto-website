interface HeadingModuleProps {
  data: any;
  onChange: (data: any) => void;
  editingModuleId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function HeadingModule({
  data,
  onChange,
  editingModuleId,
  onSave,
  onCancel
}: HeadingModuleProps) {
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
        {/* Nummer */}
        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Nummer
          </label>
          <input 
            type="text" 
            value={data.number || ''}
            onChange={(e) => onChange({...data, number: e.target.value})}
            placeholder="1"
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

        {/* Titel */}
        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Titel
          </label>
          <input 
            type="text" 
            value={data.title || ''}
            onChange={(e) => onChange({...data, title: e.target.value})}
            placeholder="Überschrift eingeben"
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

        {/* Vorschau */}
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
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{
              background: '#f8dfa5',
              color: '#1a1a1a',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '700',
              minWidth: '3rem',
              textAlign: 'center'
            }}>
              {data.number || '1'}
            </span>
            <h2 style={{
              margin: 0,
              color: '#f8dfa5',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              {data.title || 'Überschrift'}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
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