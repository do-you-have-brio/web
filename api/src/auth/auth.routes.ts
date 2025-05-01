import { Hono } from "hono";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { signinSchema, signupSchema } from "./auth.dto";

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
    return c.text("Internal server error", 500);
  }
});

app.post("/signup", async (c) => {
  try {
    const { email, password } = signupSchema.parse(await c.req.json());
    const res = await authService.signup(email, password);
    return c.json({ token: res });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.issues }, 400);
    }
    return c.text("Internal server error", 500);
  }
});

export const authRoutes = app;
