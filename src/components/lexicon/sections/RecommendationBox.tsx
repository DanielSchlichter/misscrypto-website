interface RecommendationBoxProps {
  recommendations: Array<{
    title: string;
    description: string;
    link?: string;
    linkText?: string;
    icon: string;
  }>;
}

export function RecommendationBox({ recommendations }: RecommendationBoxProps) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        🎯 Empfehlungen aus der Praxis
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {recommendations.map((rec, index) => (
          <div
            key={index}
            style={{
              background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.05), rgba(228, 177, 94, 0.05))',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Icon */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              fontSize: '3rem',
              opacity: '0.1',
              color: '#f8dfa5'
            }}>
              {rec.icon}
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{rec.icon}</span>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#f8dfa5',
                  margin: 0
                }}>
                  {rec.title}
                </h3>
              </div>

              <p style={{
                color: '#d1d5db',
                lineHeight: '1.6',
                margin: '0 0 1rem 0',
                fontSize: '0.95rem'
              }}>
                {rec.description}
              </p>

              {rec.link && rec.linkText && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#1a1a2e',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}>
                  👉 {rec.linkText}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}