import { Router } from "@oak/oak/router";
import { getUserById, insertUser, User } from "./models/user.ts";

export const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello world";
});

router.get("/createuser", async (ctx) => {
  const user: User = {
    id: 0,
    first_name: "Damian",
    last_name: "Main",
    email: "damian@damian.pl",
    password_hash: "123",
    user_description: "Fajowy gośc",
    created_at: 0,
    avatar_id: 0,
  };

  await insertUser(user);
  ctx.response.body = "koks";
});

router.get("/getuser", async (ctx) => {
  const user = await getUserById(0);
  ctx.response.body = user;
});
