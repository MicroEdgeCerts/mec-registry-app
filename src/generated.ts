import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const tokenRegistryAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenData',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenOwner',
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
    inputs: [{ name: 'data', internalType: 'string', type: 'string' }],
    name: 'registerToken',
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
    name: 'TokenRegistered',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const tokenRegistryAddress = {
  1: '0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac',
  5: '0x78991BB1D194C1235fe285240af8489CFA552151',
  1337: '0x43cA9bAe8dF108684E5EAaA720C25e1b32B0A075',
  31337: '0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const tokenRegistryConfig = {
  address: tokenRegistryAddress,
  abi: tokenRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadTokenRegistry = /*#__PURE__*/ createUseReadContract({
  abi: tokenRegistryAbi,
  address: tokenRegistryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenRegistryAbi}__ and `functionName` set to `"getCurrentTokenId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadTokenRegistryGetCurrentTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
    functionName: 'getCurrentTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenRegistryAbi}__ and `functionName` set to `"getTokenData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadTokenRegistryGetTokenData =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
    functionName: 'getTokenData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenRegistryAbi}__ and `functionName` set to `"getTokenOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadTokenRegistryGetTokenOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
    functionName: 'getTokenOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenRegistryAbi}__ and `functionName` set to `"nextTokenId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadTokenRegistryNextTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
    functionName: 'nextTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useWriteTokenRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: tokenRegistryAbi,
  address: tokenRegistryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenRegistryAbi}__ and `functionName` set to `"registerToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useWriteTokenRegistryRegisterToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
    functionName: 'registerToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useSimulateTokenRegistry = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenRegistryAbi, address: tokenRegistryAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenRegistryAbi}__ and `functionName` set to `"registerToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useSimulateTokenRegistryRegisterToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
    functionName: 'registerToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useWatchTokenRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenRegistryAbi}__ and `eventName` set to `"TokenRegistered"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useWatchTokenRegistryTokenRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenRegistryAbi,
    address: tokenRegistryAddress,
    eventName: 'TokenRegistered',
  })
