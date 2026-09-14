# soroquest-app

The web interface for the SoroQuest bounty platform.

Built with Next.js 14, TypeScript, Tailwind CSS, and the Stellar SDK.

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Fill in your contract IDs and indexer URL
npm run dev
```

## Tech stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- `@stellar/freighter-api` — wallet
- `@stellar/stellar-sdk` — contract interaction

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md).

## Deployment

Deploys automatically to Vercel on push to `main`.

## License

MIT
