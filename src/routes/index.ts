import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { WalletRouter } from "../modules/wallet/wallet.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { TransactionRouter } from "../modules/transaction/transaction.route";

const router = Router();

interface IRoute {
  path: string;
  router: Router;
}

const allRoutes: IRoute[] = [
  {
    path: "/user",
    router: UserRouter,
  },
  {
    path: "/wallet",
    router: WalletRouter,
  },
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/transaction",
    router: TransactionRouter,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
