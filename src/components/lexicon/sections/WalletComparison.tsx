interface WalletComparisonProps {
  headers: string[];
  rows: Array<{
    type: string;
    values: string[];
  }>;
}

export function WalletComparison({ headers, rows }: WalletComparisonProps) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        📊 Welche Wallet passt zu dir?
      </h2>

      <div style={{
        background: 'rgba(17, 24, 39, 0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #374151',
        borderRadius: '1rem',
        padding: '1.5rem',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.9rem'
        }}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} style={{
                  textAlign: 'left',
                  padding: '1rem 0.75rem',
                  borderBottom: '2px solid #374151',
                  color: '#f8dfa5',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} style={{
                borderBottom: rowIndex < rows.length - 1 ? '1px solid #374151' : 'none'
              }}>
                <td style={{
                  padding: '1rem 0.75rem',
                  color: '#f8dfa5',
                  fontWeight: '600'
                }}>
                  {row.type}
                </td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} style={{
                    padding: '1rem 0.75rem',
                    color: '#d1d5db',
                    lineHeight: '1.4'
                  }}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}