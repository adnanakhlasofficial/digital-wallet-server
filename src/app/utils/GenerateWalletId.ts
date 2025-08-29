import crypto from "crypto";
import { IWallet } from "../module/wallet/wallet.interface";

export default function generateWalletId(prefix: Partial<IWallet>): string {
  const randomBytes = crypto.randomBytes(6).toString("hex");
  return `${prefix.user_username}-${randomBytes}`;
}
