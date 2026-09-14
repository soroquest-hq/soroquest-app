import { Network } from '@/types';

export const CONTRACT_ID: Record<Network, string> = {
  testnet: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ID ?? '',
  mainnet: process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ID ?? '',
};

export const RPC_URL: Record<Network, string> = {
  testnet: 'https://soroban-testnet.stellar.org',
  mainnet: process.env.NEXT_PUBLIC_MAINNET_RPC_URL ?? '',
};

export const NETWORK_PASSPHRASE: Record<Network, string> = {
  testnet: 'Test SDF Network ; September 2015',
  mainnet: 'Public Global Stellar Network ; September 2015',
};

/** USDC Stellar Asset Contract addresses */
export const USDC_ADDRESS: Record<Network, string> = {
  testnet: 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA',
  mainnet: 'CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7EJJUD',
};

export const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_URL ?? 'http://localhost:8080';

/** Error messages keyed by contract error code */
export const CONTRACT_ERRORS: Record<number, string> = {
  1: 'Bounty not found.',
  2: 'This bounty is no longer open.',
  3: 'This bounty has not been claimed yet.',
  4: 'This bounty has already been claimed.',
  5: 'Only the bounty owner can perform this action.',
  6: 'The claim deadline has not passed yet.',
  7: 'Invalid amount — must be greater than zero.',
  8: 'Invalid deadline — must be a future ledger.',
  9: 'Token transfer failed — check your USDC balance.',
};
