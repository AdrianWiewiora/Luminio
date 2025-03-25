import { Router } from "@oak/oak/router";
import * as v from "@valibot/valibot";
import { getLoggedInUser } from "../auth.ts";
import {
  deleteAlbumReview,
  getAlbumReview,
  getAlbumReviewsByAlbum,
  getAlbumReviewsByUser,
  insertAlbumReview,
  NewDbAlbumReview,
  updateAlbumReview,
} from "../models/album_revews.ts";
import { AlbumReviewResponse } from "../../../common/responses.ts";
import { CreateAlbumReviewSchema, UpdateAlbumReviewSchema } from "common";

export const albumReviewRouter = new Router();

//get album_review
albumReviewRouter.get("/api/album_reviews/:id", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const album_review = await getAlbumReview(id);
  const response: AlbumReviewResponse = {
    id: album_review.id,
    user_id: album_review.user_id,
    album_id: album_review.album_id,
    body: album_review.body,
    value: album_review.value,
  };

  ctx.response.body = response;
});

//get album_reviews by user
albumReviewRouter.get("/api/users/:id/album_reviews", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const album_reviews = await getAlbumReviewsByUser(id);
  const response: AlbumReviewResponse[] = album_reviews.map((album_review) => {
    return {
      id: album_review.id,
      user_id: album_review.user_id,
      album_id: album_review.album_id,
      body: album_review.body,
      value: album_review.value,
    };
  });

  ctx.response.body = response;
});

//get album_reviews by album
albumReviewRouter.get("/api/albums/:id/album_reviews", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const album_reviews = await getAlbumReviewsByAlbum(id);
  const response: AlbumReviewResponse[] = album_reviews.map((album_review) => {
    return {
      id: album_review.id,
      user_id: album_review.user_id,
      album_id: album_review.album_id,
      body: album_review.body,
      value: album_review.value,
    };
  });

  ctx.response.body = response;
});

// Stwórz nowy review
albumReviewRouter.post("/api/album_reviews", async (ctx) => {
  const body = await ctx.request.body.json();
  const request = v.parse(CreateAlbumReviewSchema, body);

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  const album_reviews = await getAlbumReviewsByAlbum(request.album_id);
  if (album_reviews.map((review) => review.id).includes(logged_user.id)) {
    ctx.response.body = {
      message: "Komentarz użytkownika na tym albumie już istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  if (request.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }

  const album_review: NewDbAlbumReview = {
    user_id: request.user_id,
    album_id: request.album_id,
    body: request.body,
    value: request.value,
  };
  await insertAlbumReview(album_review);

  // Sukces
  ctx.response.body = {};
});

// zaktualizuj review
albumReviewRouter.put("/api/album_reviews/:id", async (ctx) => {
  const body = await ctx.request.body.json();
  const request = v.parse(UpdateAlbumReviewSchema, body);

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  const comment_id = Number.parseInt(ctx.params.id, 10);
  const comment = await getAlbumReview(comment_id);
  if (!comment) {
    ctx.response.body = {
      message: "Aktualizowany komentarz nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  if (comment.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }

  const album_review: NewDbAlbumReview = {
    user_id: comment.user_id,
    album_id: comment.album_id,
    body: request.body,
    value: request.value,
  };
  await updateAlbumReview(album_review, comment_id);

  // Sukces
  ctx.response.body = {};
});

//delete album review
albumReviewRouter.delete("/api/album_reviews/:id", async (ctx) => {
  const comment_id = Number.parseInt(ctx.params.id, 10);
  const comment = await getAlbumReview(comment_id);

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  if (!comment) {
    ctx.response.body = {
      message: "Usuwany komentarz nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  if (comment.user_id !== logged_user.id) {
    ctx.response.body = {
      message: "próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }

  await deleteAlbumReview(comment_id);

  // Sukces
  ctx.response.body = {};
});
