import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { checkAuth } from "../../middlewares/check-auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/send-money",
  checkAuth(UserRole.USER, UserRole.AGENT),
  TransactionController.sendMoney
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

router.get(
  "/approve/:id",
  checkAuth(UserRole.ADMIN),
  TransactionController.approveTransaction
);

router.get(
  "/reverse/:id",
  checkAuth(UserRole.ADMIN),
  TransactionController.reverseTransaction
);

export const TransactionRouter = router;
