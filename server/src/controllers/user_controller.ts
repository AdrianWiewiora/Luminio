import { Router } from "@oak/oak/router";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUserByMail,
  insertUser,
  NewDbUser,
  updateUser,
} from "./../models/users.ts";
import { hash, verify } from "@felix/bcrypt";
import * as v from "@valibot/valibot";
import {
  AvatarChangeSchema,
  LoginSchema,
  RegistrationErrorResponse,
  RegistrationSchema,
  UpdateUserSchema,
  UserResponse,
} from "common";
import {
  createSession,
  deleteSession,
  getUserStats,
} from "./../models/sessions.ts";
import { getLoggedInUser } from "../auth.ts";
import { fileUpload } from "../db.ts";
import { avatar_url } from "../util.ts";

export const userRouter = new Router();

//Przykładowy endpoint zwracający wszystkich użytkowników
userRouter.get("/api/users", async (ctx) => {
  const users = await getAllUsers();
  const response: UserResponse[] = await Promise.all(users.map(async (user) => {
    const stats = await getUserStats(user.id);
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      city: user.city,
      phone_number: user.phone_number,
      email: user.email,
      user_description: user.user_description,
      average_rating: stats.average_rating,
      comment_count: stats.comment_count,
      album_count: stats.album_count,
      avatar_url: avatar_url(user),
    };
  }));

  ctx.response.body = response;
});

// Przykładowa rejestracja
userRouter.post("/api/register", async (ctx) => {
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

// Login
userRouter.post("/api/login", async (ctx) => {
  const request = v.parse(LoginSchema, await ctx.request.body.json());

  const user = await getUserByMail(request.email);
  if (user && await verify(request.password, user.password_hash)) {
    const session = await createSession(user.id);
    ctx.cookies.set("SESSION", session.id);
    ctx.response.body = {};
    return;
  } else {
    ctx.response.status = 401;
    ctx.response.body = { message: "Niepoprawny email lub hasło" };
  }
});

// Logout
userRouter.post("/api/logout", async (ctx) => {
  const user = await getLoggedInUser(ctx);
  if (!user) return;

  await deleteSession(user.id);
  ctx.cookies.delete("SESSION");
  ctx.response.body = {};
});

userRouter.get("/api/me", async (ctx) => {
  const user = await getLoggedInUser(ctx);
  if (!user) {
    ctx.response.status = 204;
    ctx.response.body = undefined;
    return;
  }

  const stats = await getUserStats(user.id);
  const response: UserResponse = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    city: user.city,
    average_rating: stats.average_rating,
    comment_count: stats.comment_count,
    album_count: stats.album_count,
    user_description: user.user_description,
    phone_number: user.phone_number,
    email: user.email,
    avatar_url: avatar_url(user),
  };

  ctx.response.body = response;
});

// GET wybranego użytkownika
userRouter.get("/api/users/:id", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const user = await getUser(id);
  if (user == null) return ctx.response.status = 404;
  const stats = await getUserStats(id);
  const response: UserResponse = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    user_description: user.user_description,
    city: user.city,
    average_rating: stats.average_rating,
    comment_count: stats.comment_count,
    album_count: stats.album_count,
    phone_number: user.phone_number,
    email: user.email,
    avatar_url: avatar_url(user),
  };
  ctx.response.body = response;
});

// Modyfikacja użytkownika
userRouter.put("/api/me", async (ctx) => {
  const user = await getLoggedInUser(ctx);
  if (!user) return;

  const body = await ctx.request.body.json();
  const request = v.parse(UpdateUserSchema, body);

  const user_after_editing = { ...user, ...request };
  await updateUser(user_after_editing, user.id);

  ctx.response.body = {};
});

// Usunięcie użytkownika
userRouter.delete("/api/me", async (ctx) => {
  const user = await getLoggedInUser(ctx);
  if (!user) return;

  await deleteUser(user.id);
  ctx.cookies.delete("SESSION");
  ctx.response.body = {};
});

// Ustawianie własnego profilowego
userRouter.post("/api/avatar", async (ctx) => {
  const user = await getLoggedInUser(ctx);
  if (!user) return;

  const form_data = await ctx.request.body.formData();
  const file = form_data.get("file");
  const validation = v.safeParse(AvatarChangeSchema, file);
  if (!validation.success) {
    ctx.response.body = validation.issues;
    ctx.response.status = 400;
    return;
  }

  const file_id = await fileUpload(validation.output);
  await updateUser({ avatar_file_id: file_id }, user.id);
  ctx.response.body = {};
});
