'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { useBounties } from '@/hooks/useBounties';
import BountyList from '@/components/bounty/BountyList';

export default function DashboardPage() {
  const { wallet } = useWallet();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !wallet.connected) {
      router.push('/');
    }
  }, [wallet.connected, mounted, router]);

  const { bounties: postedBounties, loading: postedLoading, error: postedError } = useBounties(null, 50, wallet.publicKey || undefined);
  const { bounties: claimedBounties, loading: claimedLoading, error: claimedError } = useBounties(null, 50, undefined, wallet.publicKey || undefined);

  if (!mounted || !wallet.connected) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">My Posted Bounties</h2>
        <BountyList bounties={postedBounties} loading={postedLoading} error={postedError} />
        {!postedLoading && postedBounties.length === 0 && (
          <p className="text-gray-500 py-4">You have not posted any bounties yet.</p>
        )}
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">My Claimed Bounties</h2>
        <BountyList bounties={claimedBounties} loading={claimedLoading} error={claimedError} />
        {!claimedLoading && claimedBounties.length === 0 && (
          <p className="text-gray-500 py-4">You have not claimed any bounties yet.</p>
        )}
      </section>
    </div>
  );
}
