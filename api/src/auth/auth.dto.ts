import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
