import Link from 'next/link';
import { LexiconTerm } from '@/data/lexicon-terms';

interface TermLayoutProps {
  term: LexiconTerm;
  children: React.ReactNode;
}

export function TermLayout({ term, children }: TermLayoutProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #374151 50%, #111111 100%)',
      color: '#ffffff'
    }}>
      <div className="mc-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <nav style={{ marginBottom: '2rem' }} aria-label="Breadcrumb">
            <ol style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: '#9ca3af',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Startseite
                </Link>
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ width: '1rem', height: '1rem', margin: '0 0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/lexikon" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Lexikon
                </Link>
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ width: '1rem', height: '1rem', margin: '0 0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span style={{ color: '#d1d5db' }}>{term.title}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <article style={{ color: 'white' }}>
            {children}
          </article>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid #374151'
          }}>
            <Link
              href="/lexikon"
              className="lexicon-nav-btn secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                fontWeight: '500',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
                background: '#374151',
                color: 'white'
              }}
            >
              ← Zurück zum Lexikon
            </Link>
            <Link
              href="/"
              className="lexicon-nav-btn primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                fontWeight: '500',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                color: '#1a1a2e'
              }}
            >
              🏠 Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}