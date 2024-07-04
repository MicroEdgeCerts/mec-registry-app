import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import {
  withSession,
  addressCheckMiddleware,
  MESSAGE_SESSION,
  pinataApiKey,
  pinataSecretApiKey,
  pinataURI,
  issuerContractAddress,
} from "./lib/utils";

import { getIssuer, getAchievementCredential } from './lib/contract'
import { generatejws } from './lib/jws'
import { generate_badge_credential } from './lib/badge_generator'

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === "POST") {
      try {
        const { body: { address, issuer_id, skill_id, profile } } = req;
        //1. Check Address is correct sender
        await addressCheckMiddleware(req, res);
        
        console.info(`address: ${address}`)
        console.info(`issuerId: ${issuer_id}`)
        console.info(`issuerId: ${skill_id}`)
        const issuer =  await getIssuer( address, issuer_id )
        const achievementCredential =  await getAchievementCredential( address, skill_id )
        const credential =  generate_badge_credential( profile, achievementCredential, issuer )
        const jws =  generatejws( credential )
        return res.status(200).send(jws);
      } catch (e) {
        console.info(`Error1 : ${e}`);
        return res.status(422).send({ message: "Cannot create JSON" });
      }
    } else if (req.method === "GET") {
      try {
        const message = { issuerContractAddress, id: uuidv4() };
        req.session.set(MESSAGE_SESSION, message);
        await req.session.save();

        res.json(message);
      } catch (e) {
        console.info(`Error2 : ${e}`);
        return res.status(422).send({ message: "Cannot generate a message!" });
      }
    } else {
      return res.status(200).json({ message: "Invalid api route" });
    }
  },
);
