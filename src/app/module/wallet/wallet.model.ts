import { model, Schema } from "mongoose";
import { IWallet, WalletStatus } from "./wallet.interface";
import generateWalletId from "../../utils/GenerateWalletId";

const WalletSchema = new Schema<IWallet>(
  {
    user_username: { type: String, unique: true },
    balance: { type: Number, default: 50 },
    wallet_status: {
      type: String,
      enum: Object.values(WalletStatus),
      default: WalletStatus.ACITVE,
    },
    wallet_id: { type: String, default: generateWalletId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const WalletModel = model("wallets", WalletSchema);
