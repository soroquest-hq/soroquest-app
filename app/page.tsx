import React from 'react';
import Link from 'next/link';
import { getBounties } from '@/lib/indexer';

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID as string;
const NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE?.includes('Test') ? 'testnet' : 'public';

export default async function Home() {
  let bountyCount = 0;
  try {
    const { meta } = await getBounties(null, 1, 0);
    bountyCount = meta?.total || 0;
  } catch (err) {
    console.error("Failed to fetch bounty count:", err);
  }

  return (
    <div className="flex flex-col items-center">
      <section className="text-center py-20 px-4 w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-6">SoroQuest</h1>
        <p className="text-xl text-gray-600 mb-8">
          Open source bounties powered by USDC on Stellar.
        </p>
        
        <div className="bg-blue-50 text-blue-800 px-6 py-3 rounded-full inline-block font-semibold mb-10">
          {bountyCount} live bounties tracked
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/bounties" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Browse Bounties
          </Link>
          <Link href="/post" className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
            Post a Bounty
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50 w-full text-center px-4">
        <h2 className="text-3xl font-bold mb-12">How it works</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">1. Post</h3>
            <p className="text-gray-600">Lock USDC into the Soroban smart contract with a clear task description.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">2. Claim</h3>
            <p className="text-gray-600">A developer claims the open bounty and completes the required work.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">3. Get Paid</h3>
            <p className="text-gray-600">The bounty owner approves the work, instantly transferring the USDC.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-6">Transparent & Decentralized</h2>
        <p className="text-gray-600 mb-6">
          All funds are held in a trustless smart contract on the Stellar network.
        </p>
        <a 
          href={`https://stellar.expert/explorer/${NETWORK}/contract/${CONTRACT_ID}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Contract on Stellar Expert ({NETWORK})
        </a>
      </section>
    </div>
  );
}
