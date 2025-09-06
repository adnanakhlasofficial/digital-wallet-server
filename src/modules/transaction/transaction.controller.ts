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

const cashOut = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;

  const transaction = await TransactionService.cashOut(user, payload);
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Request received. Admin approval is in progress",
    data: transaction,
  });
});

const cashIn = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;

  const transaction = await TransactionService.cashIn(user, payload);
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

const approveTransaction = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.id;
  const admin = req.user;
  const transactionResponse = await TransactionService.approveTransaction(
    transactionId,
    admin
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Transaction approved successfully",
    data: transactionResponse,
  });
});

const reverseTransaction = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.id;
  const transactionResponse = await TransactionService.reverseTransaction(
    transactionId
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Transaction approved successfully",
    data: transactionResponse,
  });
});

export const TransactionController = {
  sendMoney,
  cashOut,
  cashIn,
  getAllTransactions,
  getUserTransactions,
  approveTransaction,
  reverseTransaction,
};
