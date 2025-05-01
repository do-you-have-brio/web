import { Hono } from "hono";
import { UserService } from "./user.service";
import { HTTPException } from "hono/http-exception";
import { CreateEducationSchema, UpdateUserSchema } from "./user.dto";
import { jwt } from "hono/jwt";
import { env } from "../env";

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

userRoutes.post("/:id/educations", async (c) => {
  const { id } = c.req.param();

  try {
    const body = CreateEducationSchema.parse(await c.req.json());

    const updatedUser = await userService.addEducation(id, body);

    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
  }
});

userRoutes.delete("/:id/educations/:educationId", async (c) => {
  const { id, educationId } = c.req.param();

  try {
    const updatedUser = await userService.removeEducation(id, educationId);

    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
  }
});
