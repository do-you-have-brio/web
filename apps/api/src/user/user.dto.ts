import { z } from "zod";

export const UpdateEducationSchema = z.object({
  id: z.string().uuid().optional(),
  school: z.string().min(2).max(100).optional(),
  degree: z.string().min(2).max(100).optional(),
  location: z.string().min(2).max(100).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export const CreateEducationSchema = z.object({
  school: z.string().min(2).max(100),
  degree: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  start_date: z.string(),
  end_date: z.string(),
});

export type CreateEducationDto = z.infer<typeof CreateEducationSchema>;

export const UpdateUserSchema = z.object({
  educations: z.object({
    delete: z.string().uuid().array(),
    update: z.array(UpdateEducationSchema),
    create: z.array(CreateEducationSchema),
  }),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export const CreateJobSchema = z.object({
  title: z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  description: z.string().min(2).max(100),
  tags: z.string().array().min(1).max(6),
  start_date: z.string(),
  end_date: z.string(),
});

export type CreateJobDto = z.infer<typeof CreateJobSchema>;
