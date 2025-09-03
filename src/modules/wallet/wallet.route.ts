import { Router } from "express";
import { WalletController } from "./wallet.controller";

const router = Router();

router.get("/all-wallets", WalletController.getAllWallets);

export const WalletRouter = router;
