import { UserRole } from "../user/user.interface";
import { WalletStatus } from "./wallet.interface";
import { WalletModel } from "./wallet.model";

const getAllWallets = async (query: any) => {
  const sortOrder = query.sort === "asc" ? 1 : query.sort === "desc" ? -1 : 1;

  const limit = Number(query.limit) || 10;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;
  const totalWallet = await WalletModel.countDocuments();
  const totalPage = Math.ceil(totalWallet / limit);

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
      $sort: { balance: sortOrder },
    },
    {
      $limit: limit,
    },
    {
      $skip: skip,
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
  const meta = { limit, page, totalWallet, totalPage };

  return { wallets, meta };
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
