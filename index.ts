import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { hcLogin } from "./api/hcLogin";

const port = process.env.APP_PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/hcLogin", hcLogin);

app.listen(port, () => {
  console.log(`BitChat-Nitro-Api listening on port ${port}...`);
});
