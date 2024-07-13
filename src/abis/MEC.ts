import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AchievementCredentialRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const achievementCredentialRegistryAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'key_sets', internalType: 'string[]', type: 'string[]' },
      { name: 'revoked_key_sets', internalType: 'string[]', type: 'string[]' },
      { name: 'cannonical_id', internalType: 'string', type: 'string' },
      { name: 'image', internalType: 'string', type: 'string' },
      { name: 'meta', internalType: 'string', type: 'string' },
      { name: 'profile_id', internalType: 'string', type: 'string' },
      {
        name: 'owner_type',
        internalType: 'enum AchievementCredentialRegistry.OwnerType',
        type: 'uint8',
      },
    ],
    name: 'createOrUpdateAchievement',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getAchievement',
    outputs: [
      {
        name: '',
        internalType: 'struct AchievementCredentialRegistry.Achievement',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'key_sets', internalType: 'string[]', type: 'string[]' },
          {
            name: 'revoked_key_sets',
            internalType: 'string[]',
            type: 'string[]',
          },
          { name: 'cannonical_id', internalType: 'string', type: 'string' },
          { name: 'image', internalType: 'string', type: 'string' },
          { name: 'meta', internalType: 'string', type: 'string' },
          { name: 'profile_id', internalType: 'string', type: 'string' },
          { name: 'owner_id', internalType: 'string', type: 'string' },
          {
            name: 'owner_type',
            internalType: 'enum AchievementCredentialRegistry.OwnerType',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'profileId', internalType: 'string', type: 'string' }],
    name: 'getAchievementsByProfileId',
    outputs: [
      {
        name: '',
        internalType: 'struct AchievementCredentialRegistry.Achievement[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'key_sets', internalType: 'string[]', type: 'string[]' },
          {
            name: 'revoked_key_sets',
            internalType: 'string[]',
            type: 'string[]',
          },
          { name: 'cannonical_id', internalType: 'string', type: 'string' },
          { name: 'image', internalType: 'string', type: 'string' },
          { name: 'meta', internalType: 'string', type: 'string' },
          { name: 'profile_id', internalType: 'string', type: 'string' },
          { name: 'owner_id', internalType: 'string', type: 'string' },
          {
            name: 'owner_type',
            internalType: 'enum AchievementCredentialRegistry.OwnerType',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'revokeAchievement',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'cannonical_id',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'AchievementAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AchievementRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'cannonical_id',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'AchievementUpdated',
  },
] as const

/**
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const achievementCredentialRegistryAddress = {
  1337: '0x86F363056422E6Ab1A5A5CaC294b0A69076c406a',
  31337: '0x86F363056422E6Ab1A5A5CaC294b0A69076c406a',
  84532: '0x86F363056422E6Ab1A5A5CaC294b0A69076c406a',
} as const

/**
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const achievementCredentialRegistryConfig = {
  address: achievementCredentialRegistryAddress,
  abi: achievementCredentialRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IssuerRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const issuerRegistryAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getIssuerData',
    outputs: [
      {
        name: '',
        internalType: 'struct IssuerRegistry.Issuer[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'meta', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getIssuerDataByAddress',
    outputs: [
      {
        name: '',
        internalType: 'struct IssuerRegistry.Issuer[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'meta', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'string', type: 'string' }],
    name: 'getIssuerDataById',
    outputs: [
      {
        name: '',
        internalType: 'struct IssuerRegistry.Issuer',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'meta', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getIssuerDataByTokenId',
    outputs: [
      {
        name: '',
        internalType: 'struct IssuerRegistry.Issuer',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'meta', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getIssuerOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'string', type: 'string' },
      { name: 'meta', internalType: 'string', type: 'string' },
    ],
    name: 'registerIssuer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'IssuerRegistered',
  },
] as const

/**
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const issuerRegistryAddress = {
  1337: '0x0256722106AACbE0433641b49619B9F1dac1b08e',
  31337: '0x0256722106AACbE0433641b49619B9F1dac1b08e',
  80002: '0x0256722106AACbE0433641b49619B9F1dac1b08e',
  84532: '0x0256722106AACbE0433641b49619B9F1dac1b08e',
} as const

/**
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const issuerRegistryConfig = {
  address: issuerRegistryAddress,
  abi: issuerRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useReadAchievementCredentialRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `functionName` set to `"getAchievement"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useReadAchievementCredentialRegistryGetAchievement =
  /*#__PURE__*/ createUseReadContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    functionName: 'getAchievement',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `functionName` set to `"getAchievementsByProfileId"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useReadAchievementCredentialRegistryGetAchievementsByProfileId =
  /*#__PURE__*/ createUseReadContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    functionName: 'getAchievementsByProfileId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useWriteAchievementCredentialRegistry =
  /*#__PURE__*/ createUseWriteContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `functionName` set to `"createOrUpdateAchievement"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useWriteAchievementCredentialRegistryCreateOrUpdateAchievement =
  /*#__PURE__*/ createUseWriteContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    functionName: 'createOrUpdateAchievement',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `functionName` set to `"revokeAchievement"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useWriteAchievementCredentialRegistryRevokeAchievement =
  /*#__PURE__*/ createUseWriteContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    functionName: 'revokeAchievement',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useSimulateAchievementCredentialRegistry =
  /*#__PURE__*/ createUseSimulateContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `functionName` set to `"createOrUpdateAchievement"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useSimulateAchievementCredentialRegistryCreateOrUpdateAchievement =
  /*#__PURE__*/ createUseSimulateContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    functionName: 'createOrUpdateAchievement',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `functionName` set to `"revokeAchievement"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useSimulateAchievementCredentialRegistryRevokeAchievement =
  /*#__PURE__*/ createUseSimulateContract({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    functionName: 'revokeAchievement',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useWatchAchievementCredentialRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `eventName` set to `"AchievementAdded"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useWatchAchievementCredentialRegistryAchievementAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    eventName: 'AchievementAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `eventName` set to `"AchievementRevoked"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useWatchAchievementCredentialRegistryAchievementRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    eventName: 'AchievementRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link achievementCredentialRegistryAbi}__ and `eventName` set to `"AchievementUpdated"`
 *
 * -
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86F363056422E6Ab1A5A5CaC294b0A69076c406a)
 */
