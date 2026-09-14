'use client';
import React, { useState } from 'react';
import type { PostBountyParams } from '@/types';
import { toContractAmount } from '@/lib/usdc';

interface Props {
  onSubmit: (params: PostBountyParams) => Promise<void>;
  loading: boolean;
}

export default function BountyForm({ onSubmit, loading }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  // TODO: add claim deadline field

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: get owner public key from wallet context
    // TODO: get token address from constants (USDC_ADDRESS[network])
    // TODO: validate fields before submitting
    const params: PostBountyParams = {
      owner: '',         // TODO: from wallet
      title,
      description,
      amount: toContractAmount(amount),
      token: '',         // TODO: USDC_ADDRESS[network]
      claimDeadline: 0n, // TODO: from form field
    };
    await onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">USDC Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g. 50.00"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Submitting…' : 'Post Bounty'}
      </button>
    </form>
  );
}
