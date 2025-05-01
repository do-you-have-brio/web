import { Hono } from "hono";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { signinSchema, signupSchema } from "./auth.dto";
import { User } from "../generated/prisma";

const app = new Hono();

const authService = new AuthService();

app.post("/signin", async (c) => {
  try {
    const { email, password } = signinSchema.parse(await c.req.json());

    const res = await authService.signin(email, password);

    return c.json({ token: res });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.issues }, 400);
    }

    return c.json({ error });
  }
});

app.post("/signup", async (c) => {
  try {
    const { email, password } = signupSchema.parse(await c.req.json());
    const res = await authService.signup({ email, password });
    return c.json({ token: res });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.issues }, 400);
    }

    return c.json({ error });
  }
});

export const authRoutes = app;
