import bcrypt from "bcryptjs";
import { env } from "../../config/env";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { password } = payload;

  const passwordHash = await bcrypt.hash(
    password as string,
    Number(env.BCRYPT_SALT)
  );

  payload.password = passwordHash;

  const user = await UserModel.create(payload);
  return user;
};

const getAllUsers = async () => {
  const users = await UserModel.find({})
    .select("-password")
    .populate("wallet", "-_id -user");

  return users;
};

const getSingleUser = async (payload: string) => {
  const user = await UserModel.findById(payload)
    .select("-password")
    .populate("wallet", "-_id -user");
  return user;
};

const getUserMe = async (id: string) => {
  const user = await UserModel.findById(id)
    .select("-password")
    .populate("wallet", "-Id");
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserMe,
};
