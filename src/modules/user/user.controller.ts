import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/send-response";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catch-async";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully",
    data: users,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req.params.id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

const getUserMe = catchAsync(async (req: Request, res: Response) => {
  const id = req.user._id;
  const user = await UserService.getUserMe(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const id = req.user._id;
  const payload = req.body;
  const updateUser = await UserService.updateUser(id, payload);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: updateUser,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserMe,
  updateUser,
};
