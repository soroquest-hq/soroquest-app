/**
 * Freighter wallet helpers.
 * All Freighter calls are wrapped here.
 * Components never import `@stellar/freighter-api` directly.
 */
import type { Network } from '@/types';

/** Returns the connected wallet's public key, or throws if not connected. */
export async function getPublicKey(): Promise<string> {
  // TODO: import { getPublicKey } from '@stellar/freighter-api'; return await getPublicKey();
  throw new Error('Freighter not implemented');
}

/** Returns the network the wallet is currently set to. */
export async function getNetwork(): Promise<Network> {
  // TODO: import { getNetworkDetails } from '@stellar/freighter-api';
  throw new Error('Freighter not implemented');
}

/** Returns true if Freighter is installed and an account is connected. */
export async function isConnected(): Promise<boolean> {
  // TODO: import { isConnected } from '@stellar/freighter-api';
  throw new Error('Freighter not implemented');
}

/**
 * Signs a transaction XDR with Freighter.
 * @param xdr - The base64-encoded XDR of the transaction to sign.
 * @param network - The network to sign for.
 * @returns The signed transaction XDR.
 */
export async function signTransaction(xdr: string, network: string): Promise<string> {
  // TODO: import { signTransaction } from '@stellar/freighter-api';
  throw new Error('Freighter not implemented');
}

/** User-facing error messages for Freighter failure modes. */
export const FREIGHTER_ERRORS = {
  notInstalled: 'Freighter wallet is not installed. Please install it from freighter.app.',
  rejected: 'Transaction was rejected. Please approve it in Freighter to continue.',
  wrongNetwork: 'Wrong network in Freighter. Please switch to the correct network.',
  unknown: 'An unexpected wallet error occurred. Please try again.',
} as const;
