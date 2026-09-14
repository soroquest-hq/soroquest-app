import React from 'react';
import type { TxState } from '@/types';

export default function TransactionState({ state }: { state: TxState }) {
  switch (state.type) {
    case 'idle':      return null;
    case 'signing':   return <p className="text-blue-600">Waiting for Freighter signature…</p>;
    case 'pending':   return <p className="text-yellow-600">Transaction submitted. Waiting for confirmation…</p>;
    case 'confirmed': return <p className="text-green-600">Transaction confirmed! ✓</p>;
    case 'failed':    return <p className="text-red-600">Error: {state.error}</p>;
  }
}
