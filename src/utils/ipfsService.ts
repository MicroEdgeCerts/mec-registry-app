import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { PinataRes } from "@/types/nft";
import type { UseClientReturnType } from "wagmi";
import type { Address } from "viem";
import { ProfileMetaItem, AchievementCredeintialMetaItem  } from "@/types";

const getSignedData = async (
  client: UseClientReturnType,
  issuerAddress: Address,
) => {
  if (client) {
    try {
      const messageToSign = await axios.get("/api/verify");
      const message = JSON.stringify(messageToSign.data);
      console.info(`signing message ${message}`);
      const account = issuerAddress as Address;
      const signedMessage = await (client as any).signMessage({
        message,
        account,
      });
      return signedMessage;
    } catch (e) {
      console.info(`e ${e}`);
    }
  } else {
    throw new Error("No Client");
  }
};

export const createMetaFile = async (
  metaData: ProfileMetaItem | AchievementCredeintialMetaItem,
  client: UseClientReturnType,
  address: Address,
): Promise<string> => {
  if (client) {
    const signedData = await getSignedData(client, address);
    const id = uuidv4();
    const promise = axios.post("/api/verify", {
      id,
      address,
      signature: signedData,
      item: metaData,
    });

    const res = await toast.promise(promise, {
      pending: "Uploading metadata",
      success: "Metadata uploaded",
      error: "Metadata upload error",
    });
    const data = res.data as PinataRes;
    return `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`;
  } else {
    throw new Error("client doesn't exist");
  }
};

export const getMetaFile = async <T>(url: string): Promise<T> => {
  console.info("getting metafile");
  try {
    const res = await axios.get(url);
    return res.data.item as T;
  } catch (error) {
    throw new Error(`getMetaFile Error ${error}`);
  }
};
