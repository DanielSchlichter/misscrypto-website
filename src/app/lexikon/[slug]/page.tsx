import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lexiconTerms, type LexiconTerm } from "@/data/lexicon-terms";
import { TermLayout } from "@/components/lexicon/layout/TermLayout";
import { TermHeader } from "@/components/lexicon/sections/TermHeader";
import { DefinitionBox } from "@/components/lexicon/sections/DefinitionBox";
import { ExtendedExplanation } from "@/components/lexicon/sections/ExtendedExplanation";
import { FunFactBox } from "@/components/lexicon/sections/FunFactBox";
import { ProsConsSection } from "@/components/lexicon/sections/ProsConsSection";
import { ComparisonSection } from "@/components/lexicon/sections/ComparisonSection";
import { WalletComparison } from "@/components/lexicon/sections/WalletComparison";
import { RecommendationBox } from "@/components/lexicon/sections/RecommendationBox";
import { SecurityTips } from "@/components/lexicon/sections/SecurityTips";
import { WalletTypes } from "@/components/lexicon/sections/WalletTypes";
import { RelatedTerms } from "@/components/lexicon/sections/RelatedTerms";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate all static paths
export async function generateStaticParams() {
  return lexiconTerms.map((term) => ({
    slug: term.slug,
  }));
}

// Generate smart metadata for each term
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = lexiconTerms.find(t => t.slug === slug);

  if (!term) {
    return {
      title: "Begriff nicht gefunden | MissCrypto Lexikon",
      description: "Der gesuchte Begriff wurde im MissCrypto Krypto-Lexikon nicht gefunden.",
    };
  }

  // Smart title generation based on term ID
  const titleMap: Record<string, string> = {
    bitcoin: 'Was ist Bitcoin? Die erste Kryptowährung einfach erklärt | MissCrypto',
    blockchain: 'Was ist eine Blockchain? Definition & Funktion | MissCrypto Lexikon',
    wallet: 'Was ist eine Wallet? Krypto sicher verwahren | MissCrypto Lexikon',
    'private-key': 'Was ist ein Private Key? Sicherheit bei Kryptowährungen | MissCrypto',
    token: 'Was ist ein Token? Unterschied zu Coin erklärt | MissCrypto Lexikon',
    altcoin: 'Was ist ein Altcoin? Alternative Kryptowährungen erklärt | MissCrypto',
    ethereum: 'Was ist Ethereum? Smart Contracts & DeFi Plattform | MissCrypto Lexikon',
    hodl: 'Was bedeutet HODL? Krypto-Strategie einfach erklärt | MissCrypto',
    nft: 'Was ist ein NFT? Digitale Besitzrechte verstehen | MissCrypto Lexikon',
    dex: 'Was ist ein DEX? Dezentrale Börsen erklärt | MissCrypto Lexikon',
    cex: 'Was ist ein CEX? Zentrale Krypto-Börsen verstehen | MissCrypto',
    mining: 'Was ist Mining? Kryptowährungen schürfen erklärt | MissCrypto',
    staking: 'Was ist Staking? Krypto verzinsen leicht gemacht | MissCrypto',
    defi: 'Was ist DeFi? Dezentrale Finanzen verstehen | MissCrypto Lexikon',
    'seed-phrase': 'Was ist eine Seed Phrase? Wallet-Backup verstehen | MissCrypto',
    fiat: 'Was ist Fiatgeld? Staatliches vs. digitales Geld | MissCrypto Lexikon',
    stablecoin: 'Was ist ein Stablecoin? Stabile Kryptowährungen | MissCrypto',
    'smart-contract': 'Was ist ein Smart Contract? Blockchain-Verträge | MissCrypto',
    'gas-fee': 'Was sind Gas Fees? Ethereum Gebühren verstehen | MissCrypto',
    xrp: 'Was ist XRP? Die schnelle Kryptowährung erklärt | MissCrypto',
    'custodial-vs-non-custodial': 'Custodial vs. Non-Custodial Wallets: Der Unterschied | MissCrypto',
    rlusd: 'Was ist RLUSD? Ripples Stablecoin erklärt | MissCrypto Lexikon',
    'layer-2': 'Was ist Layer 2? Blockchain-Skalierung einfach erklärt | MissCrypto Lexikon',
    'meme-coin': 'Was ist ein Meme Coin? Spaß, Hype & Risiko erklärt | MissCrypto Lexikon',
    'krypto-sicher-aufbewahren': 'Krypto sicher aufbewahren – Wallet-Typen & Tipps | MissCrypto',
    cbdc: 'Was ist eine CBDC? Digitale Zentralbankwährungen erklärt | MissCrypto Lexikon',
    'public-key': 'Was ist ein Public Key? Öffentlicher Schlüssel in Krypto erklärt | MissCrypto Lexikon',
    hashrate: 'Was ist die Hashrate? Rechenpower im Bitcoin-Netzwerk | MissCrypto Lexikon',
    'proof-of-work': 'Was ist Proof of Work? Konsens bei Bitcoin erklärt | MissCrypto Lexikon'
  };

  const title = titleMap[term.id] || `Was ist ${term.title}? Einfach erklärt | MissCrypto Lexikon`;
  const description = term.definition.length <= 160
    ? term.definition
    : term.definition.substring(0, 157) + "...";

  return {
    title,
    description,
    keywords: `${term.title}, Kryptowährung erklärt, ${term.category}, Blockchain, Bitcoin`,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.misscrypto.de/lexikon/${term.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

// Structured Data generation
function generateStructuredData(term: LexiconTerm) {
  return {
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
    "dateModified": term.lastUpdated,
    "publisher": {
      "@type": "Organization",
      "name": "MissCrypto",
      "url": "https://www.misscrypto.de"
    }
  };
}

export default async function LexikonTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = lexiconTerms.find(t => t.slug === slug);

  if (!term) {
    notFound();
  }

  const structuredData = generateStructuredData(term);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TermLayout term={term}>
        <TermHeader term={term} />
        <DefinitionBox term={term} />
        {term.extendedExplanation && (
          <ExtendedExplanation content={term.extendedExplanation} />
        )}
        {term.walletTypes && (
          <WalletTypes hotWallet={term.walletTypes.hotWallet} coldWallet={term.walletTypes.coldWallet} />
        )}
        {term.walletComparison && (
          <WalletComparison headers={term.walletComparison.headers} rows={term.walletComparison.rows} />
        )}
        {term.recommendations && (
          <RecommendationBox recommendations={term.recommendations} />
        )}
        {term.securityTips && (
          <SecurityTips tips={term.securityTips} />
        )}
        {term.prosAndCons && (
          <ProsConsSection
            pros={term.prosAndCons.pros}
            cons={term.prosAndCons.cons}
            prosTitle={term.prosAndCons.prosTitle}
            consTitle={term.prosAndCons.consTitle}
          />
        )}
        {term.comparisons && (
          <ComparisonSection title={term.comparisons.title} items={term.comparisons.items} />
        )}
        {term.funFact && <FunFactBox fact={term.funFact} />}
        <RelatedTerms term={term} />
      </TermLayout>
    </>
  );
}