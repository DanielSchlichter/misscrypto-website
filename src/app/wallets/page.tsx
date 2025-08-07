import { Metadata } from 'next'
import WalletsPageClient from './WalletsPageClient'

export const metadata: Metadata = {
  title: 'Krypto sicher aufbewahren: Die besten Wallets im Vergleich | MissCrypto',
  description: 'Ledger, BitBox oder Tangem? Finde heraus, welche Wallet zu dir passt – mit persönlichem Vergleich, Tipps zur sicheren Aufbewahrung und praktischen Empfehlungen.',
  keywords: 'Hardware Wallet, Ledger, BitBox, Tangem, Kryptowährung sicher aufbewahren, Seed Phrase, Bitcoin Wallet',
  openGraph: {
    title: 'Krypto sicher aufbewahren: Die besten Wallets im Vergleich',
    description: 'Ledger, BitBox oder Tangem? Finde heraus, welche Wallet zu dir passt – mit persönlichem Vergleich und praktischen Empfehlungen.',
    type: 'article',
  }
}

export default function WalletsPage() {
  return <WalletsPageClient />
} 