import { Metadata } from 'next';
import BybitModular from './BybitModular';

export const metadata: Metadata = {
  title: 'Bybit Test 2025: MiCA-konforme Krypto-Börse - Erfahrungen & Review',
  description: 'Bybit Erfahrungen 2025 ⭐ MiCA-konform in EU ✓ 400+ Kryptowährungen ✓ 20+ Mio Nutzer ✓ Copy Trading ✓ Futures & Spot Trading ✓ Jetzt testen!',
  keywords: 'Bybit Test, Bybit Erfahrungen, Bybit Krypto-Börse, MiCA-konform, Bybit Futures, Bybit Copy Trading, Bitcoin kaufen Bybit, Ethereum kaufen Bybit, Bybit Staking',
  authors: [{ name: 'MissCrypto Team' }],
  creator: 'MissCrypto',
  publisher: 'MissCrypto',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://misscrypto.com'),
  openGraph: {
    title: 'Bybit Test 2025: Die innovative MiCA-konforme Krypto-Börse',
    description: 'Bybit Erfahrungen 2025 ⭐ MiCA-konform ✓ 400+ Kryptowährungen ✓ 20+ Mio Nutzer ✓ Copy Trading ✓',
    url: 'https://misscrypto.com/bybit',
    siteName: 'MissCrypto',
    locale: 'de_DE',
    type: 'article',
    publishedTime: '2025-01-01T00:00:00.000Z',
    modifiedTime: new Date().toISOString(),
    images: [
      {
        url: 'https://misscrypto.com/images/bybit-test-2025.png',
        width: 1200,
        height: 630,
        alt: 'Bybit Test 2025 - MiCA-konforme Krypto-Börse'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bybit Test 2025: MiCA-konforme Krypto-Börse',
    description: 'Bybit Erfahrungen 2025 ⭐ MiCA-konform ✓ 400+ Kryptowährungen ✓ Copy Trading ✓',
    images: ['https://misscrypto.com/images/bybit-test-2025.png'],
    creator: '@misscrypto'
  },
  alternates: {
    canonical: 'https://misscrypto.com/bybit',
    languages: {
      'de-DE': 'https://misscrypto.com/bybit',
      'x-default': 'https://misscrypto.com/bybit'
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code'
  },
  category: 'Kryptowährung'
};

export default function BybitPage() {
  // Enhanced structured data for better SEO and Google rich snippets
  const structuredData = [
    // FAQ Page Schema for Google FAQ Rich Snippets
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "@id": "https://misscrypto.com/bybit#faq-sicherheit",
          "name": "Ist Bybit sicher und reguliert?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, Bybit hat 2025 eine MiCA-konforme Krypto-Börse in der EU gestartet und erfüllt damit die neuen europaweiten Standards für Krypto-Assets. Kundengelder werden überwiegend in Cold Wallets verwahrt, und moderne Sicherheitsfeatures wie Zwei-Faktor-Authentifizierung schützen vor unbefugtem Zugriff.",
            "url": "https://misscrypto.com/bybit#faq-sicherheit"
          }
        },
        {
          "@type": "Question",
          "@id": "https://misscrypto.com/bybit#faq-kryptowaehrungen",
          "name": "Welche Kryptowährungen kann man bei Bybit handeln?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bybit bietet über 400 Kryptowährungen zum Handel an, darunter Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Ripple (XRP) und viele weitere. Die Plattform unterstützt sowohl Spot- als auch Futures-Handel mit hoher Liquidität.",
            "url": "https://misscrypto.com/bybit#faq-kryptowaehrungen"
          }
        },
        {
          "@type": "Question",
          "@id": "https://misscrypto.com/bybit#faq-copy-trading",
          "name": "Was ist Copy Trading bei Bybit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Copy Trading bei Bybit ermöglicht es Anlegern, automatisch die Trades erfolgreicher Händler zu kopieren. Diese Funktion ist ideal für Einsteiger, die von der Erfahrung professioneller Trader profitieren möchten, ohne selbst tiefgreifende Marktanalysen durchführen zu müssen.",
            "url": "https://misscrypto.com/bybit#faq-copy-trading"
          }
        },
        {
          "@type": "Question",
          "@id": "https://misscrypto.com/bybit#faq-nutzer",
          "name": "Wie viele Nutzer hat Bybit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bybit hat weltweit über 20 Millionen registrierte Nutzer und zählt damit zu den führenden internationalen Krypto-Börsen. Die Plattform ist bekannt für ihre hohe Liquidität, schnelle Orderausführung und benutzerfreundliche Oberfläche.",
            "url": "https://misscrypto.com/bybit#faq-nutzer"
          }
        },
        {
          "@type": "Question",
          "@id": "https://misscrypto.com/bybit#faq-mica",
          "name": "Was bedeutet MiCA-konform für Bybit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "MiCA-Konformität bedeutet, dass Bybit die neuen europaweiten Standards für Krypto-Assets erfüllt. Für Nutzer bedeutet das mehr Rechtssicherheit, Transparenz und Anlegerschutz. Ein- und Auszahlungen sind klar nachvollziehbar und bankenfreundlich abgesichert.",
            "url": "https://misscrypto.com/bybit#faq-mica"
          }
        }
      ]
    },
    // Article Schema for better content understanding
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://misscrypto.com/bybit",
      "headline": "Bybit Test 2025: MiCA-konforme Krypto-Börse - Erfahrungen & Review",
      "description": "Bybit Erfahrungen 2025 ⭐ MiCA-konform in EU ✓ 400+ Kryptowährungen ✓ 20+ Mio Nutzer ✓ Copy Trading ✓ Futures & Spot Trading ✓ Jetzt testen!",
      "image": [
        "https://misscrypto.com/images/bybit-test-2025.png"
      ],
      "datePublished": "2025-01-01T00:00:00.000Z",
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "MissCrypto",
        "url": "https://misscrypto.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MissCrypto",
        "url": "https://misscrypto.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://misscrypto.com/images/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://misscrypto.com/bybit"
      },
      "articleSection": "Kryptowährung",
      "keywords": [
        "Bybit Test",
        "Bybit Erfahrungen",
        "MiCA-konform",
        "Copy Trading",
        "Krypto-Börse",
        "400 Kryptowährungen",
        "Futures Trading",
        "Spot Trading"
      ],
      "about": [
        {
          "@type": "Thing",
          "name": "Bybit",
          "description": "Internationale Krypto-Börse mit über 20 Millionen Nutzern"
        },
        {
          "@type": "Thing",
          "name": "MiCA",
          "description": "Markets in Crypto-Assets Regulation der Europäischen Union"
        },
        {
          "@type": "Thing",
          "name": "Copy Trading",
          "description": "Automatisches Kopieren von Trades erfolgreicher Händler"
        }
      ]
    },
    // Breadcrumb Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://misscrypto.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Krypto-Börsen",
          "item": "https://misscrypto.com/krypto-boersen"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Bybit Test 2025",
          "item": "https://misscrypto.com/bybit"
        }
      ]
    }
  ];

  return (
    <>
      {/* Enhanced structured data for Google rich snippets */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}

      {/* Semantic HTML structure for better SEO */}
      <article itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content="Bybit Test 2025: MiCA-konforme Krypto-Börse - Erfahrungen & Review" />
        <meta itemProp="description" content="Bybit Erfahrungen 2025 ⭐ MiCA-konform in EU ✓ 400+ Kryptowährungen ✓ 20+ Mio Nutzer ✓ Copy Trading ✓ Futures & Spot Trading ✓ Jetzt testen!" />
        <meta itemProp="datePublished" content="2025-01-01T00:00:00.000Z" />
        <meta itemProp="dateModified" content={new Date().toISOString()} />
        <meta itemProp="author" content="MissCrypto" />
        <meta itemProp="publisher" content="MissCrypto" />

        <BybitModular />
      </article>
    </>
  );
}