import { Router } from "@oak/oak/router";
import {
  deleteAlbum,
  getAlbum,
  getAlbumsByUser,
  NewDbAlbum,
  updateAlbum,
  getAlbums
} from "../models/albums.ts";
import * as path from "@std/path";
import { UPLOADS_DIR } from "../../config.ts";
import { AlbumResponse } from "../../../common/responses.ts";
import { CreateAlbumSchema, UpdateAlbumSchema } from "common";
import { getLoggedInUser } from "../auth.ts";
import { sql } from "../db.ts";
import * as v from "@valibot/valibot";
import { generate } from "@std/uuid/v1";
import { DbPhoto } from "../models/photos.ts";
export const albumRouter = new Router();

//get albums by user
albumRouter.get("/api/users/:id/albums", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const albums = await getAlbumsByUser(id);
  const response: AlbumResponse[] = albums.map((album) => {
    return {
      id: album.id,
      user_id: album.user_id,
      name: album.name,
      description: album.description,
      service_id: album.tag,
      is_public: album.is_public,
      cover_id: album.cover_id
    };
  });

  ctx.response.body = response;
});

//get albums
albumRouter.get("/api/albums", async (ctx) => {
  const albums = await getAlbums();
  const response: AlbumResponse[] = albums.map((album) => {
    return {
      id: album.id,
      user_id: album.user_id,
      name: album.name,
      description: album.description,
      service_id: album.tag,
      is_public: album.is_public,
      cover_id: album.cover_id
    };
  });

  ctx.response.body = response;
});

//get album
albumRouter.get("/api/albums/:id", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const album = await getAlbum(id);
  if(!album){
    ctx.response.body = { message: "album nie istnieje" };
    ctx.response.status = 404;
    return;
  }
  const response: AlbumResponse = {
    id: album.id,
    user_id: album.user_id,
    name: album.name,
    description: album.description,
    service_id: album.tag,
    is_public: album.is_public,
    cover_id: album.cover_id
  };

  ctx.response.body = response;
});

// Stwórz nowy album
albumRouter.post("/api/albums", async (ctx) => {
  const formData = await ctx.request.body.formData();
  const formObject = Object.fromEntries(formData.entries());

  const validation_result = await v.safeParseAsync(
    CreateAlbumSchema,
    formObject
  );

  if (!validation_result.success) {
    ctx.response.body = validation_result.issues;
    ctx.response.status = 400;
    return;
  }
  const request = validation_result.output;

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  if (request.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }
    const file_data = request.file.stream();
    const file_name = generate();
    const file_path = path.join(UPLOADS_DIR, file_name);
  
    // Perfom a transaction because we don't want to insert anything to the database when the writeFile fails
    await sql.begin(async (sql) => {
      const data = {
        user_id: logged_user.id,
        file_path: file_name,
      };
      const [photo] = await sql<DbPhoto[]>`INSERT INTO photos ${sql(data)} returning *`;
      console.log(photo.id)
      const album: NewDbAlbum = {
        user_id: request.user_id,
        name: request.name,
        description: request.description,
        tag: request.service_id,
        is_public: request.is_public,
        cover_id: photo.id
      };
      await sql`INSERT INTO albums ${sql(album)}`;
      await Deno.writeFile(file_path, file_data);
    });

  // Sukces
  ctx.response.body = {};
});

// zaktualizuj album
albumRouter.put("/api/albums/:id", async (ctx) => {
  const formData = await ctx.request.body.formData();
  const formObject = Object.fromEntries(formData.entries());

  const validation_result = await v.safeParseAsync(
    UpdateAlbumSchema,
    formObject
  );

  if (!validation_result.success) {
    ctx.response.body = validation_result.issues;
    ctx.response.status = 400;
    return;
  }
  const request = validation_result.output;

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  if (request.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }

  const album_id = Number.parseInt(ctx.params.id, 10);
  const updated_album = await getAlbum(album_id);
  if (!updated_album) {
    ctx.response.body = {
      message: "Aktualizowany album nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  if(!request.file){
  const album: NewDbAlbum = {
    user_id: request.user_id,
    name: request.name,
    description: request.description,
    tag: request.service_id,
    is_public: request.is_public,
    cover_id: updated_album.cover_id
  };
  await updateAlbum(album, album_id);}
  else{
    const file_data = request.file.stream();
    const file_name = generate();
    const file_path = path.join(UPLOADS_DIR, file_name);
  
    // Perfom a transaction because we don't want to insert anything to the database when the writeFile fails
    await sql.begin(async (sql) => {
      const data = {
        user_id: logged_user.id,
        file_path: file_name,
      };
      const [photo] = await sql<DbPhoto[]>`INSERT INTO photos ${sql(data)} returning *`;
      console.log(photo.id)
      const album: NewDbAlbum = {
        user_id: request.user_id,
        name: request.name,
        description: request.description,
        tag: request.service_id,
        is_public: request.is_public,
        cover_id: photo.id
      };
      await sql`UPDATE albums SET ${sql(album)} WHERE id = ${album_id};`
      await Deno.writeFile(file_path, file_data);
    });
  }

  // Sukces
  ctx.response.body = {};
});

// usuń album
albumRouter.delete("/api/albums/:id", async (ctx) => {
  const album_id = Number.parseInt(ctx.params.id, 10);
  const album = await getAlbum(album_id);

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  if (!album) {
    ctx.response.body = {
      message: "Usuwany album nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  if (album.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }

  await deleteAlbum(album_id);

  // Sukces
  ctx.response.body = {};
});
