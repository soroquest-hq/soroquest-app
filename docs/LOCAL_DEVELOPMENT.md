# SoroQuest Web App: Local Development & Wallet Testing Guide

This guide details how to set up, run, and test the SoroQuest web frontend locally with Stellar Testnet and the Freighter browser extension.

---

## 🛠️ Prerequisites
- Node.js 20+ (Node 22 recommended)
- npm 10+
- [Freighter Browser Extension](https://www.freighter.app/)

---

## 🚀 Quickstart

1. **Clone and Install Dependencies**:
   ```bash
   git clone https://github.com/soroquest-hq/soroquest-app.git
   cd soroquest-app
   npm install
   ```

2. **Configure Environment**:
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   Default testnet addresses are already pre-configured:
   - `NEXT_PUBLIC_TESTNET_CONTRACT_ID=CA7C6LGWPTZVUTZX7EXJVLWCQG6DVWPROBPO3FGXYKEY4W5H4HRPO5UV`
   - `NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org`
   - `NEXT_PUBLIC_INDEXER_URL=https://soroquest-indexer.onrender.com`

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🧪 Testing with Freighter on Testnet

1. Open the Freighter extension and switch the network to **Testnet** (Settings → Network → Test Net).
2. Fund your testnet account via the [Stellar Friendbot](https://laboratory.stellar.org/#account-creator?network=test).
3. Click **Connect Wallet** in the SoroQuest navbar to authorize access.
4. You can now post bounties, claim open bounties, and test contract interactions on Stellar Testnet!

---

## 📋 Running Automated Tests
```bash
# Run unit test suite
npm test

# Run full type check, linting, and tests
npm run verify
```
