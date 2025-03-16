import * as v from "@valibot/valibot";

export const RegistrationSchema = v.object({
  first_name: v.string(),
  last_name: v.string(),
  user_description: v.string(),
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
  phone_number: v.string(),
  city: v.string(),
});

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
});

export const CreateAlbumSchema = v.object({
  user_id: v.number(),
  name: v.string(),
  description: v.string(),
  service_id: v.number(),
  is_public: v.boolean(),
});

export const UpdateAlbumSchema = v.object({
  album_id: v.number(),
  name: v.optional(v.string()),
  description: v.optional(v.string()),
  service_id: v.optional(v.number()),
  is_public: v.optional(v.boolean()),
});

export const AddPhotoToAlbumSchema = v.object({
  photo_id: v.number(),
  album_id: v.number(),
});

export const CreatePhotoReviewSchema = v.object({
  photo_id: v.number(),
  body: v.string(),
  value: v.number(),
});

export const UpdatePhotoReviewSchema = v.object({
  photo_review_id: v.number(),
  body: v.optional(v.string()),
  value: v.optional(v.number()),
});

export const CreateAlbumReviewSchema = v.object({
  album_id: v.number(),
  body: v.string(),
  value: v.number(),
});

export const UpdateAlbumReviewSchema = v.object({
  album_review_id: v.number(),
  body: v.optional(v.string()),
  value: v.optional(v.number()),
});

export const UpdateUserSchema = v.object({
  id: v.number(),
  first_name: v.optional(v.string()),
  last_name: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email())),
  password: v.optional(v.string()),
  user_description: v.optional(v.string()),
  phone_number: v.optional(v.string()),
  city: v.optional(v.string()),
  portfolio_url: v.optional(v.string()),
  linkedin_url: v.optional(v.string()),
  instagram_url: v.optional(v.string()),
  dribble_url: v.optional(v.string()),
  other_url: v.optional(v.string()),
});