# ARCHITECTURE ESSENTIALS — soroquest-app

## Stack
- Next.js 14 App Router + TypeScript (strict) + Tailwind CSS
- Wallet: `@stellar/freighter-api`
- Chain: `@stellar/stellar-sdk`
- Deploy: Vercel (must produce real public URL)

## Key directories
```
app/          → pages (layout, page, [id]/page)
components/   → nav/, bounty/, ui/
lib/          → contract.ts, freighter.ts, indexer.ts, usdc.ts, constants.ts
hooks/        → useWallet.ts, useBounties.ts, useBounty.ts
types/        → index.ts
```

## Data flow
- Reads → indexer API first, direct RPC as fallback
- Writes → always direct to contract via RPC + Freighter signing
- After write → refetch from indexer

## Critical files
**`lib/contract.ts`** — only file that imports stellar-sdk. All contract calls live here.
**`lib/freighter.ts`** — only file that imports freighter-api. All wallet calls live here.
**`lib/usdc.ts`** — only file that does USDC math. Use it everywhere an amount is shown or entered.
**`lib/constants.ts`** — contract IDs and RPC URLs from env vars.

## USDC rule — most critical display concern
```
1 USDC = 10_000_000 (7 decimal places)
toDisplayAmount(10_000_000n) → "1.00"
toContractAmount("1.00")     → 10_000_000n
```
Never do inline USDC math in components. Always use `lib/usdc.ts`.

## Environment variables
```
NEXT_PUBLIC_TESTNET_CONTRACT_ID
NEXT_PUBLIC_MAINNET_CONTRACT_ID
NEXT_PUBLIC_MAINNET_RPC_URL
NEXT_PUBLIC_INDEXER_URL
```

## Transaction states — every write goes through all of these
```
Idle → Signing → Pending → Confirmed | Failed
```
Never skip a state. User must always know what is happening.

## Error messages
Map every contract error code (1–9) to a plain English string in
`lib/contract.ts`. Never show raw SDK errors to users.

## Pages
```
/             Landing — live bounty count, CTA
/bounties     Browse + filter by status (works without wallet)
/bounty/[id]  Detail + actions based on wallet and status
/post         Post form (wallet required)
/dashboard    My bounties (wallet required)
```

## Auth rules in UI
- No wallet → read-only, show "Connect wallet" instead of action buttons
- Wrong network → show network mismatch warning
- Owner viewing own bounty → Approve or Cancel buttons (status dependent)
- Contributor viewing open bounty → Claim button
- Never show Claim button to bounty owner

## Critical rules
- Never import freighter-api or stellar-sdk outside their lib files
- Never display raw i128 integers as USDC amounts
- Read-only mode must never be a broken page
- Vercel deployment is required — live URL is not optional
