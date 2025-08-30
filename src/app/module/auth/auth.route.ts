import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRouter = router;
