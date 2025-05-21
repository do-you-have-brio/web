import { Hono } from "hono";
import { logger } from "hono/logger";
import { cvsRoutes } from "./cvs/cvs.router";
import { userRoutes } from "./user/user.routes";

const app = new Hono();

app.use(logger());

app.route("/cvs", cvsRoutes);
app.route("/users", userRoutes);

app.get("/health", (c) => c.text("OK"));

export default {
	fetch: app.fetch,
	port: 4000,
};
