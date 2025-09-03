import dotenv from "dotenv";

dotenv.config();

interface IENV {
  PORT: string;
  MONGODB_URI: string;
  NODE_ENV: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  BCRYPT_SALT: string;
  ADMIN_PHONE: string;
  ADMIN_PASSWORD: string;
}

type TENV = keyof IENV;

function checkRequiredEnv() {
  const envList: TENV[] = [
    "MONGODB_URI",
    "PORT",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "BCRYPT_SALT",
    "ADMIN_PHONE",
    "ADMIN_PASSWORD",
  ];
  let env: any = {};
  envList.forEach((singleEnv: string) => {
    if (!process.env[singleEnv]) {
      throw new Error(`Missing required env ${singleEnv}`);
    }
    env[singleEnv] = process.env[singleEnv];
  });
  return env;
}

export const env: IENV = checkRequiredEnv();
