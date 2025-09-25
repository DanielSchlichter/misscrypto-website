interface ExchangeComparisonProps {
  title: string;
  data: Array<{
    feature: string;
    thisExchange: string;
    competitors: Array<{
      name: string;
      value: string;
    }>;
  }>;
}

export function ExchangeComparison({ title, data }: ExchangeComparisonProps) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0',
        textAlign: 'center'
      }}>
        📊 {title}
      </h2>

      <div style={{
        background: 'rgba(17, 24, 39, 0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #374151',
        borderRadius: '1rem',
        padding: '1.5rem',
        overflowX: 'auto'
      }}>
        {data.map((row, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '2rem',
              alignItems: 'center',
              paddingBottom: index < data.length - 1 ? '1.5rem' : '0',
              marginBottom: index < data.length - 1 ? '1.5rem' : '0',
              borderBottom: index < data.length - 1 ? '1px solid #374151' : 'none'
            }}
          >
            {/* Feature Name */}
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#f8dfa5',
                marginBottom: '0.5rem',
                margin: '0 0 0.5rem 0'
              }}>
                {row.feature}
              </h3>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#22c55e',
                marginBottom: '0.5rem'
              }}>
                {row.thisExchange}
              </div>
              {row.competitors.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: '#9ca3af'
                }}>
                  {row.competitors.map((competitor, compIndex) => (
                    <span key={compIndex}>
                      {competitor.name}: <span style={{ color: '#ef4444' }}>{competitor.value}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Winner Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '2rem',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}>
              🏆 Testsieger
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}