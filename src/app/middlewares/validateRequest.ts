import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ZodObject } from "zod";

export const validateRequest = (zodSchema: ZodObject) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await zodSchema.parseAsync(req.body);
    next();
  });
