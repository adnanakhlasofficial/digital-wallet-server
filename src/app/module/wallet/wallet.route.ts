import { Router } from "express";
import { WalletController } from "./wallet.controller";

const router = Router();

router.post("/create-wallet", WalletController.createWallet);

export const WalletRouter = router;
