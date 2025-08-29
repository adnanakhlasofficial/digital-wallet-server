import dotenv from "dotenv";

dotenv.config();

interface IEnv {
  MONGODB_URI: string;
  PORT: string;
}

type TEnv = keyof IEnv;

const loadEnvVariables = (): IEnv => {
  const requiredEnv: TEnv[] = ["MONGODB_URI", "PORT"];
  let env: any = {};

  requiredEnv.forEach((key: string) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    env[key] = process.env[key];
  });

  return env;
};

export const env = loadEnvVariables();
