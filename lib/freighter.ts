import {
  isConnected,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";
import { WalletState, Network } from "../types";

/**
 * Connect to Freighter and get the public key.
 */
export async function connectFreighter(): Promise<WalletState> {
  const connected = await isConnected();
  if (!connected) {
    throw new Error("Freighter is not installed or locked.");
  }

  const addressRes = await getAddress();
  if (addressRes.error) {
    throw new Error(addressRes.error.message || "User denied connection or error occurred.");
  }
  const publicKey = addressRes.address;

  if (!publicKey) {
    throw new Error("No public key returned.");
  }

  return {
    publicKey,
    connected: true,
    network: "testnet" as Network, // Fixed to testnet for now as per simple requirements
  };
}

/**
 * Sign a transaction using Freighter.
 * @param xdr - The transaction XDR string
 * @param networkPassphrase - The network passphrase
 * @returns The signed transaction XDR string
 */
export async function signTxFreighter(xdr: string, networkPassphrase: string): Promise<string> {
  const res = await signTransaction(xdr, {
    networkPassphrase,
  });
  if (res.error) {
    throw new Error(res.error.message || "Failed to sign transaction.");
  }
  return res.signedTxXdr;
}
