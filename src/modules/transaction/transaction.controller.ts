import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { TransactionService } from "./transaction.service";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";

const sendMoney = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;

  const transaction = await TransactionService.sendMoney(user, payload);
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Request received. Admin approval is in progress",
    data: transaction,
  });
});

const getAllTransactions = catchAsync(async (req: Request, res: Response) => {
  const allTransactions = await TransactionService.getAllTransactions();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All transactions retrieved successfully",
    data: allTransactions,
  });
});

const getUserTransactions = catchAsync(async (req: Request, res: Response) => {
  const allTransactions = await TransactionService.getUserTransactions(
    req.user._id
  );
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All transactions retrieved successfully",
    data: allTransactions,
  });
});

export const TransactionController = {
  sendMoney,
  getAllTransactions,
  getUserTransactions,
};
