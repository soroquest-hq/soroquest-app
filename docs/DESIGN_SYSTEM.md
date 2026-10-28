# SoroQuest UI Design System & Component Guidelines

This document details the visual design system, accessibility principles, color tokens, and responsive layout guidelines for `soroquest-app`.

---

## 🎨 Color Palette & Semantics

| Token | Class | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `bg-blue-600` | `#2563eb` | Main call-to-actions, primary links, wallet connect |
| **Success** | `text-green-600` / `bg-green-100` | `#16a34a` | Completed bounties, USDC amounts, active connections |
| **Warning / In-Progress** | `text-yellow-700` / `bg-yellow-100` | `#a16207` | Claimed bounties awaiting approval |
| **Neutral Border** | `border-gray-200` | `#e5e7eb` | Cards, table dividers, header separation |
| **Background** | `bg-white` | `#ffffff` | Primary app background |

---

## 🧱 Component Hierarchy

1. **`Navbar`**:
   - Sticky top navigation bar.
   - Houses SoroQuest branding, route links (`Browse`, `Post Bounty`, `Dashboard`), and `WalletConnect`.

2. **`WalletConnect`**:
   - Reactive status badge (Green dot + `Testnet`).
   - Monospace truncated Stellar address (`GABC...74P7`).
   - One-click disconnect.

3. **`BountyCard` & `BountySkeleton`**:
   - Standardized card container with hover shadow transition.
   - Status badge, formatted micro-USDC amount, and task summary.

4. **`TransactionState`**:
   - Status modal providing real-time feedback during Freighter signing, transaction submission, and block confirmation.
