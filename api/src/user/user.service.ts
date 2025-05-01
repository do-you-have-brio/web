import prisma from "../database/client";
import { HTTPException } from "hono/http-exception";
import { UpdateUserDto } from "./user.dto";

export class UserService {
  constructor() {}

  async getUserById(id: string) {
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

    return user;
  }
}
