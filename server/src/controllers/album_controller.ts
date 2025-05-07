import { Router } from "@oak/oak/router";
import {
  deleteAlbum,
  getAlbum,
  getAlbums,
  getAlbumsByUser,
  NewDbAlbum,
  updateAlbum,
} from "../models/albums.ts";
import { AlbumResponse } from "../../../common/responses.ts";
import { CreateAlbumSchema, UpdateAlbumSchema } from "common";
import { getLoggedInUser } from "../auth.ts";
import { fileUpload, sql } from "../db.ts";
import * as v from "@valibot/valibot";
import { DbPhoto, getAllPhotosByAlbum } from "../models/photos.ts";
import { getAlbumReviewsByAlbum } from "../models/album_revews.ts";
export const albumRouter = new Router();

//get albums by user
albumRouter.get("/api/users/:id/albums", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const albums = await getAlbumsByUser(id);
  const response: AlbumResponse[] = await Promise.all(
    albums.map(async (album) => {
      const [album_ratings, album_pictures] = await Promise.all([
        getAlbumReviewsByAlbum(album.id),
        getAllPhotosByAlbum(album.id),
      ]);
      const average_rating = album_ratings.reduce((sum, rating) =>
        sum + rating.value, 0) / album_ratings.length;
      const rating_count = album_ratings.length;
      const picture_count = album_pictures.length;
      return {
        id: album.id,
        user_id: album.user_id,
        name: album.name,
        description: album.description,
        service_id: album.tag,
        is_public: album.is_public,
        cover_id: album.cover_id,
        average_rating: average_rating,
        comment_count: rating_count,
        picture_count: picture_count,
      };
    }),
  );

  ctx.response.body = response;
});

//get albums
albumRouter.get("/api/albums", async (ctx) => {
  const albums = await getAlbums();

  const response: AlbumResponse[] = await Promise.all(
    albums.map(async (album) => {
      const [album_ratings, album_pictures] = await Promise.all([
        getAlbumReviewsByAlbum(album.id),
        getAllPhotosByAlbum(album.id),
      ]);
      const average_rating = album_ratings.reduce((sum, rating) =>
        sum + rating.value, 0) / album_ratings.length;
      const rating_count = album_ratings.length;
      const picture_count = album_pictures.length;
      return {
        id: album.id,
        user_id: album.user_id,
        name: album.name,
        description: album.description,
        service_id: album.tag,
        is_public: album.is_public,
        cover_id: album.cover_id,
        average_rating: average_rating,
        comment_count: rating_count,
        picture_count: picture_count,
      };
    }),
  );

  ctx.response.body = response;
});

//get album
albumRouter.get("/api/albums/:id", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const album = await getAlbum(id);
  if (!album) {
    ctx.response.body = { message: "album nie istnieje" };
    ctx.response.status = 404;
    return;
  }

  const [album_ratings, album_pictures] = await Promise.all([
    getAlbumReviewsByAlbum(id),
    getAllPhotosByAlbum(id),
  ]);
  const average_rating = album_ratings.reduce((sum, rating) =>
    sum + rating.value, 0) / album_ratings.length;
  const rating_count = album_ratings.length;
  const picture_count = album_pictures.length;

  const response: AlbumResponse = {
    id: album.id,
    user_id: album.user_id,
    name: album.name,
    description: album.description,
    service_id: album.tag,
    is_public: album.is_public,
    cover_id: album.cover_id,
    average_rating: average_rating,
    comment_count: rating_count,
    picture_count: picture_count,
  };

  ctx.response.body = response;
});

// Stwórz nowy album
albumRouter.post("/api/albums", async (ctx) => {
  const formData = await ctx.request.body.formData();
  const formObject = Object.fromEntries(formData.entries());

  const validation_result = await v.safeParseAsync(
    CreateAlbumSchema,
    formObject,
  );

  if (!validation_result.success) {
    ctx.response.body = validation_result.issues;
    ctx.response.status = 400;
    return;
  }
  const req = validation_result.output;

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  if (req.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }

  const file_id = await fileUpload(req.file);

  const data = {
    user_id: logged_user.id,
    file_id: file_id,
  };

  const [photo] = await sql<DbPhoto[]>`INSERT INTO photos ${
    sql(data)
  } returning *`;

  const album: NewDbAlbum = {
    user_id: req.user_id,
    name: req.name,
    description: req.description,
    tag: req.service_id,
    is_public: req.is_public,
    cover_id: photo.id,
  };

  await sql`INSERT INTO albums ${sql(album)}`;
  ctx.response.body = {};
});

// zaktualizuj album
albumRouter.put("/api/albums/:id", async (ctx) => {
  const formData = await ctx.request.body.formData();
  const formObject = Object.fromEntries(formData.entries());

  const validation_result = await v.safeParseAsync(
    UpdateAlbumSchema,
    formObject,
  );

  if (!validation_result.success) {
    ctx.response.body = validation_result.issues;
    ctx.response.status = 400;
    return;
  }
  const req = validation_result.output;

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  if (req.user_id !== logged_user.id) {
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

  const album: NewDbAlbum = {
    user_id: req.user_id,
    name: req.name,
    description: req.description,
    tag: req.service_id,
    is_public: req.is_public,
    cover_id: updated_album.cover_id,
  };

  if (req.file) {
    const file_id = await fileUpload(req.file);

    const data = {
      user_id: logged_user.id,
      file_id: file_id,
    };

    const [photo] = await sql<DbPhoto[]>`INSERT INTO photos ${
      sql(data)
    } returning *`;

    album.cover_id = photo.id;
  }

  await updateAlbum(album, album_id);
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
