import type { Address } from "viem";
import { type UseWriteContractParameters, type Config } from 'wagmi'


type BaseContractParamType = UseWriteContractParameters<Config> & {
    address: Address
    abi: object
    functionName: string
}

export const getBaseContractParam = ( addresses: any, chainId: any,  abi: any, functionName: string | null = null ): BaseContractParamType=> {
  const keys = Object.keys(addresses);
  const values = Object.values(addresses);
  const address = values[keys.indexOf(`${chainId}`)] as Address;
  return {
    address,
    abi,
    functionName: "",
    ...( functionName != null ? { functionName } : {} )
  };
};