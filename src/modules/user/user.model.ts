import { CallbackError, model, Schema } from "mongoose";
import { WalletService } from "../wallet/wallet.service";
import { IUser, UserRole, UserStatus } from "./user.interface";
import { WalletModel } from "../wallet/wallet.model";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "wallets",
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.wallet) {
      const id = { user: this._id };
      const wallet = await WalletModel.create(id);
      this.wallet = wallet._id;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error as CallbackError);
  }
});

export const UserModel = model("users", UserSchema);
