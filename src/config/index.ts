import { http, createConfig } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'
import { sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { createWalletClient, custom } from "viem";


import { anvil } from 'wagmi/chains'//Configure the chain and the RPC provider. Note that we've added localhost here

 

export const maxSizeMB = 2; // Set the maximum size in MB
export const maxProfileSizeBytes = maxSizeMB * 1024 * 1024;

export const PROVIDER_URL = process.env.FORGE_RPC_URL  as string
export const CONTRACT_ADDRESS = process.env.FORGE_ISSUER_CONTRACT_ADDRESS as string;
/* use local netwwork if it's not production */
const metaMaskOptions = {
  dappMetadata: {
    name: "Mec dApp",
  }
  // Other options.
};
export const getWagmiConfig = ()=> {
  const wagmiConfig =
    ( process.env.NODE_ENV === 'production' ) ? 
    createConfig({
      chains: [mainnet, sepolia],
      ssr: true, 
      connectors: [metaMask(metaMaskOptions)],
      transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
      }
    }): 
      createConfig({
        chains: [anvil],
        ssr: true,
        connectors: [metaMask(metaMaskOptions)],
        client({ chain }) { 
          return createWalletClient({
            chain: chain,
            transport: custom(window.ethereum!)
          }) 
        }, 
      })
      return wagmiConfig;
}

export default { 
  getWagmiConfig,
};
