//Zdjęcia mają mieć nazwę i opis co nie jest na ten moment odzwierciedlone w bazie

import * as v from "@valibot/valibot";

export const PostPhotoSchema = v.object({
  file: v.pipe(
    v.file("Please select an image file."),
    v.mimeType(
      ["image/jpeg", "image/png"],
      "Please select a JPEG or PNG file.",
    ),
    v.maxSize(1024 * 1024 * 20, "Please select a file smaller than 20 MB."),
  ),
});

export type PostPhotoRequest = v.InferOutput<typeof PostPhotoSchema>;
