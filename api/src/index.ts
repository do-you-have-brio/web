import { Hono } from "hono";

const app = new Hono();

import { authRoutes } from "./auth/auth.routes";

app.route("/auth", authRoutes);

export default {
  fetch: app.fetch,
  port: 4000,
};
