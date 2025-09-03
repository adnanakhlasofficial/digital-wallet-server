import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import httpCodes from "http-status-codes";

export const notFound = (req: Request, res: Response) => {
  sendResponse(res, {
    status: httpCodes.NOT_FOUND,
    success: false,
    message: "Route not found",
  });
};
