import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/send-response";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully",
    data: users,
  });
};

const getSingleUser = async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req.params.id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export const UserController = { createUser, getAllUsers, getSingleUser };
