import z from "zod";
import { UserRole, UserStatus } from "./user.interface";

const userRoleSchema = z.enum(Object.values(UserRole)).optional();
const userStatusSchema = z.enum(Object.values(UserStatus)).optional();

const phoneRegex = /^01[3-9]\d{8}$/;

export const createUserZodSchema = z.object({
  name: z.string().trim(),
  password: z.string(),
  phone: z.string().regex(phoneRegex, {
    message: "Invalid Bangladeshi phone number. Format: 01XXXXXXXXX",
  }),
});

export const updateUserZodSchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
  role: userRoleSchema,
  status: userStatusSchema,
});
