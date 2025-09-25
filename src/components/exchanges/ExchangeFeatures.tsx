interface ExchangeFeaturesProps {
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export function ExchangeFeatures({ features }: ExchangeFeaturesProps) {
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
        Sicherheit & Regulierung
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(17, 24, 39, 0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #374151',
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
              {feature.icon}
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                  background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  borderRadius: '0.75rem'
                }}>
                  {feature.icon}
                </span>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#f8dfa5',
                  margin: 0
                }}>
                  {feature.title}
                </h3>
              </div>

              <p style={{
                color: '#d1d5db',
                lineHeight: '1.6',
                margin: 0,
                fontSize: '0.95rem'
              }}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}