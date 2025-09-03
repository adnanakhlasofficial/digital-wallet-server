import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import httpStatus from "http-status-codes";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env.NODE_ENV === "development") {
    console.log("Dev error", err);
  }

  let statusCode = 500;
  let message = "Something went wrong!!!";
  let error = err;

  if (err.name === "ZodError") {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Zod validation error";
    error = JSON.parse(err.message);
  }

  if (err instanceof Error) {
    statusCode = 500;
    message = "Something went wrong!!!";
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
