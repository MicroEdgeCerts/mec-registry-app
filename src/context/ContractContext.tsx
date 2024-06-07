/**
 * this class will handle contract messaging. 
 */
import React, { useEffect, useState, createContext, useContext } from 'react';
import abi from '@/abis/TokenRegistry.json'
import { useReadContract, useClient } from 'wagmi'

interface WalletClient {
  address: string;
  // add other properties that WalletClient might have
}

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

  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const client = useClient();

  useEffect(() => {
    const fetchWalletClient = async () => {
      if( client ) {
        const walletClient = await client.getWalletClient();
        setWalletClient(walletClient as WalletClient); // Type assertion if the type is not inferred correctly
      }
    };

    fetchWalletClient();
  }, [client]);


  const actions = {
    ...defaultActions,
    readIssuers: ()=> [],
    writeIssuer: ( issuer: IssuerData ) => {
      return true;
    }
  }


  useEffect(() => {
    const fetchWalletClient = async () => {
      const client = await client.getWalletClient();
      setWalletClient(client);
    };

    fetchWalletClient();
  }, [client]);

  return <ContractContext.Provider value={actions}>
  {children}
  </ContractContext.Provider>

}

export default ContractContextProvider;
