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
