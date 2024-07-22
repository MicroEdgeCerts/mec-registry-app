import React, { useState } from "react";
import AddButton from "@/components/AddButton";
import AddCourseDialog from './AddCourseDialog'
import { useCourseContext } from "@/context/AchievementCredentialRegistryContext";
import { useWalletContext, type WalletStateTypes } from "@/context/WalletWrapper"
import { AchievementCredeintialFormType, AchievementCredeintialMetaItem } from '@/types'
import { toast } from "react-toastify";
import { createMetaFile } from "@/utils/ipfsService";
import type { Address } from 'viem'
import { getJWK } from '@/utils/jwsUtil'

type AddOrUpdateCoursesPropType = {
  isSimple: boolean
}

const AddOrUpdateCourses: React.FC<AddOrUpdateCoursesPropType> = ({ isSimple }) => {
  const [ open, setOpen ] = useState<boolean>( false);
  const [{ walletClient, address }] = useWalletContext() as [ WalletStateTypes ]
  const [ _, courseAction ] = useCourseContext();

  const onClose = ()=>{
    setOpen( false );
  }

  const onClick = ()=> {
    setOpen( true );
  }

  const uploadMeta = async ( metaData: AchievementCredeintialMetaItem ): Promise<string> => {
      const meta = await createMetaFile(
        metaData,
        walletClient,
        address as Address,
      );
      return meta
  }

  const setFormDataToMeta = ( formData: AchievementCredeintialFormType ) : AchievementCredeintialMetaItem => {
    return {
      image: formData.image,
      name: formData.name_en,
      achievement_type: formData.achievement_type,
      name_extended: {
        default: formData.name_en,
        localized: {
          'ja-JP': formData.name_ja,
          'en-US': formData.name_en
        }
      },
      description: formData.description_en,
      description_extended: {
        default: formData.description_en,
        localized: {
          'ja-JP': formData.description_ja,
          'en-US': formData.description_en
        }
      },
      url: formData.url
    }
  }


  const onAddCourse =  async (course: AchievementCredeintialFormType) => {
    
    try {
      /*--- Uploading meta data to IPFS -----------*/
      const metaData =  setFormDataToMeta(course)
      const uploadMetaPromise = uploadMeta( metaData )
      toast.promise( uploadMetaPromise, {
        pending: "Uploading Course Discription",
        success: "Course Description Uploaded",
        error: "Course Description Upload Fail"
      })
      const meta = await uploadMetaPromise
      console.info("#YF 1 created IPFS : " + JSON.stringify( meta ) )
      let currentCourse = course;
      const keyWait = currentCourse.key_sets.map( ( public_key ) => getJWK( public_key ) );
      let keySets = await Promise.all(keyWait);
      const key_sets = keySets.map( ( item )=> JSON.stringify( item  ) );
      /*---- Include Meta to contract -------------*/
      const res = courseAction.writeSkill({
        ...course,
        key_sets,
        meta
      });
      console.info("#YF 3 Contract Created : " + res )



    } catch ( err ) {
      console.error("#YF 4 Contract Creation Error: " + err )

    }
  }
  return (
    <>
    <AddCourseDialog open={open} onClose={onClose} onAddCourse={onAddCourse} />
    { isSimple ? <button className="text-secondary underline hover:text-secondary-hover" onClick={onClick} >Add More Course</button> :
    <div className="flex items-center space-x-4">
      <AddButton width={100} height={100} onClick={onClick} />
      <label className="text-lg font-medium">Add Courses</label>
    </div> }
    </>
  );
};

export default AddOrUpdateCourses;
