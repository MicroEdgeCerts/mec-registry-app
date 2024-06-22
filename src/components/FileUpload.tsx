import React, { useState } from 'react'

type FileUploadType = {
  image: string | null;
  onChange: ( fileData: string | null ) => void;
  maxSizeMB: number;
}

const FileUpload: React.FC<FileUploadType> = ({ image, onChange, maxSizeMB })=> {
  const [imageBase64, setImageBase64] = useState<string | null>(image);
  const [imageError, setImageError] = useState<string | null>(null);
  const maxProfileSizeBytes = maxSizeMB * 1024 * 1024;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

      if (file) {
        if (file.size > maxProfileSizeBytes) {
          setImageError(`Image should be less than ${maxSizeMB} MB`);
          setImageBase64(null);
          return;
        }

        setImageError(null); // Clear any previous error
        const reader = new FileReader();
        reader.onloadend = () => {
          const res = reader.result as string;
          setImageBase64(res as string);
          onChange( res );
        };
        reader.readAsDataURL(file);
      }
    }

    const onCancel = ()=> {
      if( imageBase64 ) {
        setImageBase64(null)
        onChange(null)
      }
    }


    return <><div>
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {imageError && <p className="text-red-500">{imageError}</p>}
            </div>
            {imageBase64 && (
              <div className="mt-4">
                <img
                  src={imageBase64 as string}
                  alt="Profile"
                  className="max-w-full h-auto"
                  style={{
                    maxHeight: "200px",
                    maxWidth: "200px",
                    border: "1px solid #DDDDDD",
                  }}
                />
              <a onClick={onCancel} className="text-secondary hover:text-secondary-dark">
                Cancel
              </a>
            </div>
            )}
          </>
}

export default FileUpload;