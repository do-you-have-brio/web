import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { routes } from "./routes";

const app = new Hono();

app.use(logger());
app.use(cors());

app.route("/auth", routes);

export default {
	fetch: app.fetch,
	port: 4002,
};
