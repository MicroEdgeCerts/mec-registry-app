/**
 * this class will handle contract messaging. 
 */
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useWriteIssuerRegistryRegisterIssuer } from '@/abis/IssuerRegistry';
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import { Address } from 'viem';




type IssuerData = {
  data: string
  id: string
  keys: string[]
}

type ContractActionType = {
  readIssuers: () => IssuerData[]
  writeIssuer: (issuer: IssuerData ) => Promise<boolean>
}

type ContractStateType = {
  issuerRegisted: boolean
  issuerRegistering: boolean
  issuerRegisterError: WriteContractErrorType | null
}

type ContractContextType = {
  actions: ContractActionType
  state: ContractStateType
}

const defaultState: ContractStateType = {
  issuerRegisted: false, 
  issuerRegistering: false,
  issuerRegisterError: null
}
const defaultActions = {
  readIssuers: ()=> [],
  writeIssuer: ( issuer: IssuerData ) => Promise.resolve(true)
}

const ContractContext = createContext<ContractContextType>({
 actions: defaultActions, 
 state: defaultState
});

type ContractProviderPropType = {
  children: React.ReactNode
}


const ContractContextProvider = ({children}:ContractProviderPropType)=>{

  const [issuerAddress, setIssuerAddress] = useState<String>('');
  const [state, setState] = useState<ContractStateType>(defaultState);
  const account = useAccount();
  const { data , error, isPending, writeContractAsync } = useWriteIssuerRegistryRegisterIssuer();

  useEffect(() => {
    if( data ) {
      console.info(`data : ${JSON.stringify(data)}`)

    }
  }, [data])
  useEffect(()=>{
    setState({
      ...state,
      issuerRegisterError: error,
      issuerRegistering: isPending
    })

  }, [error, isPending])

  useEffect(() => {
    setIssuerAddress((account.address || ''))
  }, [account]);


  const actions = {
    ...defaultActions,
    readIssuers: ()=> [],
    writeIssuer: async( issuerData: IssuerData ) => {
      try {
        if( issuerAddress !== '' ) {
          // Call the write function to register the issuer with the string data
          await writeContractAsync({
            address: issuerAddress as Address,
            args: [JSON.stringify(issuerData)] });
        } else {
          throw new Error("No account is associated")
        }
      } catch (err) {
        console.error('Failed to register issuer:', err);
      }
      return true;
    }
  }



  return <ContractContext.Provider value={ { actions, state}} >
  {children}
  </ContractContext.Provider>

}

export default ContractContextProvider;

export const usContractContext = ()=> useContext(ContractContext)
