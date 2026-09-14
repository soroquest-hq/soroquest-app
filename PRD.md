# PRD — soroquest-app

## What we are building

The web interface for SoroQuest — a publicly accessible application
where anyone can browse on-chain bounties, project owners can post and
fund them with USDC, and contributors can claim and complete them. The
app is the primary surface through which users interact with the
SoroQuest smart contract on Stellar.

It must be live at a real public URL from day one. A deployed URL is
not optional — it is the difference between a demo and a product.

## Who it is for

**Project owners / maintainers**
Developers or teams who want contributors to build specific features,
fix bugs, or write documentation. They connect their Freighter wallet,
post a bounty with a USDC amount, and wait for claims.

**Contributors / developers**
Developers looking for paid open source work. They browse open bounties,
pick ones that match their skills, claim them, do the work, and receive
USDC automatically when the owner approves.

**Visitors (no wallet)**
Anyone exploring the platform — potential users, reviewers, curious
developers. The app must be fully readable without a wallet connected.
Read-only mode is a feature, not a fallback.

## What the product needs to do

### Browse bounties — no wallet required
- List all bounties from the contract or indexer
- Filter by status: Open, Claimed, Completed, Cancelled
- Each bounty card shows: title, USDC amount, status, time posted
- Clicking a card opens the full bounty detail
- Bounty detail shows: title, description, owner address, USDC amount,
  status, claimant address if claimed, claim deadline if set
- Link to verify the bounty on Stellar Expert

### Wallet connection
- Connect and disconnect Freighter wallet from any page
- Show truncated address and current network when connected
- Detect: Freighter not installed, wrong network, user rejection
- Network indicator — testnet vs mainnet must be visually obvious
- Switching network updates all contract reads automatically

### Post a bounty — wallet required
- Form: title, description, USDC amount, optional claim deadline
- Show connected wallet's current USDC balance
- On submit: build transaction, sign via Freighter, call `post_bounty`
- Show pending state while transaction is processing
- On success: redirect to the new bounty's detail page
- On error: show specific message for every failure type

### Claim a bounty — wallet required
- Claim button visible on Open bounties when wallet is connected
- Cannot claim own bounty
- On claim: call `claim_bounty`, show pending, confirm success
- On error: specific message (already claimed, not open, etc.)

### Approve completion — wallet required, owner only
- Approve button visible on Claimed bounties to the bounty owner
- On approve: call `approve_completion`, releases USDC to claimant
- Show pending state, confirm USDC transferred on success

### Cancel a bounty — wallet required, owner only
- Cancel button visible when: bounty is Open, or Claimed with passed
  deadline
- Returns USDC to owner
- Confirm dialog before cancelling

### Dashboard — wallet required
- My posted bounties — with their current status and available actions
- My claimed bounties — with status and whether approval is pending

### USDC amount display
- Raw contract amounts use 7 decimal places
- `10000000 = 1.00 USDC` — display correctly everywhere
- Never show raw integers to users

## What the product must NOT do

- Never ask for or handle private keys — all signing through Freighter
- Never break in read-only mode (no wallet connected)
- Never show "something went wrong" — every error must be specific
- Never display raw contract integers as USDC amounts

## Acceptance criteria

- Publicly accessible at a real URL (Vercel)
- Full bounty lifecycle works on testnet with a real Freighter wallet
- USDC amounts display correctly throughout
- Works on mobile
- Loads and is usable without a wallet connected
- All error states show specific, actionable messages
