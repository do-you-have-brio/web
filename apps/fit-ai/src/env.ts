import { z } from "zod";

export const envSchema = z.object({
	API_KEY: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
