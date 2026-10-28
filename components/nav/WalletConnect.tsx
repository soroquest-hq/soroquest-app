'use client';
import React from 'react';
import { useWallet } from '@/hooks/useWallet';

export default function WalletConnect() {
  const { wallet, connect, disconnect, loading } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
    } catch {
      // Error handling with alert already in WalletContext
    }
  };

  if (wallet.connected && wallet.publicKey) {
    const truncated = `${wallet.publicKey.slice(0, 4)}...${wallet.publicKey.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
          Testnet
        </span>
        <button
          onClick={disconnect}
          title="Click to disconnect"
          className="px-3 py-1.5 text-sm font-mono border border-gray-300 rounded hover:bg-gray-100 transition-colors flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          {truncated}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
