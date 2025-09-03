import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  AGENT = "AGENT",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  phone: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  wallet?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
