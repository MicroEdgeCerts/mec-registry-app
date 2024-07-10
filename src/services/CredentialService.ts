import {post} from '@/services/apiService'


const getBadgeData = ( profile: RecipientProfileFormType, certificate: CredentialCertificateFormType, privateKey: string ) => {
    console.info(`currentSkill = ${(currentSkill || {}).id} profile: ${profile.id}, certificate: ${certificate.id} ${privateKey.substring(0,1)} `);
  }

export const addCredential = async ( profile: RecipientProfileFormType, certificate: CredentialCertificateFormType, privateKey: string ) : CredentialResult => {
  const data = getBadgeData( profile, certificate, privateKey );
  const res = post('/issue_credential', {
    body: JSON.stringify( data )
  })
}