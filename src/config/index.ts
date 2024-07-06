import { http, createConfig, configureChains } from "wagmi";
import { mainnet, sepolia, baseSepolia} from "viem/chains";
import { metaMask } from "wagmi/connectors";
import { createClient, custom} from "viem";
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { injected } from 'wagmi/connectors'






export const maxSizeMB = 2; // Set the maximum size in MB
export const maxProfileSizeBytes = maxSizeMB * 1024 * 1024;

export const PROVIDER_URL = process.env.NEXT_PUBLIC_RPC_URL as string;
const INFRA_API_KEY = process.env.NEXT_PUBLIC_INFRA_API_KEY;
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
  chains: [mainnet, baseSepolia],
  dappMetadata: {
    name: "Mec dApp",
  },
  // Other options.
};
export const getWagmiConfig = () => {
  const wagmiConfig =
    process.env.NODE_ENV === "production"  ? createConfig({
          chains: [mainnet, sepolia],
          ssr: true,
          connectors: [metaMask(metaMaskOptions)],
          transports: {
            [mainnet.id]: http(),
            [baseSepolia.id]: http(PROVIDER_URL),
          },
        })　: createConfig({
          autoConnect: true,
          chains: [baseSepolia],
          ssr: true,
          connectors: [connector],
          transports: {
            [baseSepolia.id]: http(PROVIDER_URL),
          },
        //   client({ chain }) {
        //     return createClient({ chain, transport: http(`${PROVIDER_URL}`) })
        //   },
        })


  return wagmiConfig;
};

export default {
  getWagmiConfig,
};
