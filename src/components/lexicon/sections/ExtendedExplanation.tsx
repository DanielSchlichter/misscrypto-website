interface ExtendedExplanationProps {
  content: string;
}

// Simple markdown-to-JSX converter for basic formatting
function parseMarkdown(text: string) {
  // Convert **bold** to <strong>
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  text.replace(boldRegex, (match, boldText, offset) => {
    // Add text before the bold part
    if (offset > lastIndex) {
      parts.push(text.slice(lastIndex, offset));
    }
    // Add the bold part
    parts.push(<strong key={offset} style={{ fontWeight: '600', color: '#f8dfa5' }}>{boldText}</strong>);
    lastIndex = offset + match.length;
    return match;
  });

  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function ExtendedExplanation({ content }: ExtendedExplanationProps) {
  return (
    <div style={{
      background: 'rgba(17, 24, 39, 0.5)',
      backdropFilter: 'blur(8px)',
      border: '1px solid #374151',
      borderRadius: '1rem',
      padding: '2rem',
      marginBottom: '3rem'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        🔍 Ausführliche Erklärung
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index} style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>
            {parseMarkdown(paragraph)}
          </p>
        ))}
      </div>
    </div>
  );
}