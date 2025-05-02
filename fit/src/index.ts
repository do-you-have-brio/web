import { GoogleGenAI } from "@google/genai";
import { write } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { OpenAI } from "openai";
import { z, ZodError } from "zod";

const envSchema = z.object({
  API_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);

const ai = new GoogleGenAI({ apiKey: env.API_KEY });

const app = new Hono();

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

    write("prompt.txt", prompt);

    const completion = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    console.log(completion);

    return c.json(completion);
  } catch (error) {
    if (error instanceof ZodError) {
      return c.json({ error: error.errors }, 400);
    }

    console.error(error);

    return c.json({ error: error }, 400);
  }
});

export default {
  fetch: app.fetch,
  port: 4001,
};
