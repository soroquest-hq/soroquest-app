'use client';
import React, { useState } from 'react';
import type { StatusFilter } from '@/types';
import BountyList from '@/components/bounty/BountyList';
import { useBounties } from '@/hooks/useBounties';

export default function BountiesPage() {
  const [filter, setFilter] = useState<StatusFilter>(null);
  const { bounties, loading, loadingMore, error, hasMore, loadMore } = useBounties(filter, 10);

  const filters: { label: string; value: StatusFilter }[] = [
    { label: 'All', value: null },
    { label: 'Open', value: 'open' },
    { label: 'Claimed', value: 'claimed' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Bounties</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(f => (
          <button
            key={f.label}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === f.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <BountyList bounties={bounties} loading={loading} error={error} />

      {!loading && bounties.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No bounties found matching the selected filter.
        </div>
      )}

      {!loading && hasMore && (
        <div className="mt-8 text-center">
          <button 
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
