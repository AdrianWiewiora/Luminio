import * as v from "@valibot/valibot";

//Bez podanego id zostanie stworzony nowy kontakt
export const UpdateContactSchema = v.object({
    id: v.optional(v.number()),
    user_id: v.number(),
    name: v.string(),
    contact_info: v.string()
  });
export type UpdateContactRequest = v.InferOutput<typeof UpdateContactSchema>;

