import { Hono } from "hono";
import { authRoutes } from "./auth/auth.routes";
import { cvsRoutes } from "./cvs/cvs.router";
import { userRoutes } from "./user/user.routes";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/cvs", cvsRoutes);
app.route("/users", userRoutes);

export default {
  fetch: app.fetch,
  port: 4000,
};
