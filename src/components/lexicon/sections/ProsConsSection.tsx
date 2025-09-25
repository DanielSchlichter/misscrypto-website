interface ProsConsSectionProps {
  pros: string[];
  cons: string[];
  prosTitle?: string;
  consTitle?: string;
}

export function ProsConsSection({ pros, cons, prosTitle = "Vorteile", consTitle = "Nachteile" }: ProsConsSectionProps) {
  const defaultProsTitle = prosTitle === "Vorteile" ? "Vorteile" : prosTitle;
  const defaultConsTitle = consTitle === "Nachteile" ? "Nachteile" : consTitle;

  // Use different colors based on title context
  const isNegative = defaultConsTitle.toLowerCase().includes('nachteil') || defaultConsTitle.toLowerCase().includes('risik');
  const consColor = isNegative ? '#ef4444' : '#f59e0b'; // Red for negatives, amber for info
  const consBackground = isNegative ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)';
  const consBorder = isNegative ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)';
  const consIcon = isNegative ? '❌' : '⚠️'; // X for negatives, warning for info

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        ⚖️ {defaultProsTitle} & {defaultConsTitle}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Vorteile */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '0.75rem',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#22c55e',
            marginBottom: '1rem',
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✅ {defaultProsTitle}
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {pros.map((pro, index) => (
              <li key={index} style={{
                color: '#d1d5db',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>+</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nachteile */}
        <div style={{
          background: consBackground,
          border: `1px solid ${consBorder}`,
          borderRadius: '0.75rem',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: consColor,
            marginBottom: '1rem',
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {consIcon} {defaultConsTitle}
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {cons.map((con, index) => (
              <li key={index} style={{
                color: '#d1d5db',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: consColor, fontWeight: 'bold' }}>-</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}