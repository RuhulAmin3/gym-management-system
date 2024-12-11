
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_expire_time: process.env.JWT_ACCESS_EXPIRE_TIME,
  }
};