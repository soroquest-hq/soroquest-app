'use client';
import React, { useState, use } from 'react';
import { useBounty } from '@/hooks/useBounty';
import BountyDetail from '@/components/bounty/BountyDetail';
import TransactionState from '@/components/ui/TransactionState';
import { useWallet } from '@/hooks/useWallet';
import type { TxState } from '@/types';
import { claimBounty, approveCompletion, cancelBounty } from '@/lib/contract';

export default function BountyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const bountyId = Number(resolvedParams.id);
  const { wallet } = useWallet();
  const { bounty, loading, error, refetch } = useBounty(bountyId);
  const [txState, setTxState] = useState<TxState>({ type: 'idle' });

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bounty) return <p>Bounty not found.</p>;

  const handleClaim = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Please connect wallet first");
    setTxState({ type: 'signing' });
    try {
      const hash = await claimBounty(wallet.publicKey, bountyId);
      setTxState({ type: 'confirmed', txHash: hash });
      refetch();
    } catch (e: any) {
      setTxState({ type: 'failed', error: e.message });
    }
  };
  const handleApprove = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Please connect wallet first");
    setTxState({ type: 'signing' });
    try {
      const hash = await approveCompletion(wallet.publicKey, bountyId);
      setTxState({ type: 'confirmed', txHash: hash });
      refetch();
    } catch (e: any) {
      setTxState({ type: 'failed', error: e.message });
    }
  };
  const handleCancel = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Please connect wallet first");
    if (!window.confirm("Are you sure you want to cancel this bounty?")) return;
    setTxState({ type: 'signing' });
    try {
      const hash = await cancelBounty(wallet.publicKey, bountyId);
      setTxState({ type: 'confirmed', txHash: hash });
      refetch();
    } catch (e: any) {
      setTxState({ type: 'failed', error: e.message });
    }
  };

  return (
    <div>
      <TransactionState state={txState} />
      <BountyDetail
        bounty={bounty}
        walletKey={wallet.publicKey}
        onClaim={handleClaim}
        onApprove={handleApprove}
        onCancel={handleCancel}
      />
    </div>
  );
}
