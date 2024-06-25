import type { Address } from "viem";
import { type UseWriteContractParameters, type Config } from 'wagmi'
import { BaseContractParamType } from '@/types'


export const getBaseContractParam = ( addresses: any, chainId: any,  abi: any, account: Address, functionName: string | null = null ): BaseContractParamType=> {
  const keys = Object.keys(addresses);
  const values = Object.values(addresses);
  const address = values[keys.indexOf(`${chainId}`)] as Address;
  return {
    address,
    account,
    abi,
    functionName: "",
    ...( functionName != null ? { functionName } : {} )
  };
};