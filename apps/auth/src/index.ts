import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { ZodError } from "zod";
import { routes } from "./routes";

const app = new Hono();

app.use(logger());
app.use(cors());

app.route("/", routes);

app.onError((err, c) => {
	console.log(err);

	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	if (err instanceof SyntaxError) {
		return c.json({ message: "No body" }, 400);
	}

	if (err instanceof ZodError) {
		return c.json({ message: err }, 400);
	}

	return c.json({ message: err }, 500);
});

export default {
	fetch: app.fetch,
	port: 4001,
};
