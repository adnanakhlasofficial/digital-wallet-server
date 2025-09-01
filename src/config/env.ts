import dotenv from "dotenv";

dotenv.config();

interface IENV {
  PORT: string;
  MONGODB_URI: string;
}

type TENV = keyof IENV;

function checkRequiredEnv() {
  const envList: TENV[] = ["MONGODB_URI", "PORT"];
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
