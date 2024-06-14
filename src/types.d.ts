/* Define global types */
/* eslint  @typescript-eslint/no-explicit-any: off */
import type { Address } from 'viem'

interface Window {
    ethereum?: any; // Define ethereum property on Window interface
}

// LocalizedString type
export interface LocalizedString {
  defaultString: string;
  localizedStrings?: {
    [locale: string]: string;
  };
}


export interface ProfileRegistryCreateRequest {
  id: string;
  address: string;
  meta: string;
}

// Profile interface
export interface Profile {
  id: string; // URI
  type: string | string[]; // JSON-LD Type, could be a string or an array of strings
  name: string; // Referenced LocalizedString type
  name_extended?: LocalizedString;
  url?: string; // URI
  telephone?: string;
  description?: string | null; // Referenced LocalizedString type
  description_extended?: LocalizedString;
  image?: string; // ImageUri, a string that matches the data URI pattern or a URI
  email?: string;
}

export type MetaItem = Profile;

export interface MetaDataRequest
{
  hash: string | null;
  address: Address;
  signature: string;
  item: Profile;
  id: string;

}