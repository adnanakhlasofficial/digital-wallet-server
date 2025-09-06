import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IWallet {
  _id?: Types.ObjectId;
  user: IUser;
  balance: number;
  status: WalletStatus;
  createdAt: Date;
  updatedAt: Date;
}
