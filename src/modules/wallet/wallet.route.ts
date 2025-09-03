import { Router } from "express";
import { WalletController } from "./wallet.controller";

const router = Router();

router.get("/all-wallets", WalletController.getAllWallets);
router.get("/:id", WalletController.getSingleWallet);

export const WalletRouter = router;
