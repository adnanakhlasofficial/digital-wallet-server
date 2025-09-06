import { Types } from "mongoose";

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REVERSED = "REVERSED",
}

export enum TransactionType {
  SendMoney = "SendMoney",
  CashOut = "CashOut",
}

export interface ITransaction {
  _id?: Types.ObjectId;
  transaction_id: string;
  amount: number;
  fee: number;
  commission: number;
  from_wallet: Types.ObjectId;
  to_wallet: Types.ObjectId;
  initiated_by: Types.ObjectId;
  status: TransactionStatus;
  type: TransactionType;
}
