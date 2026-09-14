# Contributing

## Setup

1. Install Node.js 20+
2. `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in values
4. Install [Freighter](https://freighter.app/) browser extension
5. `npm run dev`

## Code conventions

- All USDC amounts must use `lib/usdc.ts` helpers — never inline math
- All contract calls must go through `lib/contract.ts`
- All Freighter calls must go through `lib/freighter.ts`
- No `any` types except where wrapping external SDK types

## Pull requests

Run `npm run type-check` and `npm run lint` before submitting.
