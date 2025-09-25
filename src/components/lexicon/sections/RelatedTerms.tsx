import Link from 'next/link';
import { LexiconTerm, lexiconTerms } from '@/data/lexicon-terms';

interface RelatedTermsProps {
  term: LexiconTerm;
}

export function RelatedTerms({ term }: RelatedTermsProps) {
  if (!term.relatedTerms || term.relatedTerms.length === 0) {
    return null;
  }

  const relatedTerms = term.relatedTerms
    .map(relatedSlug => lexiconTerms.find(t => t.slug === relatedSlug))
    .filter(Boolean) as LexiconTerm[];

  if (relatedTerms.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '4rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '2rem',
        color: 'white',
        margin: '0 0 2rem 0'
      }}>
        🔗 Verwandte Begriffe
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {relatedTerms.map((relatedTerm) => (
          <Link
            key={relatedTerm.slug}
            href={`/lexikon/${relatedTerm.slug}`}
            className="lexicon-related-card"
            style={{
              display: 'block',
              padding: '1rem',
              background: 'rgba(17, 24, 39, 0.5)',
              backdropFilter: 'blur(4px)',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {relatedTerm.icon && (
                <span style={{ fontSize: '1.25rem' }}>{relatedTerm.icon}</span>
              )}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#f8dfa5',
                margin: 0
              }}>
                {relatedTerm.title}
              </h3>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#9ca3af',
              lineHeight: '1.4',
              margin: 0
            }}>
              {relatedTerm.definition.length > 100
                ? relatedTerm.definition.substring(0, 100) + '...'
                : relatedTerm.definition
              }
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}