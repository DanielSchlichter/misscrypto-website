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
  funFact?: string;
  customTitle?: string;
  customSubtitle?: string;
  prosAndCons?: {
    pros: string[];
    cons: string[];
    prosTitle?: string;
    consTitle?: string;
  };
  comparisons?: {
    title: string;
    items: Array<{
      name: string;
      description: string;
    }>;
  };
  walletComparison?: {
    headers: string[];
    rows: Array<{
      type: string;
      values: string[];
    }>;
  };
  recommendations?: Array<{
    title: string;
    description: string;
    link?: string;
    linkText?: string;
    icon: string;
  }>;
  securityTips?: string[];
  walletTypes?: {
    hotWallet: {
      title: string;
      description: string;
      features: string[];
      icon: string;
    };
    coldWallet: {
      title: string;
      description: string;
      features: string[];
      icon: string;
    };
  };
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
    lastUpdated: '2025-09-17',
    funFact: 'Hättest du im Jahr 2010 nur 100 € in Bitcoin investiert, wäre dein Investment heute Millionen wert. Damals kostete 1 BTC weniger als 0,01 €.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Viele Experten vergleichen die Blockchain mit dem Internet im Jahr 1995: Die Technologie steckt noch in den Anfängen – das Potenzial ist riesig.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Viele Menschen denken, ihre Coins würden „in der Wallet liegen". Tatsächlich liegen sie immer auf der Blockchain – die Wallet ist nur dein Schlüssel dorthin.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Der bekannteste verlorene Private Key gehört zu einem Briten, der versehentlich eine Festplatte mit über 7.500 BTC wegwarf – heute mehrere Hundert Millionen Euro wert.'
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
    lastUpdated: '2025-09-17',
    funFact: '2017 war das Jahr der sogenannten ICOs („Initial Coin Offerings") – damals wurden Hunderte Token-Projekte mit oft nur einer Idee und Website finanziert. Viele verschwanden wieder – manche wurden Milliardenprojekte.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Im Jahr 2013 galten schon Coins wie Litecoin und Peercoin als „Konkurrenz" zu Bitcoin – inzwischen gibt es über 10.000 Altcoins mit ganz unterschiedlichen Zielen und Technologien.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Ethereum war ursprünglich nur eine Idee auf einem Whitepaper – finanziert wurde das Projekt durch einen Crowdsale im Jahr 2014, bei dem Investoren ETH zum Startpreis von unter 0,30 $ kaufen konnten.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Inzwischen gibt es sogar eigene Meme-Coins und NFT-Kollektionen, die sich um den Begriff HODL drehen – und auf Kaffeetassen, Shirts und Tattoos wiederzufinden sind.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Das teuerste NFT aller Zeiten („Everydays" von Beeple) wurde 2021 für 69 Millionen Dollar versteigert – über das Auktionshaus Christie\'s.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Der legendäre DeFi-Sommer 2020 begann mit einem DEX: Uniswap wurde zum führenden Handelsplatz für neue Token – ohne zentrale Kontrolle, aber mit Milliardenvolumen.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Die Insolvenz der Krypto-Börse FTX im Jahr 2022 war eine der größten Pleiten der Branche – und führte zu einem Boom bei Self-Custody-Wallets. Die Lehre: „Not your keys, not your coins."'
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
    lastUpdated: '2025-09-17',
    funFact: 'Als Bitcoin 2009 startete, konnte man auf einem ganz normalen Laptop minen. Wer damals eine Stunde „gegraben" hat, bekam 50 BTC – heute über 2 Millionen Euro wert.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Nach dem „Merge" im Jahr 2022 wurde Ethereum von Mining auf Staking umgestellt – und reduzierte den Energieverbrauch des Netzwerks um über 99 %.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Im sogenannten „DeFi-Sommer" 2020 explodierte das Kapital in dezentralen Anwendungen von unter 1 Mrd. $ auf über 15 Mrd. $ – ausgelöst durch das erste große Yield-Farming-Protokoll: Compound.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Manche Krypto-Enthusiasten speichern ihre Seed Phrase in einem Bankschließfach, vergraben sie in der Erde – oder prägen sie in Titanplatten, um Feuer, Wasser und Zeit zu überstehen.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Vor dem Jahr 1971 war der US-Dollar an Gold gebunden – doch mit der „Nixon-Schock"-Erklärung endete das goldgedeckte System. Seitdem sind alle großen Währungen reines Fiatgeld.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Der Stablecoin USDT (Tether) ist die am häufigsten gehandelte Kryptowährung weltweit – mit mehr täglichem Volumen als Bitcoin.'
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
    lastUpdated: '2025-09-17',
    funFact: 'Der Begriff „Smart Contract" wurde schon 1994 vom Kryptographen Nick Szabo geprägt – lange bevor es Blockchains gab.'
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
    lastUpdated: '2025-09-17',
    funFact: 'In der Spitze der NFT-Mania 2021 zahlten Nutzer teils über 500 € an Gas Fees – nur um ein Bild im JPEG-Format zu „minen".'
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
    lastUpdated: '2025-09-17',
    funFact: 'Die XRP Ledger war eine der ersten Blockchains mit integrierter dezentraler Börse – lange bevor DEXs wie Uniswap populär wurden.'
  },
  {
    id: 'custodial-vs-non-custodial',
    title: 'Custodial vs. Non-Custodial',
    slug: 'custodial-vs-non-custodial',
    definition: 'Verwahrest du deine Coins selbst – oder überlässt du sie einem Anbieter? Erfahre hier den Unterschied zwischen Custodial und Non-Custodial Wallets und was das für dich bedeutet.',
    extendedExplanation: 'Custodial bedeutet: ein Anbieter verwaltet deine Kryptowährungen. Non-Custodial bedeutet: du verwaltest deine Coins selbst – inklusive Private Key und Verantwortung.\n\nIm Krypto-Bereich gibt es zwei zentrale Ansätze, wie deine Coins verwahrt werden:\n\n🔶 **Custodial (Fremdverwahrung)**\n• Du nutzt eine Börse oder App, die deine Coins für dich verwahrt\n• Du hast kein Zugriff auf den Private Key\n• Du brauchst nur Benutzername & Passwort (wie beim Online-Banking)\n\nBeispiele: Bitvavo, Binance, Coinbase, Bison App\n\n🔶 **Non-Custodial (Selbstverwahrung)**\n• Du verwahrst deine Coins in einer eigenen Wallet\n• Du bist alleiniger Besitzer des Private Keys oder der Seed Phrase\n\nBeispiele: Ledger, Trezor, MetaMask, XUMM Wallet (für XRP)\n\n💬 **Merksatz:**\nCustodial = wie ein Bankkonto\nNon-Custodial = wie Bargeld unter deinem Kopfkissen',
    category: 'Sicherheit',
    relatedTerms: ['private-key', 'wallet', 'seed-phrase'],
    icon: '🔐',
    lastUpdated: '2025-09-24',
    funFact: 'Ich tenne: Bitvavo für tägliche Käufe (custodial), Ledger für langfristige Aufbewahrung (non-custodial) – das Beste aus beiden Welten.',
    prosAndCons: {
      pros: [
        'Custodial: Einfach zu bedienen, perfekt für Einsteiger',
        'Custodial: Keine Sorge um Private Keys oder Seed Phrases',
        'Custodial: Schneller Handel und Tausch möglich',
        'Non-Custodial: Volle Kontrolle über deine Coins',
        'Non-Custodial: Keine Mittelsmänner, echte Dezentralität',
        'Non-Custodial: Sicher vor Börsenpleiten und Hacks der Plattform'
      ],
      cons: [
        'Custodial: Abhängigkeit vom Anbieter',
        'Custodial: Bei Insolvenz oder Hack kannst du alles verlieren',
        'Custodial: "Not your keys, not your coins" – du besitzt die Coins nicht wirklich',
        'Non-Custodial: Du bist selbst verantwortlich für Sicherheit',
        'Non-Custodial: Bei Verlust der Seed Phrase ist alles weg',
        'Non-Custodial: Technisch anspruchsvoller, steile Lernkurve'
      ]
    }
  },
  {
    id: 'rlusd',
    title: 'RLUSD',
    slug: 'rlusd',
    definition: 'RLUSD ist der Stablecoin von Ripple – 1:1 an den US-Dollar gebunden. Erfahre hier, wie RLUSD funktioniert, was ihn besonders macht und wo er eingesetzt wird.',
    extendedExplanation: 'RLUSD (Ripple USD) ist der neue, offiziell angekündigte Stablecoin von Ripple Labs. Er soll die Vorteile stabiler digitaler Währungen mit regulatorischer Klarheit und Technologie aus dem XRP-Ökosystem kombinieren.\n\nEr basiert auf zwei Blockchains:\n• dem XRP Ledger (XRPL) → schnelle, kostengünstige Transaktionen\n• der Ethereum-Blockchain → Kompatibilität mit DeFi & ERC-20-Standards\n\nDer Coin ist 1:1 durch echte US-Dollar oder gleichwertige Sicherheiten gedeckt und soll vollständig reguliert und transparent verwaltet werden – inklusive regelmäßiger Audit-Berichte.\n\n🔍 **Ziel von RLUSD:**\n• Alternative zu USDT & USDC, aber mit mehr regulatorischer Glaubwürdigkeit\n• Bindeglied zwischen traditionellen Finanzinstituten und Krypto\n• Einsatz in Zahlungsabwicklung, DeFi, Handel, Remittances\n\nRipple selbst spricht von einem „Stablecoin für Institutionen und Nutzer" – mit Fokus auf Compliance, Skalierbarkeit und Interoperabilität.',
    category: 'Kryptowährungen',
    relatedTerms: ['xrp', 'stablecoin', 'ethereum', 'defi'],
    icon: '🏛️',
    lastUpdated: '2025-09-24',
    funFact: 'RLUSD ist einer der ersten Stablecoins, der zeitgleich auf Ethereum und dem XRP Ledger gestartet wurde – mit dem Ziel, regulierte Stabilität und maximale Blockchain-Kompatibilität zu verbinden.',
    comparisons: {
      title: 'Unterschiede zu anderen Stablecoins',
      items: [
        {
          name: 'USDT (Tether)',
          description: 'Marktführer mit über 70 Milliarden $ Market Cap. Läuft auf verschiedenen Blockchains, aber oft wegen mangelnder Transparenz und regulatorischer Unsicherheiten kritisiert.'
        },
        {
          name: 'USDC (Circle)',
          description: 'Regulatorisch besser abgestützt als USDT, vollständig durch US-Dollar gedeckt. Starke Compliance, aber hauptsächlich auf Ethereum und wenigen anderen Chains verfügbar.'
        },
        {
          name: 'RLUSD (Ripple)',
          description: 'Fokus auf maximale regulatorische Compliance und Multi-Chain-Kompatibilität (XRPL + Ethereum). Besonders für institutionelle Anwender und grenzüberschreitende Zahlungen konzipiert.'
        }
      ]
    }
  },
  {
    id: 'layer-2',
    title: 'Layer 2',
    slug: 'layer-2',
    definition: 'Layer 2 bezeichnet eine zusätzliche Technologieebene, die auf einer bestehenden Blockchain (z. B. Ethereum) aufbaut – um schnellere, günstigere Transaktionen zu ermöglichen.',
    extendedExplanation: 'Blockchains wie Ethereum sind sicher und dezentral – aber oft langsam und teuer, vor allem bei hoher Auslastung.\n\nLayer-2-Lösungen wurden entwickelt, um genau das zu verbessern:\n👉 Sie lagern Transaktionen von der Hauptkette (Layer 1) auf eine zusätzliche Schicht (Layer 2) aus und führen sie dort günstiger und effizienter aus.\n\nAm Ende werden die Ergebnisse wieder auf Layer 1 „zurückgeschrieben" – inklusive Sicherheit.\n\n🔎 **Bekannte Layer-2-Projekte:**\n\n• **Arbitrum**\n\n• **Optimism**\n\n• **zkSync**\n\n• **Starknet**\n\n• **Polygon** (teilweise Layer 2, teilweise Sidechain)\n\n**Wichtig für Nutzer:**\n\n• Du brauchst oft eine Bridge, um deine Coins von Layer 1 auf Layer 2 zu übertragen\n\n• Die meisten Layer-2-Netzwerke kannst du mit MetaMask & Co ganz normal nutzen',
    category: 'Technologie',
    relatedTerms: ['ethereum', 'gas-fee', 'smart-contract', 'defi'],
    icon: '⚡',
    lastUpdated: '2025-09-24',
    funFact: 'Arbitrum verarbeitete 2023 zeitweise mehr Transaktionen als Ethereum selbst – auf einer Schicht, die ursprünglich nur „Hilfe zur Selbsthilfe" sein sollte.',
    prosAndCons: {
      pros: [
        'Deutlich geringere Gas Fees',
        'Schnellere Transaktionen als Layer 1',
        'Volle Ethereum-Kompatibilität (Wallets, DApps, Tokens)',
        'Erhält die Sicherheit der Hauptkette',
        'Ermöglicht komplexere DeFi-Anwendungen'
      ],
      cons: [
        'Bridge-Risiken beim Transfer zwischen Layer 1 und 2',
        'Zusätzliche Komplexität für Nutzer',
        'Teilweise längere Wartezeiten bei Rückübertragungen',
        'Noch relativ neue Technologie mit unbekannten Langzeitrisiken'
      ],
      prosTitle: 'Vorteile',
      consTitle: 'Wichtig zu wissen'
    }
  },
  {
    id: 'meme-coin',
    title: 'Meme Coin',
    slug: 'meme-coin',
    definition: 'Meme Coins sind Kryptowährungen, die meist auf Internetwitzen, Popkultur oder viralen Trends basieren – oft ohne technisches Alleinstellungsmerkmal, aber mit viel Community-Power.',
    extendedExplanation: 'Der Begriff „Meme Coin" beschreibt Coins, die ursprünglich aus Spaß oder Ironie entstanden sind – aber durch virale Verbreitung plötzlich enorme Aufmerksamkeit und Marktkapitalisierung gewinnen können.\n\n**Die bekanntesten Vertreter:**\n\n• **Dogecoin (DOGE)** – gestartet 2013 als Scherz mit dem Shiba-Inu-Hund\n\n• **Shiba Inu (SHIB)** – „Dogecoin-Killer", rein communitygetrieben\n\nMittlerweile gibt es tausende Meme Coins – manche rein spekulativ, andere versuchen, echten Nutzen nachzuliefern (Ökosysteme, Spiele, NFTs). Trotzdem bleibt der Hype oft kurzlebig – und viele Meme Coins verschwinden auch schnell wieder.\n\n**Merkmale:**\n\n• Hohe Volatilität\n\n• Starke Community & Social-Media-Dynamik\n\n• Oft niedrige Einstiegspreise (z. B. 0,00001 €) – aber kein Wertversprechen\n\n• Selten echtes Projekt-Team oder langfristige Roadmap',
    category: 'Kryptowährungen',
    relatedTerms: ['bitcoin', 'altcoin', 'token'],
    icon: '🐕',
    lastUpdated: '2025-09-24',
    funFact: 'Dogecoin wurde von Elon Musk mehrfach auf X (Twitter) erwähnt – und stieg 2021 dadurch auf über 80 Milliarden $ Marktkapitalisierung. Der Coin, der als Witz begann, war zeitweise wertvoller als viele DAX-Konzerne.',
    prosAndCons: {
      pros: [
        'Niedrige Einstiegshürden und günstige Preise',
        'Starke Community-Bindung und Spaßfaktor',
        'Hohe Volatilität mit Gewinnpotenzial',
        'Einfach zu verstehen, keine komplexe Technologie',
        'Viral marketing durch Social Media'
      ],
      cons: [
        'Viele Meme Coins sind Pump & Dump-Projekte',
        'Zahlreiche Scams mit versteckten Gebühren',
        'FOMO-Effekt kann zu unüberlegten Investitionen führen',
        'Meist kein echter Nutzen oder langfristiger Wert',
        'Extrem hohe Volatilität und Verlustrisiko'
      ],
      prosTitle: 'Merkmale',
      consTitle: 'Risiken'
    }
  },
  {
    id: 'krypto-sicher-aufbewahren',
    title: 'Krypto sicher aufbewahren',
    slug: 'krypto-sicher-aufbewahren',
    definition: 'Anders als beim Girokonto gibt es in der Krypto-Welt keine Rückbuchung, keinen Bankberater und keine Passwort-zurücksetzen-Funktion. Wer seine Coins sicher verwahren will, muss verstehen: Du bist selbst für deine Sicherheit verantwortlich.',
    extendedExplanation: 'Um Bitcoin oder Ethereum sicher aufzubewahren, brauchst du eine Wallet. Sie speichert deinen Private Key – also den Zugang zu deinen Coins.\n\nMit dem richtigen Setup ist das einfacher, als viele denken. Hier erfährst du alles über Hot Wallets, Cold Wallets, Hardware Wallets und bewährte Sicherheitspraktiken.',
    category: 'Sicherheit',
    relatedTerms: ['wallet', 'private-key', 'seed-phrase'],
    icon: '🔐',
    lastUpdated: '2025-09-24',
    funFact: 'In der Frühzeit von Bitcoin gingen geschätzt 20% aller Coins durch verlorene Private Keys oder vergessene Wallets verloren. Heute wären sie Milliarden wert.',
    walletTypes: {
      hotWallet: {
        title: 'Hot Wallet',
        description: 'Immer mit dem Internet verbunden',
        features: [
          'Einfach und schnell im Alltag',
          'Ideal für kleine Beträge und häufige Transaktionen',
          'Beispiele: Mobile Apps, Browser-Erweiterungen, Börsen'
        ],
        icon: '🔥'
      },
      coldWallet: {
        title: 'Cold Wallet',
        description: 'Offline gespeichert',
        features: [
          'Höchste Sicherheit für größere Beträge',
          'Ideal für langfristige Lagerung',
          'Beispiele: Hardware Wallets, Paper Wallets'
        ],
        icon: '❄️'
      }
    },
    walletComparison: {
      headers: ['Wallet-Typ', 'Geeignet für', 'Sicherheit', 'Alltagstauglichkeit'],
      rows: [
        {
          type: 'Börsen-Wallet',
          values: ['Einsteiger, kleine Beträge', 'Gering', 'Sehr hoch']
        },
        {
          type: 'Mobile Wallet-App',
          values: ['Alltag, Sparpläne', 'Mittel', 'Hoch']
        },
        {
          type: 'Hardware Wallet',
          values: ['Langfristig, große Beträge', 'Hoch', 'Mittel']
        },
        {
          type: 'Paper Wallet',
          values: ['Langzeitarchivierung', 'Sehr hoch', 'Sehr niedrig']
        }
      ]
    },
    recommendations: [
      {
        title: 'Bitvavo',
        description: 'Regulierte Börse aus den Niederlanden. Einfach zu bedienen, sehr günstige Gebühren. Perfekt für Einsteiger und Sparpläne.',
        linkText: 'Jetzt anmelden und 10€ Bonus sichern',
        icon: '✅'
      },
      {
        title: 'Ledger Hardware Wallet',
        description: 'Sicherer Speicher für deine Coins. Unterstützt über 5.000 Kryptowährungen. Die Referenz für Cold Storage.',
        linkText: 'Zum Ledger Nano S+',
        icon: '✅'
      }
    ],
    securityTips: [
      'Recovery Phrase auf Papier sichern – niemals digital!',
      '2-Faktor-Authentifizierung überall aktivieren',
      'Niemals Private Keys oder Passwörter in der Cloud speichern',
      'Regelmäßig Wallet-Backups machen',
      'Vorsicht vor Phishing-Links (besonders bei Wallet-Apps)',
      'Nur offizielle Quellen für Software & Hardware nutzen'
    ]
  },
  {
    id: 'cbdc',
    title: 'CBDC (Digitale Zentralbankwährung)',
    slug: 'cbdc',
    definition: 'CBDCs (Central Bank Digital Currencies) sind digitale Währungen, die direkt von Zentralbanken herausgegeben werden – als offizielles, staatliches Zahlungsmittel.',
    extendedExplanation: 'Während Bitcoin, Ethereum & Co dezentral und unabhängig sind, ist eine CBDC eine digitale Form des Fiatgeldes, z. B. ein digitaler Euro oder digitaler US-Dollar – herausgegeben von staatlicher Hand.\n\nZiel ist es, den Zahlungsverkehr schneller, sicherer und günstiger zu machen – aber unter zentraler Kontrolle. Nutzer könnten CBDCs direkt in digitalen Wallets halten – teils sogar ohne Bankkonto.\n\nCBDCs stehen aktuell weltweit im Fokus:\n\n🇪🇺 EZB arbeitet am digitalen Euro\n\n🇺🇸 USA forschen an einem digitalen Dollar\n\n🇨🇳 China hat den digitalen Yuan bereits in der Praxis getestet\n\n🌍 Über 130 Länder untersuchen aktiv CBDC-Modelle\n\nCBDCs könnten das Finanzsystem grundlegend verändern – sie kombinieren die Effizienz digitaler Zahlungen mit der Stabilität und rechtlichen Sicherheit staatlicher Währungen.',
    category: 'Grundlagen',
    relatedTerms: ['fiat', 'bitcoin', 'stablecoin', 'wallet'],
    icon: '🏛️',
    lastUpdated: '2025-10-16',
    funFact: 'Die Bahamas waren das erste Land der Welt, das eine nationale CBDC einführte: den Sand Dollar – benannt nach einer tropischen Muschel.',
    comparisons: {
      title: 'Unterschiede zu Kryptowährungen',
      items: [
        {
          name: 'CBDC',
          description: 'Herausgeber: Zentralbank | Kontrolle: Staatlich | Angebot: Beliebig erweiterbar | Anonymität: Eingeschränkt/kontrolliert'
        },
        {
          name: 'Bitcoin / XRP etc.',
          description: 'Herausgeber: Dezentral (Netzwerk) | Kontrolle: Nutzerbasiert | Angebot: Begrenzt (z.B. BTC: 21 Mio) | Anonymität: Pseudonym/öffentlich'
        }
      ]
    },
    prosAndCons: {
      pros: [
        'Offizielles, rechtlich sicheres Zahlungsmittel',
        'Schnelle Abwicklung, kein Bargeld nötig',
        'Potenzial für finanzielle Inklusion',
        'Geringere Kosten im Zahlungsverkehr',
        'Bessere Kontrolle über Geldpolitik'
      ],
      cons: [
        'Datenschutz- und Überwachungsbedenken',
        'Gefahr der Negativzinsen oder Sperrung',
        'Kontrolle über das Geld vollständig beim Staat',
        'Mögliche Verdrängung von Bargeld',
        'Technische Abhängigkeit und Cyber-Risiken'
      ],
      prosTitle: 'Vorteile',
      consTitle: 'Kritikpunkte'
    }
  },
  {
    id: 'public-key',
    title: 'Public Key',
    slug: 'public-key',
    definition: 'Ein Public Key ist ein kryptografischer Schlüssel, der als öffentliche Empfangsadresse für Kryptowährungen dient – vergleichbar mit deiner Kontonummer.',
    extendedExplanation: 'Im Hintergrund jeder Wallet stehen zwei Schlüssel:\n\n🔐 der Private Key – geheim, für den Zugriff auf deine Coins\n\n🌐 der Public Key – öffentlich, um Coins zu empfangen\n\nAus dem Private Key wird der Public Key mathematisch abgeleitet. Der Public Key wiederum wird oft in eine Krypto-Adresse umgewandelt (z. B. bc1q… bei Bitcoin oder 0x… bei Ethereum).\n\n**Beispiel:**\nDu willst Bitcoin empfangen →\nDu gibst deinem Kontakt deine Wallet-Adresse, die aus deinem Public Key generiert wurde →\nNur du kannst die empfangenen Coins später mit deinem Private Key ausgeben\n\n**Wichtig:** Der Public Key kann öffentlich geteilt werden – aber nicht der Private Key!\n\nDiese asymmetrische Kryptografie ist das Fundament aller Blockchain-Transaktionen und macht sicheren, dezentralen Werttransfer ohne Mittelsmann möglich.',
    category: 'Sicherheit',
    relatedTerms: ['private-key', 'wallet', 'seed-phrase', 'krypto-sicher-aufbewahren'],
    icon: '🌐',
    lastUpdated: '2025-10-16',
    funFact: 'Aus einem einzigen Private Key lassen sich über 1 Milliarde verschiedene Public Keys erzeugen – was Multisig, Adresswechsel und Privatsphäre im Krypto-Space möglich macht.',
    walletComparison: {
      headers: ['Merkmal', 'Public Key', 'Private Key'],
      rows: [
        {
          type: 'Sichtbarkeit',
          values: ['Öffentlich', 'Geheim']
        },
        {
          type: 'Nutzung',
          values: ['Empfangen von Coins', 'Zugriff & Versenden']
        },
        {
          type: 'Sicherheit',
          values: ['Darf geteilt werden', 'Darf niemals geteilt werden']
        },
        {
          type: 'Vergleich',
          values: ['Wie eine IBAN', 'Wie eine PIN']
        }
      ]
    }
  },
  {
    id: 'hashrate',
    title: 'Hashrate',
    slug: 'hashrate',
    definition: 'Die Hashrate misst, wie viele Rechenoperationen pro Sekunde im Netzwerk durchgeführt werden – ein Indikator für Sicherheit, Aktivität und Mining-Leistung.',
    extendedExplanation: '„Hashrate" bezeichnet die Gesamtleistung aller Computer, die an einem Proof-of-Work-Netzwerk wie Bitcoin mitarbeiten.\n\nSie gibt an, wie viele Hashes (mathematische Rätsel) pro Sekunde berechnet werden – in Einheiten wie TH/s (Terahashes) oder EH/s (Exahashes).\n\n**Je höher die Hashrate:**\n\n• desto schwerer ist es, das Netzwerk anzugreifen (z. B. durch eine 51%-Attacke)\n\n• desto stärker ist der Wettbewerb unter Minern\n\n• desto höher ist tendenziell der Energieverbrauch\n\n**Zusammenhang mit Mining:**\n\nMiner lösen Rechenaufgaben, um neue Blöcke zu finden → Wer mehr Hashpower hat, hat bessere Chancen auf die Belohnung.\n\nDie Hashrate kann durch neue Hardware, Strompreise oder Marktpreise stark schwanken.\n\n**Beobachtung der Hashrate:**\n\nDie Hashrate ist ein wichtiger Indikator für das Vertrauen in ein Netzwerk – und wird häufig in Charts (z. B. auf CoinWarz, Glassnode oder Blockchain.com) beobachtet.',
    category: 'Technologie',
    relatedTerms: ['mining', 'bitcoin', 'blockchain'],
    icon: '⚡',
    lastUpdated: '2025-10-16',
    funFact: 'Die Bitcoin-Hashrate ist 2025 so hoch, dass das Netzwerk mehr Rechenoperationen pro Sekunde ausführt als alle Supercomputer der Welt zusammen – aber mit spezialisierter Hardware.',
    comparisons: {
      title: 'Typische Hashrate-Werte (2025)',
      items: [
        {
          name: 'Bitcoin',
          description: 'Über 600 EH/s (Exahashes pro Sekunde) – extrem sicher durch massive Rechenleistung'
        },
        {
          name: 'Litecoin',
          description: 'Einige hundert TH/s (Terahashes pro Sekunde) – deutlich geringer als Bitcoin'
        },
        {
          name: 'Kleine Altcoins',
          description: 'Oft unter 1 TH/s – anfälliger für 51%-Attacken durch geringe Hashrate'
        }
      ]
    }
  },
  {
    id: 'proof-of-work',
    title: 'Proof of Work',
    slug: 'proof-of-work',
    definition: 'Proof of Work (PoW) ist ein Konsensverfahren, bei dem Computer komplexe Rechenaufgaben lösen müssen, um neue Blöcke zur Blockchain hinzuzufügen.',
    extendedExplanation: 'In dezentralen Netzwerken wie Bitcoin gibt es keine zentrale Instanz, die Transaktionen freigibt. Stattdessen braucht es einen Konsensmechanismus, der sicherstellt:\n\n✅ Nur gültige Transaktionen werden übernommen\n✅ Das Netzwerk bleibt vertrauenswürdig – auch ohne Mittelsmann\n\n**Proof of Work löst das Problem über Rechenleistung:**\n\nMiner müssen eine mathematische Aufgabe lösen – wer das zuerst schafft, darf den nächsten Block schreiben und erhält eine Belohnung (Block Reward + Fees).\n\n**Das braucht:**\n\n• Zeit\n• Energie\n• Spezialisierte Hardware (ASICs)\n\n**Die „Arbeit", die dabei geleistet wird, schützt die Blockchain:**\n\nJe höher die Rechenleistung im Netzwerk (Hashrate), desto schwerer ist es, es anzugreifen.\n\nProof of Work ist der bewährteste Konsensmechanismus im Krypto-Space – verwendet von Bitcoin, Litecoin und vielen anderen Netzwerken. Moderne Alternativen wie Proof of Stake sind energieeffizienter, aber PoW gilt weiterhin als der sicherste und dezentralste Ansatz.',
    category: 'Technologie',
    relatedTerms: ['bitcoin', 'hashrate', 'mining', 'blockchain'],
    icon: '⚙️',
    lastUpdated: '2025-10-16',
    funFact: 'Das Prinzip Proof of Work wurde lange vor Bitcoin erfunden – ursprünglich zur Spam-Bekämpfung bei E-Mails (Hashcash-System, 1997).',
    prosAndCons: {
      pros: [
        'Hohe Sicherheit und Dezentralität',
        'Bewährt seit über einem Jahrzehnt (Bitcoin, Litecoin)',
        'Unabhängig von Vertrauen in zentrale Instanzen',
        'Schwer zu manipulieren bei hoher Hashrate',
        'Transparenter und nachvollziehbarer Konsensprozess'
      ],
      cons: [
        'Hoher Energieverbrauch',
        'Konzentration durch Mining-Farmen',
        'Nicht ideal für Blockchains mit komplexen Smart Contracts',
        'Langsame Transaktionsbestätigung',
        'Hardware-Wettrüsten bei Minern'
      ],
      prosTitle: 'Vorteile',
      consTitle: 'Kritik'
    }
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