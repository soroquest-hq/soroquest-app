/**
 * Indexer API client.
 * The app queries the indexer for all reads — faster than direct RPC.
 */
import { INDEXER_URL } from './constants';
import type { Bounty, BountyEvent, BountyStatus, PlatformStats } from '@/types';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${INDEXER_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export interface ListBountiesParams {
  status?: BountyStatus;
  limit?: number;
  offset?: number;
}

export interface ListBountiesResponse {
  bounties: Bounty[];
  total: number;
  limit: number;
  offset: number;
}

/** Fetch a paginated list of bounties, optionally filtered by status. */
export async function listBounties(params: ListBountiesParams = {}): Promise<ListBountiesResponse> {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.limit) query.set('limit', String(params.limit));
  if (params.offset) query.set('offset', String(params.offset));
  return fetchJSON<ListBountiesResponse>(`/api/v1/bounties?${query}`);
}

/** Fetch a single bounty by ID. Returns null if not found. */
export async function getBounty(id: bigint): Promise<Bounty | null> {
  try {
    return await fetchJSON<Bounty>(`/api/v1/bounties/${id}`);
  } catch (e: any) {
    if (e.message?.includes('404')) return null;
    throw e;
  }
}

/** Fetch all events for a bounty. */
export async function getBountyEvents(id: bigint): Promise<BountyEvent[]> {
  const res = await fetchJSON<{ events: BountyEvent[] }>(`/api/v1/bounties/${id}/events`);
  return res.events;
}

/** Fetch platform-wide stats. */
export async function getStats(): Promise<PlatformStats> {
  // TODO: map from indexer response shape to PlatformStats
  return fetchJSON<PlatformStats>(`/api/v1/stats`);
}
