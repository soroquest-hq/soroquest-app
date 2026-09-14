import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold">SoroQuest</h1>
      <p className="mt-4 text-lg text-gray-600">
        Open source bounties powered by USDC on Stellar.
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <Link href="/bounties" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Browse Bounties
        </Link>
        <Link href="/post" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg">
          Post a Bounty
        </Link>
      </div>
    </section>
  );
}
