import { Hono } from "hono";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

const app = new Hono();

app.post("/signin", (c) => {
  return c.text("Signin route");
});

export const authRoutes = app;
