import { serve } from "bun";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    origin: "*",
  }),
);

const token = "honoiscool";

app.use("/api/*", bearerAuth({ token }));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/health", (c) => {
  return c.text("ok");
});

serve({
  fetch: app.fetch,
  port: 4000,
});
