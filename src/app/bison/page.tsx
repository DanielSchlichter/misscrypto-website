import { Metadata } from 'next'
import BisonModular from './BisonModular'

export const metadata: Metadata = {
  title: 'BISON Review 2025: Die deutsche Krypto-App der Börse Stuttgart | MissCrypto',
  description: 'BISON Test 2025: Die sichere Krypto-App der Börse Stuttgart. BaFin-reguliert, 40+ Kryptowährungen, transparente Preise. Jetzt bei BISON starten!',
  openGraph: {
    title: 'BISON Review 2025: Die deutsche Krypto-App der Börse Stuttgart | MissCrypto',
    description: 'BISON Test 2025: Die sichere Krypto-App der Börse Stuttgart. BaFin-reguliert, 40+ Kryptowährungen, transparente Preise. Jetzt bei BISON starten!',
    type: 'website',
  },
}

export default function BisonPage() {
  return <BisonModular />
}