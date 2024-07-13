import React from 'react'
import { CredentialResult as CredentailResultType } from "@/types"

type CredentialResultPropType = {
  result: CredentailResultType
  onClose: ()=> void
  isOpen: boolean
}

const CredentialResult: React.FC<CredentialResultPropType> = ( {isOpen, result, onClose} ) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <button
          className="text-red-500 float-right"
          onClick={onClose}
        >
          Close
        </button>
        <div className="mt-4">
          {JSON.stringify(result)}
        </div>
      </div>
    </div>
  );
}

export default CredentialResult;