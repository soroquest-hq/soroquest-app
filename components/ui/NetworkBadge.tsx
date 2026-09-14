import React from 'react';
import type { Network } from '@/types';

export default function NetworkBadge({ network }: { network: Network | null }) {
  if (!network) return null;
  const isMainnet = network === 'mainnet';
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded ${isMainnet ? 'bg-blue-600 text-white' : 'bg-orange-400 text-white'}`}>
      {isMainnet ? 'MAINNET' : 'TESTNET'}
    </span>
  );
}
