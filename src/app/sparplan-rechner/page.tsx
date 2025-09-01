import { Metadata } from 'next'
import SparplanRechnerClient from './SparplanRechnerClient'

export const metadata: Metadata = {
  title: 'Krypto-Sparplan Rechner: DCA-Rechner für Bitcoin, Ethereum & Co. | MissCrypto',
  description: 'Berechne deine Krypto-Sparplan Rendite! Unser DCA-Rechner zeigt, wie sich regelmäßige Investitionen in Bitcoin, Ethereum und andere Kryptowährungen entwickelt hätten.',
  keywords: 'Krypto Sparplan, DCA Rechner, Dollar Cost Average, Bitcoin Sparplan, Ethereum Sparplan, Kryptowährung investieren',
  openGraph: {
    title: 'Krypto-Sparplan Rechner: DCA-Rechner für Bitcoin, Ethereum & Co.',
    description: 'Berechne deine Krypto-Sparplan Rendite! Unser DCA-Rechner zeigt, wie sich regelmäßige Investitionen in Bitcoin, Ethereum und andere Kryptowährungen entwickelt hätten.',
    type: 'website',
  }
}

export default function SparplanRechnerPage() {
  return <SparplanRechnerClient />
}