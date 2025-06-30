import type { Metadata } from "next";
import { Raleway } from 'next/font/google';
import "./globals.css";
import TransparentHeader from './components/TransparentHeader';
import StickyHeader from './components/StickyHeader';
import Footer from './components/Footer';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MissCrypto - Deine Krypto-Reise beginnt hier",
  description: "Lerne, verstehe und investiere erfolgreich in Kryptowährungen. Von Grundlagen bis Profi-Strategien - alles an einem Ort.",
  keywords: "Kryptowährung, Bitcoin, Ethereum, Trading, Investieren, Blockchain, DeFi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`bg-black text-white antialiased ${raleway.variable}`}>
        <TransparentHeader />
        <StickyHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
