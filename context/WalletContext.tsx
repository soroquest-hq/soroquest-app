'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WalletState } from '../types';
import { connectFreighter } from '../lib/freighter';

interface WalletContextType {
  wallet: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    publicKey: null,
    connected: false,
    network: null,
  });
  const [loading, setLoading] = useState(false);

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      const state = await connectFreighter();
      setWallet(state);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wallet_connected', 'true');
      }
    } catch (err: unknown) {
      console.error('Freighter connect error:', err);
      if (typeof window !== 'undefined') {
        alert(err instanceof Error ? err.message : 'Failed to connect Freighter wallet');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      publicKey: null,
      connected: false,
      network: null,
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wallet_connected');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('wallet_connected') === 'true') {
      connect().catch(() => {
        localStorage.removeItem('wallet_connected');
      });
    }
  }, [connect]);

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, loading }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
