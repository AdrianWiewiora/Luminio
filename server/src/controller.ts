import { Router } from "@oak/oak/router";
import { getUserById, insertUser, User } from "./models/user.ts";

export const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello world";
});

router.post("/createuser", async (ctx) => {

  //feel free to scrap any changes made :)

  /*const user: User = {
    first_name: "Damian",
    last_name: "Main",
    email: "",
    password_hash: "123",
    user_description: "Fajowy gośc",
    role: 1,
    created_at: 0
  };*/
  const user: User = await ctx.request.body.json()
  await insertUser(user);
  ctx.response.body = user.first_name + " to koks";
});

router.get("/getuser", async (ctx) => {
  const user = await getUserById(0);
  ctx.response.body = user;
});
