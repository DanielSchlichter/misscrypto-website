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