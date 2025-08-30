import { Request, Response } from "express";
import { env } from "../../config/env";
import catchAsync from "../../utils/catchAsync";
import { setCookie } from "../../utils/setCookie";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, newUser } = await AuthService.login(
    req.body
  );

  setCookie(res, "ACCESS_TOKEN", accessToken);

  setCookie(res, "REFRESH_TOKEN", refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Login successfully",
    success: true,
    data: { accessToken, refreshToken, user: newUser },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies["REFRESH_TOKEN"];
  const newAccessToken = await AuthService.getNewAccessToken(refreshToken);

  console.log(newAccessToken);
  setCookie(res, "ACCESS_TOKEN", newAccessToken);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "New access token generated",
    success: true,
    data: { accessToken: newAccessToken },
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("ACCESS_TOKEN", {
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "strict" : "none",
    secure: env.NODE_ENV === "production" ? true : false,
  });

  res.clearCookie("REFRESH_TOKEN", {
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "strict" : "none",
    secure: env.NODE_ENV === "production" ? true : false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logout successfully",
  });
});

export const AuthController = {
  login,
  logout,
  refreshToken,
};
