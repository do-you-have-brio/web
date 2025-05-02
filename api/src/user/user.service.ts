import { HTTPException } from "hono/http-exception";
import prisma from "../database/client.ts";
import type { UpdateUserDto } from "./user.dto";

export class UserService {
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    return user;
  }

  async updateUser(id: string, _data: UpdateUserDto) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    return user;
  }
}
