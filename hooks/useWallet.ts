'use client';
import { useState, useEffect, useCallback } from 'react';
import type { WalletState, Network } from '@/types';
import * as freighter from '@/lib/freighter';

const initialState: WalletState = {
  connected: false,
  publicKey: null,
  network: null,
};

/**
 * Manages Freighter wallet connection state.
 * Returns the current wallet state and connect/disconnect handlers.
 */
export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: call freighter.isConnected(), getPublicKey(), getNetwork()
      // update wallet state
      throw new Error('useWallet.connect not implemented');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet(initialState);
  }, []);

  // TODO: auto-connect on mount if Freighter is already connected
  // TODO: listen for Freighter network change events

  return { wallet, loading, error, connect, disconnect };
}
