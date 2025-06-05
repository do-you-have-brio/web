import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { signinSchema, signupSchema, verifySchema } from "./schemas";
import { AuthService } from "./service";

export const routes = new Hono();

const prisma = new PrismaClient();
const authService = new AuthService(prisma);

routes.post("/login", async (c) => {
	try {
		const { email, password } = signinSchema.parse(await c.req.json());

		const res = await authService.signin({ email, password });

		return c.json({ token: res });
	} catch (err) {
		console.error(err);

		if (err instanceof HTTPException) {
			return err.getResponse();
		}

		if (err instanceof ZodError) {
			return c.json({ message: err }, 400);
		}

		return c.json({ message: err }, 500);
	}
});

routes.post("/register", async (c) => {
	try {
		const { email, password } = signupSchema.parse(await c.req.json());
		const res = await authService.signup({ email, password });
		return c.json(res);
	} catch (err) {
		if (err instanceof HTTPException) {
			// Get the custom response
			return err.getResponse();
		}

		if (err instanceof ZodError) {
			return c.json({ message: err }, 400);
		}

		return c.json({ message: err }, 500);
	}
});

routes.post("/verify", async (c, next) => {
	try {
		const body = await c.req.json();
		const { token } = verifySchema.parse(body);
		const res = await authService.verifyToken(token);
		return c.json(res);
	} catch (err) {
		throw new HTTPException(500, { message: err.message });
	}
	await next();
});
