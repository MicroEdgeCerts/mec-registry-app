// pages/profile.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import EditIcon from "@/components/icons/EditIcon"; // Tailwind Hero Icons
import iconStyles from "@/components/icons/icon.module.scss";
import { useIssuerProfileContext } from "@/context/ProfileContext";
import ProfileSelect from "@/components/ProfileSelect"
import Loading from "@/components/Loading";
import AddIssuer from "@/components/AddIssuer";
import { Address } from 'viem'
import type {
  Profile as ProfileSchemaType,
  ProfileContract,
  ProfileRegistryCreateRequest,
  LocalizedString
} from "@/types";
import { maxProfileSizeBytes, maxSizeMB } from "@/config";
import { useWalletContext, type WalletStateTypes } from "@/context/WalletWrapper";
import { createMetaFile } from "@/utils/ipfsService";
import { toast } from "react-toastify";
import { getLocaledString } from '@/context/LocalizedContext'
type ProfileTypeDict = { [ key: string]: any }
interface ProfileType extends ProfileTypeDict {
  name_en: string;
  name_ja: string;
  url: string;
  telephone: string;
  email: string;
  description_en: string;
  description_ja: string;
  image: File | string | null;
}

const defaultProfileData = {
    name_en: "",
    name_ja: "",
    url: "",
    telephone: "",
    email: "",
    description_en: "",
    description_ja: "",
    image: null,
  }
