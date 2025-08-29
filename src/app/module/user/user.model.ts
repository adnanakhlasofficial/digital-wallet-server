import { model, Schema } from "mongoose";
import { IUser, UserRole, UserStatus } from "./user.interface";

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: Object.values(UserRole),
  },
  status: { type: String, enum: Object.values(UserStatus) },
  wallet_id: { type: Schema.Types.ObjectId, unique: true },
});

export const UserModel = model("users", UserSchema);
