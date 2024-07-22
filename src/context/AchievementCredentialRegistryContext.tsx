/**
 * This file handles communication for the AchievementCredentialRegistry
 */


import React, { useEffect, useState, createContext, useContext } from 'react';
import { ProfileContract, AchievementCredentialContractType,
          AchievementCredeintialRequestType, BaseContractParamType,
          AchievementCredeintialMetaItem,
          SkillItem } from '@/types'
import {  useChainId, 
          useClient, 
           } from 'wagmi'
import { useReadAchievementCredentialRegistryGetAchievementsByProfileId  as getCredentialByProfile ,
        achievementCredentialRegistryConfig,
         achievementCredentialRegistryAbi } from '@/abis/MEC'
import { getBaseContractParam } from "@/utils/contractUtil"
import type { Address, Hash } from 'viem'
import { useWalletContext, type WalletStateTypes } from '@/context/WalletWrapper'
import { getMetaFile } from "@/utils/ipfsService";
import { writeContractWitnSimulate } from "@/utils/contractUtil"

type AchievementCredentialRegistryContextPropType = {
  profile: ProfileContract | null,
  children: React.ReactNode
}


enum OwnerType {
  BlockChain = 0
}

type SkillAction = {
  getSkills: () => SkillItem[]
  writeSkill: ( skill: AchievementCredeintialRequestType ) => void
}


type ACRStateType = {
  skills: SkillItem[] 
  initialized: boolean, 
  currentProfile: ProfileContract|null
  creatingContract: boolean,
  creatingContractError: Error|null,
  createdContract: AchievementCredentialContractType | null
}

let defaultState = {
  skills: [],
  initialized: false,
  currentProfile: null,
  creatingContract:false,
  creatingContractError: null,
  createdContract: null
}
let defaultActions = {
  getSkills: ()=> [],
  // @ts-ignore
  writeSkill: ( skill: AchievementCredeintialRequestType ) => {}
}



type ACRContextType = [ACRStateType, SkillAction];

const ACRContext = createContext<ACRContextType>([defaultState, defaultActions])

const AchievementCredentialRegistryProvider: React.FC<AchievementCredentialRegistryContextPropType> = ( {children, profile} ) => {
  const [ currentProfile, setCurrentProfile ] = useState<ProfileContract|null>(profile || null);
  const [ state, setState ] = useState<ACRStateType>(defaultState)
  const [ walletState ] = useWalletContext();
  const { data,  isSuccess, refetch, queryKey} = getCredentialByProfile({
    args: [ (currentProfile|| {}).id || '' ],
  })
  // @ts-ignore
  const [writeHash, setWriteHash] = useState<Hash>()

  const chainId = useChainId();
  const client = useClient();

  const [baseContractParam, setBaseContractParam] =
    useState<BaseContractParamType | null>(null);

  const getSkillsFromContractData = async ( data:  AchievementCredentialContractType[]): Promise<SkillItem[]> => {
    try{
      if( data.length > 0 ) {
        const arr = await Promise.all( data.map( ( item: AchievementCredentialContractType )=> parseContractToSkill( item) ) )
        return arr;
      }
    } catch( e ) {
      console.error( e ); 
    }
    return []
  }

  const parseContractToSkill = async ( item: AchievementCredentialContractType  ): Promise<SkillItem> => {
    const data = await getMetaFile<AchievementCredeintialMetaItem>(item.meta);
    let contract = {
      profile_id: item.profile_id,
      owner_id: item.owner_id,
      ...data,
      id: Number( item.id )
    }
    console.info("contract received :" + JSON.stringify( contract) )
    return contract;
  }


  const generateContractData = (  data: AchievementCredeintialRequestType ) => {
    const achievementData = [
      BigInt(0), 
      [...data.key_sets],
      [...data.revoked_key_sets], 
      data.cannonical_id,
      data.meta,
      currentProfile!.id,
      OwnerType.BlockChain ] as readonly [bigint, readonly string[], readonly string[], string, string, string, number]
    return achievementData 
  }



  const writeSkill = async ( data: AchievementCredeintialRequestType  ) => {

    try { 
      setState({
        ...state,
        creatingContract: true,
        creatingContractError: null,
      })

      const args = generateContractData( data )

      let hash = await writeContractWitnSimulate({
          ...baseContractParam,
          args          
      })
      setWriteHash( hash )

    } catch ( ex: any ) {

      setState({
        ...state,
        creatingContract: false,
        creatingContractError: ex,
      })
    }
    if( !currentProfile ) {
      throw new Error( "No Profile");
    }

  }

  const actions = {
    ...defaultActions,
    writeSkill
  }


  useEffect(()=>{
    if( profile ) {
      const request = {
          ...queryKey[1] as object, 
          args: [ profile.id ]
        }
      refetch([ queryKey[0], request ] as any ); 
      setCurrentProfile(profile)
      setState({
        ...state,
        currentProfile: profile
      });
    } else {
      setState({
        ...state,
        currentProfile: null,
        initialized: true
      })
    }
  }, [profile])


  useEffect(() => {
    if ( client !== null ) {
      const params = getBaseContractParam(
            achievementCredentialRegistryConfig.address,
            chainId,
            achievementCredentialRegistryAbi,
            (( walletState as WalletStateTypes ).address as Address ),
            "createOrUpdateAchievement",
          );
      setBaseContractParam( params! );
    } else {
      setBaseContractParam(null);
    }
  }, [client, ( walletState as WalletStateTypes ).address]);




  useEffect(()=>{
    if( currentProfile && isSuccess  ) {
      if( data && Array.isArray( data ) ){
        getSkillsFromContractData( data )
        .then( ( skills ) => {
            setState({
              ...state,
              skills,
              initialized: true,
            })

        })
      } else {
        setState({
          ...state,
          skills: [],
          initialized: true,
        })

      } 
    }
    
  }, [currentProfile, isSuccess, data])



  return <ACRContext.Provider value={[state, actions]} >
  {children}
  </ACRContext.Provider>


}

export default AchievementCredentialRegistryProvider;

export const useCourseContext = ()=> useContext(ACRContext);