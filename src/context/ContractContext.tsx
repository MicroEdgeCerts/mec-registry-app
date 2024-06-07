/**
 * this class will handle contract messaging. 
 */
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useReadContract } from 'wagmi'
import {
  useWriteTokenRegistry,
  useWriteTokenRegistryRegisterToken
} from '@abis/TokenRegistry'

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

type IssuerData = {
  data: string
  id: string
  keys: string[]
}

type ContractContextType = {
  readIssuers: () => IssuerData[]
  writeIssuer: (issuer: IssuerData ) => boolean
}
const defaultActions = {
  readIssuers: ()=> [],
  writeIssuer: ( issuer: IssuerData ) => true
}

const ContractContext = createContext<ContractContextType>(defaultActions);

type ContractProviderPropType = {
  children: React.ReactNode
}


const ContractContextProvider = ({children}:ContractProviderPropType)=>{


  const provider = useProvider();
  const { data: signer } = useSigner();
  
  const contract = useReadContract({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer || provider,
  });

  const actions = {
    ...defaultActions,
    readIssuers: ()=> [],
    writeIssuer: ( issuer: IssuerData ) => {
    }
  }
  return <ContractContext.Provider value={actions}>
  {children}
  </ContractContext.Provider>

}

export default ContractContextProvider;
