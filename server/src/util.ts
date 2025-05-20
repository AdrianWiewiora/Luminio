import { DbUser } from "./models/users.ts";

export function avatar_url(user: DbUser): string | undefined {
  if (!user.avatar_file_id) return undefined;
  return `/api/files/${user.avatar_file_id}`;
}
