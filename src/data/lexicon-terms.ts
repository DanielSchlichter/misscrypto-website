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
    lastUpdated: '2025-09-17'
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
    lastUpdated: '2025-09-17'
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
    lastUpdated: '2025-09-17'
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
    lastUpdated: '2025-09-17'
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
    lastUpdated: '2025-09-17'
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
    lastUpdated: '2025-09-17'
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
    lastUpdated: '2025-09-17'
  },
  {
    id: 'hodl',
    title: 'HODL',
    slug: 'hodl',
    definition: 'HODL steht für langfristiges Halten von Bitcoin & Co. Erfahre hier, woher der Begriff kommt und warum er zum Mantra vieler Krypto-Investoren wurde.',
    extendedExplanation: 'HODL ist ein Internet-Slang für „Hold" – also das langfristige Halten von Kryptowährungen, unabhängig von Kursschwankungen.\n\nDer Begriff HODL entstand im Jahr 2013 durch einen Tippfehler in einem Bitcoin-Forum. Ein Nutzer mit dem Namen „GameKyuubi" schrieb während eines starken Kurssturzes:\n\n„I AM HODLING."\n\nGemeint war eigentlich „holding", also halten statt verkaufen. Der Schreibfehler ging viral – und wurde zum Symbol für eine der beliebtesten Krypto-Strategien: Buy & Hold, ganz gleich, wie stark der Markt schwankt.\n\nInzwischen ist HODL viel mehr als ein Meme. Es steht für eine langfristige Denkweise: Statt auf kurzfristige Gewinne zu spekulieren, setzen HODLer darauf, dass sich Bitcoin & Co. langfristig durchsetzen und im Wert steigen.\n\nDer Begriff wird auch humorvoll interpretiert als:\n\n• Hold On for Dear Life\n• Hold Only, Don\'t Lose\n\nFür viele Anleger ist HODL heute ein Mantra: Nicht von Panik oder Hype leiten lassen, sondern cool bleiben und langfristig investieren.',
    category: 'Strategie',
    relatedTerms: ['bitcoin', 'altcoin'],
    icon: '💎',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'nft',
    title: 'NFT',
    slug: 'nft',
    definition: 'NFTs sind digitale Besitznachweise auf der Blockchain. Erfahre hier, was ein NFT ist, wie sie funktionieren und was wirklich dahintersteckt.',
    extendedExplanation: 'Ein NFT (Non-Fungible Token) ist ein nicht austauschbarer, digitaler Besitznachweis, der auf einer Blockchain gespeichert wird. Im Gegensatz zu Bitcoin oder Ethereum, die untereinander identisch und „fungibel" (tauschbar) sind, ist jedes NFT einzigartig.\n\nNFTs können vieles darstellen:\n\n• Digitale Kunstwerke (z. B. auf OpenSea)\n• Musik, Videos oder Tweets\n• In-Game-Items\n• Mitgliedskarten oder Eintrittstickets\n• Immobilien oder Vertragsrechte im Web3\n\nTechnisch gesehen sind NFTs meist Token auf Ethereum (z. B. nach dem ERC-721- oder ERC-1155-Standard). Jeder NFT enthält eine Art Seriennummer und verweist auf die zugehörigen Daten – meist über einen Link zu einer Datei.\n\nWichtig: Ein NFT bedeutet nicht automatisch, dass du urheberrechtlich Eigentümer eines Bildes bist. Du hältst den Token, also den Eintrag in der Blockchain, der dir das Nutzungs- oder Besitzrecht zuweist.\n\nNFTs ermöglichen neue Konzepte rund um digitale Eigentumsrechte, Communitys, Urhebervergütung und Sammlerstücke – und werden in Zukunft voraussichtlich weit über Kunst hinaus genutzt.',
    category: 'Technologie',
    relatedTerms: ['token', 'ethereum', 'wallet'],
    icon: '🎨',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'dex',
    title: 'DEX',
    slug: 'dex',
    definition: 'Ein DEX ist eine dezentrale Krypto-Börse ohne zentrale Kontrolle. Erfahre hier, wie DEXs funktionieren, worin der Unterschied zu Binance & Co. liegt – und worauf du achten musst.',
    extendedExplanation: 'Ein DEX ist das Gegenstück zu zentralen Krypto-Börsen wie Binance, Bitvavo oder Coinbase. Auf einem DEX handelst du direkt mit anderen Nutzern – Peer-to-Peer, also von Wallet zu Wallet, ohne dass ein Anbieter deine Coins verwahrt oder Transaktionen freigibt.\n\nStatt Orderbüchern nutzen DEXs in der Regel Automated Market Maker (AMMs). Das heißt: Liquidity Pools sorgen dafür, dass du jederzeit handeln kannst, auch wenn kein direkter Käufer oder Verkäufer da ist. Bekannte DEXs sind z. B.:\n\n• Uniswap (Ethereum)\n• PancakeSwap (BNB Chain)\n• SushiSwap (multichain)\n• Curve (Stablecoins)\n\nVorteile eines DEX:\n\n• Du behältst die volle Kontrolle über deine Coins\n• Kein KYC / keine Registrierung\n• Dezentral & zensurresistent\n\nNachteile:\n\n• Höheres Risiko durch Smart-Contract-Fehler\n• Komplexere Bedienung\n• Geringere Liquidität bei kleinen Projekten\n\nDEXs sind ein zentraler Baustein von DeFi (Decentralized Finance) – und ein Schritt Richtung Web3-Finanzsystem ohne Mittelsmann.',
    category: 'Technologie',
    relatedTerms: ['ethereum', 'token', 'wallet', 'altcoin'],
    icon: '🔄',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'cex',
    title: 'CEX (Centralized Exchange)',
    slug: 'cex',
    definition: 'CEX steht für Centralized Exchange – also eine zentrale Krypto-Börse wie Bitvavo oder Binance. Erfahre hier, wie sie funktionieren und worin die Unterschiede zu DEXs liegen.',
    extendedExplanation: 'Ein CEX (Centralized Exchange) ist eine zentral verwaltete Plattform zum Kaufen, Verkaufen und Verwahren von Kryptowährungen wie Bitcoin oder Ethereum.\n\nCEX steht für Centralized Exchange – also eine zentrale Krypto-Börse, bei der ein Unternehmen die Plattform betreibt, Nutzerdaten verwaltet und Transaktionen organisiert.\n\nBeispiele für bekannte CEXs:\n\n• Bitvavo (Niederlande)\n• Binance (global)\n• Coinbase (USA)\n• Kraken (USA)\n\nEin CEX funktioniert ähnlich wie ein Online-Broker: Du erstellst ein Konto, zahlst Euro oder andere Kryptowährungen ein und kannst dann handeln – in der Regel mit hoher Liquidität, schneller Ausführung und übersichtlicher Benutzeroberfläche.\n\nViele CEXs bieten zusätzliche Funktionen wie:\n\n• Staking\n• Sparpläne\n• Kreditkarten\n• Krypto-Zinskonten\n• NFT-Marktplätze\n\nIm Unterschied zu einem DEX verwahrt ein CEX in der Regel deine Coins für dich – du hast also keinen eigenen Private Key, sondern vertraust dem Anbieter. Das ist bequem, bringt aber auch Risiken (z. B. bei Hacks, Insolvenz oder eingefrorenen Auszahlungen).',
    category: 'Technologie',
    relatedTerms: ['dex', 'wallet', 'bitcoin'],
    icon: '🏢',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'mining',
    title: 'Mining',
    slug: 'mining',
    definition: 'Mining sichert Blockchains wie Bitcoin und erzeugt neue Coins. Erfahre hier, wie Mining funktioniert, welche Arten es gibt und was du beachten solltest.',
    extendedExplanation: 'Mining ist der Prozess, bei dem durch das Lösen komplexer Rechenaufgaben neue Kryptowährungen entstehen und Transaktionen auf der Blockchain bestätigt werden.\n\nMining (auf Deutsch: „Schürfen") ist das ursprüngliche Verfahren zur Erzeugung von Kryptowährungen – allen voran Bitcoin. Miner treten in einem globalen Wettbewerb an, um mathematische Aufgaben zu lösen. Derjenige, der zuerst den richtigen „Hash" findet, darf den nächsten Block zur Blockchain hinzufügen und erhält dafür eine Blockbelohnung in Form neuer Coins sowie Transaktionsgebühren.\n\nTechnisch basiert Mining auf dem sogenannten Proof-of-Work-Verfahren (PoW). Es benötigt spezialisierte Hardware – z. B. ASIC-Miner – und eine große Menge Strom. Daher ist Mining nicht nur ein technisches, sondern auch ein wirtschaftliches Thema.\n\nNeben Bitcoin nutzen auch andere Kryptowährungen PoW, z. B. Litecoin oder Kaspa. Viele neuere Netzwerke setzen jedoch auf Proof of Stake (PoS), bei dem keine energieintensiven Rechenoperationen nötig sind.\n\nFür Privatanleger ist das eigene Mining heute meist nicht mehr rentabel. Stattdessen setzen viele auf Mining-Farmen oder investieren indirekt über Krypto-ETFs oder Aktien von Mining-Unternehmen.',
    category: 'Technologie',
    relatedTerms: ['bitcoin', 'blockchain', 'ethereum'],
    icon: '⛏️',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'staking',
    title: 'Staking',
    slug: 'staking',
    definition: 'Mit Staking kannst du Kryptowährungen wie Ethereum verzinsen. Erfahre hier, wie Staking funktioniert, welche Risiken es gibt und worauf du achten solltest.',
    extendedExplanation: 'Staking bedeutet, Kryptowährungen in einem Blockchain-Netzwerk zu hinterlegen, um das Netzwerk zu sichern und dafür regelmäßige Belohnungen – sogenannte Rewards – zu erhalten.\n\nStaking ist die umweltfreundliche Alternative zum Mining – denn statt Strom und Rechenpower wird hier Krypto-Kapital eingesetzt, um eine Blockchain abzusichern. Möglich macht das der Konsensmechanismus Proof of Stake (PoS).\n\nWenn du Coins wie Ethereum, Cardano, Solana oder Polkadot hältst, kannst du sie „staken", also blockieren und dem Netzwerk zur Verfügung stellen. Dafür bekommst du regelmäßig Staking-Rewards, vergleichbar mit Zinsen. Je mehr du stakest (oder je länger), desto höher dein Anteil an der Belohnung.\n\nEs gibt zwei Wege:\n\n• Direktes Staking: Du betreibst selbst einen Node (technisch anspruchsvoll)\n• Indirektes Staking: Du nutzt eine Börse oder einen Pool (z. B. bei Bitvavo oder Ledger Live)\n\nStaking ist besonders für langfristige Investoren interessant – etwa als Zusatzstrategie zu einem Sparplan.\n\nAber Vorsicht: Manche Staking-Modelle haben Sperrfristen, Slashing-Risiken (bei falschem Verhalten) oder erfordern Mindestbeträge.',
    category: 'Technologie',
    relatedTerms: ['ethereum', 'cex', 'wallet'],
    icon: '🔒',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'defi',
    title: 'DeFi',
    slug: 'defi',
    definition: 'DeFi steht für Decentralized Finance – ein neues Finanzsystem auf der Blockchain. Erfahre hier, wie DeFi funktioniert, welche Chancen und Risiken es bietet.',
    extendedExplanation: 'DeFi (Decentralized Finance) bezeichnet Finanzanwendungen wie Kreditvergabe, Handel oder Zinsprodukte, die direkt über die Blockchain und ohne zentrale Instanzen funktionieren.\n\nDeFi ist die Abkürzung für Decentralized Finance – also dezentrale Finanzdienstleistungen, die ohne Banken, Vermittler oder zentrale Autoritäten auskommen. Stattdessen laufen die Prozesse über sogenannte Smart Contracts auf Blockchains wie Ethereum oder Solana.\n\nKernidee: Jeder mit Internetzugang kann auf DeFi-Dienste zugreifen – weltweit, rund um die Uhr, ohne Erlaubnis oder Bankkonto.\n\nTypische DeFi-Anwendungen:\n\n• DEXs (dezentrale Börsen wie Uniswap oder Curve)\n• Lending-Plattformen (z. B. Aave, Compound)\n• Stablecoins (z. B. DAI)\n• Yield Farming & Liquidity Mining\n• Dezentrale Versicherungen\n\nVorteile:\n\n• Offene, transparente Systeme\n• Niedrige Einstiegshürden\n• Kontrolle bleibt beim Nutzer\n\nAber auch Risiken:\n\n• Smart-Contract-Hacks\n• fehlender Verbraucherschutz\n• volatile Zinsen und hohe Komplexität\n\nDeFi ist noch jung – aber es gilt als eines der vielversprechendsten Anwendungsfelder der Blockchain-Technologie.',
    category: 'Technologie',
    relatedTerms: ['ethereum', 'dex', 'staking', 'token'],
    icon: '🏛️',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'seed-phrase',
    title: 'Seed Phrase',
    slug: 'seed-phrase',
    definition: 'Die Seed Phrase ist der wichtigste Sicherheitscode deiner Wallet. Erfahre hier, was sie bedeutet, wie du sie sicher aufbewahrst und warum du sie nie verlieren darfst.',
    extendedExplanation: 'Die Seed Phrase ist eine Liste aus 12 oder 24 Wörtern, mit der du deine Krypto-Wallet wiederherstellen kannst – sie ist der Backup-Schlüssel zu deinem gesamten Vermögen.\n\nDie Seed Phrase (auch Recovery Phrase genannt) ist eine Art Master-Passwort, das deine Wallet generiert, wenn du sie zum ersten Mal einrichtest. Sie besteht aus standardisierten, leicht lesbaren Wörtern (z. B. „apple", „rocket", „yellow") – in der Regel 12 oder 24 Stück – und kann in exakt dieser Reihenfolge deine gesamte Wallet wiederherstellen.\n\nTechnisch gesehen erzeugt die Seed Phrase deinen Private Key, der wiederum den Zugang zu deinen Kryptowährungen kontrolliert.\n\n📌 Das bedeutet:\n\nWer deine Seed Phrase kennt, hat die volle Kontrolle über deine Coins – ganz ohne Passwort oder App.\n\nDarum gilt:\n\n• Niemals digital speichern (Screenshot, Cloud, E-Mail = Risiko!)\n• Immer offline und mehrfach sichern – z. B. auf Papier oder in einer Metallplatte\n• Niemandem zeigen – und auch nicht verlieren (kein Zurücksetzen möglich!)\n\nWallets wie Ledger, Trezor, MetaMask oder Trust Wallet verwenden alle das BIP39-Standardformat, damit du deine Wallet auch auf anderen Geräten wiederherstellen kannst.',
    category: 'Sicherheit',
    relatedTerms: ['wallet', 'private-key', 'bitcoin'],
    icon: '🌱',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'fiat',
    title: 'Fiatgeld',
    slug: 'fiat',
    definition: 'Fiatgeld wie Euro oder US-Dollar ist staatlich ausgegebenes Geld ohne inneren Wert. Erfahre hier, was Fiat ist – und warum Krypto anders funktioniert.',
    extendedExplanation: 'Fiatgeld ist staatlich ausgegebenes Geld wie Euro oder US-Dollar – es besitzt keinen inneren Wert und basiert auf Vertrauen in Regierung und Zentralbank.\n\nDer Begriff Fiatgeld kommt vom lateinischen „fiat" – also „es werde". Gemeint ist: Das Geld hat keinen intrinsischen Wert wie z. B. Gold – es hat Wert, weil der Staat es dazu erklärt.\n\nUnsere heutigen Währungen – Euro, Dollar, Yen usw. – sind Fiatgeldsysteme. Sie werden von Zentralbanken gesteuert, können beliebig vermehrt werden (Inflation) und basieren auf Vertrauen: in Politik, Finanzsystem und Stabilität.\n\nIm Gegensatz dazu steht Bitcoin: ein digitales, dezentral begrenztes Geld ohne zentrale Kontrolle – von vielen als Gegenspieler zum Fiatgeld verstanden.\n\nKritiker sehen in Fiatgeldsystemen ein Risiko für langfristigen Wohlstandsverlust durch Inflation oder politische Einflussnahme. Genau aus diesem Grund wurde Bitcoin entwickelt – als Alternative zu zentralem, unbegrenzt druckbarem Geld.',
    category: 'Grundlagen',
    relatedTerms: ['bitcoin', 'blockchain', 'staking'],
    icon: '💶',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'stablecoin',
    title: 'Stablecoin',
    slug: 'stablecoin',
    definition: 'Stablecoins sind Kryptowährungen mit stabilem Wert – meist 1:1 an den US-Dollar gekoppelt. Erfahre hier, wie sie funktionieren und welche Risiken es gibt.',
    extendedExplanation: 'Ein Stablecoin ist eine Kryptowährung, deren Wert an eine stabile Referenz wie den US-Dollar oder den Euro gekoppelt ist – meist im Verhältnis 1:1.\n\nStablecoins verbinden die Vorteile von Kryptowährungen mit der Stabilität klassischer Währungen. Sie werden oft verwendet, um:\n\n• Volatilität zu vermeiden\n• Transfers zwischen Börsen schnell & günstig durchzuführen\n• Zinserträge zu generieren (z. B. in DeFi)\n\nEs gibt verschiedene Arten von Stablecoins:\n\n• Fiat-gedeckt (z. B. USDT, USDC): durch echte Dollarreserven gesichert\n• Krypto-gedeckt (z. B. DAI): durch andere Kryptowährungen wie ETH überbesichert\n• Algorithmisch (z. B. UST – gescheitert): Preisstabilität durch Mechanismen, aber ohne echte Deckung\n\nStablecoins sind wichtig für DeFi, Sparpläne, Handel und die Krypto-Adoption in Ländern mit instabiler Währung.\n\nAber: Auch Stablecoins sind nicht risikofrei – etwa durch fehlende Transparenz oder regulatorische Unsicherheit.',
    category: 'Kryptowährungen',
    relatedTerms: ['fiat', 'defi', 'token', 'ethereum'],
    icon: '⚖️',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'smart-contract',
    title: 'Smart Contract',
    slug: 'smart-contract',
    definition: 'Ein Smart Contract ist ein digitaler Vertrag auf der Blockchain, der automatisch ausgeführt wird. Erfahre hier, wie sie funktionieren und wofür sie genutzt werden.',
    extendedExplanation: 'Ein Smart Contract ist ein selbstausführender Code auf der Blockchain, der automatisch abläuft, sobald bestimmte Bedingungen erfüllt sind – ganz ohne Mittelsmann.\n\nEin Smart Contract ist im Grunde ein digitaler Vertrag, der sich selbst verwaltet. Er wird auf einer Blockchain (z. B. Ethereum) gespeichert und enthält Regeln und Bedingungen, die automatisch ausgeführt werden, wenn sie erfüllt sind.\n\nBeispiel:\n\n„Wenn Person A 1 ETH an Adresse B sendet, bekommt sie im Gegenzug 100 Token zurück."\n\nSolche Verträge laufen ohne Anwalt, Notar oder Bank – schnell, transparent, unveränderlich. Dadurch ermöglichen Smart Contracts ganz neue Formen der Zusammenarbeit:\n\nAnwendungsbeispiele:\n\n• DeFi-Protokolle (z. B. Kredite, Zinsen, Tausch)\n• NFT-Handel (Besitzübertragungen)\n• DAOs (dezentrale Organisationen)\n• Gaming- und Metaverse-Anwendungen\n\nSmart Contracts gelten als zentraler Baustein des Web3 – dem dezentralen Internet der Zukunft.',
    category: 'Technologie',
    relatedTerms: ['ethereum', 'defi', 'nft', 'blockchain'],
    icon: '📜',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'gas-fee',
    title: 'Gas Fee',
    slug: 'gas-fee',
    definition: 'Gas Fees sind Gebühren für Transaktionen auf der Ethereum-Blockchain. Erfahre hier, wie sie funktionieren, warum sie schwanken und wie du sie reduzieren kannst.',
    extendedExplanation: 'Gas Fees sind Transaktionsgebühren, die du zahlst, um Aktionen auf Blockchains wie Ethereum auszuführen – z. B. beim Senden von Coins oder bei der Nutzung von Smart Contracts.\n\nGas ist die Recheneinheit für den Aufwand, den dein Auftrag (z. B. eine Transaktion oder ein NFT-Kauf) im Ethereum-Netzwerk verursacht. Die Gebühr – also die Gas Fee – bezahlst du in ETH, und sie geht an die Validatoren, die deine Transaktion bestätigen.\n\nWichtig zu wissen:\n\n• Je komplexer die Aktion (z. B. NFT-Mint vs. einfacher ETH-Transfer), desto höher der Gasverbrauch\n• Je höher die Netzwerkauslastung, desto teurer die Gas Fees (Angebot & Nachfrage!)\n• Gas Fees sind besonders relevant bei DeFi, NFT-Käufen und Interaktionen mit Smart Contracts\n\nViele Layer-2-Netzwerke (z. B. Arbitrum, Optimism) wurden entwickelt, um genau diese Gebühren deutlich zu senken – ohne auf Sicherheit zu verzichten.',
    category: 'Technologie',
    relatedTerms: ['ethereum', 'smart-contract', 'nft', 'defi'],
    icon: '⛽',
    lastUpdated: '2025-09-17'
  },
  {
    id: 'xrp',
    title: 'XRP',
    slug: 'xrp',
    definition: 'XRP ist die native Währung der XRP Ledger – schnell, energieeffizient und unabhängig von Ripple Labs. Erfahre hier, wie XRP funktioniert und wofür es genutzt wird.',
    extendedExplanation: 'XRP ist eine dezentrale Kryptowährung, die auf dem XRP Ledger läuft – einem schnellen, skalierbaren Netzwerk, das besonders für Zahlungsanwendungen entwickelt wurde.\n\nXRP ist die native Währung der XRP Ledger (XRPL), einer unabhängigen, öffentlichen Blockchain, die bereits 2012 entwickelt wurde – mit dem Ziel, schnelle, kostengünstige und energieeffiziente Transaktionen zu ermöglichen.\n\nIm Gegensatz zu Bitcoin oder Ethereum verwendet der XRPL keinen Proof-of-Work oder Proof-of-Stake, sondern einen eigenen Konsensmechanismus namens Ripple Protocol Consensus Algorithm (RPCA), der Transaktionen in wenigen Sekunden bestätigt – bei sehr geringer Energienutzung.\n\nWichtig: XRP ist technisch und rechtlich unabhängig von Ripple Labs. Ripple ist ein Unternehmen, das Technologien für den internationalen Zahlungsverkehr entwickelt – z. B. On-Demand Liquidity (ODL) – und dabei XRP als Liquiditätsbrücke nutzt.\n\nAber: Die XRP Ledger funktioniert auch ohne Ripple, wird von einer weltweiten Community betrieben und weiterentwickelt.\n\nAnwendungsbeispiele:\n\n• Transaktionen mit XRP sind blitzschnell und kosten im Schnitt unter 0,001 €\n• Ideal für Micropayments, Remittances und Cross-Border-Transfers\n• XRP wird auch im NFT-Bereich und als Basis für Stablecoins auf XRPL eingesetzt',
    category: 'Kryptowährungen',
    relatedTerms: ['blockchain', 'altcoin', 'stablecoin', 'dex'],
    icon: '💧',
    lastUpdated: '2025-09-17'
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