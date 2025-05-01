import { HTTPException } from "hono/http-exception";
import prisma from "../database/client";
import {
  type UpdateUserDto,
  type CreateEducationDto,
  CreateEducationSchema,
} from "./user.dto";

export class UserService {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    const education = data.education;

    if (education.id) {
      await prisma.education.update({
        where: { id: education.id },
        data: {
          school: education.school,
          degree: education.degree,
          location: education.location,
          start_date: education.start_date?.toISOString(),
          end_date: education.end_date?.toISOString(),
        },
      });
    } else {
      const newEducation = CreateEducationSchema.safeParse(education);

      if (!newEducation.success) {
        throw new HTTPException(400, { message: "Invalid education data" });
      }

      const e = newEducation.data;

      await prisma.education.create({
        data: {
          school: e.school,
          degree: e.degree,
          location: e.location,
          start_date: e.start_date?.toISOString(),
          end_date: e.end_date.toISOString(),
        },
      });
    }

    return prisma.user.findUnique({
      where: { id },
      include: {
        Education: true,
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      include: {
        Education: true,
      },
    });
  }
}
