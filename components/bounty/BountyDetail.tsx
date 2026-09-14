import React from 'react';
import type { Bounty } from '@/types';
import { formatUSDC } from '@/lib/usdc';
import StatusBadge from './StatusBadge';

interface Props {
  bounty: Bounty;
  /** Public key of the connected wallet, or null if not connected */
  walletKey: string | null;
  onClaim: () => void;
  onApprove: () => void;
  onCancel: () => void;
}

export default function BountyDetail({ bounty, walletKey, onClaim, onApprove, onCancel }: Props) {
  const isOwner = walletKey === bounty.owner;
  const isOpen = bounty.status === 'open';
  const isClaimed = bounty.status === 'claimed';

  return (
    <article className="max-w-2xl mx-auto p-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold">{bounty.title}</h1>
        <StatusBadge status={bounty.status} />
      </div>
      <p className="text-green-600 font-mono text-xl mt-2">{formatUSDC(bounty.amount)}</p>
      <p className="mt-4 text-gray-700">{bounty.description}</p>

      {/* TODO: show owner, claimant, deadline, Stellar Expert link */}

      {/* Actions */}
      {!walletKey && <p className="mt-6 text-gray-500">Connect wallet to take action.</p>}
      {walletKey && isOpen && !isOwner && (
        <button onClick={onClaim} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
          Claim Bounty
        </button>
      )}
      {walletKey && isClaimed && isOwner && (
        <button onClick={onApprove} className="mt-6 px-6 py-2 bg-green-600 text-white rounded">
          Approve Completion
        </button>
      )}
      {walletKey && isOwner && (isOpen || isClaimed) && (
        <button onClick={onCancel} className="mt-2 px-6 py-2 bg-red-100 text-red-700 rounded">
          Cancel Bounty
        </button>
      )}
    </article>
  );
}
