interface ComparisonSectionProps {
  title: string;
  items: Array<{
    name: string;
    description: string;
  }>;
}

export function ComparisonSection({ title, items }: ComparisonSectionProps) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        🔍 {title}
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(17, 24, 39, 0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #374151',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              transition: 'border-color 0.2s'
            }}
          >
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#f8dfa5',
              marginBottom: '0.75rem',
              margin: '0 0 0.75rem 0'
            }}>
              {item.name}
            </h3>
            <p style={{
              color: '#d1d5db',
              lineHeight: '1.6',
              margin: 0
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}