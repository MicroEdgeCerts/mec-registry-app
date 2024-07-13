import {post} from '@/services/apiService'
import { SkillItem, RecipientProfileFormType, CredentialCertificateFormType,
CredentialResult } from '@/types'


const getBadgeData = ( skillItem: SkillItem,   profile: RecipientProfileFormType, certificate: CredentialCertificateFormType, privateKey: string ) => {
    console.info(`currentSkill = ${skillItem.id} profile: ${profile.id}, certificate: ${certificate.id} ${privateKey.substring(0,1)} `);
  }

export const addCredential = async ( skillItem: SkillItem,  profile: RecipientProfileFormType,  certificate: CredentialCertificateFormType, privateKey: string ) : Promise<CredentialResult> => {
  const data = getBadgeData( skillItem,  profile, certificate, privateKey );
  const res = await post('/issue_credential', {
    data: JSON.stringify( data )
  })
  return {res}
}