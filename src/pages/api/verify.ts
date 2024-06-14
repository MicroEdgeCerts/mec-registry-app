import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession, addressCheckMiddleware, MESSAGE_SESSION,
        pinataApiKey, pinataSecretApiKey, pinataURI, contractAddress } from "./utils";


const getFileName = ( type: string | string[], id: string ): string => {
  return  `${[type].flat().join('-')}-${id}.json`
}

async function unpinFile(hashToUnpin) {
  const url = `https://api.pinata.cloud/pinning/unpin/${hashToUnpin}`;
  const response = await axios.delete(url, {
    headers: {
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  return response.data;
}


export default withSession(async (req: NextApiRequest & {session: Session}, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { body: item } = req;
      await addressCheckMiddleware( req, res );
      const url = `${pinataURI}/pinning/pinJSONToIPFS`
      console.info(`url = ${url}`)
      const data = {
        pinataMetadata: {
          name: getFileName(item.type, item.id)
        },
        pinataContent: item
      }
      const jsonRes = await axios.post(url, data, 
            {
              headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
              }
            });
      return res.status(200).send(jsonRes.data);
    } catch (e ) {
      console.info(`Error1 : ${e}` )
      return res.status(422).send({message: "Cannot create JSON"});
    } 
  } else if (req.method === "GET") {
    try {
      const message = { contractAddress, id: uuidv4() };
      req.session.set(MESSAGE_SESSION, message);
      await req.session.save();

      res.json(message);
    } catch ( e ) {
      console.info(`Error2 : ${e}` )
      return res.status(422).send({message: "Cannot generate a message!"});
    }   
  } else {
    return res.status(200).json({message: "Invalid api route"});
  }
})