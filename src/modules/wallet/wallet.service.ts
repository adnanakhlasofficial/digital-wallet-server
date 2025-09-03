import { WalletModel } from "./wallet.model";

const getAllWallets = async () => {
  const wallets = await WalletModel.find({}).populate(
    "user",
    "name phone status role -_id"
  );
  return wallets;
};

export const WalletService = { getAllWallets };
