import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { env } from "../env";

export const cvsRoutes = new Hono();

cvsRoutes.use(
  "*",
  jwt({
    secret,
  }),
);

cvsRoutes.get("/", async (c) => {
  return c.text("nice");
});
