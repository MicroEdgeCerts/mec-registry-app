import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IssuerRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const issuerRegistryAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentIssuerId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getIssuerData',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: 'data', internalType: 'string', type: 'string' }],
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
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const issuerRegistryAddress = {
  1: '0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac',
  5: '0x78991BB1D194C1235fe285240af8489CFA552151',
  1337: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const issuerRegistryConfig = {
  address: issuerRegistryAddress,
  abi: issuerRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadIssuerRegistry = /*#__PURE__*/ createUseReadContract({
  abi: issuerRegistryAbi,
  address: issuerRegistryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getCurrentIssuerId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadIssuerRegistryGetCurrentIssuerId =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getCurrentIssuerId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerData"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useReadIssuerRegistryGetIssuerData =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    functionName: 'getIssuerData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
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
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
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
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useWriteIssuerRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: issuerRegistryAbi,
  address: issuerRegistryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"registerIssuer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
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
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useSimulateIssuerRegistry =
  /*#__PURE__*/ createUseSimulateContract({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"registerIssuer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
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
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useWatchIssuerRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link issuerRegistryAbi}__ and `eventName` set to `"IssuerRegistered"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 * -
 */
export const useWatchIssuerRegistryIssuerRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: issuerRegistryAbi,
    address: issuerRegistryAddress,
    eventName: 'IssuerRegistered',
  })
