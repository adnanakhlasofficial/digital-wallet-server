import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import httpStatus from "http-status-codes";
import AppError from "../helpers/app-error";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env.NODE_ENV === "development") {
    console.log("Dev error", err);
  }

  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!!!";
  let error = err;

  if (err.name === "ZodError") {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Zod validation error";
    error = JSON.parse(err.message);
  }

  if (err instanceof AppError) {
    statusCode = err.status;
    message = err.message;
    error = err.stack;
  } else if (err instanceof Error) {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
