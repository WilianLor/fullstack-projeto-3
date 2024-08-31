import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.config";
import routes from "./routes";

dotenv.config();

const app = express();

connectDatabase();

app.set("port", process.env.PORT || 3030);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(routes);

app.listen(app.get("port"), () => {
  console.log(`[server]: Server is running at port ${app.get("port")}`);
});
