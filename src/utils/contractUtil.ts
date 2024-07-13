import type { Address } from "viem";
import { createPublicClient, http,  custom, createWalletClient, type WalletClient } from 'viem'

import { getWalletClient as wagmiGetWalletClient,
          } from '@wagmi/core'
import { BaseContractParamType } from '@/types'
import { getWagmiConfig } from '@/config'
import { baseSepolia } from 'viem/chains'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { simulateContract as simulateContractWagmi } from '@wagmi/core'

export const getBaseContractParam = ( addresses: any, chainId: any,  abi: any, account: Address, functionName: string | null = null ): BaseContractParamType=> {
  const keys = Object.keys(addresses);
  const values = Object.values(addresses);
  const address = values[keys.indexOf(`${chainId}`)] as Address;
  return {
    address,
    account,
    abi,
    functionName: "",
    ...( functionName != null ? { functionName } : {} )
  };
};

const getPublicClient = () => {
  // let config = getWagmiConfig();
  // return wagmiGetPublicClient(config)
  return createPublicClient({ 
    chain: baseSepolia, 
    transport: http() 
  }) 
}

const getWalletClient = ()=> {
  return createWalletClient({
    chain: baseSepolia,
    transport: custom(window.ethereum)
  })
}


export const simulateContract = async ( params: any )=> {
  let config = getWagmiConfig();
  return simulateContractWagmi(config, params)
}

export const writeContractWitnSimulate = async( param: any ) => {
  const publicClient = getPublicClient();
  const walletClient = getWalletClient();
  const sim = await publicClient.simulateContract(param)
  let hash = await walletClient.writeContract(sim.request as any)
  const transaction = await publicClient.waitForTransactionReceipt( {hash} );
  return transaction.transactionHash;
}



export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  if( ! chain || !account) {
    throw new Error("no chain or account")
  }
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const client = await wagmiGetWalletClient( getWagmiConfig(), { chainId })
  if (!client) return undefined
  return walletClientToSigner(client)
}






