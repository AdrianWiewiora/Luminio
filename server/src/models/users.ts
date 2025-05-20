import { sql } from "../db.ts";

export interface NewDbUser {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  password_hash: string;
  user_description: string;
  role: number;
  avatar_file_id?: number;
}

// Klucz głowny i inne pola generowane po stronie bazy danych nie mogą być
// częścią interfejsu NewDbUser.
// Dane te dopiero są znane po pobraniu usera z bazy
export interface DbUser extends NewDbUser {
  id: number;
  created_at: string;
}

export async function getAllUsers(): Promise<DbUser[]> {
  return await sql<DbUser[]>`SELECT * FROM users`;
}

export async function getUser(id: number): Promise<DbUser> {
  const [result] = await sql<
    DbUser[]
  >`SELECT * FROM users WHERE id = ${id}`;
  return result;
}

export async function getUserByMail(
  email: string,
): Promise<DbUser | undefined> {
  const [result] = await sql<
    DbUser[]
  >`SELECT * FROM users WHERE email = ${email}`;
  return result;
}

export async function insertUser(user: NewDbUser) {
  await sql`INSERT INTO users ${sql(user)}`;
}

export async function updateUser(user: Partial<NewDbUser>, id: number) {
  await sql`UPDATE users
  SET ${sql(user)}
  WHERE id = ${id};`;
}

export async function deleteUser(id: number) {
  // also deletes all related sessions thanks to `ON DELETE CASCADE`
  await sql`DELETE FROM users WHERE id = ${id}`;
}
