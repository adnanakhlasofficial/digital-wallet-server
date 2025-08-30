import { Router } from "express";
import { WalletRouter } from "../module/wallet/wallet.route";
import { UserRouter } from "../module/user/user.route";
import { AuthRouter } from "../module/auth/auth.route";

export const router = Router();

const AllRoutes = [
  {
    path: "/user",
    router: UserRouter,
  },
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/wallet",
    router: WalletRouter,
  },
];

AllRoutes.forEach((SingleRoute) => {
  router.use(SingleRoute.path, SingleRoute.router);
});
