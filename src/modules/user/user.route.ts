import { Router } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { UserController } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/check-auth";
import { UserRole } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get("/all-users", checkAuth(UserRole.ADMIN), UserController.getAllUsers);
router.get(
  "/me",
  checkAuth(UserRole.ADMIN, UserRole.AGENT, UserRole.USER),
  UserController.getUserMe
);
router.put(
  "/update/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(UserRole.ADMIN, UserRole.AGENT, UserRole.USER),
  UserController.updateUser
);
router.get("/:id", UserController.getSingleUser);

export const UserRouter = router;
