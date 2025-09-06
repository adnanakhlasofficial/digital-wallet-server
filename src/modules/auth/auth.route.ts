import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validate-request";
import { authZodSchema } from "./auth.validation";

const router = Router();

router.post("/login", validateRequest(authZodSchema), AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRouter = router;
