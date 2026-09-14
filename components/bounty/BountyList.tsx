import React from 'react';
import type { Bounty } from '@/types';
import BountyCard from './BountyCard';

interface Props {
  bounties: Bounty[];
  loading: boolean;
  error: string | null;
}

export default function BountyList({ bounties, loading, error }: Props) {
  if (loading) return <p>Loading bounties…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (bounties.length === 0) return <p>No bounties found.</p>;

  return (
    <div className="grid gap-4">
      {bounties.map(b => <BountyCard key={String(b.id)} bounty={b} />)}
    </div>
  );
}
