import { WalletModel } from "./wallet.model";

const getAllWallets = async () => {
  const wallets = await WalletModel.find({}).populate(
    "user",
    "name phone status role -_id"
  );
  return wallets;
};

const getSingleWallet = async (payload: string) => {
  const wallet = await WalletModel.findById(payload).populate(
    "user",
    "-_id -password -wallet"
  );
  return wallet;
};

export const WalletService = { getAllWallets, getSingleWallet };
