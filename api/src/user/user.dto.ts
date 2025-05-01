import { z } from "zod";

export const UpdateUserSchema = z.object({
	education: z
		.object({
			id: z.string().uuid().optional(),
			degree: z.string().min(2).max(100).optional(),
			institution: z.string().min(2).max(100).optional(),
			startDate: z.date().optional(),
			endDate: z.date().optional(),
			description: z.string().min(2).max(1000).optional(),
		})
		.optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
