import { env } from "../../config/env";
import { createUserTokens, generateToken, verifyToken } from "../../utils/jwt";
import { IUser, UserStatus } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const login = async (payload: ILogin) => {
  const { username, password: oldPassword } = payload;

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error("User does not exist");
  }

  const isPasswordOK = await bcryptjs.compare(
    oldPassword,
    user.password as string
  );

  if (!isPasswordOK) {
    throw new Error("Password does not matched");
  }

  const { password, createdAt, updatedAt, ...newUser } = user.toObject();

  // const token = jwt.sign(newUser, env.JWT_SECRET, { expiresIn: "1d" });
  const tokens = createUserTokens(newUser);

  return {
    ...tokens,
    newUser,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const decode = verifyToken(
    refreshToken,
    env.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const user = await UserModel.findOne({ username: decode.username });

  if (!user) {
    throw new Error("User does not exist");
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new Error("Forbidden access");
  }

  const { password, createdAt, updatedAt, ...newUser } = user.toObject();

  const newAccessToken = generateToken(newUser, env.JWT_ACCESS_SECRET, "1d");
  return newAccessToken;
};

export const AuthService = { login, getNewAccessToken };
