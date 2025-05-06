import { Router } from "@oak/oak/router";
import * as path from "@std/path";
import { UPLOADS_DIR } from "../../config.ts";
import { generate } from "@std/uuid/v1";
import { PhotoResponse, PostPhotoSchema } from "common";
import {
  getAllPhotos,
  getPhotoById,
  getPhotosByAlbum,
} from "../models/photos.ts";
import * as v from "@valibot/valibot";
import { sql } from "../db.ts";
import { getLoggedInUser } from "../auth.ts";

export const photosRouter = new Router();

photosRouter.get("/api/photos/:id", async (ctx) => {
  const id = Number(ctx.params.id);

  const result = await sql`
    SELECT file_path FROM photos WHERE id = ${id}
  `;

  const fileName = result[0].file_path;
  const filePath = path.join(UPLOADS_DIR, fileName);

  try {
    const file = await Deno.readFile(filePath);
    ctx.response.status = 200;
    ctx.response.body = file;
  } catch (err) {
    console.error("Błąd odczytu pliku:", err);
  }
});

photosRouter.get("/api/photos", async (ctx) => {
  // TODO: this is unsafe
  const photos = await getAllPhotos();

  const response: PhotoResponse[] = photos.map((photo) => {
    return {
      id: photo.id,
      user_id: photo.id,
      album_id: photo.album_id,
      category_id: photo.category_id,
      file_path: photo.file_path,
      created_at: photo.created_at,
    };
  });

  ctx.response.body = response;
});

//get photos by album
photosRouter.get("/api/albums/:id/photos", async (ctx) => {
  // TODO: this is unsafe
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
      file_path: photo.file_path,
      created_at: photo.created_at,
    };
  });

  ctx.response.body = response;
});

photosRouter.get("/api/photos/id/:id", async (ctx) => {
  // TODO: this is unsafe
  const photo_id = Number.parseInt(ctx.params.id, 10);
  const photo = await getPhotoById(photo_id);

  const response: PhotoResponse = {
    id: photo.id,
    user_id: photo.id,
    album_id: photo.album_id,
    category_id: photo.category_id,
    file_path: photo.file_path,
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
  const validation_result = await v.safeParseAsync(
    PostPhotoSchema,
    form_object,
  );

  if (!validation_result.success) {
    ctx.response.body = validation_result.issues;
    ctx.response.status = 400;
    return;
  }

  const validated_request = validation_result.output;
  const file_data = validated_request.file.stream();
  const file_name = generate();
  const file_path = path.join(UPLOADS_DIR, file_name);

  // Perfom a transaction because we don't want to insert anything to the database when the writeFile fails
  await sql.begin(async (sql) => {
    const data = {
      user_id: user.id,
      file_path: file_name,
      album_id: validated_request.album_id,
      category_id: validated_request.category_id,
    };
    await sql`INSERT INTO photos ${sql(data)}`;
    await Deno.writeFile(file_path, file_data);
  });

  ctx.response.body = {};
});
