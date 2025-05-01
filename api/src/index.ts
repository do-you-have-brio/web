import { Hono } from "hono";
import { authRoutes } from "./auth/auth.routes";
import { cvsRoutes } from "./cvs/cvs.router";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/cvs", cvsRoutes);

export default {
	fetch: app.fetch,
	port: 4000,
};
