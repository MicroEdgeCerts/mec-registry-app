/**
 * this class will handle contract messaging. 
 */
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useWriteIssuerRegistryRegisterIssuer,
         useReadIssuerRegistryGetIssuerData } from '@/abis/IssuerRegistry';
import type {  WriteContractErrorType, ReadContractErrorType } from '@wagmi/core'
import { useWalletContext, type WalletStateTypes } from './WalletWrapper'

  

export type IssuerData = {
  data: string
  id: string
  keys: string[]
}

type ContractActionType = {
  getProfile: () => IssuerData | null
  readIssuers: () => IssuerData[]
  writeIssuer: (issuer: IssuerData ) => Promise<boolean>
}

type ContractStateType = {
  issuerRegisted: boolean
  issuerRegistering: boolean
  issuerRegisterError: WriteContractErrorType | null
  issuerReadData: string  | null,
  issuerReadError: ReadContractErrorType,
  issuerReadPending: boolean,
}

type ContractContextType = {
  actions: ContractActionType
  state: ContractStateType
}

const defaultState: ContractStateType = {
  /*--- Issuer Write Related state --- */
  issuerRegisted: false, 
  issuerRegistering: false,
  issuerRegisterError: null,
  /*--- Issuer Write Related state --- */
  issuerReadData: null,
  issuerReadError: null,
  issuerReadPending: false,
}
const defaultActions = {
  readIssuer: () => null,
  readIssuers: ()=>  [],
  writeIssuer: ( issuer: IssuerData ) => Promise.resolve(true)
}

const ContractContext = createContext<ContractContextType>([defaultState, defaultActions]);

type ContractProviderPropType = {
  children: React.ReactNode
}


const ContractContextProvider = ({children}:ContractProviderPropType)=>{

  const [issuerAddress, setIssuerAddress] = useState<String>('');
  const [state, setState] = useState<ContractStateType>(defaultState);
  const { data: hash , error, isPending, isSuccess, writeContractAsync } = useWriteIssuerRegistryRegisterIssuer();
  const [ accountState ] = useWalletContext();
  

  useEffect(() => {
    if( hash ) {
      console.info(`data : ${JSON.stringify(hash)}`)
    }
  }, [hash])


  useEffect(()=>{
    setState({
      ...state,
      issuerRegisterError: error,
      issuerRegistering: isPending,
      issuerRegisted: isSuccess,
    })

  }, [error, isPending, isSuccess])


  // useEffect(()=> {
  //   /* Read related operation */
  //   setState({
  //     ...state,
  //     issuerReadData,
  //     issuerReadError,
  //     issuerReadPending,
  //     issuerReadSuccess,
  //   })
  // }, [ issuerReadData, issuerReadError, issuerReadPending, issuerReadSuccess ])

  useEffect(() => {
    setIssuerAddress(( ( accountState as WalletStateTypes ).address  || ''))
  }, [( accountState as WalletStateTypes ).address ]);


  const actions = {
    ...defaultActions,
    readIssuer: async ()=> {
      try{
        if( issuerAddress ) {
          setState({
            ...state,
            issuerReadPending: true
          })
          const data = await useReadIssuerRegistryGetIssuerData()
          setState({
            ...state,
            issuerReadPending: false
          })

        }
      }catch (err) {
        console.error('Failed to read issuer:', err);
      }
      return true;

    },
    readIssuers: ()=> [],
    writeIssuer: async( issuerData: IssuerData ) => {
      try {
        if( issuerAddress !== '' ) {
          // Call the write function to register the issuer with the string data
          await writeContractAsync({
            args: [JSON.stringify( issuerData) as string]
          });
        } else {
          throw new Error("No account is associated")
        }
      } catch (err) {
        console.error('Failed to register issuer:', err);
      }
      return true;
    }
  }



  return <ContractContext.Provider value={ [ state, actions ] } >
  {children}
  </ContractContext.Provider>

}

export default ContractContextProvider;

export const useContractContext = ()=> useContext(ContractContext)
