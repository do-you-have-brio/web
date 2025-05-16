import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const prisma = new PrismaClient();

const app = new Hono();

app.get("/", async (c) => {
	const users = await prisma.user.findMany();
	return c.json({ users });
});

export default {
	fetch: app.fetch,
	port: 4000,
};
