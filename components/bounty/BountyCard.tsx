import React from 'react';
import Link from 'next/link';
import type { Bounty } from '@/types';
import { formatUSDC } from '@/lib/usdc';
import StatusBadge from './StatusBadge';

interface Props {
  bounty: Bounty;
}

export default function BountyCard({ bounty }: Props) {
  return (
    <Link href={`/bounty/${bounty.id}`}>
      <div className="p-4 border rounded hover:shadow transition">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold">{bounty.title}</h3>
          <StatusBadge status={bounty.status} />
        </div>
        <p className="text-green-600 font-mono mt-1">{formatUSDC(bounty.amount)}</p>
        {/* TODO: show time posted (convert createdAt ledger to approx timestamp) */}
      </div>
    </Link>
  );
}
