import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from 'viem/chains'
import { Address } from 'viem';

export default defineConfig({
  out: 'src/abis/MEC.ts',
  plugins: [
    foundry({

      include: [  
        // the following patterns are included by default
        'IssuerRegistry.json',  
        'AchievementCredentialRegistry.json'
      ],  
      deployments: {
        IssuerRegistry: {
          [chains.foundry.id]:  process.env.FORGE_ISSUER_CONTRACT_ADDRESS as Address,
          [chains.localhost.id]: process.env.FORGE_ISSUER_CONTRACT_ADDRESS as Address,
          [chains.polygonAmoy.id]: process.env.FORGE_ISSUER_CONTRACT_ADDRESS as Address,
        },
        AchievementCredentialRegistry: {
          [chains.foundry.id]:  process.env.FORGE_ACHIEVEMENT_CONTRACT_ADDRESS as Address,
          [chains.localhost.id]: process.env.FORGE_ACHIEVEMENT_CONTRACT_ADDRESS as Address,
          [chains.polygonAmoy.id]: process.env.FORGE_ACHIEVEMENT_CONTRACT_ADDRESS as Address,
        },
      },
      project: './contract',
    }),

    react(),
  ],
})