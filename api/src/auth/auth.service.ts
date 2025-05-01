import prisma from "../database/client";
import { SignInDto, SignUpDto } from "./auth.dto";
import { HTTPException } from "hono/http-exception";

export class AuthService {
  constructor() {}

  async signup(dto: SignInDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new HTTPException(409, { message: "User already exists" });

    const hashedPassword = await Bun.password.hash(dto.password);

    return prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });
  }

  async signin(dto: SignUpDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new HTTPException(404, { message: "User not found" });

    const isPasswordValid = await Bun.password.verify(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) throw new Error("Invalid password");

    return user;
  }
}
