import { Metadata } from 'next'
import BitpandaModular from './BitpandaModular'

export const metadata: Metadata = {
  title: 'Bitpanda Review 2025: Österreichs führende Krypto-Börse im Test | MissCrypto',
  description: 'Bitpanda Test 2025: Erfahrungen mit Österreichs führender Krypto-Börse. FMA-reguliert, keine Ein-/Auszahlungsgebühren, 400+ Assets. Jetzt bei Bitpanda starten!',
  openGraph: {
    title: 'Bitpanda Review 2025: Österreichs führende Krypto-Börse im Test | MissCrypto',
    description: 'Bitpanda Test 2025: Erfahrungen mit Österreichs führender Krypto-Börse. FMA-reguliert, keine Ein-/Auszahlungsgebühren, 400+ Assets. Jetzt bei Bitpanda starten!',
    type: 'website',
  },
}

export default function BitpandaPage() {
  return <BitpandaModular />
}