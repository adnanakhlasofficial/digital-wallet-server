import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { env } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../helpers/app-error";
import httpStatus from "http-status-codes";

export const checkAuth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["ACCESS_TOKEN"];

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Authentication required. Please log in to continue."
        );
      }

      const decode = verifyToken(token, env.JWT_ACCESS_SECRET) as JwtPayload;

      if (!roles.includes(decode.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "Access denied. You do not have permission to perform this action."
        );
      }

      req.user = decode;

      next();
    } catch (error) {
      next(error);
    }
  };
