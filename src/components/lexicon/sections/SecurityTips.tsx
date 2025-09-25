interface SecurityTipsProps {
  tips: string[];
}

export function SecurityTips({ tips }: SecurityTipsProps) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        🔐 Sicherheitstipps aus der Erfahrung
      </h2>

      <div style={{
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(22, 163, 74, 0.05))',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        borderRadius: '1rem',
        padding: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {tips.map((tip, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(17, 24, 39, 0.3)',
                borderRadius: '0.75rem',
                border: '1px solid #374151',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Numbered Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '50%',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                {index + 1}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{
                  color: '#e5e7eb',
                  lineHeight: '1.6',
                  margin: 0,
                  fontSize: '1rem'
                }}>
                  {tip}
                </p>
              </div>

              {/* Security Icon */}
              <div style={{
                fontSize: '1.25rem',
                opacity: '0.7'
              }}>
                🛡️
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}