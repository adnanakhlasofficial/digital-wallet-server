import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { UserRole } from "../user/user.interface";
import { WalletController } from "./wallet.controller";

const router = Router();

router.get(
  "/all-wallets",
  checkAuth(UserRole.ADMIN),
  WalletController.getAllWallets
);

router.get(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.AGENT, UserRole.USER),
  WalletController.getSingleWallet
);

router.patch(
  "/block/:id",
  checkAuth(UserRole.ADMIN),
  WalletController.blockWallet
);
router.patch(
  "/unblock/:id",
  checkAuth(UserRole.ADMIN),
  WalletController.unBlockWallet
);

export const WalletRouter = router;
