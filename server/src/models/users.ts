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
}

// Klucz głowny i inne pola generowane po stronie bazy danych nie mogą być
// częścią interfejsu NewDbUser.
// Dane te dopiero są znane po pobraniu usera z bazy
export interface DbUser extends NewDbUser {
  id: number;
  created_at: number;
}

export async function getAllUsers(): Promise<DbUser[]> {
  return await sql<DbUser[]>`SELECT * FROM users`;
}

export async function getUser(id: number): Promise<DbUser> {
  const rows = await sql<
    DbUser[]
  >`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  return rows[0];
}

export async function getUserByMail(
  email: string,
): Promise<DbUser | undefined> {
  const rows = await sql<
    DbUser[]
  >`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  return rows[0];
}

export async function insertUser(user: NewDbUser) {
  await sql`INSERT INTO users ${sql(user)}`;
}
