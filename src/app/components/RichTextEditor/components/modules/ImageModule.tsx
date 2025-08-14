interface ImageModuleProps {
  data: any;
  onChange: (data: any) => void;
  editingModuleId: string | null;
  onSave: () => void;
  onCancel: () => void;
  onOpenMediaModal: () => void;
  onContentChange: () => void;
  heightInputRef?: React.RefObject<HTMLInputElement>;
  startIncrement?: () => void;
  startDecrement?: () => void;
  stopIncrement?: () => void;
  stopDecrement?: () => void;
}

export default function ImageModule({
  data,
  onChange,
  editingModuleId,
  onSave,
  onCancel,
  onOpenMediaModal,
  onContentChange,
  heightInputRef,
  startIncrement,
  startDecrement,
  stopIncrement,
  stopDecrement
}: ImageModuleProps) {

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
        {/* Bildvorschau */}
        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Bildvorschau
          </label>
          <div
            style={{
              width: '100%',
              height: '120px',
              border: '2px dashed rgba(248, 223, 165, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              background: 'rgba(0, 0, 0, 0.1)',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
            onClick={onOpenMediaModal}
          >
            {data.url ? (
              <img 
                src={data.url}
                alt={data.alt || 'Vorschau'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                textAlign: 'center',
                color: 'rgba(248, 223, 165, 0.6)',
                padding: '2rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
                <div style={{ fontSize: '0.9rem' }}>
                  Klicken Sie hier, um ein Bild auszuwählen
                </div>
              </div>
            )}
          </div>
          {data.url && (
            <div style={{
              fontSize: '0.8rem',
              color: 'rgba(248, 223, 165, 0.6)',
              marginTop: '0.5rem',
              textAlign: 'center'
            }}>
              Finale Höhe: {data.height || 300}px
            </div>
          )}
        </div>

        {/* Buttons für Medienauswahl */}
        <div className="form-group">
          <button 
            type="button"
            onClick={onOpenMediaModal}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '6px',
              color: '#f8dfa5',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📁 Bild aus Mediathek wählen
          </button>
          {data.url && (
            <button 
              type="button"
              onClick={() => onChange({...data, url: ''})}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '6px',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '0.8rem',
                marginTop: '0.5rem'
              }}
            >
              🗑️ Bild entfernen
            </button>
          )}
        </div>

        {/* Alt-Text */}
        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Alt-Text (für Barrierefreiheit)
          </label>
          <input 
            type="text" 
            value={data.alt || ''}
            onChange={(e) => onChange({...data, alt: e.target.value})}
            placeholder="Beschreibung des Bildes"
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

        {/* Bildunterschrift/Caption */}
        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Bildunterschrift (optional)
          </label>
          <input 
            type="text" 
            value={data.caption || ''}
            onChange={(e) => onChange({...data, caption: e.target.value})}
            placeholder="Quelle, Copyright oder Beschreibung..."
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
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(248, 223, 165, 0.6)',
            marginTop: '0.5rem'
          }}>
            💡 Wird unter dem Bild angezeigt (z.B. für Quellen oder Copyright)
          </div>
        </div>

        {/* Höhe */}
        <div className="form-group">
          <label style={{
            display: 'block',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Höhe (px)
          </label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <input 
              ref={heightInputRef}
              type="number" 
              defaultValue={data.height || 300}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 100 && value <= 800) {
                  onChange({...data, height: value});
                  onContentChange();
                }
              }}
              onBlur={(e) => {
                const value = parseInt(e.target.value);
                let finalValue = value;
                if (isNaN(value) || value < 100) {
                  finalValue = 100;
                } else if (value > 800) {
                  finalValue = 800;
                }
                            if (heightInputRef?.current) {
              heightInputRef.current.value = finalValue.toString();
                }
                onChange({...data, height: finalValue});
                onContentChange();
              }}
              placeholder="300"
              min="100"
              max="800"
              autoComplete="off"
              style={{
                paddingRight: '3rem',
                flex: 1,
                padding: '0.75rem',
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '6px',
                color: '#f8dfa5',
                fontSize: '0.875rem'
              }}
              className="height-number-input"
            />
            <div style={{
              position: 'absolute',
              right: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <button
                type="button"
                              onMouseDown={startIncrement}
              onMouseUp={stopIncrement}
              onMouseLeave={stopIncrement}
              onTouchStart={startIncrement}
              onTouchEnd={stopIncrement}
                style={{
                  width: '20px',
                  height: '12px',
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '2px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '8px',
                  lineHeight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none'
                }}
              >
                ▲
              </button>
              <button
                type="button"
                              onMouseDown={startDecrement}
              onMouseUp={stopDecrement}
              onMouseLeave={stopDecrement}
              onTouchStart={startDecrement}
              onTouchEnd={stopDecrement}
                style={{
                  width: '20px',
                  height: '12px',
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '2px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '8px',
                  lineHeight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none'
                }}
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '1rem'
        }}>
          {editingModuleId ? (
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '6px',
              color: '#22c55e',
              padding: '0.75rem',
              fontSize: '0.875rem',
              textAlign: 'center',
              flex: 1
            }}>
              ✓ Änderungen werden automatisch gespeichert
            </div>
          ) : (
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
              Einfügen
            </button>
          )}
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