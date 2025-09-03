import { Router } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get("/all-users", UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);

export const UserRouter = router;
