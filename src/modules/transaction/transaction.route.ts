import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { checkAuth } from "../../middlewares/check-auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/send-money",
  checkAuth(UserRole.USER),
  TransactionController.sendMoney
);
router.post(
  "/cash-out",
  checkAuth(UserRole.USER),
  TransactionController.cashOut
);

router.post(
  "/cash-in",
  checkAuth(UserRole.AGENT),
  TransactionController.cashIn
);

router.get(
  "/all-transactions",
  checkAuth(UserRole.ADMIN),
  TransactionController.getAllTransactions
);

router.get(
  "/all-transactions/me",
  checkAuth(UserRole.USER, UserRole.AGENT),
  TransactionController.getUserTransactions
);

router.patch(
  "/approve/:id",
  checkAuth(UserRole.ADMIN),
  TransactionController.approveTransaction
);

router.patch(
  "/reverse/:id",
  checkAuth(UserRole.ADMIN),
  TransactionController.reverseTransaction
);

export const TransactionRouter = router;
