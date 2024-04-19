import type { Request, Response } from "express";
import { handCashConnect } from "../services/handcash";
const ECIES = require("bsv/ecies");
const bsv = require("bsv");

export async function hcEncrypt(req: Request, res: Response) {
  if (!req.body.authToken) {
    return res.status(401).send();
  }

  if (!req.body.data) {
    return res.status(400).send();
  }
  const account = handCashConnect.getAccountFromAuthToken(req.body.authToken);
  const { privateKey } = await account.profile.getEncryptionKeypair();

  // encrypt
  const ecies = new ECIES();
  const publicKey = bsv.PrivateKey.fromWIF(privateKey).publicKey.toString();
  ecies.publicKey(publicKey);
  const b64encrypted = ecies
    .encrypt(JSON.stringify(req.body.data))
    .toString("base64");

  return res.status(200).send({ encryptedData: b64encrypted });
}
