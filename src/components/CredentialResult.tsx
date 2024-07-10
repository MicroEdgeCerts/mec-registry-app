import React from 'react'
import { CredentialResult as CredentailResultType } from "@/types"

type CredentialResultPropType = {
  result: CredentailResultType
}

const CredentialResult: React.FC<CredentialResultPropType> = ( {result} ) => {
  return <div>ResultGenerated</div>
}

export default CredentialResult;