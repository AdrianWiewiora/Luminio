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

export type RegistrationRequest = v.InferOutput<typeof RegistrationSchema>;

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
});

export type LoginRequest = v.InferOutput<typeof LoginSchema>;

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

export type UpdateUserRequest = v.InferOutput<typeof UpdateUserSchema>;
