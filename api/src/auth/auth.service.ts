import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { prisma } from "../database/client";
import { env } from "../env";
import type { SignInDto, SignUpDto } from "./auth.dto";

export class AuthService {
	async signup(dto: SignInDto) {
		const user = await prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (user) {
			throw new HTTPException(409, {
				message: "User already exists",
			});
		}

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

		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		const isPasswordValid = await Bun.password.verify(
			dto.password,
			user.password,
		);

		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		const token = await sign({ user }, env.SECRET_KEY);

		return token;
	}
}
