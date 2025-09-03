import { Response } from "express";
import { env } from "../config/env";

export const setCookie = (res: Response, name: string, token: string) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production" ? true : false,
    sameSite: env.NODE_ENV === "production" ? "strict" : "none",
  });
};

export const removeCookie = (res: Response, name: string) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: env.NODE_ENV === "production" ? true : false,
    sameSite: env.NODE_ENV === "production" ? "strict" : "none",
  });
};
