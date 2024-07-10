/**
 * this class will handle contract messaging.
 */
import React, { useEffect, useState, createContext, useContext } from "react";
import { createPublicClient, http,  custom, createWalletClient } from 'viem'
import { baseSepolia } from 'viem/chains'
import { ethers, Contract } from "ethers";
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
import { useWriteContract, useConnectorClient } from 'wagmi'
import { useClient, type UseClientReturnType,  useChainId } from "wagmi";
import type {
  ProfileRegistryCreateRequest,
  ProfileRegistryDataType,
  ProfileContract,
  BaseContractParamType
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
  getIssuersByTokenId: (tokenId: number) => ProfileRegistryDataType | null;
  signData: (message: string) => string;
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
  signData: () => "",
  getIssuersByTokenId: () => null,
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

  const profileWrite = useWriteIssuerRegistryRegisterIssuer({enable: false});
  const {
    data: hash,
    error,
    isPending,
    isSuccess,
    writeContractAsync
  } = profileWrite;
  const [accountState] = useWalletContext();

  const readIssuerByTokenId = useReadIssuerRegistryGetIssuerDataByTokenId({
    enabled: issuerAddress !== null, // Tanstack config to prevent the request from being triggered onload
  });

  const readIssuerFromContract = useReadIssuerRegistryGetIssuerDataByAddress({
    args: [`${issuerAddress}`],
    enabled: issuerAddress !== null, // Tanstack config to prevent the request from being triggered onload
  });
  const chainId = useChainId();

  const client = useClient();

  

  const issuerFetchQuery = readIssuerFromContract.queryKey;
  // ipfs {data, isPending, isSuccess, isError, signMessage}

  const getBaseIssuerRegistryContractParam = () => {
    const keys = Object.keys(issuerRegistryAddress);
    const values = Object.values(issuerRegistryAddress);
    const address = values[keys.indexOf(`${chainId}`)];
    const account = issuerAddress as Address;
    return {
      address,
      account,
      abi: issuerRegistryAbi,
    };
  };

  const getProfileContractFromMeta = async (item: ProfileContract) => {
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

    if (client !== null && issuerAddress != null) {
      setBaseContractParam(getBaseIssuerRegistryContractParam());
    } else {
      setBaseContractParam(null);
    }
  }, [client, issuerAddress]);

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     profileInitialized: false,
  //     profileRegisterError: error,
  //     profileRegistering: isPending,
  //     profileRegisted: isSuccess,
  //   });
  // }, [error, isPending, isSuccess]);

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
            ...issuerFetchQuery,
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
              _profileArr.map((item: ProfileContract, i: number) => {
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

      } catch (err) {
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
    getIssuersByTokenId: async (tokenId: string) => {
      const res = await readIssuerByTokenId.refetch({
        args: [ tokenId],
      });
      return res;
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
          
          let hash = await writeContractWitnSimulate({
            ...baseContractParam,
            functionName: "registerIssuer",
            args: [issuerData.id, JSON.stringify(issuerData) as string],
          })

          ///=======
          console.info(`simulateContract === ${JSON.stringify(res)}`)
          
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
