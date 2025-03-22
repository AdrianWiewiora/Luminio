import { Router } from "@oak/oak/router";
import {
  deleteAlbum,
  getAlbum,
  getAlbumsByUser,
  insertAlbum,
  NewDbAlbum,
  updateAlbum,
} from "../models/albums.ts";
import { AlbumResponse } from "../../../common/responses.ts";
import { CreateAlbumSchema, UpdateAlbumSchema } from "common";
import { getLoggedInUser } from "../auth.ts";
import * as v from "@valibot/valibot";

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
    };
  });

  ctx.response.body = response;
});

//get album
albumRouter.get("/api/albums/:id", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const album = await getAlbum(id);
  const response: AlbumResponse = {
    id: album.id,
    user_id: album.user_id,
    name: album.name,
    description: album.description,
    service_id: album.tag,
    is_public: album.is_public,
  };

  ctx.response.body = response;
});

// Stwórz nowy album
albumRouter.post("/api/albums", async (ctx) => {
  const body = await ctx.request.body.json();
  const request = v.parse(CreateAlbumSchema, body);

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  if (request.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
  }

  const album: NewDbAlbum = {
    user_id: request.user_id,
    name: request.name,
    description: request.description,
    tag: request.service_id,
    is_public: request.is_public,
  };
  await insertAlbum(album);

  // Sukces
  ctx.response.body = {};
});

// zaktualizuj album
albumRouter.put("/api/albums/:id", async (ctx) => {
  const body = await ctx.request.body.json();
  const request = v.parse(UpdateAlbumSchema, body);

  const album_id = Number.parseInt(ctx.params.id, 10);
  const updated_album = await getAlbum(album_id);
  if (!updated_album) {
    ctx.response.body = {
      message: "Aktualizowany album nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  const album: NewDbAlbum = {
    user_id: request.user_id,
    name: request.name,
    description: request.description,
    tag: request.service_id,
    is_public: request.is_public,
  };
  await updateAlbum(album, album_id);

  // Sukces
  ctx.response.body = {};
});

// usuń album
albumRouter.delete("/api/albums/:id", async (ctx) => {
  const album_id = Number.parseInt(ctx.params.id, 10);
  const album = await getAlbum(album_id);
  if (!album) {
    ctx.response.body = {
      message: "Usuwany album nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  await deleteAlbum(album_id);

  // Sukces
  ctx.response.body = {};
});
