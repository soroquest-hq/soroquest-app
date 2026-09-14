import React from 'react';
import Link from 'next/link';
import WalletConnect from './WalletConnect';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">SoroQuest</Link>
      <div className="flex items-center gap-4">
        <Link href="/bounties">Browse</Link>
        <Link href="/post">Post Bounty</Link>
        <Link href="/dashboard">Dashboard</Link>
        <WalletConnect />
      </div>
    </nav>
  );
}
