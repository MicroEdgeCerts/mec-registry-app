import { http, createConfig } from 'wagmi'

import { mainnet } from '@wagmi/core/chains'

import { sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
const issuerContractAddress = process.env.NEXT_APP_ISSUER_CONTRACT_ADDRESS

import { localhost } from 'wagmi/chains'//Configure the chain and the RPC provider. Note that we've added localhost here

const rpcURL = process.env.FORGE_RPC_URL;

/* use local netwwork if it's not production */
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
        chains: [localhost],
        connectors: [metaMask()],
        transports:{
          [localhost.id]: http(rpcURL)
        }
      })

;

export default { 
  wagmiConfig,
  issuerContractAddress
};
