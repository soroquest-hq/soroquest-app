import { Bounty, BountyEvent, PostBountyParams, StatusFilter } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_INDEXER_URL || "http://localhost:8080";

export async function getBounties(
  status?: StatusFilter,
  limit = 50,
  offset = 0
): Promise<{ data: Bounty[]; meta: any }> {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const res = await fetch(`${API_BASE}/api/bounties?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch bounties: ${res.statusText}`);
  }
  return res.json();
}

export async function getBounty(id: number): Promise<Bounty> {
  const res = await fetch(`${API_BASE}/api/bounties/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch bounty: ${res.statusText}`);
  }
  return res.json();
}

export async function getBountyEvents(id: number): Promise<BountyEvent[]> {
  const res = await fetch(`${API_BASE}/api/bounties/${id}/events`);
  if (!res.ok) {
    throw new Error(`Failed to fetch bounty events: ${res.statusText}`);
  }
  return res.json();
}
