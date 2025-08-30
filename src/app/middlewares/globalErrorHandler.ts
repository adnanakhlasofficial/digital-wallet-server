import { NextFunction, Request, Response } from "express";

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong.";
  let error = JSON.parse(err);

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default globalErrorHandler;
