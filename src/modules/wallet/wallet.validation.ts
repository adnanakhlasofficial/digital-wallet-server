import z from "zod";

export const createWalletZodSchema = z.object({
  user: z.string(),
});
