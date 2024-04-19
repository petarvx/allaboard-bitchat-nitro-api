import type { Request, Response } from "express";
import { handCashConnect } from "../services/handcash";
const ECIES = require("bsv/ecies");
const bsv = require("bsv");

export async function hcDecrypt(req: Request, res: Response) {
  if (!req.body.authToken) {
    return res.status(401).send();
  }

  if (!req.body.encryptedData) {
    return res.status(400).send();
  }
  try {
    const account = handCashConnect.getAccountFromAuthToken(req.body.authToken);
    // const userPermissions = await account.profile.getPermissions();
    // console.log({ userPermissions });
    const { privateKey } = await account.profile.getEncryptionKeypair();

    // decrypt identity file
    const ecies = new ECIES();
    ecies.privateKey(bsv.PrivateKey.fromString(privateKey));
    const identityDec = ecies
      .decrypt(Buffer.from(req.body.encryptedData, "base64"))
      .toString();

    return res.status(200).send(JSON.parse(identityDec));
  } catch (e: any) {
    const redirectUrl = handCashConnect.getRedirectionUrl();
    console.error({ e, redirectUrl });
    if (e.httpStatusCode) {
      res
        .sendStatus(e.httpStatusCode)
        .send({ error: e.HandCashApiError, redirectUrl });
      return;
    }
    res.status(400).send(e);
  }
}
