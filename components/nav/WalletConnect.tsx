'use client';
import React from 'react';
// TODO: import useWallet hook

export default function WalletConnect() {
  // TODO: use useWallet() hook
  // Show truncated address + network when connected
  // Show "Connect Wallet" button when disconnected
  // Handle: not installed, wrong network, rejected
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Connect Wallet
    </button>
  );
}
