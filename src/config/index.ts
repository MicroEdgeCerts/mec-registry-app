import { http, createConfig } from "wagmi";
import { baseSepolia,} from "viem/chains";
import { metaMask } from "wagmi/connectors";
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { injected } from 'wagmi/connectors'




const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const transport = alchemyKey
  ? http(`https://base-sepolia.g.alchemy.com/v2/${alchemyKey}`)
  : http();


export const maxSizeMB = 2; // Set the maximum size in MB
export const maxProfileSizeBytes = maxSizeMB * 1024 * 1024;

export const apiURL = process.env.NEXT_PUBLIC_API_URL

export const PROVIDER_URL = process.env.NEXT_PUBLIC_RPC_URL as string;
// const INFRA_API_KEY = process.env.NEXT_PUBLIC_INFRA_API_KEY;
export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
export const ISSUER_REGISTRY_CONTRACT_ADDRESS = process.env
  .FORGE_ISSUER_CONTRACT_ADDRESS as string;
export const ACHIEVEMENT_CREDENTIAL_CONTRACT_ADDRESS = process.env
  .FORGE_ISSUER_CONTRACT_ADDRESS as string;

const connector = injected({
  shimDisconnect: true, 
  target: 'metaMask' })



/* use local netwwork if it's not production */
const metaMaskOptions = {
  chains: [baseSepolia],
  dappMetadata: {
    name: "Mec dApp",
  },
  // Other options.
};
export const getWagmiConfig = () => {
  const wagmiConfig =
    process.env.NODE_ENV === "production"  ? createConfig({
          chains: [baseSepolia],
          ssr: true,
          connectors: [metaMask(metaMaskOptions)],
          transports: {
            [baseSepolia.id]: transport
          },
        })　: createConfig({
          chains: [baseSepolia],
          ssr: true,
          connectors: [connector],
          transports: {
            [baseSepolia.id]: http(PROVIDER_URL),
          },
        })


  return wagmiConfig;
};

export default {
  getWagmiConfig,
};
