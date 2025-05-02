import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { z, ZodError } from "zod";
import { OpenAI } from "openai";

const app = new Hono();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(logger());
app.use(cors({ origin: "*" }));

const schema = z.object({
  profile: z.object({
    education: z.array(z.any()),
    jobs: z.array(z.any()),
    repositories: z.array(z.any()),
  }),
  job: z.object({
    description: z.string(),
  }),
});

app.post("/analyze", async (c) => {
  try {
    const { job, profile } = schema.parse(await c.req.json());

    const prompt = `
  You are an AI assistant helping to match candidates to job descriptions.

  User profile:
  Education: ${JSON.stringify(profile.education)}
  Experience: ${JSON.stringify(profile.jobs)}
  Projects: ${JSON.stringify(profile.repositories)}

  Job description:
  ${job.description}

  Analyze the fit between this profile and job. Respond with a JSON like:
  {
    "match": %,
    "missingSkills": [...],
    "summary": "short explanation"
  }
  `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4.1-nano",
      temperature: 0.3,
    });

    const result = completion.choices[0].message.content;

    if (!result) {
      return c.json({ error: "No response from OpenAI" }, 500);
    }

    const parsedResult = JSON.parse(result);

    return c.json({ data: parsedResult }, 200);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(err);
      return c.json({ error: err.errors }, 400);
    }

    return c.json({ error: "Invalid request body" }, 400);
  }
});

export default {
  fetch: app.fetch,
  port: 4001,
};
