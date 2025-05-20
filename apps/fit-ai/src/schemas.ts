import { z } from "zod";

export const analyzeSchema = z.object({
	profile: z.object({
		education: z.array(z.any()),
		jobs: z.array(z.any()),
		repositories: z.array(z.any()),
	}),
	job: z.object({
		description: z.string(),
	}),
});
