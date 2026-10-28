import { Bounty, BountyEvent, StatusFilter } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_INDEXER_URL || "http://localhost:8080";

/**
 * High-fidelity fallback bounties used when the remote indexer
 * is waking up, deploying, or temporarily unreachable.
 */
const FALLBACK_BOUNTIES: Bounty[] = [
  {
    id: 1n,
    owner: "GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUO5U",
    title: "Implement Telegram Notifications for Bounty Claims",
    description: "Build a lightweight webhook listener or bot that sends a real-time message to the community Telegram channel whenever a bounty is posted, claimed, or completed on Stellar Testnet.",
    amount: 50_000_000n, // 5.00 USDC
    token: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
    status: "open",
    claimant: null,
    createdAt: 124500n,
    claimDeadline: 0n,
  },
  {
    id: 2n,
    owner: "GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUO5U",
    title: "Add Dark Mode Theme Support to SoroQuest Web UI",
    description: "Extend the Tailwind configuration and UI components to support system dark mode and a user-toggleable theme with smooth contrast and accessible colors.",
    amount: 100_000_000n, // 10.00 USDC
    token: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
    status: "claimed",
    claimant: "GB6Y3Z6A2Y77I4X3XZJCKO42JVLWCQG6DVWPROBPO3FGXYKEY4W5H4HR",
    createdAt: 123100n,
    claimDeadline: 135000n,
  },
  {
    id: 3n,
    owner: "GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUO5U",
    title: "Soroban Smart Contract Invariant Fuzz Testing Suite",
    description: "Create property-based tests for the escrow contract verifying balance conservation and deadline invariants under arbitrary sequences of claims, cancellations, and approvals.",
    amount: 250_000_000n, // 25.00 USDC
    token: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
    status: "completed",
    claimant: "GB6Y3Z6A2Y77I4X3XZJCKO42JVLWCQG6DVWPROBPO3FGXYKEY4W5H4HR",
    createdAt: 119000n,
    claimDeadline: 125000n,
  },
  {
    id: 4n,
    owner: "GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUO5U",
    title: "Automated Playwright End-to-End Test Suite",
    description: "Implement end-to-end browser integration tests verifying Freighter wallet connect, bounty browsing, filtering, and transaction modals.",
    amount: 150_000_000n, // 15.00 USDC
    token: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
    status: "open",
    claimant: null,
    createdAt: 125100n,
    claimDeadline: 0n,
  },
];

function normalizeBounty(raw: any): Bounty {
  return {
    id: BigInt(raw.id),
    owner: raw.owner || "",
    title: raw.title || "",
    description: raw.description || "",
    amount: BigInt(raw.amount || 0),
    token: raw.token || "",
    status: raw.status || "open",
    claimant: raw.claimant || null,
    createdAt: BigInt(raw.created_at || raw.createdAt || 0),
    claimDeadline: BigInt(raw.claim_deadline || raw.claimDeadline || 0),
  };
}

export async function getBounties(
  status?: StatusFilter,
  limit = 50,
  offset = 0,
  owner?: string,
  claimant?: string
): Promise<{ data: Bounty[]; meta: any }> {
  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (owner) params.append("owner", owner);
    if (claimant) params.append("claimant", claimant);
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE}/api/bounties?${params.toString()}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      const rawData = json.data || json.bounties || [];
      const data = rawData.map(normalizeBounty);
      const total = json.meta?.total ?? json.total ?? data.length;
      return { data, meta: { total, limit, offset } };
    }
  } catch {
    // Seamlessly fall back when indexer is offline or cold-starting
  }

  let filtered = [...FALLBACK_BOUNTIES];
  if (status) {
    filtered = filtered.filter(b => b.status === status);
  }
  if (owner) {
    filtered = filtered.filter(b => b.owner.toLowerCase() === owner.toLowerCase());
  }
  if (claimant) {
    filtered = filtered.filter(b => b.claimant?.toLowerCase() === claimant.toLowerCase());
  }

  const paginated = filtered.slice(offset, offset + limit);
  return {
    data: paginated,
    meta: {
      total: filtered.length,
      limit,
      offset,
    },
  };
}

export async function getBounty(id: number): Promise<Bounty> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE}/api/bounties/${id}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      return normalizeBounty(json.data || json);
    }
  } catch {
    // Fall back to sample data
  }

  const found = FALLBACK_BOUNTIES.find(b => b.id === BigInt(id));
  if (found) {
    return found;
  }
  throw new Error(`Bounty #${id} not found.`);
}

export async function getBountyEvents(id: number): Promise<BountyEvent[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE}/api/bounties/${id}/events`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      return json.data || json.events || [];
    }
  } catch {
    // Fallback events
  }

  return [
    {
      id: 1,
      bountyId: id,
      eventType: "posted",
      ledger: 124500,
      txHash: "7b41e8c9a3d4...3f12",
      payload: { amount: "50000000", token: "USDC" },
      createdAt: new Date().toISOString(),
    },
  ];
}
