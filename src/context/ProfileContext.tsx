/**
 * this class will handle contract messaging.
 */
import React, { useEffect, useState, createContext, useContext } from "react";
import { getBaseContractParam } from "@/utils/contractUtil"
import {
  useWriteIssuerRegistryRegisterIssuer,
  useReadIssuerRegistryGetIssuerDataByAddress,
  useReadIssuerRegistryGetIssuerDataByTokenId,
  issuerRegistryAddress,
  issuerRegistryAbi,
} from "@/abis/MEC";
import type {
  WriteContractErrorType,
  ReadContractErrorType,
  SignMessageErrorType,
} from "@wagmi/core";
import { useWalletContext, type WalletStateTypes } from "./WalletWrapper";
import type { Address } from "viem";
import {  useConnectorClient } from 'wagmi'
import { useClient, type UseClientReturnType,  useChainId } from "wagmi";
import type {
  ProfileRegistryCreateRequest,
  ProfileRegistryDataType,
  ProfileContract,
  BaseContractParamType,
  Profile
} from "@/types";
import {  writeContractWitnSimulate} from '@/utils/contractUtil'
import { getMetaFile } from "@/utils/ipfsService";

import AchievementCredentialRegistryProvider from './AchievementCredentialRegistryContext'

export type IssuerData = {
  data: string;
  id: string;
  keys: string[];
};

type ContractActionType = {
  getProfile: () => Promise<boolean>;
  getIssuersByTokenId: (tokenId: string) => Promise<ProfileRegistryDataType | null>;
  signData: (message: string) => Promise<string>;
  writeProfile: (
    issuer: ProfileRegistryCreateRequest,
  ) => Promise<string | null>;
  setCurrentProfile: ( profile: ProfileContract | null) => void
};

type ContractStateType = {
  client: UseClientReturnType | null;
  profileRegisted: boolean;
  profileRegistering: boolean;
  profileRegisterError: WriteContractErrorType | any | null;
  profileInitialized: boolean;
  currentProfile: ProfileContract | null
  profiles: any[];
  profileReadError: ReadContractErrorType | Error | null;
  profileReadPending: boolean;
  singingMessage: string | null;
  singingOriginalMessage: string | null;
  signingError: SignMessageErrorType | null;
  singingPending: false;
};

type ProfileContextType = [ContractStateType, ContractActionType];

const defaultState: ContractStateType = {
  client: null,
  /*--- Issuer Write Related state --- */
  profileRegisted: false,
  profileRegistering: false,
  profileRegisterError: null,
  /*--- Issuer Write Related state --- */
  profileInitialized: false,
  profiles: [],
  currentProfile: null,
  profileReadError: null,
  profileReadPending: false,
  /*--- Singing state --- */
  singingMessage: null,
  singingOriginalMessage: null,
  signingError: null,
  singingPending: false,
};
const defaultActions = {
  getProfile: () => Promise.resolve(false),
  signData: () => Promise.resolve(""),
  getIssuersByTokenId:  () => { return Promise.resolve(null) },
  writeProfile: () => Promise.resolve(null),
  setCurrentProfile: () => null
};

const ProfileContext = createContext<ProfileContextType>([
  defaultState,
  defaultActions,
]);

type ProfileContextProviderPropType = {
  children: React.ReactNode;
};


