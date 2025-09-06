import z from "zod";
import { phoneRegex } from "../user/user.validation";

export const authZodSchema = z.object({
  phone: z.string().regex(phoneRegex, {
    message: "Invalid Bangladeshi phone number. Format: 01XXXXXXXXX",
  }),
  password: z.string(),
});
