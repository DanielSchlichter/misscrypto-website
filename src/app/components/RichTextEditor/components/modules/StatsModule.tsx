interface StatsModuleProps {
  data: any;
  onChange: (data: any) => void;
  editingModuleId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function StatsModule({
  data,
  onChange,
  editingModuleId,
  onSave,
  onCancel
}: StatsModuleProps) {
  const addStatItem = () => {
    const newItems = [...(data.items || []), { value: '100%', label: 'Neue Statistik' }];
    onChange({ ...data, items: newItems });
  };

  const removeStatItem = (index: number) => {
    const newItems = (data.items || []).filter((_: any, i: number) => i !== index);
    onChange({ ...data, items: newItems });
  };

  const updateStatItem = (index: number, field: string, value: string) => {
    const newItems = [...(data.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };

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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <h3 style={{
            margin: 0,
            color: '#f8dfa5',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            Statistik-Einträge
          </h3>
          <button
            type="button"
            onClick={addStatItem}
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '6px',
              color: '#22c55e',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            + Hinzufügen
          </button>
        </div>

        {(data.items || []).map((item: any, index: number) => (
          <div key={index} style={{
            padding: '1rem',
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => removeStatItem(index)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '4px',
                color: '#ef4444',
                padding: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                lineHeight: 1
              }}
            >
              ✕
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#f8dfa5',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem'
                }}>
                  Wert
                </label>
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={(e) => updateStatItem(index, 'value', e.target.value)}
                  placeholder="100%"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#f8dfa5',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: '#f8dfa5',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem'
                }}>
                  Label
                </label>
                <input
                  type="text"
                  value={item.label || ''}
                  onChange={(e) => updateStatItem(index, 'label', e.target.value)}
                  placeholder="Beschreibung"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#f8dfa5',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>
          </div>
        ))}

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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            padding: '1rem',
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px'
          }}>
            {(data.items || []).map((item: any, index: number) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '1rem',
                background: 'rgba(248, 223, 165, 0.1)',
                borderRadius: '6px'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#f8dfa5',
                  marginBottom: '0.5rem'
                }}>
                  {item.value || '100%'}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'rgba(248, 223, 165, 0.8)'
                }}>
                  {item.label || 'Label'}
                </div>
              </div>
            ))}
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