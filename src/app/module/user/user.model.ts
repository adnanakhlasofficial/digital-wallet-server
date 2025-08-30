import { model, Schema } from "mongoose";
import { IUser, UserRole, UserStatus } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    wallet_id: { type: Schema.Types.ObjectId, unique: true },
  },
  { versionKey: false, timestamps: true }
);

export const UserModel = model("users", UserSchema);
