import { Hono } from "hono";

export const userRoutes = new Hono();

userRoutes.patch("/:id", (c) => {
	// const { id } = c.req.param();
	return c.text("");
});
