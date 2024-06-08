import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from '@wagmi/chains'

export default defineConfig({
  out: 'src/abis/IssuerRegistry.ts',
  plugins: [
    foundry({

      include: [  
        // the following patterns are included by default
        'IssuerRegistry.json',  
      ],  

      deployments: {
        TokenRegistry: {
          [chains.mainnet.id]: '0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac',
          [chains.goerli.id]: '0x78991BB1D194C1235fe285240af8489CFA552151',
          [chains.foundry.id]: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
          [chains.localhost.id]: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        },
      },
      project: './contract',
    }),
    react(),
  ],
})