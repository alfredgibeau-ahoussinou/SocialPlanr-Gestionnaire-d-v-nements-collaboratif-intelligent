import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pour Vercel, on peut utiliser le mode standard (pas besoin de 'export')
  // output: 'export', // Commenté pour permettre le déploiement Vercel standard
  images: {
    unoptimized: true, // Gardé pour compatibilité
  },
};

export default nextConfig;
