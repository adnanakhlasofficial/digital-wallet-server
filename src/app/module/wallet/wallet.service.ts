import { IWallet } from "./wallet.interface";
import { WalletModel } from "./wallet.model";

const createWallet = async (payload: Partial<IWallet>) => {
  const wallet = await WalletModel.create(payload);
  return wallet;
};

export const WalletService = {
  createWallet,
};
