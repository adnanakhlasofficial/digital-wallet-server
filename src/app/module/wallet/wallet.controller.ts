import { Request, Response } from "express";
import { WalletService } from "./wallet.service";
import httpStatus from "http-status-codes";
import { success } from "zod";

const createWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await WalletService.createWallet(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Wallet created successfully",
      data: wallet,
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Failed to create wallet",
    });
  }
};

export const WalletController = {
  createWallet,
};
