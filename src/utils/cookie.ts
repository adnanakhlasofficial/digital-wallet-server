import { Response } from "express";

export const setCookie = (res: Response, name: string, token: string) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export const removeCookie = (res: Response, name: string) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};
