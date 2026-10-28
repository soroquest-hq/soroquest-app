import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";
import { WalletState, Network } from "../types";

/**
 * Connect to Freighter and get the public key.
 */
export async function connectFreighter(): Promise<WalletState> {
  const conn = await isConnected();
  if (conn.error || !conn.isConnected) {
    throw new Error("Freighter wallet is not detected. Please install the Freighter extension (https://www.freighter.app/) and unlock it.");
  }

  // requestAccess prompts the user to authorize connection via Freighter popup
  const accessRes = await requestAccess();
  if (accessRes.error) {
    throw new Error(accessRes.error.message || "User denied connection or error occurred.");
  }

  let publicKey = accessRes.address;
  if (!publicKey) {
    const addressRes = await getAddress();
    if (addressRes.error) {
      throw new Error(addressRes.error.message || "Failed to retrieve public key.");
    }
    publicKey = addressRes.address;
  }

  if (!publicKey) {
    throw new Error("No public key returned from Freighter.");
  }

  return {
    publicKey,
    connected: true,
    network: "testnet" as Network, // Fixed to testnet for now as per requirements
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
