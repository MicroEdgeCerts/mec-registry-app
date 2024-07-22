import {post} from '@/services/apiService'
import { SkillItem, ProfileContract, RecipientProfileFormType, CredentialCertificateFormType,
CredentialResult } from '@/types'

export const getUTCDate = ( timeStamp : number | null ): string => {
  const date = timeStamp ? new Date(timeStamp) : new Date();
  return date.toISOString().split('.')[0] + 'Z';
}

const getBadgeData = ( issuer: ProfileContract, skillItem: SkillItem,   learnerProfile: RecipientProfileFormType, certificate: CredentialCertificateFormType, privateKey: string ) => {
  return {
    "@context": "https://w3id.org/openbadges/v3",
    "id": certificate.id,
    "type": skillItem.achievement_type,
    "recipient": {
      "identity": learnerProfile.id,
      "type": "id",
      "identityType": "DID"
    },
    "issuedOn": getUTCDate( certificate.awardedDate ), 
    "verification": {
      "type": "SignedBadge"
    },
    "badge": {
      "id": certificate.id,
      "type": "BadgeClass",
      "name": skillItem.name,
      "name_extended": skillItem.name_extended,
      "description": skillItem.description,
      "description_extended": skillItem.description_extended,
      "criteria": {
        "narrative": "Completed all tasks with a score of 80% or higher."
      },
      "issuer": {
        "id": issuer.id,
        "type": "Issuer",
        "name": issuer.data.name,
        "name_extended": issuer.data.name_extended,
        "url": issuer.data.url
      }
    }
  }

  console.info(`currentSkill = ${skillItem.id} profile: ${learnerProfile.id}, certificate: ${certificate.id} ${privateKey.substring(0,1)} `);
}

export const addCredential = async ( issuer: ProfileContract, skillItem: SkillItem,  profile: RecipientProfileFormType,  certificate: CredentialCertificateFormType, privatePem: string ) : Promise<CredentialResult> => {
  const badgeData = getBadgeData( issuer, skillItem,  profile, certificate, privatePem );
  const data = {
    badge: badgeData,
    private_pem: privatePem
  }
  const res = await post('registry/issue_credential', {
    data: JSON.stringify( data )
  })
  return {...res}
}