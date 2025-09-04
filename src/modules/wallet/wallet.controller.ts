import { Request, Response } from "express";
import { sendResponse } from "../../utils/send-response";
import { WalletService } from "./wallet.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catch-async";

const getAllWallets = catchAsync(async (req: Request, res: Response) => {
  const wallets = await WalletService.getAllWallets();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All wallets retrieved successfully",
    data: wallets,
  });
});

const getSingleWallet = catchAsync(async (req: Request, res: Response) => {
  const wallet = await WalletService.getSingleWallet(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Wallet retrieved successfully",
    data: wallet,
  });
});

const blockWallet = catchAsync(async (req: Request, res: Response) => {
  const walletId = req.params.id;
  const walletResponse = await WalletService.blockWallet(walletId);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Wallet blocked successfully",
    data: walletResponse,
  });
});

const unBlockWallet = catchAsync(async (req: Request, res: Response) => {
  const walletId = req.params.id;
  const walletResponse = await WalletService.unBlockWallet(walletId);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Wallet blocked successfully",
    data: walletResponse,
  });
});

export const WalletController = {
  getAllWallets,
  getSingleWallet,
  blockWallet,
  unBlockWallet,
};
