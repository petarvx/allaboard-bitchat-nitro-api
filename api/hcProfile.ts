import type { Request, Response } from "express";
import { handCashConnect } from "../services/handcash";

export async function hcProfile(req: Request, res: Response) {
  try {
    if (!req?.body?.authToken) {
      return res.status(401).send();
    }

    const account = handCashConnect.getAccountFromAuthToken(req.body.authToken);

    console.log({ account });

    const currentProfile = await account.profile.getCurrentProfile();

    console.log({ currentProfile });

    const { publicProfile, privateProfile } = currentProfile;
    return res.status(200).send({ publicProfile, privateProfile });
  } catch (e) {
    console.log({ e });
    return res.status(500).send({ error: e });
  }
}