export default function Profile() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [contractState, contractAction] = useIssuerProfileContext();
  const [walletState] = useWalletContext();
  const { address, walletClient } = ( walletState  as WalletStateTypes ) 
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isProfileAvailable, setIsProfileAvailable] = useState(true);

  let profileFieldErrors: Record<string, string> = {};
  const [profileList, setProfileList] = useState<ProfileContract[]>([]);
  const [currentProfile, setCurrentProfile] = useState<ProfileContract|null>(null);
  const [profile, setProfile] = useState<ProfileType>( defaultProfileData );

  const required_fields = ["url", "name_en"];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const isValid = (): boolean => {
    let _isValid = true;
    profileFieldErrors = {};
    Object.keys(profile).forEach((key: string ) => {
      const required = required_fields.indexOf(key) >= 0;
      const hasError = required && isEmpty(profile[ key as keyof ProfileTypeDict ] as string | null);
      if (hasError) {
        profileFieldErrors[`${key}`] = "This field is required";
        _isValid = false;
      }
    });
    return _isValid;
  };

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
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const setFormDataFromMeta = (res: ProfileContract) => {
    const profileData = res.data as ProfileSchemaType;
    setProfile({
      name_en: profileData.name,
      name_ja: getLocaledString( profileData.name_extended || {} as LocalizedString, "ja-JP"),
      url: profileData.url || "",
      telephone: profileData.telephone || "",
      email: profileData.email || "",
      description_en: profileData.description || "",
      description_ja: getLocaledString(profileData.description_extended || {} as LocalizedString, "ja-JP"),
      image: profileData.image || null,
    });
  };

  const createMetadata = (): ProfileSchemaType => {
    const meta: ProfileSchemaType = {
      id: profile.url,
      type: "Issuer",
      name: profile.name_en,
      name_extended: {
        default: profile.name_en,
        localized: {
          "en-US": profile.name_en,
          "ja-JP": profile.name_ja,
        },
      },
      url: profile.url,
      telephone: profile.telephone,
      description: profile.description_en,
      description_extended: {
        default: profile.description_en,
        localized: {
          "en-US": profile.description_en,
          "ja-JP": profile.description_ja,
        },
      },
      image: imageBase64 || "",
      email: profile.email,
    };
    return meta;
  };

  const getProfileRegistryRequest = (
    url: string,
    meta: string,
  ): ProfileRegistryCreateRequest => {
    return {
      id: url,
      meta,
    };
  };

  const registerProfile =  (
    _profile: ProfileRegistryCreateRequest,
  ): Promise<string | null> => {
    return contractAction.writeProfile(_profile);
  };


  const isEmpty = (key: string | null): boolean => {
    return key === null || key.length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (walletClient) {
      if (isValid()) {
        const metaData = createMetadata();
        const res = await createMetaFile(
          metaData,
          walletClient,
          address as Address,
        );
        const profileRegistry = getProfileRegistryRequest(
          metaData.url as string,
          res,
        );
        const promise = registerProfile(profileRegistry);
        toast.promise(promise, {
          pending: "Registering Profile",
          success: "Profile updated",
          error: "Registering failed",
        });

        promise.then(() => {
          contractAction.getProfile();
        });

        setIsEditing(false);
      }
    }
  };

  const onCreateIssuer = ()=> {
    setProfile( defaultProfileData )
    setIsEditing(true)
  }

  const onProfileSelect = ( profile: ProfileContract | null ) => {
    setIsEditing(false)
    contractAction.setCurrentProfile(profile);
  }

  useEffect(() => {
    // when initialized, get Profile
    if (address) {
      contractAction.getProfile();
    }
  }, [address]);

  useEffect(() => {
    if (contractState.profileRegisted) {
      setIsProfileLoading(true);
      contractAction.getProfile();
    }
    if (contractState.profileRegisterError) {
      toast.error(
        `There was an error writing contract: ${contractState.profileRegisterError}`,
      );
    }
  }, [contractState.profileRegisted, contractState.profileRegisterError]);

  useEffect(() => {
    if (
      isProfileLoading === true &&
      contractState.profileInitialized === true
    ) {
      setIsProfileLoading(false);
      let profileAvailable = contractState.profiles.length > 0;
      setIsProfileAvailable(profileAvailable);
      if (profileAvailable) {
        setProfileList(  contractState.profiles  );
        const initialProfile = contractState.profiles[0];
        contractAction.setCurrentProfile(initialProfile);
      }
    }
  }, [contractState.profileReadPending, contractState.profileInitialized, contractState.profiles]);

  useEffect(() => {
    if( contractState.currentProfile ) {
      setFormDataFromMeta(contractState.currentProfile);
      console.info(`#YF contractState.currentProfile = ${contractState.currentProfile.id} `)
    }
    setCurrentProfile(contractState.currentProfile );
  }, [contractState.currentProfile]);
  if (isProfileLoading) {
    return <Loading />;
  }

  if (!isProfileAvailable && !isEditing) {
    return <AddIssuer onClick={ onCreateIssuer } />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`${iconStyles.icon}`}
        >
          <EditIcon strokeColor={"#64748b"} className="h-6 w-6 text-gray-500" />
        </button>    
        <ProfileSelect selectedProfile={currentProfile} profiles={ profileList} onCreate={onCreateIssuer} onSelect={ onProfileSelect } />
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          {Object.keys(profile).map((key) => {
            if (key !== "image") {
              const required = required_fields.indexOf(key) >= 0;
              const emptyError =
                (profileFieldErrors[`${key}`] || null) !== null;
              return (
                <div key={key}>
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {key.replace("_", " ")}{" "}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={profile[ key as keyof ProfileTypeDict ] }
                    onChange={handleChange}
                    required={required}
                    className={`mt-1 block w-full p-2 border 
                  ${emptyError ? "border-red-500" : "border-gray-300"} 
                  rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500`}
                  />
                  {emptyError && (
                    <p className="mt-2 text-sm text-red-600">
                      {profileFieldErrors[`${key}`]}
                    </p>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
          <div>
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
                src={imageBase64}
                alt="Profile"
                className="max-w-full h-auto"
                style={{
                  maxHeight: "200px",
                  maxWidth: "200px",
                  border: "1px solid #DDDDDD",
                }}
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      ) : (
        <div>
          {/* View fields */}
          {Object.keys(profile).map((key) =>
            key !== "image" ? (
              <div key={key}>
                <p className="block text-sm font-medium text-gray-700">
                  {key.replace("_", " ")}:
                </p>
                <p className="mt-1 block w-full rounded-md p-2 pl-4">
                  {profile[key as keyof ProfileTypeDict]}
                </p>
              </div>
            ) : null,
          )}
          {profile.image && (
            <div>
              <p className="block text-sm font-medium text-gray-700">
                Profile Image:
              </p>
              <img
                src={profile.image as string}
                alt="Profile"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                style={{
                  maxHeight: "200px",
                  maxWidth: "200px",
                  border: "1px solid #DDDDDD",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
