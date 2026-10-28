# Changelog

All notable changes to the SoroQuest Web Application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-28

### Added
- **Core User Journeys**:
  - Browse active, claimed, and completed bounties with real-time filtering and search.
  - Bounty details page showing metadata, creator address, deadline ledger, and explorer links.
  - Post bounty form with automated stroop precision calculation for USDC.
  - User dashboard aggregating owned and claimed bounties.
- **Freighter Wallet Integration**:
  - `@stellar/freighter-api` v6 integration via `requestAccess()` popup trigger.
  - Global `WalletProvider` React Context keeping all navigation and action states synchronized.
  - Truncated address badge with live Testnet status indicator and one-click disconnect.
- **Resilience & Fallbacks**:
  - High-fidelity fallback catalog and timeout protection for cold-start indexer wakeup.
  - Skeleton loaders and Toast feedback system for transaction submissions.
  - SEO optimization with dynamic metadata, robots.txt, and web app manifest.
