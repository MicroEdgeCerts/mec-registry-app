/**
 * this class will handle contract messaging. 
 */
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useWriteIssuerRegistryRegisterIssuer,
         useReadIssuerRegistryGetIssuerDataByAddress, 
         useReadIssuerRegistryGetIssuerDataByTokenId } from '@/abis/IssuerRegistry';
import type {  WriteContractErrorType, 
  ReadContractErrorType, 
  SignMessageErrorType } from '@wagmi/core'
import { useWalletContext, type WalletStateTypes } from './WalletWrapper'
import type { Address } from 'viem'
import { useClient, type UseClientReturnType, useChainId  } from 'wagmi'
import type { ProfileRegistryCreateRequest, ProfileRegistryDataType, ProfileContract } from '@/types';
import { issuerRegistryAddress, issuerRegistryAbi } from "@/abis/IssuerRegistry"
import { getMetaFile } from '@/utils/ipfsService'

export type IssuerData = {
  data: string
  id: string
  keys: string[]
}

type ContractActionType = {
  getProfile: () => ProfileRegistryDataType[] | null
  getIssuersByTokenId: (tokenId:number ) => ProfileRegistryDataType | null
  signData: ( message: string )=> string
  writeProfile: (issuer: ProfileRegistryCreateRequest ) => Promise<string|null>
}

type ContractStateType = {
  client: UseClientReturnType | null,
  profileRegisted: boolean
  profileRegistering: boolean
  profileRegisterError: WriteContractErrorType | any | null
  profileInitialized: boolean
  profiles: any[]
  profileReadError: ReadContractErrorType | Error | null
  profileReadPending: boolean,
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
  profiles: [],
  profileReadError: null,
  profileReadPending: false,
  /*--- Singing state --- */
  singingMessage: null,
  singingOriginalMessage: null,
  signingError: null,
  singingPending: false,
}
const defaultActions = {
  getProfile: () => null,
  signData: ( )=>  "",
  getIssuersByTokenId: ()=> null,
  writeProfile: ( ) => Promise.resolve(null)
}

const ContractContext = createContext<ContractContextType>([defaultState, defaultActions]);

type ContractProviderPropType = {
  children: React.ReactNode
}


type BaseContractParamType = {
  address : Address
  account : Address
  abi: typeof issuerRegistryAbi
  
}
const ContractContextProvider = ({children}:ContractProviderPropType)=>{

  const [issuerAddress, setIssuerAddress] = useState<Address|null>(null);
  const [state, setState] = useState<ContractStateType>(defaultState);
  const [baseContractParam, setBaseContractParam] = useState<BaseContractParamType|null>(null);
  const profileWrite = useWriteIssuerRegistryRegisterIssuer();
  const { data: hash , error, isPending, isSuccess, writeContract } = profileWrite;
  const [ accountState ] = useWalletContext();
  const readIssuerByTokenId = useReadIssuerRegistryGetIssuerDataByTokenId({
      enabled: ( issuerAddress !== null ) // Tanstack config to prevent the request from being triggered onload
    })

  const readIssuerFromContract = useReadIssuerRegistryGetIssuerDataByAddress({
      args: [ `${issuerAddress}` ],
      enabled: ( issuerAddress !== null ) // Tanstack config to prevent the request from being triggered onload
    })
  const chainId = useChainId();

  const client = useClient()

  const issuerFetchQuery = readIssuerFromContract.queryKey
  // ipfs {data, isPending, isSuccess, isError, signMessage}


  const getBaseIssuerRegistryContractParam = ()=> {
    const keys = Object.keys( issuerRegistryAddress);
    const values =  Object.values( issuerRegistryAddress );
    const address = values[ keys.indexOf( `${chainId}` )]
    const account = issuerAddress as Address
    return {
      address,
      account,
      abi: issuerRegistryAbi
    }
  }

  const getProfileContractFromMeta =  async ( item: ProfileContract )=> {
      //parse string contract
      // from meta field, get pinned IPFS
      const contract = JSON.parse( item.meta )
      const data = await getMetaFile(contract.meta)
      return {
        ...item, 
        data
      }
  };

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
    if( client !== null && issuerAddress != null ) {
      setBaseContractParam( getBaseIssuerRegistryContractParam())
    } else {
      setBaseContractParam( null )
    }

  }, [ client, issuerAddress] )


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
            profileReadPending: true,
            profileReadError: null
          })
          let res = await readIssuerFromContract.refetch({
            ...issuerFetchQuery,
          });

          let _profileArr = [...( res.data || [] ) ].flat().map(item => {
            return {
              ...item,
              tokenId: Number( item.tokenId)
            } 
          });
          let response = {
            ...res,
            data:_profileArr
          }
          console.info(`got back data ${JSON.stringify(response)}`)
          
          if( _profileArr.length == 0 ) {
            /* if no profile set read */
            setState({
              ...state,
              profileInitialized: true,
              profiles:  [],
              profileReadPending: false
            })
          } else {
            /**  [description] */
            const profiles: ProfileContract[] = new Array(_profileArr.length);
            await Promise.all( _profileArr.map( (item: ProfileContract, i:number )=> {
              return new Promise( async ( resolve ) => {
                const data = await getProfileContractFromMeta( item );
                profiles[i] = data;
                resolve(data);
              });
            }))
            console.info("#YF loaded data : " + JSON.stringify( profiles ));
            setState({
              ...state,
              profileInitialized: true,
              profiles,
              profileReadPending: false
            })
          }

        }
      } catch (err) {
        console.info(err)
        setState({
          ...state,
          profileReadPending: false,
          profileReadError: error
        })
      }
      return true;

    },
    // getIssuersByTokenId: async ( tokenId: string )=> {
    //   let res = null;
    //   if( baseContractParam != null ) {
    //       res = await client.writeContract({
    //       ...baseContractParam, 
    //         functionName: 'registerIssuer',
    //         args: [issuerData.url, JSON.stringify( issuerData) as string]
    //       })

    //   }
    // },
    getIssuersByTokenId: async ( tokenId: string ) => {
      const res = await readIssuerByTokenId.refetch( {
        args: [tokenId]
      })
      return res;
    },
    readIssuers: ()=> [],
    writeProfile: async( issuerData: ProfileRegistryCreateRequest ):  Promise<string|null> => {
      let res = null;
      try {
         setState({
           ...state,
          profileRegisted: false, 
          profileRegistering: true,
          profileRegisterError: null,
         })

        if( baseContractParam != null ) {
          console.info( `issuerAddress== ${issuerAddress}` );
          res = await client!.writeContract({
            ...baseContractParam, 
            functionName: 'registerIssuer',
            args: [issuerData.id, JSON.stringify( issuerData) as string]
          })
          console.info( `res== ${JSON.stringify(res)}` );
          setState({
           ...state,
          profileRegisted: true, 
          profileRegistering: false,
          profileRegisterError: null,
          })

        } else {
          throw new Error("No account is associated")
        }
      } catch (err) {
         setState({
           ...state,
          profileRegisted: false, 
          profileRegistering: false,
          profileRegisterError: err,
         })
        console.error('Failed to register issuer:', err);
      }
      return res;
    }
  }



  return <ContractContext.Provider value={ [ state, actions ] } >
  {children}
  </ContractContext.Provider>

}

export default ContractContextProvider;

export const useContractContext = ()=> useContext(ContractContext)
