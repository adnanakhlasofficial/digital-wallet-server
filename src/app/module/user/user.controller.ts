import { Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";

const createUser = async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

export const UserController = {
  createUser,
};
