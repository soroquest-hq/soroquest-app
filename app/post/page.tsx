'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BountyForm from '@/components/bounty/BountyForm';
import TransactionState from '@/components/ui/TransactionState';
import type { PostBountyParams, TxState } from '@/types';

export default function PostPage() {
  const router = useRouter();
  const [txState, setTxState] = useState<TxState>({ type: 'idle' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (params: PostBountyParams) => {
    setLoading(true);
    setTxState({ type: 'signing' });
    try {
      // TODO: call contract.postBounty(params, network)
      // setTxState({ type: 'pending', txHash })
      // await confirmation
      // setTxState({ type: 'confirmed', txHash })
      // router.push(`/bounty/${newBountyId}`)
      throw new Error('not implemented');
    } catch (e: any) {
      setTxState({ type: 'failed', error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Post a Bounty</h1>
      {/* TODO: show "Connect wallet" prompt if not connected */}
      <TransactionState state={txState} />
      <BountyForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
