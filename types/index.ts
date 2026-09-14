// Shared TypeScript types for the SoroQuest app.
// These mirror the contract data model.

export type Network = 'testnet' | 'mainnet';

export type BountyStatus = 'open' | 'claimed' | 'completed' | 'cancelled';

export interface Bounty {
  id: bigint;
  owner: string;
  title: string;
  description: string;
  /** Raw amount as i128 — use toDisplayAmount() for display */
  amount: bigint;
  token: string;
  status: BountyStatus;
  claimant: string | null;
  /** Ledger sequence at post time */
  createdAt: bigint;
  /** 0 = no deadline */
  claimDeadline: bigint;
}

export interface PostBountyParams {
  owner: string;
  title: string;
  description: string;
  /** Raw i128 amount — use toContractAmount() to convert from display */
  amount: bigint;
  token: string;
  /** 0 = no deadline */
  claimDeadline: bigint;
}

export type StatusFilter = BountyStatus | null;

export type TxState =
  | { type: 'idle' }
  | { type: 'signing' }
  | { type: 'pending'; txHash: string }
  | { type: 'confirmed'; txHash: string }
  | { type: 'failed'; error: string };

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  network: Network | null;
}

/** Stats from the indexer /stats endpoint */
export interface PlatformStats {
  total: number;
  open: number;
  claimed: number;
  completed: number;
  cancelled: number;
  totalUsdc: string;
}

/** Bounty event from the indexer /bounties/:id/events endpoint */
export interface BountyEvent {
  id: number;
  bountyId: number;
  eventType: 'posted' | 'claimed' | 'completed' | 'cancelled';
  ledger: number;
  txHash: string;
  payload: Record<string, unknown>;
  createdAt: string;
}
