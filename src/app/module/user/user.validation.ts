import z from "zod";

const UserZodSchema = z.object({
  phone: z.string().regex(/^(?:\+?88)?01[3-9]\d{8}$/),
  username: z.string(),
  password: z.string(),
});

export const UserValidation = {
  UserZodSchema,
};
