import * as v from "@valibot/valibot";

export const CreatePhotoReviewSchema = v.object({
  photo_id: v.number(),
  body: v.string(),
  value: v.number(),
});

export type CreatePhotoReviewRequest = v.InferOutput<
  typeof CreatePhotoReviewSchema
>;

export const UpdatePhotoReviewSchema = v.object({
  photo_review_id: v.number(),
  body: v.optional(v.string()),
  value: v.optional(v.number()),
});

export type UpdatePhotoReviewRequest = v.InferOutput<
  typeof UpdatePhotoReviewSchema
>;
