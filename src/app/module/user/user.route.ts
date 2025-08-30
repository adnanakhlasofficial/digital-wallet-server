import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.use(
  "/register",
  validateRequest(UserValidation.UserZodSchema),
  UserController.createUser
);

export const UserRouter = router;
