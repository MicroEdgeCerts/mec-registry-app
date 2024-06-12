// pages/profile.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import EditIcon  from '@/components/icons/EditIcon'; // Tailwind Hero Icons
import iconStyles from "@/components/icons/icon.module.scss"
import { useContractContext } from '@/context/ContractContext'
import Loading from '@/components/Loading'
interface Profile {
  name_en: string;
  name_ja: string;
  address_en: string;
  address_ja: string;
  telephone: string;
  email: string;
  description_en: string;
  description_ja: string;
  image: File | null;
}

export default function Profile() {
  const [ isEditing, setIsEditing] = useState<boolean>(false);
  const [ contractState, contractAction ] = useContractContext();
  const [ isProfileLoading, setIsProfileLoading ] = useState(true)
  const [ profile, setProfile ] = useState<Profile>( {
    name_en: '',
    name_ja: '',
    address_en: '',
    address_ja: '',
    telephone: '',
    email: '',
    description_en: '',
    description_ja: '',
    image: null,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfile({ ...profile, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log(profile);
    setIsEditing(false);
  };

  useEffect(()=> {
    contractAction.readIssuer();
  }, [])

  useEffect(()=>{
    console.info(`contract state data : ${contractState.issuerReadData }`)
  }, [contractState.issuerReadData ])

  // if( isProfileLoading ) {

  //   return <Loading />
  // }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button onClick={() => setIsEditing(!isEditing)} className={`${iconStyles.icon}` }>
          <EditIcon strokeColor={"#64748b"} className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          {Object.keys(profile).map((key) => (
            key !== 'image' ? (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{key.replace('_', ' ')}</label>
                <input
                  type="text"
                  name={key}
                  value={profile[key as keyof Profile] as any}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            ) : null
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Profile
          </button>
        </form>
      ) : (
        <div>
          {/* View fields */}
          {Object.keys(profile).map((key) => (
            key !== 'image' ? (
              <div key={key}>
                <p className="block text-sm font-medium text-gray-700">{key.replace('_', ' ')}:</p>
                <p className="mt-1 block w-full border border-gray-300 rounded-md p-2">{profile[key as keyof Profile]}</p>
              </div>
            ) : null
          ))}
          {profile.image && (
            <div>
              <p className="block text-sm font-medium text-gray-700">Profile Image:</p>
              <img src={URL.createObjectURL(profile.image)} alt="Profile" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
