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
        port: '',
        pathname: '/coins/images/**',
      },
    ],
  },
  
  // Performance-Optimierungen
  experimental: {
    optimizeCss: true,
  },
  
  // Asset-Optimierung
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Build-Konfiguration - ESLint-Fehler während Build ignorieren
  typescript: {
    ignoreBuildErrors: true, // Für Netlify-Deployment
  },
  eslint: {
    ignoreDuringBuilds: true, // Für Netlify-Deployment
  },
};

export default nextConfig;
