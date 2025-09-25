import { LexiconTerm } from '@/data/lexicon-terms';

interface DefinitionBoxProps {
  term: LexiconTerm;
}

export function DefinitionBox({ term }: DefinitionBoxProps) {
  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
      border: '1px solid rgba(248, 223, 165, 0.3)',
      borderRadius: '1rem',
      marginBottom: '3rem'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#f8dfa5',
        margin: '0 0 1rem 0'
      }}>
        📖 Definition
      </h2>
      <p style={{
        fontSize: '1.125rem',
        color: '#e5e7eb',
        lineHeight: '1.6',
        margin: 0
      }}>
        {term.definition}
      </p>
    </div>
  );
}