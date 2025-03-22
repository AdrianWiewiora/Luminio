import { Router } from "@oak/oak/router";
import {
  deletePhotoReview,
  getPhotoReview,
  getPhotoReviewsByPhoto,
  getPhotoReviewsByUser,
  insertPhotoReview,
  NewDbPhotoReview,
  updatePhotoReview,
} from "../models/photo_reviews.ts";
import { PhotoReviewResponse } from "../../../common/responses.ts";
import * as v from "@valibot/valibot";
import { CreatePhotoReviewSchema, UpdatePhotoReviewSchema } from "common";
import { getLoggedInUser } from "../auth.ts";

export const photoReviewRouter = new Router();

//get photo_review
photoReviewRouter.get("/api/photo_reviews/:id", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const photo_review = await getPhotoReview(id);
  const response: PhotoReviewResponse = {
    id: photo_review.id,
    user_id: photo_review.user_id,
    photo_id: photo_review.photo_id,
    body: photo_review.body,
    value: photo_review.value,
  };

  ctx.response.body = response;
});

//get photo_reviews by user
photoReviewRouter.get("/api/users/:id/photo_reviews", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const photo_reviews = await getPhotoReviewsByUser(id);
  const response: PhotoReviewResponse[] = photo_reviews.map((photo_review) => {
    return {
      id: photo_review.id,
      user_id: photo_review.user_id,
      photo_id: photo_review.photo_id,
      body: photo_review.body,
      value: photo_review.value,
    };
  });

  ctx.response.body = response;
});

//get photo_reviews by photo
photoReviewRouter.get("/api/photos/:id/photo_reviews", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const photo_reviews = await getPhotoReviewsByPhoto(id);
  const response: PhotoReviewResponse[] = photo_reviews.map((photo_review) => {
    return {
      id: photo_review.id,
      user_id: photo_review.user_id,
      photo_id: photo_review.photo_id,
      body: photo_review.body,
      value: photo_review.value,
    };
  });

  ctx.response.body = response;
});

// Stwórz nowy review
photoReviewRouter.post("/api/photos/:id/photo_reviews", async (ctx) => {
  const body = await ctx.request.body.json();
  const request = v.parse(CreatePhotoReviewSchema, body);

  const logged_user = await getLoggedInUser(ctx);
  if (!logged_user) return;

  const commented_photo_id = Number.parseInt(ctx.params.id, 10);
  const photo_reviews = await getPhotoReviewsByPhoto(commented_photo_id);
  if (photo_reviews.map((review) => review.id).includes(logged_user.id)) {
    ctx.response.body = {
      message: "Komentarz użytkownika na tym zdjęciu już istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  const photo_review: NewDbPhotoReview = {
    user_id: request.user_id,
    photo_id: request.photo_id,
    body: request.body,
    value: request.value,
  };
  await insertPhotoReview(photo_review);

  // Sukces
  ctx.response.body = {};
});

// zaktualizuj review
photoReviewRouter.put("/api/photo_reviews/:id", async (ctx) => {
  const body = await ctx.request.body.json();
  const request = v.parse(UpdatePhotoReviewSchema, body);

  const comment_id = Number.parseInt(ctx.params.id, 10);
  const comment = await getPhotoReview(comment_id);
  if (!comment) {
    ctx.response.body = {
      message: "Aktualizowany komentarz nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  const photo_review: NewDbPhotoReview = {
    user_id: comment.user_id,
    photo_id: comment.photo_id,
    body: request.body,
    value: request.value,
  };
  await updatePhotoReview(photo_review, comment_id);

  // Sukces
  ctx.response.body = {};
});

//delete photo review
photoReviewRouter.delete("/api/photo_reviews/:id", async (ctx) => {
  const comment_id = Number.parseInt(ctx.params.id, 10);
  const comment = await getPhotoReview(comment_id);
  if (!comment) {
    ctx.response.body = {
      message: "Usuwany komentarz nie istnieje",
    };
    ctx.response.status = 400;
    return;
  }

  await deletePhotoReview(comment_id);

  // Sukces
  ctx.response.body = {};
});
