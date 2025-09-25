import { LexiconTerm } from '@/data/lexicon-terms';

interface TermHeaderProps {
  term: LexiconTerm;
}

// Generate smart title and subtitle based on term
function generateTitle(term: LexiconTerm): { title: string; subtitle: string } {
  if (term.customTitle && term.customSubtitle) {
    return { title: term.customTitle, subtitle: term.customSubtitle };
  }

  // Default patterns based on term ID
  const titleMap: Record<string, { title: string; subtitle: string }> = {
    bitcoin: { title: 'Was ist Bitcoin?', subtitle: 'Die erste Kryptowährung einfach erklärt' },
    blockchain: { title: 'Was ist die Blockchain?', subtitle: 'Einfach erklärt für Einsteiger' },
    wallet: { title: 'Was ist eine Wallet?', subtitle: 'Die digitale Geldbörse für Bitcoin & Co.' },
    'private-key': { title: 'Was ist ein Private Key?', subtitle: 'So schützt du deinen Krypto-Zugang' },
    token: { title: 'Was ist ein Token?', subtitle: 'Unterschied zu Coin und warum er wichtig ist' },
    altcoin: { title: 'Was ist ein Altcoin?', subtitle: 'Erklärung und Überblick für Einsteiger' },
    ethereum: { title: 'Was ist Ethereum?', subtitle: 'Die Plattform für Smart Contracts & Web3' },
    hodl: { title: 'Was bedeutet HODL?', subtitle: 'Der berühmteste Schreibfehler der Krypto-Geschichte' },
    nft: { title: 'Was ist ein NFT?', subtitle: 'Digitale Besitzrechte einfach erklärt' },
    dex: { title: 'Was ist ein DEX?', subtitle: 'Krypto-Handel ohne zentrale Instanz' },
    cex: { title: 'Was ist ein CEX?', subtitle: 'Zentrale Krypto-Börsen einfach erklärt' },
    mining: { title: 'Was ist Mining?', subtitle: 'Wie neue Coins entstehen' },
    staking: { title: 'Was ist Staking?', subtitle: 'Krypto verzinsen leicht gemacht' },
    defi: { title: 'Was ist DeFi?', subtitle: 'Dezentrale Finanzen einfach erklärt' },
    'seed-phrase': { title: 'Was ist eine Seed Phrase?', subtitle: 'Der wichtigste Backup-Code deiner Wallet' },
    fiat: { title: 'Was ist Fiatgeld?', subtitle: 'Staatliches Geld vs. Kryptowährungen' },
    stablecoin: { title: 'Was ist ein Stablecoin?', subtitle: 'Kryptowährungen mit stabilem Wert' },
    'smart-contract': { title: 'Was ist ein Smart Contract?', subtitle: 'Digitale Verträge auf der Blockchain' },
    'gas-fee': { title: 'Was sind Gas Fees?', subtitle: 'Transaktionskosten auf Ethereum verstehen' },
    xrp: { title: 'Was ist XRP?', subtitle: 'Die Kryptowährung für schnelle Zahlungen' }
  };

  return titleMap[term.id] || {
    title: `Was ist ${term.title}?`,
    subtitle: `${term.title} einfach erklärt`
  };
}

export function TermHeader({ term }: TermHeaderProps) {
  const { title, subtitle } = generateTitle(term);

  return (
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
          {title}<br />{subtitle}
        </span>
      </h1>

      {term.category && (
        <div style={{ marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1))',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#f8dfa5'
          }}>
            📂 {term.category}
          </span>
        </div>
      )}
    </div>
  );
}