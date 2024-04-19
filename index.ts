import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { hcLogin } from "./api/hcLogin";
import { hcProfile } from "./api/hcProfile";
import { hcSend } from "./api/hcSend";
import { hcEncrypt } from "./api/hcEncrypt";
import { hcDecrypt } from "./api/hcDecrypt";

const port = process.env.APP_PORT || 8080;

const app = express();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());

app.get("/hcLogin", hcLogin);
app.use("/hcProfile", hcProfile);
app.use("/hcSend", hcSend);
app.use("/hcEncrypt", hcEncrypt);
app.use("/hcDecrypt", hcDecrypt);

app.listen(port, () => {
  console.log(`BitChat-Nitro-Api listening on port ${port}...`);
});
