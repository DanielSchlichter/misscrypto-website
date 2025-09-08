export interface LexiconTerm {
  id: string;
  title: string;
  slug: string;
  definition: string;
  extendedExplanation?: string;
  category?: string;
  relatedTerms?: string[];
  icon?: string;
  lastUpdated: string;
}

export const lexiconTerms: LexiconTerm[] = [
  {
    id: 'bitcoin',
    title: 'Bitcoin',
    slug: 'bitcoin',
    definition: 'Bitcoin ist eine digitale Währung, die ohne zentrale Instanz funktioniert. Sie ermöglicht sichere, dezentrale Zahlungen über die Blockchain-Technologie – unabhängig von Banken.',
    extendedExplanation: 'Bitcoin wurde 2009 von einer bis heute unbekannten Person oder Gruppe unter dem Pseudonym Satoshi Nakamoto veröffentlicht. Ziel war es, ein alternatives Geldsystem zu schaffen – unabhängig von Staaten, Banken oder klassischen Finanzinstitutionen.\n\nTechnisch basiert Bitcoin auf der Blockchain-Technologie, einer dezentralen, transparenten Datenbank, in der jede Transaktion dauerhaft gespeichert wird. Neue Bitcoin entstehen durch das sogenannte Mining, ein Prozess, bei dem Netzwerkteilnehmer komplexe Rechenaufgaben lösen.\n\nIm Gegensatz zu Fiat-Währungen wie dem Euro ist die Menge an Bitcoin begrenzt: Es wird niemals mehr als 21 Millionen BTC geben. Das macht Bitcoin zu einem knappen Gut – viele sprechen daher vom „digitalen Gold".\n\nBitcoin ist heute mehr als nur eine Währung: Er dient als Wertspeicher, Inflationsschutz und digitales Investmentvehikel. Inzwischen investieren sowohl private Sparer als auch Unternehmen und Staaten in Bitcoin.',
    category: 'Kryptowährungen',
    relatedTerms: ['blockchain', 'wallet'],
    icon: '₿',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    slug: 'blockchain',
    definition: 'Die Blockchain ist eine dezentrale Datenbank, in der Transaktionen fälschungssicher, chronologisch und öffentlich gespeichert werden – das Rückgrat von Bitcoin & Co.',
    extendedExplanation: 'Die Blockchain-Technologie wurde mit der Einführung von Bitcoin bekannt, ist aber weit mehr als nur das technische Fundament von Kryptowährungen. Eine Blockchain ist im Kern eine verkettete Liste von Datenblöcken, die ständig erweitert wird. Jeder neue Block enthält eine Gruppe von Transaktionen und wird mit dem vorherigen Block kryptografisch verbunden – daher der Name: Block + Chain.\n\nDas Besondere: Es gibt keine zentrale Instanz, die die Datenbank kontrolliert. Stattdessen verwalten Tausende von Computern (sogenannte Nodes) weltweit dieselbe Kopie der Blockchain. Neue Einträge können nur hinzugefügt werden, wenn sie vom Netzwerk konsensbasiert validiert werden – z. B. durch Mining oder Proof of Stake.\n\nWeil jeder Block auf dem vorherigen aufbaut und alle Einträge öffentlich einsehbar sind, gilt die Blockchain als besonders transparent, manipulationssicher und vertrauenswürdig.\n\nHeute findet die Technologie nicht nur im Finanzbereich Anwendung, sondern auch in Bereichen wie Logistik, Urheberrecht, Medizin und Verwaltung.',
    category: 'Technologie',
    relatedTerms: ['bitcoin', 'wallet'],
    icon: '⛓️',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'wallet',
    title: 'Wallet',
    slug: 'wallet',
    definition: 'Eine Wallet ist deine digitale Geldbörse für Bitcoin & Co. Erfahre hier, wie sie funktioniert, welche Arten es gibt und worauf du achten musst.',
    extendedExplanation: 'Wer Kryptowährungen besitzt, braucht eine sogenannte Wallet – die digitale Version einer Geldbörse. Sie speichert zwar nicht direkt die Coins selbst, sondern verwaltet die Zugangsdaten dazu: den Private Key. Nur wer diesen besitzt, kann über seine Kryptowerte verfügen.\n\nEs gibt verschiedene Wallet-Arten:\n\n🔐 Hardware Wallets (z. B. Ledger oder Trezor): physische Geräte, besonders sicher\n\n📱 Software Wallets: Apps oder Programme auf deinem Smartphone/PC\n\n🌐 Online Wallets: auf Börsen wie Bitvavo oder Coinbase – bequem, aber nicht ideal für langfristige Lagerung\n\nMan unterscheidet außerdem zwischen:\n\nCustodial Wallets (z. B. bei Börsen): der Anbieter verwaltet den Private Key\n\nNon-Custodial Wallets: du hast alleinigen Zugriff – mehr Verantwortung, aber auch mehr Sicherheit\n\nEin bekanntes Krypto-Motto lautet:\n\n„Not your keys, not your coins" – Wer den Private Key nicht kontrolliert, besitzt seine Coins nicht wirklich.',
    category: 'Sicherheit',
    relatedTerms: ['bitcoin', 'blockchain', 'private-key'],
    icon: '👛',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'private-key',
    title: 'Private Key',
    slug: 'private-key',
    definition: 'Der Private Key ist dein geheimer Zugang zu Bitcoin & Co. Erfahre hier, wie er funktioniert, warum er so wichtig ist – und wie du ihn sicher schützt.',
    extendedExplanation: 'Der Private Key (auf Deutsch: privater Schlüssel) ist das Herzstück jeder Wallet. Er ist ein kryptografischer Code – meist eine zufällig generierte Zahlen-Buchstaben-Kombination – und dient als Beweis, dass du der rechtmäßige Besitzer deiner Coins bist.\n\nDu brauchst den Private Key, um Transaktionen zu autorisieren. Er erzeugt mathematisch den Public Key (öffentliche Adresse), an die dir Coins gesendet werden können. Aber nur mit dem Private Key kannst du diese Coins auch wieder ausgeben.\n\nWichtig:\n\nVerlierst du deinen Private Key, verlierst du den Zugriff auf deine Kryptowährungen – für immer.\n\nDeshalb ist die sichere Aufbewahrung so entscheidend. Viele Wallets erzeugen aus dem Private Key eine sogenannte Recovery Phrase (eine Liste von 12 oder 24 Wörtern), die du unbedingt offline sichern solltest – am besten mehrfach.',
    category: 'Sicherheit',
    relatedTerms: ['wallet', 'blockchain'],
    icon: '🔑',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'token',
    title: 'Token',
    slug: 'token',
    definition: 'Ein Token ist eine digitale Einheit auf einer Blockchain. Erfahre hier den Unterschied zu Coins, welche Token-Arten es gibt und wie sie funktionieren.',
    extendedExplanation: 'Während Kryptowährungen wie Bitcoin eine eigene Blockchain haben, entstehen Token meist auf bestehenden Blockchains wie Ethereum, Solana oder Avalanche. Sie nutzen also eine vorhandene Infrastruktur, um digitale Werte oder Rechte abzubilden.\n\nEs gibt verschiedene Arten von Token:\n\nUtility Token: Zugang zu einem Produkt oder Dienst (z. B. Chainlink, Uniswap)\n\nSecurity Token: Digitale Form von Aktien oder Beteiligungen (oft reguliert)\n\nGovernance Token: Berechtigung zur Mitbestimmung bei Projekten (z. B. bei DeFi-Protokollen)\n\nNFTs (Non-Fungible Tokens): Einzigartige, nicht austauschbare Token z. B. für digitale Kunst\n\nEin bekannter Standard ist der ERC-20-Token, der auf Ethereum basiert. Viele Altcoins sind ERC-20-Token – darunter auch bekannte Projekte wie USDT, UNI oder AAVE.\n\nWichtig: Ein Token ist nicht gleich ein Coin. Coins wie Bitcoin oder ETH sind das native Geld einer Blockchain. Token dagegen sind eher wie Apps auf einem Betriebssystem – sie nutzen die Blockchain, sind aber nicht ihr Kern.',
    category: 'Kryptowährungen',
    relatedTerms: ['blockchain', 'bitcoin', 'altcoin'],
    icon: '🪙',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'altcoin',
    title: 'Altcoin',
    slug: 'altcoin',
    definition: 'Altcoins sind alle Kryptowährungen außer Bitcoin. Erfahre hier, was Altcoins sind, welche Unterschiede es gibt – und worauf du beim Investieren achten solltest.',
    extendedExplanation: 'Altcoin steht für „Alternative Coin" – also jede Kryptowährung außer Bitcoin. Dazu gehören z. B. Ethereum, Solana, XRP oder Cardano.\n\nDer Begriff Altcoin setzt sich aus „Alternative" und „Coin" zusammen – gemeint sind damit alle Kryptowährungen, die nicht Bitcoin sind. Andere verwenden das Kürzel „Altcoin", heute ist es eher ein Sammelbegriff für die riesige Vielfalt am Krypto-Markt.\n\nAltcoins unterscheiden sich in Funktion, Technologie und Anwendungsbereich. Es gibt z. B.:\n\n• Smart-Contract-Plattformen (Ethereum, Solana, Avalanche)\n• Zahlungscoins (Litecoin, Dash)\n• Stablecoins (USDT, USDC – meist Token!)\n• DeFi-Protokolle (Uniswap, Aave)\n• Privacy-Coins (Monero, Zcash)\n• Infrastrukturprojekte (Chainlink, Filecoin)\n\nNicht jeder Altcoin ist ein eigener Coin im technischen Sinne. Viele sind Token auf Ethereum (siehe z. B. ERC-20).\n\nAchtung: Altcoins sind oft volatiler und riskanter als Bitcoin – können aber auch stärker wachsen, wenn sich das Projekt durchsetzt.',
    category: 'Kryptowährungen',
    relatedTerms: ['bitcoin', 'token', 'blockchain', 'ethereum'],
    icon: '🔄',
    lastUpdated: '2024-12-01'
  },
  {
    id: 'ethereum',
    title: 'Ethereum',
    slug: 'ethereum',
    definition: 'Ethereum ist die zweitgrößte Kryptowährung nach Bitcoin – und Grundlage für Smart Contracts, NFTs & DeFi. Erfahre hier, was Ethereum so besonders macht.',
    extendedExplanation: 'Ethereum ist eine dezentrale Blockchain-Plattform, die nicht nur Zahlungen ermöglicht, sondern auch sogenannte Smart Contracts und dezentrale Anwendungen (DApps) unterstützt.\n\nEthereum wurde 2015 von dem jungen Entwickler Vitalik Buterin gelauncht. Während Bitcoin das primäre als digitales Geld gedacht ist, bietet Ethereum eine programmierbare Blockchain – das heißt: Entwickler können darauf Anwendungen bauen, die autonom laufen: sogenannte Smart Contracts.\n\nDie native Kryptowährung heißt Ether (ETH). Sie wird verwendet, um Transaktionen zu bezahlen oder mit Anwendungen auf der Plattform zu interagieren. Auf Beispiel: ETH von NFTs oder bei DeFi-Diensten.\n\nEthereum ist das Herzstück vieler Innovationen im Krypto-Sektor:\n\n✅ DeFi-Protokolle (z. B. Uniswap, Aave)\n✅ NFT-Plattformen (z. B. OpenSea)\n✅ DAOs und Governance-Projekte\n✅ Stablecoins wie USDT oder DAI (meist ERC-20-Token)\n\nSeit dem „Merge" im Jahr 2022 verwendet Ethereum kein energieintensives Mining mehr, sondern ein umweltfreundlicheres Verfahren namens Proof of Stake.\n\n[Token](/lexikon/token) – viele Token basieren auf Ethereum\n\n[Altcoin](/lexikon/altcoin) – Ethereum ist der bekannteste Altcoin',
    category: 'Kryptowährungen',
    relatedTerms: ['altcoin', 'blockchain', 'token'],
    icon: '🔷',
    lastUpdated: '2024-12-01'
  }
];

// Alphabetical sorting helper
export const groupTermsByLetter = (terms: LexiconTerm[]) => {
  const grouped = terms.reduce((acc, term) => {
    const firstLetter = term.title[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, LexiconTerm[]>);

  // Sort each group alphabetically
  Object.keys(grouped).forEach(letter => {
    grouped[letter].sort((a, b) => a.title.localeCompare(b.title));
  });

  return grouped;
};

// Get all available letters
export const getAvailableLetters = (terms: LexiconTerm[]) => {
  const letters = new Set(terms.map(term => term.title[0].toUpperCase()));
  return Array.from(letters).sort();
};