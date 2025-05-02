import { Hono } from "hono";
import { jwt } from "hono/jwt";

export const cvsRoutes = new Hono();

const secret = process.env.SECRET_KEY!;

cvsRoutes.use(
  "*",
  jwt({
    secret,
  }),
);

cvsRoutes.get("/", async (c) => {
  return c.text("nice");
});
