import { Router } from "express";
import { WalletRouter } from "../module/wallet/wallet.route";

export const router = Router();

const AllRoutes = [
  {
    path: "/wallet",
    router: WalletRouter,
  },
];

AllRoutes.forEach((SingleRoute) => {
  router.use(SingleRoute.path, SingleRoute.router);
});
