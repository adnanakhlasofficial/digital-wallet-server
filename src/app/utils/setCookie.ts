import { Response } from "express";
import { env } from "../config/env";

export const setCookie = (res: Response, name: string, data: string) => {
  res.cookie(name, data, {
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "strict" : "none",
    secure: env.NODE_ENV === "production" ? true : false,
  });
};
