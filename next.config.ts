import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify-kompatible Konfiguration
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true, // Erforderlich für statischen Export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
  
  // Asset-Optimierung
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Build-Konfiguration - Deaktiviere Checks für Deployment
  typescript: {
    ignoreBuildErrors: true, // TypeScript-Fehler während Build ignorieren
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint während Build ignorieren
  },
};

export default nextConfig;
