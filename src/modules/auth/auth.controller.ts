import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";
import { removeCookie, setCookie } from "../../utils/cookie";

const login = async (req: Request, res: Response) => {
  const payload = req.body;
  const { accessToken, refreshToken, newUser } = await AuthService.login(
    payload
  );
  setCookie(res, "ACCESS_TOKEN", accessToken);
  setCookie(res, "REFRESH_TOKEN", refreshToken);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Logged in successfully",
    data: newUser,
  });
};

const logout = async (req: Request, res: Response) => {
  removeCookie(res, "ACCESS_TOKEN");
  removeCookie(res, "REFRESH_TOKEN");

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Logout successfully",
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["REFRESH_TOKEN"];
  const newAccessToken = await AuthService.refreshToken(refreshToken);
  setCookie(res, "ACCESS_TOKEN", newAccessToken);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Token refresh successfully",
    data: newAccessToken,
  });
};

export const AuthController = { login, logout, refreshToken };
