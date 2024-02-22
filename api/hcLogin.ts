import type { Request, Response } from "express";
import { handCashConnect } from "../services/handcash";

export function hcLogin(req: Request, res: Response) {
  const redirectionLoginUrl = handCashConnect.getRedirectionUrl();
  return res.redirect(redirectionLoginUrl);
}
