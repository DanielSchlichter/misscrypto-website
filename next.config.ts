import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Normale Next.js Konfiguration für Netlify
  images: {
    unoptimized: true,
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
  
  // Deaktiviere unnötige Features für Build
  poweredByHeader: false,
  generateEtags: false,
  
  // Build-Konfiguration - Deaktiviere Checks für Deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
