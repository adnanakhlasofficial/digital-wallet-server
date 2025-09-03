import { JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import bcrypt from "bcryptjs";
import { UserStatus } from "../user/user.interface";

const login = async (payload: Partial<ILogin>) => {
  const user = await UserModel.findOne({ phone: payload.phone }).populate(
    "wallet",
    "-_id -user"
  );

  if (!user) {
    throw new Error("User not found");
  }

  const passwordOk = await bcrypt.compare(
    payload.password as string,
    user.password as string
  );

  if (!passwordOk) {
    throw new Error("Incorrect password");
  }

  const { password, ...newUser } = user.toObject();

  const jwtUser = {
    role: user.role,
    status: user.status,
    phone: user.phone,
    name: user.name,
  };

  const accessToken = generateToken(jwtUser, env.JWT_ACCESS_SECRET, "1d");
  const refreshToken = generateToken(jwtUser, env.JWT_REFRESH_SECRET, "30d");

  return { accessToken, refreshToken, newUser };
};

const refreshToken = async (payload: string) => {
  const decode = verifyToken(payload, env.JWT_REFRESH_SECRET) as JwtPayload;
  const user = await UserModel.findOne({ phone: decode.phone });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new Error(`User is ${user.status}`);
  }

  const { name, phone, password, role, status } = user.toObject();
  const jwtUser = { name, phone, password, role, status };

  const newAccessToken = generateToken(jwtUser, env.JWT_ACCESS_SECRET, "1d");
  return newAccessToken;
};

export const AuthService = { login, refreshToken };
