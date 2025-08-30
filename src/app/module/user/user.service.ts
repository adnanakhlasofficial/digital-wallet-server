import bcryptjs from "bcryptjs";
import { env } from "../../config/env";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { username, password, phone } = payload;

  const isUserExist = await UserModel.findOne({
    $or: [{ username }, { phone }],
  });

  if (isUserExist) {
    if (isUserExist.phone === phone) {
      throw new Error("Phone number already have been used.");
    } else if (isUserExist.username) {
      throw new Error("Username is not available");
    }
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(env.BCRYPT_SALT)
  );
  payload.password = hashedPassword;

  const newUser = { username, password: hashedPassword, phone };

  const user = await UserModel.create(newUser);

  return user;
};

export const UserService = {
  createUser,
};
