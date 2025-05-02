import { Hono } from "hono";
import { authRoutes } from "./auth/auth.routes";
import { cvsRoutes } from "./cvs/cvs.router";
import { userRoutes } from "./user/user.routes";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.route("/auth", authRoutes);
app.route("/cvs", cvsRoutes);
app.route("/users", userRoutes);

app.get("/health", (c) => c.text("OK"));

export default {
  fetch: app.fetch,
  port: 4000,
};
