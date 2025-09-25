interface ExchangeCTAProps {
  exchangeName: string;
  bonus?: string;
  features: string[];
  ctaText: string;
  onClick?: () => void;
}

export function ExchangeCTA({ exchangeName, bonus, features, ctaText, onClick }: ExchangeCTAProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
      border: '2px solid rgba(248, 223, 165, 0.3)',
      borderRadius: '1.5rem',
      padding: '2.5rem',
      textAlign: 'center',
      marginTop: '3rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(45deg, transparent 30%, rgba(248, 223, 165, 0.05) 50%, transparent 70%)',
        animation: 'shine 3s ease-in-out infinite'
      }} />

      <div style={{ position: 'relative' }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          🚀
        </div>

        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '0.5rem',
          margin: '0 0 0.5rem 0'
        }}>
          Jetzt bei {exchangeName} starten!
        </h2>

        {bonus && (
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}>
            💰 {bonus}
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: '#d1d5db'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#22c55e' }}>✓</span>
              {feature}
            </div>
          ))}
        </div>

        <button
          onClick={onClick}
          style={{
            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            color: '#1a1a2e',
            border: 'none',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            borderRadius: '3rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          {ctaText} →
        </button>

        <p style={{
          color: '#9ca3af',
          fontSize: '0.8rem',
          marginTop: '1rem',
          margin: '1rem 0 0 0'
        }}>
          Reguliert • Sicher • Millionen Nutzer vertrauen bereits
        </p>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}