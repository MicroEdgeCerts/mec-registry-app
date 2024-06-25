// pages/profile.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import EditIcon from "@/components/icons/EditIcon"; // Tailwind Hero Icons
import iconStyles from "@/components/icons/icon.module.scss";
import { useIssuerProfileContext } from "@/context/ProfileContext";
import Loading from "@/components/Loading";
import AddIssuer from "@/components/AddIssuer";
import type {
  Profile as ProfileSchemaType,
  ProfileRegistryDataType,
  LocalizedString,
  ProfileContract,
  ProfileRegistryCreateRequest,
} from "@/types";
import { maxProfileSizeBytes, maxSizeMB } from "@/config";
import { useWalletContext } from "@/context/WalletWrapper";
import { createMetaFile } from "@/utils/ipfsService";
import { toast } from "react-toastify";

interface ProfileType {
  name_en: string;
  name_ja: string;
  url: string;
  telephone: string;
  email: string;
  description_en: string;
  description_ja: string;
  image: File | string | null;
}

export default function Profile() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [contractState, contractAction] = useIssuerProfileContext();
  const [{ address }] = useWalletContext();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isProfileAvailable, setIsProfileAvailable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  let profileFieldErrors: Record<string, string> = {};
  const [currentProfile, setCurrentProfile] =
    useState<ProfileRegistryDataType>();
  const [profile, setProfile] = useState<ProfileType>({
    name_en: "",
    name_ja: "",
    url: "",
    telephone: "",
    email: "",
    description_en: "",
    description_ja: "",
    image: null,
  });

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
    Object.keys(profile).forEach((key: keyof ProfileType) => {
      const required = required_fields.indexOf(key) >= 0;
      const hasError = required && isEmpty(profile[key] as string | null);
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
  const getLocalString = (
    field: LocalizedString | undefined,
    locale: string,
  ): string => {
    return (field.localizedStrings || {})[locale] || ("" as string);
  };

  const setFormDataFromMeta = (res: ProfileContract) => {
    const profileData = res.data as ProfileSchemaType;
    setProfile({
      name_en: profileData.name,
      name_ja: getLocalString(profileData.name_extended, "ja-JP"),
      url: profileData.url || "",
      telephone: profileData.telephone || "",
      email: profileData.email || "",
      description_en: profileData.description || "",
      description_ja: getLocalString(profileData.description_extended, "ja-JP"),
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
    address: string,
    meta: string,
  ): ProfileRegistryCreateRequest => {
    return {
      id: url,
      meta,
    };
  };

  const registerProfile = async (
    _profile: ProfileRegistryCreateRequest,
  ): Promise<string | null> => {
    return contractAction.writeProfile(_profile);
  };

  const getProfileByTokenId = (tokenId: string): Promise<IssuerData | null> => {
    return contractAction.getIssuersByTokenId(tokenId);
  };

  const isEmpty = (key: string | null): boolean => {
    return key === null || key.length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contractState.client) {
      setIsDirty(true);
      if (isValid()) {
        const metaData = createMetadata();
        const res = await createMetaFile(
          metaData,
          contractState.client,
          address,
        );
        const profileRegistry = getProfileRegistryRequest(
          metaData.url as string,
          address,
          res,
        );
        const promise = registerProfile(profileRegistry);
        toast.promise(promise, {
          pending: "Registering Profile",
          success: "Profile updated",
          error: "Registering failed",
        });
        promise.then((res) => {
          contractAction.getProfile();

        });

        setIsEditing(false);
      }
      setIsDirty(false);
    } else {
      setIsDirty(false);
      throw new Error("No client");
    }
  };

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
        const res = contractState.profiles[0];
        setFormDataFromMeta(res);
      }
    }
  }, [contractState.profileReadPending, contractState.profileInitialized]);

  if (isProfileLoading) {
    return <Loading />;
  }

  if (!isProfileAvailable && !isEditing) {
    return <AddIssuer onClick={() => setIsEditing(true)} />;
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
                    value={profile[key as keyof Profile] as any}
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
                  {profile[key as keyof Profile]}
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
