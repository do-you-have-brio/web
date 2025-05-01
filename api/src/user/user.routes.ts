import { Hono } from "hono";
import { UserService } from "./user.service";
import { HTTPException } from "hono/http-exception";

export const userRoutes = new Hono();

const userService = new UserService();

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
  const body = await c.req.json();
  try {
    const updatedUser = await userService.updateUser(id, body);
    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
  }
});
