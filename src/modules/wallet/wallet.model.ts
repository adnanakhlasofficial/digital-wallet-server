import { model, Schema } from "mongoose";
import { IWallet, WalletStatus } from "./wallet.interface";

const WalletSchema = new Schema<IWallet>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 50,
    },
    status: {
      type: String,
      enum: Object.values(WalletStatus),
      default: WalletStatus.ACTIVE,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const WalletModel = model("wallets", WalletSchema);
