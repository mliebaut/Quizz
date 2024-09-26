import dotenv from "dotenv";
import path from "path";

process.env.TZ = "Etc/Universal";
const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({path: path.resolve(__dirname, "..", "..", envPath)});
