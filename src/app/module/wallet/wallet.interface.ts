import { Types } from "mongoose";

export enum WalletStatus {
  ACITVE = "ACTIVE",
  SUSPEND = "SUSPEND",
  BLOCKED = "BLOCKED",
}

export interface IWallet {
  _id?: Types.ObjectId;
  wallet_id?: string;
  user_username: string;
  balance: number;
  wallet_status: WalletStatus;
}
