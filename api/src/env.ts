import type { Context } from "hono";
import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  SECRET_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
