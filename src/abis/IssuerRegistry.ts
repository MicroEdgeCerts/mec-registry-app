import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IssuerRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__
 */
export const useReadIssuerRegistry = /*#__PURE__*/ createUseReadContract({
  abi: issuerRegistryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getCurrentIssuerId"`
 */
export const useReadIssuerRegistryGetCurrentIssuerId =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    functionName: 'getCurrentIssuerId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerData"`
 */
export const useReadIssuerRegistryGetIssuerData =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    functionName: 'getIssuerData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"getIssuerOwner"`
 */
export const useReadIssuerRegistryGetIssuerOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    functionName: 'getIssuerOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"nextTokenId"`
 */
export const useReadIssuerRegistryNextTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: issuerRegistryAbi,
    functionName: 'nextTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link issuerRegistryAbi}__
 */
export const useWriteIssuerRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: issuerRegistryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"registerIssuer"`
 */
export const useWriteIssuerRegistryRegisterIssuer =
  /*#__PURE__*/ createUseWriteContract({
    abi: issuerRegistryAbi,
    functionName: 'registerIssuer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link issuerRegistryAbi}__
 */
export const useSimulateIssuerRegistry =
  /*#__PURE__*/ createUseSimulateContract({ abi: issuerRegistryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link issuerRegistryAbi}__ and `functionName` set to `"registerIssuer"`
 */
export const useSimulateIssuerRegistryRegisterIssuer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: issuerRegistryAbi,
    functionName: 'registerIssuer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link issuerRegistryAbi}__
 */
export const useWatchIssuerRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: issuerRegistryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link issuerRegistryAbi}__ and `eventName` set to `"IssuerRegistered"`
 */
export const useWatchIssuerRegistryIssuerRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: issuerRegistryAbi,
    eventName: 'IssuerRegistered',
  })
