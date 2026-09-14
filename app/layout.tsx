import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/nav/Navbar';

export const metadata: Metadata = {
  title: 'SoroQuest — Stellar Bounty Platform',
  description: 'Post and claim open source bounties paid in USDC on Stellar.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
