import bcrypt from "bcryptjs";
import { env } from "../../config/env";
import { IUser, UserRole } from "./user.interface";
import { UserModel } from "./user.model";
import httpStatus from "http-status-codes";
import AppError from "../../helpers/app-error";

const createUser = async (payload: Partial<IUser>) => {
  const { password, role } = payload;

  if (role === UserRole.ADMIN) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only users with the ADMIN role are authorized to create new admin accounts."
    );
  }

  const passwordHash = await bcrypt.hash(
    password as string,
    Number(env.BCRYPT_SALT)
  );

  payload.password = passwordHash;
  payload.role = role;

  const { password: hashedPassword, ...user } = (
    await UserModel.create(payload)
  ).toObject();
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

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const oldUser = await UserModel.findById(id);

  const passwordOk = await bcrypt.compare(
    payload.password as string,
    oldUser?.password as string
  );

  if (!passwordOk) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The passwords you entered do not match. Please try again."
    );
  }

  if (payload.newPassword) {
    const hashedPassword = await bcrypt.hash(
      payload.newPassword as string,
      Number(env.BCRYPT_SALT)
    );
    payload.password = hashedPassword;
    delete payload.newPassword;
  } else {
    delete payload.password;
  }

  const update = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  const { password, ...updateUser } = update?.toObject();

  return updateUser;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserMe,
  updateUser,
};
