import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { signinSchema, signupSchema } from "./schemas";
import { AuthService } from "./service";

export const authRoutes = new Hono();

const prisma = new PrismaClient();
const authService = new AuthService(prisma);

authRoutes.post("/signin", async (c) => {
	try {
		const { email, password } = signinSchema.parse(await c.req.json());

		const res = await authService.signin({ email, password });

		return c.json({ token: res });
	} catch (err) {
		if (err instanceof HTTPException) {
			return err.getResponse();
		}

		return c.json({ message: err }, 500);
	}
});

authRoutes.post("/signup", async (c) => {
	try {
		const { email, password } = signupSchema.parse(await c.req.json());
		const res = await authService.signup({ email, password });
		return c.json(res);
	} catch (err) {
		if (err instanceof HTTPException) {
			// Get the custom response
			return err.getResponse();
		}
	}
});
