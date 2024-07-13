import { ethers } from "ethers";
import { PROVIDER_URL,
          ISSUER_REGISTRY_CONTRACT_ADDRESS, 
          ACHIEVEMENT_CREDENTIAL_CONTRACT_ADDRESS } from '@/config'
import { issuerRegistryAbi } from '@/abis/MEC'
import { achievementCredentialRegistryAbi }  from '@/abis/MEC'

const provider = new ethers.JsonRpcProvider(PROVIDER_URL); // Replace with your provider URL

export const getIssuer =  async ( address: string , profile_id: string  ) => {
  try {
    const contract = new ethers.Contract(ISSUER_REGISTRY_CONTRACT_ADDRESS, issuerRegistryAbi, provider);

    // Fetch the issuer data by ID
    const issuerData = await contract.getIssuerDataById(profile_id);

    // Validate if the owner matches the provided address
    if (issuerData.owner.toLowerCase() !== address.toLowerCase()) {
      throw new Error('Address does not match the issuer owner');
    }

    return issuerData;
  } catch ( error ) {
    console.error('Error fetching issuer data:', error);
    throw new Error(`Error fetching issuer data: ${error}`);
  }
}

export const getAchievementCredential = async ( address: string, skill_id: string ) => {
  try {
    // Initialize the contract
    const contract = new ethers.Contract(ACHIEVEMENT_CREDENTIAL_CONTRACT_ADDRESS, achievementCredentialRegistryAbi, provider);

    // Fetch the achievement data by ID
    const achievementData = await contract.getAchievement(skill_id);

    // Validate if the owner matches the provided address
    if (achievementData.owner_id.toLowerCase() !== address.toLowerCase()) {
      throw new Error('Address does not match the achievement owner');
    }

    return achievementData;
  } catch (error) {
    console.error('Error fetching achievement data:', error);
    throw new Error(`Error fetching achievement data: ${error}`);
  }
}
