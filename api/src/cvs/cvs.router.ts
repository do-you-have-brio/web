import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { env } from "../env";

export const cvsRoutes = new Hono();

cvsRoutes.use(
  "*",
  jwt({
    secret: env.SECRET_KEY,
  }),
);

cvsRoutes.get("/", (c) => {
  return c.text("nice");
});
