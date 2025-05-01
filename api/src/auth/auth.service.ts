import prisma from "../database/client";
import { SignInDto } from "./auth.dto";

export class AuthService {
  constructor() {}

  async signup(dto: SignInDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new Error("User already exists");

    const hashedPassword = await Bun.password.hash(dto.password);

    return prisma.user.create({ data: {
      email: dto.email
      password: hashedPassword
    } });
  }

  async signin(email: string, password: string) {}
}