const ProfileContextProvider = ({ children }:ProfileContextProviderPropType) => {
  // const { data: hash, writeContract } = useWriteContract()

  const [issuerAddress, setIssuerAddress] = useState<Address | null>(null);
  const [state, setState] = useState<ContractStateType>(defaultState);
  const [baseContractParam, setBaseContractParam] =
    useState<BaseContractParamType | null>(null);


  const currentConnection = useConnectorClient()

  const profileWrite = useWriteIssuerRegistryRegisterIssuer();
  const {
    data: hash
  } = profileWrite;
  const [accountState] = useWalletContext();

  const readIssuerByTokenId = useReadIssuerRegistryGetIssuerDataByTokenId({
    // @ts-ignore
    enabled: (( issuerAddress as any) !== null), // Tanstack config to prevent the request from being triggered onload
  });

  const readIssuerFromContract = useReadIssuerRegistryGetIssuerDataByAddress({
    args: [`${issuerAddress!}`],
  });
  const chainId = useChainId();

  const client = useClient();

  

  const issuerFetchQuery = readIssuerFromContract.queryKey;
  // ipfs {data, isPending, isSuccess, isError, signMessage}

  const getProfileContractFromMeta = async (item: ProfileContract):Promise<ProfileContract> => {
    //parse string contract
    // from meta field, get pinned IPFS
    const contract = JSON.parse(item.meta);
    const data = await getMetaFile<Profile>(contract.meta);
    return {
      ...item,
      data,
    };
  };

  useEffect(() => {
    setState({
      ...state,
      client,
    });
  }, [client]);

  useEffect(()=> {

    if( !currentConnection.data ){
      currentConnection.refetch();
    } else {
      console.info(`currentConnection = ${currentConnection}`)
    }
  }, [currentConnection])

  useEffect(() => {
    if (hash) {
      console.info(`data : ${JSON.stringify(hash)}`);
    }
  }, [hash]);


  useEffect(() => {

    if (typeof window != undefined &&  chainId && client !== null && issuerAddress != null) {
      const account = issuerAddress as Address;
      console.log(`#YF -----chainId :${chainId}`)
      const param = getBaseContractParam( 
        issuerRegistryAddress,
        chainId,
        issuerRegistryAbi,
        account );
      setBaseContractParam(param);
    } else {
      setBaseContractParam(null);
    }
  }, [client, chainId, issuerAddress]);

  useEffect(() => {
    setIssuerAddress((accountState as WalletStateTypes).address || null);
  }, [(accountState as WalletStateTypes).address]);

  const actions = {
    ...defaultActions,
    signData: async (message: string) => {
      if (client) {
        try {
          console.info(`signing message ${message}`);
          const account = issuerAddress as Address;
          const signedMessage = await (client as any).signMessage({
            message,
            account,
          });
          return signedMessage;
        } catch (e) {
          console.info(`e ${e}`);
        }
      }
    },
    getProfile: async ():  Promise<boolean> => {
      try {
        if (issuerAddress) {
          console.info(`getting profile for ${issuerAddress}`);
          setState({
            ...state,
            profileReadPending: true,
            profileReadError: null,
          });
          

          let res = await readIssuerFromContract.refetch({
            ...( issuerFetchQuery as any),
          });

          let _profileArr = [...(res.data || [])].flat().map((item) => {
            return {
              ...item,
              tokenId: Number(item.tokenId),
            };
          });
          let response = {
            ...res,
            data: _profileArr,
          };
          console.info(`got back data ${JSON.stringify(response)}`);

          if (_profileArr.length == 0) {
            /* if no profile set read */
            setState({
              ...state,
              profileInitialized: true,
              profiles: [],
              profileReadPending: false,
            });
          } else {
            /**  [description] */
            const profiles: ProfileContract[] = new Array(_profileArr.length);
            await Promise.all(
              _profileArr.map((item: any, i: number) => {
                return new Promise(async (resolve) => {
                  const data = await getProfileContractFromMeta(item);
                  profiles[i] = data;
                  resolve(data);
                });
              }),
            );
            console.info("#YF loaded data : " + JSON.stringify(profiles));
            setState({
              ...state,
              profileInitialized: true,
              profiles,
              profileReadPending: false,
            });
          }
        }
        return true;

      } catch (err: any | Error | null) {
        console.info(err);
        setState({
          ...state,
          profileReadPending: false,
          profileReadError: err,
        });
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
    getIssuersByTokenId: async (tokenId: string): Promise<ProfileRegistryDataType|null> => {
      const res = await readIssuerByTokenId.refetch({
        args: [ tokenId ] ,
      } as any);
      return res as any as ProfileRegistryDataType;
    },
    readIssuers: () => [],
    writeProfile: async (
      issuerData: ProfileRegistryCreateRequest,
    ): Promise<string | null> => {

      let res = null;
      try {
        setState({
          ...state,
          profileRegisted: false,
          profileRegistering: true,
          profileRegisterError: null,
        });

        if (client &&  baseContractParam != null) {
          
          res = await writeContractWitnSimulate({
            ...baseContractParam,
            functionName: "registerIssuer",
            args: [issuerData.id, JSON.stringify(issuerData) as string],
          })

          ///=======
          console.info(`simulateContract === ${JSON.stringify(res)} `)
          
          setState({
            ...state,
            profileRegisted: true,
            profileRegistering: false,
            profileRegisterError: null,
          });
        } else {
          throw new Error("No account is associated");
        }
      } catch (err) {
        setState({
          ...state,
          profileRegisted: false,
          profileRegistering: false,
          profileRegisterError: err,
        });
        console.error("Failed to register issuer:", err);
      }
      return res;
    },
    setCurrentProfile: ( profile: ProfileContract | null  ) => {
      setState({
        ...state,
        currentProfile: profile 
      })
    }
  };

  return (
    <ProfileContext.Provider value={[state, actions]}>
      <AchievementCredentialRegistryProvider profile={ state.currentProfile }>
        {children}
      </AchievementCredentialRegistryProvider>
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;

export const useIssuerProfileContext = () => useContext(ProfileContext);
