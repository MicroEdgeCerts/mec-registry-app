/**
 * this class will handle contract messaging. 
 */
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useWriteIssuerRegistryRegisterIssuer,
         useReadIssuerRegistryGetIssuerData } from '@/abis/IssuerRegistry';
import type {  WriteContractErrorType, 
  ReadContractErrorType, 
  SignMessageErrorType } from '@wagmi/core'
import { useWalletContext, type WalletStateTypes } from './WalletWrapper'
import type { Address } from 'viem'
import { useClient, type UseClientReturnType  } from 'wagmi'
import type { ProfileRegistryCreateRequest } from '@/types';


export type IssuerData = {
  data: string
  id: string
  keys: string[]
}

type ContractActionType = {
  getProfile: () => IssuerData | null
  readIssuers: () => IssuerData[]
  signData: ( message: string )=> string
  writeProfile: (issuer: ProfileRegistryCreateRequest ) => Promise<boolean>
}

type ContractStateType = {
  client: UseClientReturnType | null,
  profileRegisted: boolean
  profileRegistering: boolean
  profileRegisterError: WriteContractErrorType | null
  profileInitialized: boolean
  issuerReadData: string  | null
  issuerReadError: ReadContractErrorType | Error | null
  issuerReadPending: boolean,
  singingMessage: string | null,
  singingOriginalMessage: string | null,
  signingError: SignMessageErrorType | null,
  singingPending: false,
}

type ContractContextType = [ ContractStateType, ContractActionType ]

const defaultState: ContractStateType = {
  client: null,
  /*--- Issuer Write Related state --- */
  profileRegisted: false, 
  profileRegistering: false,
  profileRegisterError: null,
  /*--- Issuer Write Related state --- */
  profileInitialized: false,
  issuerReadData: null,
  issuerReadError: null,
  issuerReadPending: false,
  /*--- Singing state --- */
  singingMessage: null,
  singingOriginalMessage: null,
  signingError: null,
  singingPending: false,
}
const defaultActions = {
  getProfile: () => null,
  signData: ( message: string )=>  "",
  readIssuers: ()=>  [],
  writeProfile: ( profile: ProfileRegistryCreateRequest ) => Promise.resolve(true)
}

const ContractContext = createContext<ContractContextType>([defaultState, defaultActions]);

type ContractProviderPropType = {
  children: React.ReactNode
}


const ContractContextProvider = ({children}:ContractProviderPropType)=>{

  const [issuerAddress, setIssuerAddress] = useState<Address|null>(null);
  const [state, setState] = useState<ContractStateType>(defaultState);
  const { data: hash , error, isPending, isSuccess, writeContractAsync } = useWriteIssuerRegistryRegisterIssuer();
  const [ accountState ] = useWalletContext();
  const readIssuerFromContract = useReadIssuerRegistryGetIssuerData({
      args:[ issuerAddress as Address as any ],
      enabled: ( issuerAddress !== null ) // Tanstack config to prevent the request from being triggered onload
    })

  const client = useClient()

  const issuerFetchQuery = readIssuerFromContract.queryKey
  // ipfs {data, isPending, isSuccess, isError, signMessage}

  useEffect(()=> {
    setState({
      ...state,
      client
    })
  }, [client])

  useEffect(() => {
    if( hash ) {
      console.info(`data : ${JSON.stringify(hash)}`)
    }
  }, [hash])


  useEffect(()=>{
    setState({
      ...state,
      profileInitialized: false,
      profileRegisterError: error,
      profileRegistering: isPending,
      profileRegisted: isSuccess,
    })

  }, [error, isPending, isSuccess])



  useEffect(() => {
    setIssuerAddress(( ( accountState as WalletStateTypes ).address  || null))
  }, [( accountState as WalletStateTypes ).address ]);


  const actions = {
    ...defaultActions,
    signData: async ( message: string )=> {
      if( client ) {
        try { 
          console.info(`signing message ${message}`)
          const account = issuerAddress as Address
          const signedMessage = await ( client as any ).signMessage({
            message,
            account
          });
          return signedMessage;

        } catch ( e ) {
          console.info(`e ${e}`)
        }
      }
    },
    getProfile: async ()=> {
      try{

        if( issuerAddress ) {
          setState({
            ...state,
            issuerReadPending: true,
            issuerReadError: null
          })
          const res = await readIssuerFromContract.refetch({
            ...issuerFetchQuery,
            args:[BigInt(issuerAddress)]
          });

          setState({
            ...state,
            profileInitialized: true,
            issuerReadData: res.data || null,
            issuerReadPending: false
          })

        }
      } catch (err) {
        console.info(err)
        setState({
          ...state,
          issuerReadPending: false,
          issuerReadError: error
        })
      }
      return true;

    },
    readIssuers: ()=> [],
    writeProfile: async( issuerData: ProfileRegistryCreateRequest ) => {
      try {
        if( issuerAddress !== null ) {
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
