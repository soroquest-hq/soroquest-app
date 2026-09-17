'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Bounty, StatusFilter } from '@/types';
import { getBounties } from '@/lib/indexer';

/**
 * Fetches and manages a list of bounties from the indexer.
 * Re-fetches when the status filter changes.
 */
export function useBounties(statusFilter: StatusFilter = null) {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBounties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBounties(statusFilter);
      setBounties(res.data);
      setTotal(res.meta.total);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchBounties(); }, [fetchBounties]);

  return { bounties, total, loading, error, refetch: fetchBounties };
}
