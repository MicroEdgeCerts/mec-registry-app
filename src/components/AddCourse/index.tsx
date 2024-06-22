import React, { useState } from "react";
import AddButton from "@/components/AddButton";
import AddCourseDialog from './AddCourseDialog'
import { useContractContext } from "@/context/ContractContext";
import { useWalletContext } from "@/context/WalletWrapper"
import { AchievementCredeintialFormType, AchievementCredeintial } from '@/types'
import { toast } from "react-toastify";
import { createMetaFile } from "@/utils/ipfsService";

const AddOrUpdateCourses = () => {
  const [ open, setOpen ] = useState<boolean>( false);
  const [{ address }] = useWalletContext();
  const [contractState, contractAction] = useContractContext();

  const onClose = ()=>{
    setOpen( false );
  }

  const onClick = ()=> {
    setOpen( true );
  }

  const uploadMeta = async ( metaData: AchievementCredeintial ): Promise<string> => {
      const meta = await createMetaFile(
        metaData,
        contractState.client!,
        address,
      );
      return meta
  }

  const setFormDataToMeta = ( formData: AchievementCredeintialFormType ) : AchievementCredeintial => {
    return {
      image: formData.image,
      name: formData.name_en,
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

      const metaData =  setFormDataToMeta(course)
      const uploadMetaPromise = uploadMeta( metaData )
      toast.promise( uploadMetaPromise, {
        pending: "Uploading Course Discription",
        success: "Course Description Uploaded",
        error: "Course Description Upload Fail"
      })

    } catch ( err ) {

    }
  }
  return (
    <>
    <AddCourseDialog open={open} onClose={onClose} onAddCourse={onAddCourse} />
    <div className="flex items-center space-x-4">
      <AddButton width={100} height={100} onClick={onClick} />
      <label className="text-lg font-medium">Add Courses</label>
    </div>
    </>
  );
};

export default AddOrUpdateCourses;