export const useWatchAchievementCredentialRegistryAchievementUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: achievementCredentialRegistryAbi,
    address: achievementCredentialRegistryAddress,
    eventName: 'AchievementUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistry = /*#__PURE__*/ createUseReadContract({
  abi: issuerRegistryAbi,
  address: issuerRegistryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getCurrentTokenId"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistryGetCurrentTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getCurrentTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerData"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistryGetIssuerData =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getIssuerData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerDataByAddress"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistryGetIssuerDataByAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getIssuerDataByAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerDataById"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistryGetIssuerDataById =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getIssuerDataById',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerDataByTokenId"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistryGetIssuerDataByTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getIssuerDataByTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerOwner"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistryGetIssuerOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getIssuerOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"nextTokenId"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useReadIssuerRegistryNextTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'nextTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link issuerRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useWriteIssuerRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: issuerRegistryAbi,
  address: issuerRegistryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"registerIssuer"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useWriteIssuerRegistryRegisterIssuer =
  /*#__PURE__*/ createUseWriteContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'registerIssuer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link issuerRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useSimulateIssuerRegistry =
  /*#__PURE__*/ createUseSimulateContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"registerIssuer"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useSimulateIssuerRegistryRegisterIssuer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'registerIssuer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link issuerRegistryAbi}__
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useWatchIssuerRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link issuerRegistryAbi}__ and `eventName` set to `"IssuerRegistered"`
 *
 * -
 * -
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x0256722106AACbE0433641b49619B9F1dac1b08e)
 */
export const useWatchIssuerRegistryIssuerRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    eventName: 'IssuerRegistered',
  })
