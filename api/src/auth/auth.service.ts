import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import type { Prisma } from "../../generated/prisma";
import prisma from "../database/client";
import type { SignInDto, SignUpDto } from "./auth.dto";

const secret = process.env.SECRET_KEY!;

export class AuthService {
	constructor() {}

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

		if (!user) throw new HTTPException(404, { message: "User not found" });

		const isPasswordValid = await Bun.password.verify(
			dto.password,
			user.password,
		);

		if (!isPasswordValid) throw new Error("Invalid password");

		const token = await sign({ user }, secret);

		return token;
	}

	async updateUser(userId: string, dto: Prisma.UserUpdateInput) {
		return prisma.user.update({
			where: { id: userId },
			data: {
				...dto,
				jobs: dto.jobs as Prisma.JobUpdateManyWithoutUserNestedInput,
			},
		});
	}
}
