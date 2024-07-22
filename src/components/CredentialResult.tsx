import React from 'react'
import { CredentialResult as CredentailResultType } from "@/types"
import QRCode from "react-qr-code";

type CredentialResultPropType = {
  result: CredentailResultType
  onClose: ()=> void
  imageURL: string | null
  isOpen: boolean
}


const imagePercent = 10;
const CredentialResult: React.FC<CredentialResultPropType> = ( {isOpen, result, imageURL, onClose} ) => {
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
        <div className="mt-4 p-2">
          <div className="relative">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%", position: "absolute", top: "0px", left: "0px"}}
              value={result.jws as string}
              viewBox={`0 0 256 256`}
            />
            { imageURL &&  <div style={ {position:'absolute', top: `{50-(imagePercent/2)}%`, 
               left: `{50-(imagePercent/2)}%`, 
               width: `{imagePercent}%`, 
               height: `{imagePercent}%`,
               backgroundImage: imageURL,
               backgroundSize: "fill",
               backgroundPosition: "center center",
             }} /> }
           </div>
        </div>
      </div>
    </div>
  );
}

export default CredentialResult;