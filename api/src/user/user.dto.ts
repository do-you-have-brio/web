import { z } from "zod";

export const UpdateEducationSchema = z.object({
  id: z.string().uuid().optional(),
  school: z.string().min(2).max(100).optional(),
  degree: z.string().min(2).max(100).optional(),
  location: z.string().min(2).max(100).optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});

export const UpdateUserSchema = z.object({
  education: UpdateEducationSchema.optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export const CreateEducationSchema = z.object({
  school: z.string().min(2).max(100),
  degree: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  start_date: z.date(),
  end_date: z.date(),
});
export type CreateEducationDto = z.infer<typeof CreateEducationSchema>;
