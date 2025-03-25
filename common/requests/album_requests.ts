import * as v from "@valibot/valibot";

export const CreateAlbumSchema = v.object({
  user_id: v.number(),
  name: v.string(),
  description: v.string(),
  service_id: v.number(),
  is_public: v.boolean(),
});

export type CreateAlbumRequest = v.InferOutput<typeof CreateAlbumSchema>;

export const UpdateAlbumSchema = v.object({
  user_id: v.number(),
  album_id: v.number(),
  name: v.string(),
  description: v.string(),
  service_id: v.number(),
  is_public: v.boolean(),
});

export type UpdateAlbumRequest = v.InferOutput<typeof UpdateAlbumSchema>;

export const AddPhotoToAlbumSchema = v.object({
  photo_id: v.number(),
  album_id: v.number(),
});

export type AddPhotoToAlbumRequest = v.InferOutput<
  typeof AddPhotoToAlbumSchema
>;
