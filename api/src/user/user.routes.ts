import { Hono } from "hono";

export const userRoutes = new Hono();

userRoutes.patch("/:id", async (c) => {
	const { id } = c.req.param();
});
