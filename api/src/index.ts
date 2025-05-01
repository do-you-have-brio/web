import { Hono } from "hono";

const app = new Hono();

import { jwt } from "hono/jwt";
import { authRoutes } from "./auth/auth.routes";
import { cvsRoutes } from "./cvs/cvs.router";

app.route("/auth", authRoutes);
app.route("/cvs", cvsRoutes);

export default {
	fetch: app.fetch,
	port: 4000,
};
