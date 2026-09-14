import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Stellar SDK uses Node.js APIs — exclude from browser bundle where needed
  serverExternalPackages: ['@stellar/stellar-sdk'],
};

export default nextConfig;
