import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { checkAuth } from "../../middlewares/check-auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.get(
  "/all-wallets",
  checkAuth(UserRole.ADMIN),
  WalletController.getAllWallets
);
router.get("/:id", WalletController.getSingleWallet);

export const WalletRouter = router;
