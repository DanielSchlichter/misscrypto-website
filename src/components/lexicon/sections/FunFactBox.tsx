interface FunFactBoxProps {
  fact: string;
}

export function FunFactBox({ fact }: FunFactBoxProps) {
  return (
    <div style={{
      marginTop: '3rem',
      marginBottom: '3rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
      border: '1px solid rgba(248, 223, 165, 0.3)',
      borderRadius: '1rem'
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#f8dfa5',
        marginBottom: '1rem',
        margin: '0 0 1rem 0'
      }}>
        Fun Fact 💡
      </h3>
      <p style={{
        fontSize: '1.125rem',
        color: '#e5e7eb',
        lineHeight: '1.6',
        margin: 0
      }}>
        {fact}
      </p>
    </div>
  );
}