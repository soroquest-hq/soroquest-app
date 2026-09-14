/**
 * Soroban contract interaction layer.
 * All stellar-sdk usage is confined to this file.
 * Nothing else in the app imports stellar-sdk directly.
 */
import type { Network, Bounty, PostBountyParams, StatusFilter, BountyStatus } from '@/types';
import { CONTRACT_ERRORS } from './constants';

// TODO: import { SorobanRpc, Contract, TransactionBuilder, ... } from '@stellar/stellar-sdk';

/** Parse a contract error code into a user-facing message. */
export function parseContractError(error: unknown): string {
  // TODO: extract error code from SorobanRpc.SimulateTransactionError
  if (error instanceof Error) {
    const match = error.message.match(/Error\(Contract, #(\d+)\)/);
    if (match) {
      const code = parseInt(match[1], 10);
      return CONTRACT_ERRORS[code] ?? 'An unknown contract error occurred.';
    }
    return error.message;
  }
  return 'An unexpected error occurred.';
}

// ---------------------------------------------------------------------------
// Read functions — no wallet needed
// ---------------------------------------------------------------------------

/**
 * Fetch a single bounty by ID directly from the contract.
 * Prefer lib/indexer.ts getBounty() for speed; use this as fallback.
 */
export async function getBounty(id: bigint, network: Network): Promise<Bounty> {
  // TODO: build SimulateTransaction for get_bounty(id)
  throw new Error('contract.getBounty not implemented');
}

/** List bounties with optional status filter. Prefer indexer for speed. */
export async function listBounties(filter: StatusFilter, network: Network): Promise<Bounty[]> {
  // TODO: build SimulateTransaction for list_bounties(status, 0, 50)
  throw new Error('contract.listBounties not implemented');
}

/** Get the total number of bounties ever posted. */
export async function getBountyCount(network: Network): Promise<bigint> {
  // TODO: build SimulateTransaction for get_bounty_count()
  throw new Error('contract.getBountyCount not implemented');
}

// ---------------------------------------------------------------------------
// Write functions — require signed transaction from Freighter
// All return the transaction hash.
// ---------------------------------------------------------------------------

/**
 * Post a new bounty. Transfers USDC from owner into contract.
 * Returns the transaction hash.
 */
export async function postBounty(params: PostBountyParams, network: Network): Promise<string> {
  // TODO:
  // 1. Build transaction calling post_bounty(...)
  // 2. Simulate to get footprint
  // 3. Sign via lib/freighter.ts signTransaction()
  // 4. Submit via rpc.sendTransaction()
  // 5. Return tx hash
  throw new Error('contract.postBounty not implemented');
}

/** Claim an open bounty. Returns the transaction hash. */
export async function claimBounty(bountyId: bigint, network: Network): Promise<string> {
  // TODO: build, sign, and submit claim_bounty(claimant, bountyId)
  throw new Error('contract.claimBounty not implemented');
}

/** Approve completion of a claimed bounty. Returns the transaction hash. */
export async function approveCompletion(bountyId: bigint, network: Network): Promise<string> {
  // TODO: build, sign, and submit approve_completion(owner, bountyId)
  throw new Error('contract.approveCompletion not implemented');
}

/** Cancel a bounty. Returns USDC to the owner. Returns the transaction hash. */
export async function cancelBounty(bountyId: bigint, network: Network): Promise<string> {
  // TODO: build, sign, and submit cancel_bounty(owner, bountyId)
  throw new Error('contract.cancelBounty not implemented');
}
