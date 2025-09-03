import { Request, Response } from "express";
import { sendResponse } from "../../utils/send-response";
import { WalletService } from "./wallet.service";
import httpStatus from "http-status-codes";

const getAllWallets = async (req: Request, res: Response) => {
  const wallets = await WalletService.getAllWallets();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All wallets retrieved successfully",
    data: wallets,
  });
};

export const WalletController = { getAllWallets };
