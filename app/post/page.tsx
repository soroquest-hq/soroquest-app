'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BountyForm from '@/components/bounty/BountyForm';
import TransactionState from '@/components/ui/TransactionState';
import type { PostBountyParams, TxState } from '@/types';

import { useWallet } from '@/hooks/useWallet';
import { postBounty } from '@/lib/contract';

export default function PostPage() {
  const router = useRouter();
  const { wallet } = useWallet();
  const [txState, setTxState] = useState<TxState>({ type: 'idle' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (params: PostBountyParams) => {
    if (!wallet.connected || !wallet.publicKey) return alert("Please connect wallet first");
    setLoading(true);
    setTxState({ type: 'signing' });
    try {
      const hash = await postBounty(wallet.publicKey, params.title, params.description, params.amount.toString());
      setTxState({ type: 'confirmed', txHash: hash });
      // In a real app we'd wait for indexer to pick it up or return the ID, 
      // but for now we just redirect to home
      setTimeout(() => router.push('/'), 2000);
    } catch (e: any) {
      setTxState({ type: 'failed', error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Post a Bounty</h1>
      {!wallet.connected && <p className="mb-4 text-orange-500">Please connect your wallet to post a bounty.</p>}
      <TransactionState state={txState} />
      <BountyForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
