import type { Metadata } from "next";
import Link from "next/link";
import { lexiconTerms, groupTermsByLetter, getAvailableLetters } from "@/data/lexicon-terms";

export const metadata: Metadata = {
  title: "Krypto-Lexikon: Die wichtigsten Begriffe einfach erklärt | MissCrypto",
  description: "Vom Wallet bis zur Blockchain – hier findest du die 30 wichtigsten Krypto-Begriffe verständlich erklärt. Ideal für Einsteiger & Fortgeschrittene. Jetzt Krypto verstehen!",
  keywords: "Krypto-Lexikon, Bitcoin erklären, Blockchain verstehen, Kryptowährung Begriffe, DeFi erklärt, NFT verstehen",
  openGraph: {
    title: "Krypto-Lexikon: Die wichtigsten Begriffe einfach erklärt",
    description: "Vom Wallet bis zur Blockchain – hier findest du die 30 wichtigsten Krypto-Begriffe verständlich erklärt.",
    type: "website",
    url: "https://www.misscrypto.de/lexikon",
  },
};

export default function LexikonPage() {
  const groupedTerms = groupTermsByLetter(lexiconTerms);
  const availableLetters = getAvailableLetters(lexiconTerms);
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "MissCrypto Krypto-Lexikon",
    "description": "Umfassendes Glossar der wichtigsten Kryptowährung-Begriffe",
    "url": "https://www.misscrypto.de/lexikon",
    "publisher": {
      "@type": "Organization",
      "name": "MissCrypto",
      "url": "https://www.misscrypto.de"
    },
    "hasDefinedTerm": lexiconTerms.map(term => ({
      "@type": "DefinedTerm",
      "name": term.title,
      "description": term.definition,
      "url": `https://www.misscrypto.de/lexikon/${term.slug}`,
      "identifier": term.id,
      "inDefinedTermSet": "https://www.misscrypto.de/lexikon"
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #374151 50%, #111111 100%)',
        color: '#ffffff'
      }}>
        <div className="mc-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                marginBottom: '2rem', 
                background: 'linear-gradient(to right, #f8dfa5, #e4b15e, #f8dfa5)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                lineHeight: '1.3',
                margin: '0 0 2rem 0'
              }}>
                Das große Krypto-Lexikon<br />
                von MissCrypto
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#d1d5db', 
                marginBottom: '1.5rem', 
                lineHeight: '1.6',
                margin: '0 0 1.5rem 0'
              }}>
                Du willst wissen, was genau ein Smart Contract ist? Oder wie du deine Coins wirklich sicher aufbewahrst? 
                Dann bist du hier richtig.
              </p>
              <p style={{ 
                fontSize: '1rem', 
                color: '#9ca3af', 
                lineHeight: '1.6',
                margin: 0
              }}>
                Im MissCrypto Lexikon findest du die wichtigsten Krypto-Begriffe klar, verständlich und ohne Fachchinesisch 
                erklärt – damit du sicher und informiert ins Web3 starten kannst.
              </p>
            </div>
          </div>

          {/* Footer Info - Moved to top */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{
                padding: '2rem',
                background: 'rgba(17, 24, 39, 0.3)',
                backdropFilter: 'blur(4px)',
                border: '1px solid #374151',
                borderRadius: '0.75rem'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#f8dfa5', margin: '0 0 1rem 0' }}>
                  Alle Einträge sind ideal verlinkt 🔗
                </h3>
                <p style={{ color: '#d1d5db', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
                  Regelmäßig aktualisiert und mit praxisnahen Tipps & Fun Facts versehen.
                </p>
                <p style={{ fontSize: '1.125rem', fontWeight: '500', color: 'white', margin: 0 }}>
                  Viel Spaß beim Stöbern! 🚀
                </p>
              </div>
            </div>
          </div>

          {/* Alphabet Navigation */}
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>
                Alphabetisch geordnet
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {allLetters.map(letter => {
                const hasTerms = availableLetters.includes(letter);
                return (
                  <a
                    key={letter}
                    href={hasTerms ? `#letter-${letter}` : undefined}
                    className={`lexicon-letter-btn ${hasTerms ? 'active' : 'inactive'}`}
                  >
                    {letter}
                  </a>
                );
              })}
              </div>
            </div>
          </div>

          {/* Terms by Letter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {availableLetters.map(letter => (
              <div key={letter} id={`letter-${letter}`} style={{ scrollMarginTop: '5rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#1a1a2e',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginRight: '1rem'
                  }}>
                    {letter}
                  </span>
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  {groupedTerms[letter]?.map(term => (
                    <Link
                      key={term.id}
                      href={`/lexikon/${term.slug}`}
                      className="lexicon-term-card"
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', margin: 0 }}>
                          {term.icon && (
                            <span style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}>{term.icon}</span>
                          )}
                          {term.title}
                        </h3>
                        <div style={{
                          flexShrink: 0,
                          width: '1.5rem',
                          height: '1.5rem',
                          borderRadius: '50%',
                          background: 'rgba(147, 51, 234, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg style={{ width: '1rem', height: '1rem', color: '#f8dfa5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <p style={{ color: '#d1d5db', fontSize: '0.875rem', lineHeight: '1.6', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {term.definition}
                      </p>
                      
                      {term.category && (
                        <div style={{ marginTop: '1rem' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            background: 'rgba(248, 223, 165, 0.2)',
                            color: '#f8dfa5',
                            borderRadius: '9999px'
                          }}>
                            {term.category}
                          </span>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}