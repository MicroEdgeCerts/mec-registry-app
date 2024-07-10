import React, { useState, useEffect } from 'react'
import EditIcon from "@/components/icons/EditIcon"; // Tailwind Hero Icons
import iconStyles from "@/components/icons/icon.module.scss";
import { useCourseContext } from "@/context/AchievementCredentialRegistryContext" 
import AddCourses from '@/components/AddCourse'
import Loading from '@/components/Loading'
import CredentailResult from "@/components/CredentialResult"

import { SkillItem } from '@/types'
import SkillCard from "@/components/SkillCard"
import { useTranslation } from 'next-i18next'
import { AddCredentialDialog } from '@/components/AddCredential'
import { RecipientProfileFormType, CredentialCertificateFormType} from '@/types'
import { addCredential } from '@/services/CredentialService'
import { toast } from "react-toastify";

const Courses =  ()=> {
  const [ skills, setSkills] = useState<SkillItem[]>([]);
  const [ hasSkills, setHasSkills] = useState<boolean>(false);
  const [ isEditing, setIsEditing] = useState<boolean>(false);
  const [ currentSkill, setCurrentSkill] = useState<SkillItem|null>(null);
  const [ state ] = useCourseContext();
  const { t } = useTranslation('common');
  const [ addCredentialDialogOpen, setAddCredentialDialogOpen ] = useState( false )
  const [ newCredentialResult, setNewCredentialResult ] = useState<any|null>(null)


  const onAddCredential = ( skillItem: SkillItem) => {
    setCurrentSkill( skillItem )
    setAddCredentialDialogOpen( true )
  }
  const onAddCredentialClose = ()=> {
    setAddCredentialDialogOpen( false )
  }

  const onAddCredentialSubmit = async ( profile: RecipientProfileFormType, certificate: CredentialCertificateFormType, privateKey: string )=> {
    const promise = addCredential( profile, certificate, privateKey );
    toast.promise(promise, {
          pending: "Registering Profile",
          success: "Profile updated",
          error: "Registering failed",
        });
    const res = await promise;
    setNewCredentialResult( res );

  }

  const onCloseNewCredential = async ()=> {
    setNewCredentialResult( null )
  }

  useEffect(() => {
    if( ( state.skills || ( state.skills || [] ) as Array<SkillItem> ).length > 0 ) {
      setSkills( state.skills )
      setHasSkills( true )
    } else {
      setSkills([])
      setHasSkills(false)
    }
  }, [ state.skills]);


  if( !state.initialized ){
    return <Loading />
  } 

  if ( state.currentProfile === null ){
        return <></>
  } 

  if ( skills.length == 0 ) {
    return <AddCourses isSimple={false} />
  }

  return <>
   { !hasSkills && 
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Contract</h1>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`${iconStyles.icon}`}
      >
        <EditIcon strokeColor={"#64748b"} className="h-6 w-6 text-gray-500" />
      </button>
    </div>
  }

  {hasSkills && 
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <h1 className="text-3xl inline-block font-bold mr-4">{t("skillCard.listTitle", "Skills/Achievement")}</h1>
        <AddCourses isSimple={true} />
      </div>
      <div className="flex flex-wrap gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="flex-grow sm:flex-grow-0 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <SkillCard skill={skill} onAddCredential={( _skill: SkillItem )=> onAddCredential(_skill )}/>
          </div>
        ))}
      </div>
      <AddCredentialDialog open={addCredentialDialogOpen} onClose={onAddCredentialClose} onSubmit={onAddCredentialSubmit} />
    </div>
  }
  { newCredentialResult && <CredentailResult result={newCredentialResult} onClose={onCloseNewCredential}/>}
  </>


}

export default React.memo(Courses)