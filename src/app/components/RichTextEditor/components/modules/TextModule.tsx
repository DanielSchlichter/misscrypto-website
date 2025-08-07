import { TextModuleData } from '../../types';

interface TextModuleProps {
  data: TextModuleData;
  onChange: (data: TextModuleData) => void;
  editingModuleId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function TextModule({
  data,
  onChange,
  editingModuleId,
  onSave,
  onCancel
}: TextModuleProps) {
  const handleSave = () => {
    if (data.content.trim()) {
      onSave();
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{
        margin: '0 0 1.5rem 0',
        color: '#f8dfa5',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        📝 Text-Modul
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Text Content */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Text-Inhalt *
          </label>
          <textarea
            value={data.content || ''}
            onChange={(e) => onChange({ ...data, content: e.target.value })}
            placeholder="Geben Sie hier Ihren Text ein..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '6px',
              color: '#f8dfa5',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Font Size */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Schriftgröße
          </label>
          <select
            value={data.fontSize || 'medium'}
            onChange={(e) => onChange({ ...data, fontSize: e.target.value as 'small' | 'medium' | 'large' })}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#f8dfa5',
              fontSize: '0.875rem'
            }}
          >
            <option value="small">Klein</option>
            <option value="medium">Mittel</option>
            <option value="large">Groß</option>
          </select>
        </div>

        {/* Text Alignment */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Text-Ausrichtung
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['left', 'center', 'right', 'justify'] as const).map((alignment) => (
              <button
                key={alignment}
                type="button"
                onClick={() => onChange({ ...data, alignment })}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  background: data.alignment === alignment ? 'rgba(248, 223, 165, 0.2)' : 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '4px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  textAlign: alignment === 'left' ? 'left' : alignment === 'center' ? 'center' : alignment === 'right' ? 'right' : 'justify'
                }}
              >
                {alignment === 'left' && '⬅️'}
                {alignment === 'center' && '↔️'}
                {alignment === 'right' && '➡️'}
                {alignment === 'justify' && '↔️↔️'}
              </button>
            ))}
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#f8dfa5',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Text-Farbe
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { value: '#f8dfa5', label: 'Standard', color: '#f8dfa5' },
              { value: '#ffffff', label: 'Weiß', color: '#ffffff' },
              { value: '#e4b15e', label: 'Gold', color: '#e4b15e' },
              { value: '#9ca3af', label: 'Grau', color: '#9ca3af' },
              { value: '#10b981', label: 'Grün', color: '#10b981' },
              { value: '#ef4444', label: 'Rot', color: '#ef4444' }
            ].map((colorOption) => (
              <button
                key={colorOption.value}
                type="button"
                onClick={() => onChange({ ...data, color: colorOption.value })}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  background: data.color === colorOption.value ? 'rgba(248, 223, 165, 0.2)' : 'rgba(248, 223, 165, 0.1)',
                  border: `1px solid ${data.color === colorOption.value ? colorOption.color : 'rgba(248, 223, 165, 0.3)'}`,
                  borderRadius: '4px',
                  color: colorOption.color,
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}
              >
                {colorOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {data.content && (
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#f8dfa5',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Vorschau
            </label>
            <div style={{
              padding: '1rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '6px',
              color: data.color || '#f8dfa5',
              fontSize: data.fontSize === 'small' ? '0.875rem' : data.fontSize === 'large' ? '1.125rem' : '1rem',
              textAlign: data.alignment || 'left',
              lineHeight: '1.6',
              minHeight: '60px'
            }}>
              {data.content}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={handleSave}
            disabled={!data.content?.trim()}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: data.content?.trim() ? 'rgba(248, 223, 165, 0.2)' : 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '6px',
              color: '#f8dfa5',
              cursor: data.content?.trim() ? 'pointer' : 'not-allowed',
              fontSize: '0.875rem',
              fontWeight: '600',
              opacity: data.content?.trim() ? 1 : 0.5
            }}
          >
            ✅ Speichern
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              color: '#fca5a5',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            ❌ Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}
