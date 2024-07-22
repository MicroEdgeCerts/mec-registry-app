/* Define global types */
import type { Address } from "viem";

interface Window {
  ethereum?: any; // Define ethereum property on Window interface
}

// LocalizedString type
export interface LocalizedString {
  default: string;
  localized?: {
    [locale: string]: string;
  };
}

export interface ProfileRegistryCreateRequest {
  id: string;
  meta: string;
}

export interface ProfileRegistryDataType {
  id: string;
  owner: string;
  meta: string;
  tokenId: number;
}

// Profile interface
export interface Profile {
  id: string; // URI
  type: string | string[]; // JSON-LD Type, could be a string or an array of strings
  name: string; // Referenced LocalizedString type
  name_extended?: LocalizedString;
  url: string; // URI
  telephone?: string;
  description?: string | null; // Referenced LocalizedString type
  description_extended?: LocalizedString;
  image?: string; // ImageUri, a string that matches the data URI pattern or a URI
  email?: string;
}

export interface ProfileContract {
  id: string /* id */;
  owner: string /* contract address */;
  meta: string;
  tokenId: BigInt | number;
  data: Profile;
}

export type ProfileMetaItem = Profile;

export interface MetaDataRequest {
  hash: string | null;
  address: Address;
  signature: string;
  item: Profile;
  id: string;
}

export interface AchievementCredentialContractType  {
  id: bigint; 
  key_sets: string[]; 
  revoked_key_sets: string[]; 
  cannonical_id: string; 
  image: string; 
  meta: string; 
  profile_id: string; 
  owner_id: string;
  owner_type: number; 
}

export interface AchievementCredeintialFormType  {
  id?: bigint; 
  key_sets: string[]; 
  revoked_key_sets: string[]; 
  achievement_type: string;
  cannonical_id: string; 
  image?: string; 
  profile_id: string; 
  name_en: string
  name_ja: string
  description_en: string
  description_ja: string
  url: string
}

export interface AchievementCredeintialRequestType extends AchievementCredeintialFormType {
  meta: string
}

export interface AchievementCredeintialMetaItem {
  image?: string;
  name: string;
  achievement_type: string;
  name_extended: LocalizedString
  description: String
  description_extended: LocalizedString
  url: string
}

export type SkillItem = AchievementCredeintialMetaItem & {
  id: number,
  owner_id: string,
  profile_id: string
}

export type BaseContractParamType = {
  address: Address;
  account: Address;
  abi: typeof issuerRegistryAbi;
  functionName?: string
};

export type RecipientProfileFormType = {
  id: string,
  familyName: LocalizedString
  familyNamePrefix: LocalizedString
  firstName: LocalizedString
}

export type CredentialCertificateFormType = {
  id: string,
  activityStartDate: number,
  activityEndDate: number,
  validFrom?: number,  
  validTo?: number,
  criteria: string,
  awardedDate: number
}


export type CredentialResult = {
  jws: string
}