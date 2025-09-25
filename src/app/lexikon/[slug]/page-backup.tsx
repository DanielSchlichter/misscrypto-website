import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lexiconTerms, type LexiconTerm } from "@/data/lexicon-terms";
import { FunFactBox } from "@/components/lexicon/sections/FunFactBox";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return lexiconTerms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = lexiconTerms.find(t => t.slug === slug);
  
  if (!term) {
    return {
      title: "Begriff nicht gefunden | MissCrypto Lexikon",
      description: "Der gesuchte Begriff wurde im MissCrypto Krypto-Lexikon nicht gefunden.",
    };
  }

  return {
    title: term.id === 'bitcoin'
      ? 'Was ist Bitcoin? Die erste Kryptowährung einfach erklärt | MissCrypto'
      : term.id === 'blockchain'
      ? 'Was ist eine Blockchain? Definition & Funktion | MissCrypto Lexikon'
      : term.id === 'wallet'
      ? 'Was ist eine Wallet? Krypto sicher verwahren | MissCrypto Lexikon'
      : term.id === 'private-key'
      ? 'Was ist ein Private Key? Krypto-Zugriff verstehen | MissCrypto Lexikon'
      : term.id === 'token'
      ? 'Was ist ein Token? Unterschied zu Coin & Anwendung | MissCrypto Lexikon'
      : term.id === 'altcoin'
      ? 'Was ist ein Altcoin? Einfach erklärt | MissCrypto Lexikon'
      : term.id === 'ethereum'
      ? 'Was ist Ethereum? Smart Contracts & ETH erklärt | MissCrypto Lexikon'
      : term.id === 'hodl'
      ? 'Was bedeutet HODL? Krypto-Begriff einfach erklärt | MissCrypto Lexikon'
      : term.id === 'nft'
      ? 'Was ist ein NFT? Bedeutung & Anwendung erklärt | MissCrypto Lexikon'
      : term.id === 'dex'
      ? 'Was ist ein DEX? Dezentrale Börse einfach erklärt | MissCrypto Lexikon'
      : term.id === 'cex'
      ? 'Was ist ein CEX? Zentrale Krypto-Börsen erklärt | MissCrypto Lexikon'
      : term.id === 'mining'
      ? 'Was ist Mining? Bitcoin generieren erklärt | MissCrypto Lexikon'
      : term.id === 'staking'
      ? 'Was ist Staking? Passives Einkommen mit Krypto | MissCrypto Lexikon'
      : term.id === 'defi'
      ? 'Was ist DeFi? Dezentrale Finanzwelt erklärt | MissCrypto Lexikon'
      : term.id === 'seed-phrase'
      ? 'Was ist eine Seed Phrase? Deine Krypto-Wiederherstellung erklärt | MissCrypto Lexikon'
      : term.id === 'fiat'
      ? 'Was ist Fiatgeld? Der Unterschied zu Kryptowährungen | MissCrypto Lexikon'
      : term.id === 'stablecoin'
      ? 'Was ist ein Stablecoin? Krypto mit stabilem Wert | MissCrypto Lexikon'
      : term.id === 'smart-contract'
      ? 'Was ist ein Smart Contract? Krypto-Verträge erklärt | MissCrypto Lexikon'
      : term.id === 'gas-fee'
      ? 'Was sind Gas Fees? Transaktionskosten bei Ethereum | MissCrypto Lexikon'
      : term.id === 'xrp'
      ? 'Was ist XRP? Die Kryptowährung des XRPL erklärt | MissCrypto Lexikon'
      : `Was ist ${term.title}? Einfach erklärt | Krypto-Lexikon MissCrypto`,
    description: term.id === 'blockchain'
      ? 'Die Blockchain ist das Fundament von Bitcoin und Co. Erfahre hier einfach erklärt, wie sie funktioniert und warum sie als revolutionär gilt.'
      : term.id === 'wallet'
      ? 'Eine Wallet ist deine digitale Geldbörse für Bitcoin & Co. Erfahre hier, wie sie funktioniert, welche Arten es gibt und worauf du achten musst.'
      : term.id === 'private-key'
      ? 'Der Private Key ist dein geheimer Zugang zu Bitcoin & Co. Erfahre hier, wie er funktioniert, warum er so wichtig ist – und wie du ihn sicher schützt.'
      : term.id === 'token'
      ? 'Ein Token ist eine digitale Einheit auf einer Blockchain. Erfahre hier den Unterschied zu Coins, welche Token-Arten es gibt und wie sie funktionieren.'
      : term.id === 'altcoin'
      ? 'Altcoins sind alle Kryptowährungen außer Bitcoin. Erfahre hier, was Altcoins sind, welche Unterschiede es gibt – und worauf du beim Investieren achten solltest.'
      : term.id === 'ethereum'
      ? 'Ethereum ist die zweitgrößte Kryptowährung nach Bitcoin – und Grundlage für Smart Contracts, NFTs & DeFi. Erfahre hier, was Ethereum so besonders macht.'
      : term.id === 'hodl'
      ? 'HODL steht für langfristiges Halten von Bitcoin & Co. Erfahre hier, woher der Begriff kommt und warum er zum Mantra vieler Krypto-Investoren wurde.'
      : term.id === 'nft'
      ? 'NFTs sind digitale Besitznachweise auf der Blockchain. Erfahre hier, was ein NFT ist, wie sie funktionieren und was wirklich dahintersteckt.'
      : term.id === 'dex'
      ? 'Ein DEX ist eine dezentrale Krypto-Börse ohne zentrale Kontrolle. Erfahre hier, wie DEXs funktionieren, worin der Unterschied zu Binance & Co. liegt – und worauf du achten musst.'
      : term.id === 'cex'
      ? 'CEX steht für Centralized Exchange – also eine zentrale Krypto-Börse wie Bitvavo oder Binance. Erfahre hier, wie sie funktionieren und worin die Unterschiede zu DEXs liegen.'
      : term.id === 'mining'
      ? 'Mining sichert Blockchains wie Bitcoin und erzeugt neue Coins. Erfahre hier, wie Mining funktioniert, welche Arten es gibt und was du beachten solltest.'
      : term.id === 'staking'
      ? 'Mit Staking kannst du Kryptowährungen wie Ethereum verzinsen. Erfahre hier, wie Staking funktioniert, welche Risiken es gibt und worauf du achten solltest.'
      : term.id === 'defi'
      ? 'DeFi steht für Decentralized Finance – ein neues Finanzsystem auf der Blockchain. Erfahre hier, wie DeFi funktioniert, welche Chancen und Risiken es bietet.'
      : term.id === 'seed-phrase'
      ? 'Die Seed Phrase ist der wichtigste Sicherheitscode deiner Wallet. Erfahre hier, was sie bedeutet, wie du sie sicher aufbewahrst und warum du sie nie verlieren darfst.'
      : term.id === 'fiat'
      ? 'Fiatgeld wie Euro oder US-Dollar ist staatlich ausgegebenes Geld ohne inneren Wert. Erfahre hier, was Fiat ist – und warum Krypto anders funktioniert.'
      : term.id === 'stablecoin'
      ? 'Stablecoins sind Kryptowährungen mit stabilem Wert – meist 1:1 an den US-Dollar gekoppelt. Erfahre hier, wie sie funktionieren und welche Risiken es gibt.'
      : term.id === 'smart-contract'
      ? 'Ein Smart Contract ist ein digitaler Vertrag auf der Blockchain, der automatisch ausgeführt wird. Erfahre hier, wie sie funktionieren und wofür sie genutzt werden.'
      : term.id === 'gas-fee'
      ? 'Gas Fees sind Gebühren für Transaktionen auf der Ethereum-Blockchain. Erfahre hier, wie sie funktionieren, warum sie schwanken und wie du sie reduzieren kannst.'
      : term.id === 'xrp'
      ? 'XRP ist die native Währung der XRP Ledger – schnell, energieeffizient und unabhängig von Ripple Labs. Erfahre hier, wie XRP funktioniert und wofür es genutzt wird.'
      : term.definition.length > 160
      ? term.definition.substring(0, 157) + "..."
      : term.definition,
    keywords: `${term.title}, Kryptowährung erklärt, ${term.category}, Blockchain, Bitcoin`,
    openGraph: {
      title: term.id === 'bitcoin'
        ? 'Was ist Bitcoin? Die erste Kryptowährung einfach erklärt'
        : term.id === 'blockchain'
        ? 'Was ist eine Blockchain? Definition & Funktion'
        : term.id === 'wallet'
        ? 'Was ist eine Wallet? Krypto sicher verwahren'
        : term.id === 'private-key'
        ? 'Was ist ein Private Key? Krypto-Zugriff verstehen'
        : term.id === 'token'
        ? 'Was ist ein Token? Unterschied zu Coin & Anwendung'
        : term.id === 'altcoin'
        ? 'Was ist ein Altcoin? Einfach erklärt'
        : term.id === 'ethereum'
        ? 'Was ist Ethereum? Smart Contracts & ETH erklärt'
        : term.id === 'hodl'
        ? 'Was bedeutet HODL? Krypto-Begriff einfach erklärt'
        : term.id === 'nft'
        ? 'Was ist ein NFT? Bedeutung & Anwendung erklärt'
        : term.id === 'dex'
        ? 'Was ist ein DEX? Dezentrale Börse einfach erklärt'
        : term.id === 'cex'
        ? 'Was ist ein CEX? Zentrale Krypto-Börsen erklärt'
        : term.id === 'mining'
        ? 'Was ist Mining? Bitcoin generieren erklärt'
        : term.id === 'staking'
        ? 'Was ist Staking? Passives Einkommen mit Krypto'
        : term.id === 'defi'
        ? 'Was ist DeFi? Dezentrale Finanzwelt erklärt'
        : term.id === 'seed-phrase'
        ? 'Was ist eine Seed Phrase? Deine Krypto-Wiederherstellung erklärt'
        : term.id === 'fiat'
        ? 'Was ist Fiatgeld? Der Unterschied zu Kryptowährungen'
        : term.id === 'stablecoin'
        ? 'Was ist ein Stablecoin? Krypto mit stabilem Wert'
        : term.id === 'smart-contract'
        ? 'Was ist ein Smart Contract? Krypto-Verträge erklärt'
        : term.id === 'gas-fee'
        ? 'Was sind Gas Fees? Transaktionskosten bei Ethereum'
        : term.id === 'xrp'
        ? 'Was ist XRP? Die Kryptowährung des XRPL erklärt'
        : `Was ist ${term.title}? Einfach erklärt`,
      description: term.definition,
      type: "article",
      url: `https://www.misscrypto.de/lexikon/${term.slug}`,
    },
  };
}

