'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Bounty, StatusFilter } from '@/types';
import { getBounties } from '@/lib/indexer';

/**
 * Fetches and manages a list of bounties from the indexer.
 * Re-fetches when the status filter changes.
 */
export function useBounties(statusFilter: StatusFilter = null, limit: number = 50, owner?: string, claimant?: string) {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const fetchBounties = useCallback(async (reset = true) => {
    if (reset) {
      setLoading(true);
      setOffset(0);
    } else {
      setLoadingMore(true);
    }
    
    setError(null);
    try {
      const currentOffset = reset ? 0 : offset;
      const res = await getBounties(statusFilter, limit, currentOffset, owner, claimant);
      
      if (reset) {
        setBounties(res.data);
      } else {
        setBounties(prev => [...prev, ...res.data]);
      }
      
      setTotal(res.meta.total);
      if (!reset) {
        setOffset(currentOffset + limit);
      } else if (res.data.length > 0) {
        setOffset(limit);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [statusFilter, limit, offset, owner, claimant]);

  useEffect(() => { fetchBounties(true); }, [statusFilter, owner, claimant]); // only trigger on filter change, fetchBounties handles its own ref logic

  const loadMore = () => {
    fetchBounties(false);
  };

  const hasMore = bounties.length < total;

  return { bounties, total, loading, loadingMore, error, hasMore, loadMore, refetch: () => fetchBounties(true) };
}
