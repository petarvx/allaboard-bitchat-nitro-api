import type { Request, Response } from "express";
import { handCashConnect } from "../services/handcash";

export async function hcSend(req: Request, res: Response) {
  let hexArray = req.body.hexArray;
  let authToken = req.body.authToken;
  const account = handCashConnect.getAccountFromAuthToken(authToken);
  const description = (
    req.body.description ||
    `Message ${
      req.body.channel
        ? "in #" + req.body.channel
        : req.body.userId
        ? "to @" + req.body.userId
        : "in global chat"
    }`
  ).slice(0, 25);

  const payment = {
    description,
    appAction: "data",
    attachment: { format: "hexArray", value: hexArray },
  } as any;

  if (req.body.to && req.body.currency && req.body.amount) {
    payment.payments = [
      {
        to: req.body.to,
        currencyCode: req.body.currency,
        amount: req.body.amount,
      },
    ];
  }
  try {
    const paymentResult = await account.wallet.pay(payment);
    console.log("Payment complete:", { paymentResult });
    return res.send({ paymentResult });
  } catch (e) {
    const status = (e as any).httpStatusCode ?? 500;
    return res.status(status).send(e);
  }
}
