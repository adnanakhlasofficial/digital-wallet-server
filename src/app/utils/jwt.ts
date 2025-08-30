import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expires: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expires,
  } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const decode = jwt.verify(token, secret);
  if (!decode) {
    throw new Error("Forbidden Access");
  }
  return decode;
};

export const createUserTokens = (payload: JwtPayload) => {
  const accessToken = generateToken(payload, env.JWT_ACCESS_SECRET, "1d");
  const refreshToken = generateToken(payload, env.JWT_REFRESH_SECRET, "30d");
  return { accessToken, refreshToken };
};
