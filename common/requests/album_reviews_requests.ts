import * as v from "@valibot/valibot";

export const CreateAlbumReviewSchema = v.object({
  album_id: v.number(),
  body: v.string(),
  value: v.number(),
});

export type CreateAlbumReviewRequest = v.InferOutput<
  typeof CreateAlbumReviewSchema
>;

export const UpdateAlbumReviewSchema = v.object({
  album_review_id: v.number(),
  body: v.optional(v.string()),
  value: v.optional(v.number()),
});

export type UpdateAlbumReviewRequest = v.InferOutput<
  typeof UpdateAlbumReviewSchema
>;
