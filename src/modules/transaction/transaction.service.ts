import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../helpers/app-error";
import { WalletModel } from "../wallet/wallet.model";
import { ITransaction, TransactionStatus } from "./transaction.interface";
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

const approveTransaction = async (transactionId: string, admin: JwtPayload) => {
  const session = await TransactionModel.startSession();
  session.startTransaction();
  try {
    const transactionDetails = await TransactionModel.findById(
      transactionId
    ).session(session);

    if (!transactionDetails) {
      throw new AppError(
        httpStatus.ACCEPTED,
        "Transaction status unknown. Please retry or reach out to support"
      );
    }

    if (transactionDetails.status === TransactionStatus.COMPLETED) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Transaction sealed. Attempt to reprocess denied."
      );
    }

    await WalletModel.findByIdAndUpdate(
      transactionDetails?.to_wallet,
      { $inc: { balance: transactionDetails?.amount } },
      { new: true, session }
    );

    await WalletModel.findByIdAndUpdate(
      admin.wallet,
      { $inc: { balance: transactionDetails?.fee } },
      { new: true, session }
    );

    const transaction = await TransactionModel.findByIdAndUpdate(
      transactionId,
      {
        $set: { status: TransactionStatus.COMPLETED },
      },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return transaction;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const reverseTransaction = async (transactionId: string) => {
  const session = await TransactionModel.startSession();
  session.startTransaction();
  try {
    const transactionDetails = await TransactionModel.findById(
      transactionId
    ).session(session);

    if (!transactionDetails) {
      throw new AppError(
        httpStatus.ACCEPTED,
        "Transaction status unknown. Please retry or reach out to support"
      );
    }

    if (transactionDetails.status === TransactionStatus.COMPLETED) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Transaction sealed. Attempt to reprocess denied."
      );
    }

    const totalAmount = transactionDetails.amount + transactionDetails.fee;

    await WalletModel.findByIdAndUpdate(
      transactionDetails?.from_wallet,
      { $inc: { balance: totalAmount } },
      { new: true, session }
    );

    const transaction = await TransactionModel.findByIdAndUpdate(
      transactionId,
      {
        $set: { status: TransactionStatus.REVERSED },
      },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return transaction;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const TransactionService = {
  sendMoney,
  getAllTransactions,
  getUserTransactions,
  approveTransaction,
  reverseTransaction,
};
