import { sql } from "../db.ts";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  user_description: string;
  created_at: number;
  avatar_id: number;
}

export async function getUserById(id: number): Promise<User> {
  const rows = await sql<User[]>`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  return rows[0];
}

export async function insertUser(user: User) {
  await sql`INSERT INTO users ${sql(user)}`;
}
