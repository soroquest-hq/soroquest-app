'use client';
import React, { useState } from 'react';
import { useBounty } from '@/hooks/useBounty';
import BountyDetail from '@/components/bounty/BountyDetail';
import TransactionState from '@/components/ui/TransactionState';
import type { TxState } from '@/types';

export default function BountyPage({ params }: { params: { id: string } }) {
  const bountyId = BigInt(params.id);
  const { bounty, loading, error, refetch } = useBounty(bountyId);
  const [txState, setTxState] = useState<TxState>({ type: 'idle' });

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bounty) return <p>Bounty not found.</p>;

  const handleClaim = async () => {
    // TODO: setTxState signing → call contract.claimBounty → pending → confirmed
    // then refetch()
  };
  const handleApprove = async () => {
    // TODO: setTxState signing → call contract.approveCompletion → pending → confirmed
  };
  const handleCancel = async () => {
    // TODO: confirm dialog → setTxState signing → call contract.cancelBounty
  };

  return (
    <div>
      <TransactionState state={txState} />
      <BountyDetail
        bounty={bounty}
        walletKey={null} // TODO: from useWallet()
        onClaim={handleClaim}
        onApprove={handleApprove}
        onCancel={handleCancel}
      />
    </div>
  );
}
