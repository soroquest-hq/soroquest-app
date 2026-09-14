'use client';
import React from 'react';
// TODO: import useWallet, useBounties

export default function DashboardPage() {
  // TODO: if not connected, show "Connect wallet" prompt
  // TODO: filter bounties by owner === wallet.publicKey (my posted)
  // TODO: filter bounties by claimant === wallet.publicKey (my claimed)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">My Posted Bounties</h2>
        {/* TODO: <BountyList> filtered by owner */}
        <p className="text-gray-500">Connect your wallet to see your posted bounties.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">My Claimed Bounties</h2>
        {/* TODO: <BountyList> filtered by claimant */}
        <p className="text-gray-500">Connect your wallet to see your claimed bounties.</p>
      </section>
    </div>
  );
}
