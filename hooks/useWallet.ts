import { useState, useEffect, useCallback } from "react";
import { WalletState } from "../types";
import { connectFreighter } from "../lib/freighter";

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    publicKey: null,
    connected: false,
    network: null,
  });

  const connect = useCallback(async () => {
    try {
      const state = await connectFreighter();
      setWallet(state);
      localStorage.setItem("wallet_connected", "true");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      publicKey: null,
      connected: false,
      network: null,
    });
    localStorage.removeItem("wallet_connected");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("wallet_connected") === "true") {
      connect().catch(console.error);
    }
  }, [connect]);

  return { wallet, connect, disconnect };
}
