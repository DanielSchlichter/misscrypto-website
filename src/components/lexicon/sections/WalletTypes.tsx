interface WalletTypesProps {
  hotWallet: {
    title: string;
    description: string;
    features: string[];
    icon: string;
  };
  coldWallet: {
    title: string;
    description: string;
    features: string[];
    icon: string;
  };
}

export function WalletTypes({ hotWallet, coldWallet }: WalletTypesProps) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        💼 Wallet-Typen im Vergleich
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Hot Wallet */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 101, 101, 0.05), rgba(239, 68, 68, 0.05))',
          border: '1px solid rgba(245, 101, 101, 0.3)',
          borderRadius: '1rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Icon */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '4rem',
            opacity: '0.1',
            color: '#f56565'
          }}>
            {hotWallet.icon}
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>{hotWallet.icon}</span>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#f56565',
                margin: 0
              }}>
                {hotWallet.title}
              </h3>
            </div>

            <p style={{
              color: '#d1d5db',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              {hotWallet.description}
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {hotWallet.features.map((feature, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#e5e7eb',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ color: '#f56565', fontSize: '1rem' }}>•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cold Wallet */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.05))',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '1rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Icon */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '4rem',
            opacity: '0.1',
            color: '#3b82f6'
          }}>
            {coldWallet.icon}
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>{coldWallet.icon}</span>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#3b82f6',
                margin: 0
              }}>
                {coldWallet.title}
              </h3>
            </div>

            <p style={{
              color: '#d1d5db',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              {coldWallet.description}
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {coldWallet.features.map((feature, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#e5e7eb',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ color: '#3b82f6', fontSize: '1rem' }}>•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}