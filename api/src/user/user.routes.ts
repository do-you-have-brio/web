import { Hono } from "hono";
import { UserService } from "./user.service";
import { HTTPException } from "hono/http-exception";
import {
  CreateEducationSchema,
  UpdateUserSchema,
  CreateJobSchema,
} from "./user.dto";
import { jwt } from "hono/jwt";
import { env } from "../env";
import { User } from "../../generated/prisma";
import { JWTPayload } from "hono/utils/jwt/types";

export const userRoutes = new Hono();

const userService = new UserService();

userRoutes.use(
  "*",
  jwt({
    secret: env.SECRET_KEY,
  }),
);

userRoutes.get("/", async (c) => {
  try {
    const users = await userService.findAll();
    return c.json(users);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
  }
});

userRoutes.get("/:id", async (c) => {
  const { id } = c.req.param();
  try {
    const user = await userService.findById(id);
    return c.json(user);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
  }
});

userRoutes.patch("/:id", async (c) => {
  const { id } = c.req.param();
  const body = UpdateUserSchema.parse(await c.req.json());
  try {
    const updatedUser = await userService.updateUser(id, body);
    return c.json(updatedUser);
  } catch (error) {
    console.log(error);
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
  }
});

userRoutes.post("/educations", async (c) => {
  try {
    const user = c.get("jwtPayload");

    const body = CreateEducationSchema.parse(await c.req.json());

    const updatedUser = await userService.addEducation(user.rest.id, body);

    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
  }
});

userRoutes.delete("/educations/:educationId", async (c) => {
  try {
    const { educationId } = c.req.param();
    const { user } = c.get("jwtPayload");

    const updatedUser = await userService.removeEducation(user.id, educationId);

    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }

    console.error(error);
  }
});

userRoutes.post("/jobs", async (c) => {
  try {
    const user = c.get("jwtPayload");

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const body = CreateJobSchema.parse(await c.req.json());

    const updatedUser = await userService.addJob(user.rest.id, body);

    return c.json({
      message: "Job added successfully",
      updatedUser,
    });
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }

    return c.json({ error: error }, 500);
  }
});
