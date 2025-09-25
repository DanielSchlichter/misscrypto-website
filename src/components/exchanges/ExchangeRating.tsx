interface ExchangeRatingProps {
  rating: number;
  totalUsers?: string;
  title?: string;
}

export function ExchangeRating({ rating, totalUsers, title = "Nutzerbewertung" }: ExchangeRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.05), rgba(228, 177, 94, 0.05))',
      border: '1px solid rgba(248, 223, 165, 0.2)',
      borderRadius: '1rem',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '15px',
        fontSize: '4rem',
        opacity: '0.05',
        color: '#f8dfa5'
      }}>
        ⭐
      </div>

      <div style={{ position: 'relative' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#f8dfa5',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          {title}
        </h3>

        {/* Star Rating */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.25rem',
          marginBottom: '1rem'
        }}>
          {stars.map((star) => (
            <span
              key={star}
              style={{
                fontSize: '1.5rem',
                color: star <= rating ? '#fbbf24' : '#374151'
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Rating Number */}
        <div style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#f8dfa5',
          marginBottom: '0.5rem'
        }}>
          {rating.toFixed(1)}/5.0
        </div>

        {totalUsers && (
          <p style={{
            color: '#9ca3af',
            fontSize: '0.9rem',
            margin: 0
          }}>
            Basierend auf {totalUsers} Nutzern
          </p>
        )}
      </div>
    </div>
  );
}