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
        hostname: 'misscrypto.de',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  
  // Performance-Optimierungen
  experimental: {
    optimizeCss: true,
  },
  
  // Asset-Optimierung
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Build-Konfiguration
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
