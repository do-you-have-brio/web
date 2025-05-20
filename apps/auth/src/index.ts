import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRoutes } from "./routes";

const app = new Hono();

app.use(logger());
app.use(cors());

app.route("/auth", authRoutes);

export default {
	fetch: app.fetch,
	port: 4001,
};
