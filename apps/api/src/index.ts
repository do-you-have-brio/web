import { type Context, Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "./env";

const app = new Hono();

app.use(logger());
app.use("*", cors());

app.get("/_gateway/health", (c) => c.text("API Gateway is OK"));

async function proxyRequest(c: Context, targetServiceUrl: string) {
	const url = new URL(c.req.url);
	const targetUrl = `${targetServiceUrl}/${url.pathname.substring(c.req.routePath.length - 1)}${url.search}`;
	// auth/login?foo=bar -> ${authurl}/login?foo=bar

	console.log(`Proxying request from ${c.req.url} to ${targetUrl}`);

	const response = await fetch(targetUrl, {
		method: c.req.method,
		headers: c.req.raw.headers,
		body: c.req.raw.body,
	});

	// Create a new Hono Response from the Fetch API Response
	// This ensures headers, status, and body are correctly passed through
	const responseBody = await response.arrayBuffer();

	const honoResponse = new Response(responseBody, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	});

	return honoResponse;
}

app.all("auth/*", async (c) => {
	return proxyRequest(c, env.AUTH_SERVICE_URL);
});

// Fallback
app.all("*", (c) => c.json({ error: "Route not found in gateway" }, 404));

export default {
	fetch: app.fetch,
	port: Number.parseInt(process.env.PORT || "4000", 10),
};

console.log(`Proxying to AUTH_SERVICE at ${env.AUTH_SERVICE_URL}`);
