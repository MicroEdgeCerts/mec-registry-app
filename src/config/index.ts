import { http, createConfig } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'
import { sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

import { anvil } from 'wagmi/chains'//Configure the chain and the RPC provider. Note that we've added localhost here

 

const localURL = process.env.FORGE_RPC_URL;


/* use local netwwork if it's not production */
export const getWagmiConfig = ()=> {
  const wagmiConfig =
    ( process.env.NODE_ENV === 'production' ) ? 
    createConfig({
      chains: [mainnet, sepolia],
      ssr: true, 
      connectors: [metaMask()],
      transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
      }
    }): 
      createConfig({
        chains: [anvil],
        connectors: [
          metaMask({
            dappMetadata: {
          name: "Ethereum 101 Dapp",
          url: window.location.href
          }})],
        transports:{
          [anvil.id]: http(localURL)
        }
      })
      return wagmiConfig;
}

export default { 
  getWagmiConfig,
};
