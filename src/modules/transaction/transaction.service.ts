import { JwtPayload } from "jsonwebtoken";
import { ITransaction } from "./transaction.interface";
import { TransactionModel } from "./transaction.model";

const sendMoney = async (user: JwtPayload, payload: Partial<ITransaction>) => {
  const transactionPayload = {
    from_wallet: user.wallet,
    initiated_by: user._id,
    ...payload,
  };
  const transaction = await TransactionModel.create(transactionPayload);
  return transaction;
};

const getAllTransactions = async () => {
  const allTransactions = await TransactionModel.find({})
    .populate({
      path: "from_wallet",
      select: "balance status -_id",
      populate: {
        path: "user",
        select: "name phone -_id",
      },
    })
    .populate({
      path: "to_wallet",
      select: "balance status -_id",
      populate: {
        path: "user",
        select: "name phone -_id",
      },
    })
    .populate("initiated_by", "name phone role status -_id");
  return allTransactions;
};

const getUserTransactions = async (id: string) => {
  const allTransactions = await TransactionModel.find({
    initiated_by: id,
  })
    .select("-from_wallet -initiated_by")
    .populate({
      path: "to_wallet",
      select: "balance status -_id",
      populate: {
        path: "user",
        select: "name phone -_id",
      },
    });

  console.log(allTransactions);
  return allTransactions;
};

export const TransactionService = {
  sendMoney,
  getAllTransactions,
  getUserTransactions,
};
