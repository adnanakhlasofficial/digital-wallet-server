import { UserRole } from "../user/user.interface";
import { WalletStatus } from "./wallet.interface";
import { WalletModel } from "./wallet.model";

const getAllWallets = async () => {
  const wallets = await WalletModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $match: { "user.role": { $ne: UserRole.ADMIN } },
    },
    {
      $project: {
        balance: 1,
        status: 1,
        "user.role": 1,
        "user.name": 1,
        "user.phone": 1,
        "user.status": 1,
      },
    },
  ]);
  return wallets;
};

const getSingleWallet = async (payload: string) => {
  const wallet = await WalletModel.findById(payload).populate(
    "user",
    "-_id -password -wallet"
  );
  return wallet;
};

const blockWallet = async (payload: string) => {
  const walletResponse = await WalletModel.findByIdAndUpdate(
    payload,
    {
      $set: { status: WalletStatus.BLOCKED },
    },
    { new: true }
  );
  return walletResponse;
};

const unBlockWallet = async (payload: string) => {
  const walletResponse = await WalletModel.findByIdAndUpdate(
    payload,
    {
      $set: { status: WalletStatus.ACTIVE },
    },
    { new: true }
  );
  return walletResponse;
};

export const WalletService = {
  getAllWallets,
  getSingleWallet,
  blockWallet,
  unBlockWallet,
};
