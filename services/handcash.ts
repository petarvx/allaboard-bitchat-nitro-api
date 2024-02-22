import { HandCashConnect } from "@handcash/handcash-connect";

export const handCashConnect = new HandCashConnect({
  appId: process.env.HANDCASH_APP_ID || "",
  appSecret: process.env.HANDCASH_APP_SECRET || "",
});
