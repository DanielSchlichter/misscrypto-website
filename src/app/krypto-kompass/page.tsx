import { Metadata } from 'next';
import KryptoKompassClient from './KryptoKompassClient';

export const metadata: Metadata = {
  title: 'Der Krypto Kompass - Dein Einstieg in Bitcoin, Blockchain und Co | MissCrypto',
  description: 'Krypto verstehen – Angst verlieren: Der Praxis Guide von MissCrypto. Vom Grundbegriff Kryptowährung bis zum Wallet. Jetzt das Buch kaufen!',
  keywords: ['Krypto Buch', 'Bitcoin Buch', 'Blockchain Buch', 'Kryptowährung lernen', 'MissCrypto Buch', 'Krypto Kompass', 'Dr. Stephanie Morgenroth'],
  openGraph: {
    title: 'Der Krypto Kompass - Das Buch von MissCrypto',
    description: 'Verständliche Einführung in die Krypto-Welt. Vom Bitcoin Sparplan bis zum Mischportfolio - alles was du wissen musst!',
    images: ['/buch/BuchCover.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Der Krypto Kompass - Das Buch von MissCrypto',
    description: 'Krypto verstehen – Angst verlieren: Der ultimative Praxis Guide',
    images: ['/buch/BuchCover.jpg'],
  }
};

export default function KryptoKompassPage() {
  return <KryptoKompassClient />;
}