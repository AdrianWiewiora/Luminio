import * as v from "@valibot/valibot";
import { PostPhotoSchema } from "./photo_requests.ts";

export const CreateAlbumSchema = v.object({
  name: v.string(),
  description: v.string(),
  service_id: v.pipe(v.string(), v.transform(Number), v.number()),
  is_public: v.pipe(
    v.string(),
    v.transform((input) => {
      if (input === "true") return true;
      else if (input === "false") return false;
      else return undefined;
    }),
    v.boolean(),
  ),
  file: PostPhotoSchema.entries.file,
});

export type CreateAlbumRequest = v.InferOutput<typeof CreateAlbumSchema>;

export const UpdateAlbumSchema = v.object({
  name: v.string(),
  description: v.string(),
  service_id: v.pipe(v.string(), v.transform(Number), v.number()),
  is_public: v.pipe(
    v.string(),
    v.transform((input) => {
      if (input === "true") return true;
      else if (input === "false") return false;
      else return undefined;
    }),
    v.boolean(),
  ),
  file: v.optional(PostPhotoSchema.entries.file),
});

export type UpdateAlbumRequest = v.InferOutput<typeof UpdateAlbumSchema>;

export const AddPhotoToAlbumSchema = v.object({
  photo_id: v.number(),
  album_id: v.number(),
});

export type AddPhotoToAlbumRequest = v.InferOutput<
  typeof AddPhotoToAlbumSchema
>;
