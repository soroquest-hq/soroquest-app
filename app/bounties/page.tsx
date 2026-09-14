'use client';
import React, { useState } from 'react';
import type { StatusFilter } from '@/types';
import BountyList from '@/components/bounty/BountyList';
import { useBounties } from '@/hooks/useBounties';

export default function BountiesPage() {
  const [filter, setFilter] = useState<StatusFilter>(null);
  const { bounties, loading, error } = useBounties(filter);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Bounties</h1>
      {/* TODO: filter tabs for Open / Claimed / Completed / Cancelled */}
      <BountyList bounties={bounties} loading={loading} error={error} />
    </div>
  );
}
