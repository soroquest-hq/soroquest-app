import { TransactionBuilder, Networks, Address, xdr, scValToNative, rpc, Operation } from "@stellar/stellar-sdk";
import { signTxFreighter } from "./freighter";
import { Network } from "../types";
import { toContractAmount } from "./usdc";

const RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE || Networks.TESTNET;
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID as string;
const USDC_ID = process.env.NEXT_PUBLIC_USDC_ID as string;

const server = new rpc.Server(RPC_URL);

/**
 * Common logic to submit a transaction.
 */
async function submitTransaction(
  sourceAddress: string,
  methodName: string,
  args: xdr.ScVal[]
): Promise<string> {
  // 1. Get source account details
  const sourceAccount = await server.getAccount(sourceAddress);
  
  // 2. Build the transaction
  const tx = new TransactionBuilder(sourceAccount, {
    fee: "100",
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.invokeContractFunction({
        contract: CONTRACT_ID,
        function: methodName,
        args: args,
      })
    )
    .setTimeout(30)
    .build();

  // 3. Prepare the transaction
  const preparedTx = await server.prepareTransaction(tx);

  // 4. Sign via Freighter
  const signedXdr = await signTxFreighter(preparedTx.toXDR(), NETWORK_PASSPHRASE);
  
  // 5. Submit to network
  const submitResponse = await server.sendTransaction(
    TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE) as any
  );

  if (submitResponse.status === "ERROR") {
    throw new Error(`Transaction failed: ${JSON.stringify(submitResponse.errorResult || submitResponse)}`);
  }

  // 6. Wait for transaction to complete
  let txStatus: rpc.Api.GetTransactionResponse;
  do {
    await new Promise(resolve => setTimeout(resolve, 2000));
    txStatus = await server.getTransaction(submitResponse.hash);
  } while (txStatus.status === "NOT_FOUND");

  if (txStatus.status === "FAILED") {
    throw new Error(`Transaction execution failed: ${txStatus.resultMetaXdr}`);
  }

  return submitResponse.hash;
}

// Write Operations
export async function postBounty(
  owner: string,
  title: string,
  description: string,
  amountUSDC: string
): Promise<string> {
  const args = [
    Address.fromString(owner).toScVal(),
    xdr.ScVal.scvString(title),
    xdr.ScVal.scvString(description),
    xdr.ScVal.scvI128(new xdr.Int128Parts({
        hi: 0n,
        lo: BigInt(toContractAmount(amountUSDC))
    })),
    Address.fromString(USDC_ID).toScVal(),
    xdr.ScVal.scvU64(0n) // 0 deadline = no deadline
  ];
  return submitTransaction(owner, "post_bounty", args);
}

export async function claimBounty(claimant: string, bountyId: number): Promise<string> {
  const args = [
    Address.fromString(claimant).toScVal(),
    xdr.ScVal.scvU64(BigInt(bountyId)),
  ];
  return submitTransaction(claimant, "claim_bounty", args);
}

export async function approveCompletion(owner: string, bountyId: number): Promise<string> {
  const args = [
    Address.fromString(owner).toScVal(),
    xdr.ScVal.scvU64(BigInt(bountyId)),
  ];
  return submitTransaction(owner, "approve_completion", args);
}

export async function cancelBounty(owner: string, bountyId: number): Promise<string> {
  const args = [
    Address.fromString(owner).toScVal(),
    xdr.ScVal.scvU64(BigInt(bountyId)),
  ];
  return submitTransaction(owner, "cancel_bounty", args);
}
