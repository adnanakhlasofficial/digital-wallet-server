import { CallbackError, model, Schema } from "mongoose";
import {
  ITransaction,
  TransactionStatus,
  TransactionType,
} from "./transaction.interface";
import { generateTransactionId } from "../../utils/generate-transaction-id";
import { WalletModel } from "../wallet/wallet.model";
import AppError from "../../helpers/app-error";
import httpStatus from "http-status-codes";

const TransactionSchema = new Schema<ITransaction>(
  {
    transaction_id: {
      type: String,
      required: true,
      default: generateTransactionId,
    },
    amount: {
      type: Number,
      required: true,
    },
    fee: { type: Number, required: true, default: 5 },
    commission: { type: Number },
    from_wallet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "wallets",
    },
    to_wallet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "wallets",
    },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
    },
    initiated_by: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { versionKey: false, timestamps: true }
);

TransactionSchema.pre("validate", async function (next) {
  const transaction = this;

  try {
    const wallet = await WalletModel.findById(transaction.from_wallet);
    if (!wallet) {
      return next(new Error("Wallet not found"));
    }
    let totalAmount = transaction.amount + transaction.fee;

    if (transaction.commission) {
      const commission = (transaction.commission / 100) * transaction.amount;
      totalAmount += commission;
    }

    if (totalAmount > wallet.balance) {
      return next(new Error("Amount exceeds available wallet balance"));
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

TransactionSchema.pre("save", async function (next) {
  const transaction = this;

  try {
    let totalMoney = transaction.amount + transaction.fee;

    if (transaction.commission) {
      const commission = (transaction.commission / 100) * transaction.amount;
      totalMoney += commission;
    }

    const wallet = await WalletModel.findById(transaction.from_wallet);
    if (!wallet) {
      throw new AppError(httpStatus.BAD_REQUEST, "Wallet not found");
    }
    const leftBalance = wallet.balance - totalMoney;
    await WalletModel.findByIdAndUpdate(transaction.from_wallet, {
      balance: leftBalance,
    });

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const TransactionModel = model("transactions", TransactionSchema);
