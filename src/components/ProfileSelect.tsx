import React, { useState, useEffect } from 'react';
import type {
  ProfileContract,
} from "@/types";

interface ProfileSelectProps {
  profiles: ProfileContract[];
  selectedProfile: ProfileContract | null;
  onCreate: () => void;
  onSelect: (profile: ProfileContract) => void;
}

const ProfileSelect: React.FC<ProfileSelectProps> = ({ profiles, selectedProfile, onCreate, onSelect }) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>( selectedProfile != null ? selectedProfile.id : "" );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'create-new') {
      onCreate();
    } else {
      setSelectedProfileId(value);
      const index =  profiles.findIndex((item) => item.id == value )
      if( index >= 0 ) {
        onSelect(profiles[index])
      }
    }
  };

  useEffect(()=> {
    setSelectedProfileId( selectedProfile != null ? selectedProfile.id : "create-new" )
  }, [ selectedProfile ])

  return (
    <div className="w-full max-w-xs mx-auto">
      <label htmlFor="profile-select" className="block text-sm font-medium text-gray-700">
        Select Profile
      </label>
      <select
        id="profile-select"
        value={  selectedProfileId  || "" }
        onChange={handleSelectChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="" disabled>
          -- Select a profile --
        </option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.data.name}
          </option>
        ))}
        <option value="create-new">Create New</option>
      </select>
    </div>
  );
};

export default ProfileSelect;
