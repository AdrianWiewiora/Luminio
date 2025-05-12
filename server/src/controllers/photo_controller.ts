import { Router } from "@oak/oak/router";
import { PhotoResponse, PostPhotoSchema } from "common";
import { getPhotoById, getPhotosByAlbum } from "../models/photos.ts";
import * as v from "@valibot/valibot";
import { fileUpload, getFile, sql } from "../db.ts";
import { getLoggedInUser } from "../auth.ts";

export const photosRouter = new Router();

photosRouter.get("/api/files/:id", async (ctx) => {
  const id = Number(ctx.params.id);
  const file = await getFile(id);
  ctx.response.body = file;
});

//get photos by album
photosRouter.get("/api/albums/:id/photos", async (ctx) => {
  const amountParam = ctx.request.url.searchParams.get("amount");
  const pageParam = ctx.request.url.searchParams.get("page");

  const amount = amountParam ? parseInt(amountParam, 10) : 1;
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const album_id = Number.parseInt(ctx.params.id, 10);
  const offset = (page - 1) * amount;
  const photos = await getPhotosByAlbum(album_id, amount, offset);

  const response: PhotoResponse[] = photos.map((photo) => {
    return {
      id: photo.id,
      user_id: photo.id,
      album_id: photo.album_id,
      category_id: photo.category_id,
      file_id: photo.file_id,
      created_at: photo.created_at,
    };
  });

  ctx.response.body = response;
});

photosRouter.get("/api/photos/:id", async (ctx) => {
  const photo_id = Number.parseInt(ctx.params.id, 10);
  const photo = await getPhotoById(photo_id);

  const response: PhotoResponse = {
    id: photo.id,
    user_id: photo.id,
    album_id: photo.album_id,
    category_id: photo.category_id,
    file_id: photo.file_id,
    created_at: photo.created_at,
  };

  ctx.response.body = response;
});

photosRouter.post("/api/photos", async (ctx) => {
  const user = await getLoggedInUser(ctx);
  if (!user) {
    return;
  }

  const form_data = await ctx.request.body.formData();
  const form_object = Object.fromEntries(form_data.entries());
  const validation = await v.safeParseAsync(
    PostPhotoSchema,
    form_object,
  );

  if (!validation.success) {
    ctx.response.body = validation.issues;
    ctx.response.status = 400;
    return;
  }

  const req = validation.output;
  const file_id = await fileUpload(req.file);
  const data = {
    user_id: user.id,
    album_id: req.album_id,
    category_id: req.category_id,
    file_id: file_id,
  };

  await sql`INSERT INTO photos ${sql(data)}`;
  ctx.response.body = {};
});
