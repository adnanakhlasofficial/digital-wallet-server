import { Types } from "mongoose";

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IWallet {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  balance: number;
  status: WalletStatus;
  createdAt: Date;
  updatedAt: Date;
}
