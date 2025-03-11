import { Router } from "@oak/oak/router";
import {
  getAllUsers,
  getUser,
  getUserByMail,
  insertUser,
  NewDbUser,
} from "./models/users.ts";
import { RegistrationErrorResponse, UserResponse } from "common/responses";
import { hash } from "@felix/bcrypt";
import * as v from "@valibot/valibot";
import { RegistrationSchema } from "./schemas.ts";

export const router = new Router();

// Przykładowy endpoint zwracający wszystkich użytkowników
router.get("/api/users", async (ctx) => {
  const users = await getAllUsers();
  const response: UserResponse[] = users.map((user) => {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      user_description: user.user_description,
    };
  });

  ctx.response.body = response;
});

// Przykładowa rejestracja
router.post("/api/register", async (ctx) => {
  const body = await ctx.request.body.json();
  const request = v.parse(RegistrationSchema, body);

  const existing_user = await getUserByMail(request.email);
  if (existing_user) {
    const response: RegistrationErrorResponse = {
      message: "Ten mail już został zarejestrowany",
    };

    ctx.response.body = response;
    ctx.response.status = 400;
    return;
  }

  const password_hash = await hash(request.password);
  const user: NewDbUser = {
    first_name: request.first_name,
    last_name: request.last_name,
    email: request.email,
    password_hash: password_hash,
    user_description: request.user_description,
    phone_number: request.phone_number,
    city: request.city,
    role: 0, // TODO
  };
  await insertUser(user);

  // Sukces
  ctx.response.body = {};
});

// GET wybranego użytkownika
router.get("/api/users/:id", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const user = await getUser(id);
  const response: UserResponse = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    user_description: user.user_description,
  };
  ctx.response.body = response;
});