export default async function LexikonTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = lexiconTerms.find(t => t.slug === slug);
  
  if (!term) {
    notFound();
  }

  const relatedTerms = term.relatedTerms 
    ? lexiconTerms.filter(t => term.relatedTerms?.includes(t.id))
    : [];

  // Structured data for the specific term
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.title,
    "description": term.definition,
    "url": `https://www.misscrypto.de/lexikon/${term.slug}`,
    "identifier": term.id,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "MissCrypto Krypto-Lexikon",
      "url": "https://www.misscrypto.de/lexikon"
    },
    "termCode": term.id,
    "dateModified": term.lastUpdated,
    "publisher": {
      "@type": "Organization",
      "name": "MissCrypto",
      "url": "https://www.misscrypto.de"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.misscrypto.de"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Lexikon",
        "item": "https://www.misscrypto.de/lexikon"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": term.title,
        "item": `https://www.misscrypto.de/lexikon/${term.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #374151 50%, #111111 100%)',
        color: '#ffffff'
      }}>
        <div className="mc-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          {/* Breadcrumb Navigation */}
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <nav style={{ marginBottom: '2rem' }} aria-label="Breadcrumb">
              <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#9ca3af', listStyle: 'none', padding: 0, margin: 0 }}>
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
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                {term.icon && (
                  <span style={{ marginRight: '1rem', fontSize: '3rem' }}>{term.icon}</span>
                )}
                <span style={{ 
                  background: 'linear-gradient(to right, #f8dfa5, #e4b15e, #f8dfa5)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}>
                  {term.id === 'bitcoin'
                    ? <>Was ist Bitcoin?<br />Die erste Kryptowährung einfach erklärt</>
                    : term.id === 'blockchain'
                    ? <>Was ist die Blockchain?<br />Einfach erklärt für Einsteiger</>
                    : term.id === 'wallet'
                    ? <>Was ist eine Wallet?<br />Die digitale Geldbörse für Bitcoin & Co.</>
                    : term.id === 'private-key'
                    ? <>Was ist ein Private Key?<br />So schützt du deinen Krypto-Zugang</>
                    : term.id === 'token'
                    ? <>Was ist ein Token?<br />Unterschied zu Coin und warum er wichtig ist</>
                    : term.id === 'altcoin'
                    ? <>Was ist ein Altcoin?<br />Erklärung und Überblick für Einsteiger</>
                    : term.id === 'ethereum'
                    ? <>Was ist Ethereum?<br />Die Plattform für Smart Contracts & Web3</>
                    : term.id === 'hodl'
                    ? <>Was bedeutet HODL?<br />Der berühmteste Schreibfehler der Krypto-Geschichte</>
                    : term.id === 'nft'
                    ? <>Was ist ein NFT?<br />Digitale Besitzrechte einfach erklärt</>
                    : term.id === 'dex'
                    ? <>Was ist ein DEX?<br />Krypto-Handel ohne zentrale Instanz</>
                    : term.id === 'cex'
                    ? <>Was ist ein CEX?<br />Zentrale Krypto-Börsen einfach erklärt</>
                    : term.id === 'mining'
                    ? <>Was ist Mining?<br />Das Herzstück vieler Kryptowährungen</>
                    : term.id === 'staking'
                    ? <>Was ist Staking?<br />Passives Einkommen mit Kryptowährungen</>
                    : term.id === 'defi'
                    ? <>Was ist DeFi?<br />Die dezentrale Alternative zum traditionellen Finanzsystem</>
                    : term.id === 'seed-phrase'
                    ? <>Was ist eine Seed Phrase?<br />Die 12 oder 24 Wörter, die alles entscheiden</>
                    : term.id === 'fiat'
                    ? <>Was ist Fiatgeld?<br />Warum Bitcoin kein Euro ist</>
                    : term.id === 'stablecoin'
                    ? <>Was ist ein Stablecoin?<br />Die stabile Brücke zwischen Fiat und Krypto</>
                    : term.id === 'smart-contract'
                    ? <>Was ist ein Smart Contract?<br />Automatisierte Verträge auf der Blockchain</>
                    : term.id === 'gas-fee'
                    ? <>Was sind Gas Fees?<br />Die Gebühren für Smart Contracts und Transaktionen</>
                    : term.id === 'xrp'
                    ? <>Was ist XRP?<br />Die native Kryptowährung der XRP Ledger</>
                    : `Was ist ${term.title}?`
                  }
                </span>
              </h1>
              
              {term.category && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: 'rgba(248, 223, 165, 0.2)',
                    color: '#f8dfa5',
                    borderRadius: '9999px',
                    border: '1px solid rgba(248, 223, 165, 0.3)'
                  }}>
                    {term.category}
                  </span>
                </div>
              )}
            </div>

            {/* Main Content */}
            <article style={{ maxWidth: 'none' }}>
              {/* Definition Box */}
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.2))',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                borderRadius: '0.75rem',
                marginBottom: '2rem',
                backdropFilter: 'blur(4px)'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#f8dfa5', margin: '0 0 1rem 0' }}>
                  📝 Kurze Definition
                </h2>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: '#e5e7eb', margin: 0 }}>
                  {term.definition}
                </p>
              </div>

              {/* Extended Explanation */}
              {term.extendedExplanation && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white', margin: '0 0 1.5rem 0' }}>
                    🔍 Erweiterte Erklärung
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {term.extendedExplanation.split('\n\n').map((paragraph, index) => (
                      <p key={index} style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Fun Facts */}
              {term.funFact && <FunFactBox fact={term.funFact} />}

            </article>

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: 'white', margin: '0 0 2rem 0' }}>
                  🔗 Verwandte Begriffe
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {relatedTerms.map(relatedTerm => (
                    <Link
                      key={relatedTerm.id}
                      href={`/lexikon/${relatedTerm.slug}`}
                      className="lexicon-related-card"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontWeight: '600', color: 'white', margin: '0 0 0.25rem 0' }}>
                            {relatedTerm.icon && (
                              <span style={{ marginRight: '0.5rem' }}>{relatedTerm.icon}</span>
                            )}
                            {relatedTerm.title}
                          </h3>
                          <p style={{ 
                            color: '#9ca3af', 
                            fontSize: '0.875rem', 
                            margin: 0,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {relatedTerm.definition}
                          </p>
                        </div>
                        <svg style={{ width: '1.25rem', height: '1.25rem', color: '#f8dfa5', flexShrink: 0, marginLeft: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{
              marginTop: '4rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '1.5rem',
              background: 'rgba(17, 24, 39, 0.3)',
              backdropFilter: 'blur(4px)',
              border: '1px solid #374151',
              borderRadius: '0.75rem'
            }}>
              <Link
                href="/lexikon"
                className="lexicon-nav-btn primary"
              >
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück zum Lexikon
              </Link>
              
              <Link
                href="/"
                className="lexicon-nav-btn secondary"
              >
                Zur Startseite
                <svg style={{ width: '1rem', height: '1rem', marginLeft: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}