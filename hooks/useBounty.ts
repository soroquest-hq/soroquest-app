'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Bounty } from '@/types';
import { getBounty } from '@/lib/indexer';

/**
 * Fetches and manages a single bounty by ID from the indexer.
 */
export function useBounty(id: bigint | null) {
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBounty = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await getBounty(id);
      setBounty(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchBounty(); }, [fetchBounty]);

  return { bounty, loading, error, refetch: fetchBounty };
}
