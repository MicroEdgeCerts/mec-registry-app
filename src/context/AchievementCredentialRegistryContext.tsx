/**
 * This file handles communication for the AchievementCredentialRegistry
 */


import React, { useEffect, useState, createContext, useContext } from 'react';
import { ProfileContract, AchievementCredentialContractType } from '@/types'
import { useWriteContract, useChainId, useWaitForTransaction } from 'wagmi'
import { achievementCredentialRegistryAbi as abi, 
useWriteAchievementCredentialRegistryCreateOrUpdateAchievement as writeOrUpdteContract,
achievementCredentialRegistryAddress as contractAddress,
useReadAchievementCredentialRegistryGetAchievementsByProfileId  as getCredentialByProfile } from '@/abis/MEC'
import { BigNumberish } from 'ethers'
import { getBaseContractParam } from "@/utils/contractUtil"
import {  } from '../abis/MEC'
type AchievementCredentialRegistryContextPropType = {
  profile: ProfileContract | null,
  children: React.ReactNode
}

type SkillItem = {
  id: number,
  name: string
  description_ja: string
  description_en: string

}

enum OwnerType {
  BlockChain = 0
}

type SkillDataContractRequest = {
  id?: number,
  keySets: string[],
  revokedKeySets: string[],
  cannonicalId?: string,
  validFrom: number
  validUntil: number
  image: string,
  meta: string,
  ownerType: OwnerType
}

type SkillAction = {
  getSkills: () => SkillItem[]
  writeSkill: ( skill: SkillDataContractRequest ) => void
}

type ContractType = AchievementCredentialContractType;

type ACRStateType = {
  skills: SkillItem[] 
  initialized: boolean, 
  currentProfile: ProfileContract|null
}

let defaultState = {
  skills: [],
  initialized: false,
  currentProfile: null
}
let defaultActions = {
  getSkills: ()=> [],
  writeSkill: ( skill: SkillDataContractRequest ) => {}
}



type ACRContextType = [ACRStateType, SkillAction];

const ACRContext = createContext<ACRContextType>([defaultState, defaultActions])

const AchievementCredentialRegistryProvider: React.FC<AchievementCredentialRegistryContextPropType> = ( {children, profile} ) => {
  const [ currentProfile, setCurrentProfile ] = useState<ProfileContract|null>(profile || null);
  const [ achievementId, setAchievementId] = useState<BigNumberish>(null)
  const [ state, setState ] = useState<ACRStateType>(defaultState)
  const { data, isError, isLoading, isSuccess } = getCredentialByProfile({
    args: [ currentProfile ],
  })


  // const baseParam = getBaseContractParam(
  //     contractAddress,
  //     chainId,
  //     abi,
  //     'createOrUpdateAchievement'
  //   )

  const { writeContractAsync } = writeOrUpdteContract()
  const parseContractToSkill = ( item: ContractType  ): SkillItem => {
    return {
      id: Number( item.id ) ,
      name: "Name here", 
      description_ja: "Description here",
      description_en: "Description here"
    };

  }

  const FormData = ()=> {

  }

  const writeSkill = async ( data: SkillDataContractRequest ) => {
    if( !currentProfile ) {
      throw new Error( "No Profile");
    }
    const waitHash = await writeContractAsync({
      args: [
        BigInt( data.id || 0 ),
        data.keySets || [],
        data.revokedKeySets || [],
        data.cannonicalId || '',
        BigInt( data.validFrom || 0 ),
        BigInt( data.validUntil || 0),
        data.image || '',
        data.meta || '',
        currentProfile.id,
        data.ownerType || OwnerType.BlockChain,
      ],
    })
    // await tx.wait()
    // const receipt = await tx.wait()
    // const newId = receipt.logs[0].args[0]

    

    useWaitForTransaction({
        hash: waitHash,
        onSettled(data : any, error: any) {
          if( error ) {
            return reject( error )
          }
          resolve(data);
        },
    }) 


  }

  const actions = {
    ...defaultActions,
    writeSkill
  }

  useEffect(()=>{
    if( profile ) {
      console.info("Requesting courses. ")
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
  useEffect (()=> {
  }, [ data ])





  useEffect(()=>{
    if( currentProfile && isSuccess  ) {
      console.info("read course data " + JSON.stringify( data ));
      setState({
        ...state,
        skills: [...data.map( (item) => parseContractToSkill(item) )],
        initialized: true,

      })
    }
  }, [currentProfile, data, isSuccess])



  return <ACRContext.Provider value={[state, actions]} >
  {children}
  </ACRContext.Provider>


}

export default AchievementCredentialRegistryProvider;

export const useCourseContext = ()=> useContext(ACRContext);