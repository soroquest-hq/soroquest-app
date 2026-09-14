# ARCHITECTURE — soroquest-app

## Tech stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Industry standard for Stellar dApps, SSR for fast initial load |
| Language | TypeScript (strict) | Type safety across contract calls and UI |
| Styling | Tailwind CSS | Utility-first, no separate stylesheet complexity |
| Wallet | `@stellar/freighter-api` | Only Stellar wallet with broad adoption |
| Blockchain | `@stellar/stellar-sdk` | Official JS SDK, handles XDR, RPC, transaction building |
| Data source | SoroQuest Indexer API (primary), direct RPC (fallback) | Indexer is faster; RPC is the fallback if indexer is down |
| Deployment | Vercel | Free tier, automatic deploys from GitHub, real public URL |

## Project structure

```
soroquest-app/
├── app/
│   ├── layout.tsx              # Root layout, wallet provider, nav
│   ├── page.tsx                # Landing page
│   ├── bounties/
│   │   └── page.tsx            # Browse all bounties
│   ├── bounty/
│   │   └── [id]/
│   │       └── page.tsx        # Bounty detail + actions
│   ├── post/
│   │   └── page.tsx            # Post a bounty form
│   └── dashboard/
│       └── page.tsx            # My bounties
├── components/
│   ├── nav/
│   │   ├── Navbar.tsx
│   │   └── WalletConnect.tsx
│   ├── bounty/
│   │   ├── BountyCard.tsx
│   │   ├── BountyList.tsx
│   │   ├── BountyDetail.tsx
│   │   ├── BountyForm.tsx
│   │   └── StatusBadge.tsx
│   └── ui/
│       ├── NetworkBadge.tsx
│       ├── TransactionState.tsx
│       └── ErrorMessage.tsx
├── lib/
│   ├── contract.ts             # All Soroban contract interactions
│   ├── freighter.ts            # Wallet connection and signing helpers
│   ├── indexer.ts              # Indexer API client
│   ├── usdc.ts                 # Amount formatting (7 decimal places)
│   └── constants.ts            # Contract addresses, RPC URLs, config
├── hooks/
│   ├── useWallet.ts            # Wallet state and connection
│   ├── useBounties.ts          # Bounty list with refetch
│   └── useBounty.ts            # Single bounty with refetch
└── types/
    └── index.ts                # Shared TypeScript types
```

## Data flow

```
User action
    ↓
Component (React)
    ↓
Hook (useWallet / useBounty)
    ↓
lib/contract.ts  ←→  lib/indexer.ts
    ↓                     ↓
Soroban RPC          Indexer REST API
    ↓
Smart contract (on-chain)
```

Reads go to the indexer first for speed. Writes always go directly to
the contract via Soroban RPC and Freighter. After a successful write,
the relevant hook refetches from the indexer.

## Contract interaction layer (`lib/contract.ts`)

All Soroban contract calls live here. Nothing else in the app imports
`stellar-sdk` directly.

```typescript
// Constants
const CONTRACT_ID = {
  testnet: process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ID!,
  mainnet: process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ID!,
}
const RPC_URL = {
  testnet: 'https://soroban-testnet.stellar.org',
  mainnet: process.env.NEXT_PUBLIC_MAINNET_RPC_URL!,
}

// Read — no wallet needed
export async function getBounty(id: bigint, network: Network): Promise<Bounty>
export async function listBounties(filter: StatusFilter, network: Network): Promise<Bounty[]>
export async function getBountyCount(network: Network): Promise<bigint>

// Write — requires signed transaction from Freighter
export async function postBounty(params: PostBountyParams, network: Network): Promise<string>
export async function claimBounty(bountyId: bigint, network: Network): Promise<string>
export async function approveCompletion(bountyId: bigint, network: Network): Promise<string>
export async function cancelBounty(bountyId: bigint, network: Network): Promise<string>
```

Write functions return the transaction hash. The caller polls for
confirmation or listens for the indexer to update.

## Wallet layer (`lib/freighter.ts`)

```typescript
export async function getPublicKey(): Promise<string>
export async function getNetwork(): Promise<'testnet' | 'mainnet'>
export async function isConnected(): Promise<boolean>
export async function signTransaction(xdr: string, network: string): Promise<string>
```

All Freighter calls are wrapped here. Components never import
`@stellar/freighter-api` directly.

## USDC formatting (`lib/usdc.ts`)

USDC on Stellar uses 7 decimal places. This is the highest-risk
display bug in the app — get it wrong by one decimal and amounts
are off by a factor of 10.

```typescript
// Contract stores amounts as i128 (bigint in JS)
// 1 USDC = 10_000_000 (ten million stroops)

export function toDisplayAmount(raw: bigint): string {
  // 10_000_000n → "1.00"
  // 15_500_000n → "1.55"
  // 100n → "0.0000100"
}

export function toContractAmount(display: string): bigint {
  // "1.00" → 10_000_000n
  // "1.55" → 15_500_000n
}
```

Use these functions everywhere an amount is displayed or entered.
Never do inline math on USDC amounts in components.

## Environment variables

```bash
# .env.local
NEXT_PUBLIC_TESTNET_CONTRACT_ID=C...
NEXT_PUBLIC_MAINNET_CONTRACT_ID=C...
NEXT_PUBLIC_MAINNET_RPC_URL=https://...
NEXT_PUBLIC_INDEXER_URL=https://...
```

Contract IDs come from `soroquest-contracts/deployments/`.

## Transaction state machine

Every write operation goes through the same states:

```
Idle → Signing (waiting for Freighter) → Pending (submitted to network)
     → Confirmed (success) | Failed (error with message)
```

`TransactionState` component renders each state. No write operation
skips any state. The user always knows what is happening.

## Error handling

Every error from contract calls or Freighter maps to a user-readable
message defined in `lib/contract.ts`:

```typescript
const CONTRACT_ERRORS: Record<number, string> = {
  1: 'Bounty not found.',
  2: 'This bounty is no longer open.',
  3: 'This bounty has not been claimed yet.',
  4: 'This bounty has already been claimed.',
  5: 'Only the bounty owner can perform this action.',
  6: 'The claim deadline has not passed yet.',
  7: 'Invalid amount — must be greater than zero.',
  8: 'Invalid deadline — must be a future ledger.',
  9: 'Token transfer failed — check your USDC balance.',
}
```

Freighter errors (not installed, rejected, wrong network) have their
own messages. Never show raw SDK errors to users.

## Deployment

- Vercel project connected to the `soroquest-app` GitHub repo
- Auto-deploys on every push to `main`
- Environment variables set in Vercel dashboard
- Preview deployments on every PR

## Key design decisions

**Indexer-first reads:** Direct RPC reads for list queries are slow
because they must iterate storage. The indexer provides a REST API
backed by a database that the app queries instead. Direct RPC is used
only for single-bounty reads and as a fallback.

**No private key handling:** All transaction signing goes through
Freighter. The app never sees a private key.

**Read-only mode is first-class:** Every page renders complete content
without a wallet. Wallet-gated actions (post, claim, approve, cancel)
show a "Connect wallet" prompt in place of the action button.

**Network in URL or context:** The active network (testnet/mainnet) is
stored in React context and persists to localStorage. Switching network
triggers a full data refetch.
