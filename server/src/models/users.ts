import { sql } from "../db.ts";
import { UserResponse } from "common";

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
  created_at: string;
}

export async function getAllUsers(): Promise<UserResponse[]> {
  return await sql<UserResponse[]>`
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.user_description,
      u.city,
      COALESCE(AVG(ar.value), 0) AS average_rating,
      (
        SELECT COUNT(*) FROM photo_reviews pr WHERE pr.user_id = u.id
      ) +
      (
        SELECT COUNT(*) FROM album_reviews alr WHERE alr.user_id = u.id
      ) AS comment_count,
      (
        SELECT COUNT(*) FROM albums a WHERE a.user_id = u.id
      ) AS album_count
    FROM users u
           LEFT JOIN albums a ON u.id = a.user_id
           LEFT JOIN album_reviews ar ON a.id = ar.album_id
    GROUP BY u.id;
  `;
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

export async function updateUser(user: NewDbUser, id: number) {
  await sql`UPDATE users
  SET ${sql(user)}
  WHERE id = ${id};`;
}

export async function deleteUser(id: number) {
  // also deletes all related sessions thanks to `ON DELETE CASCADE`
  await sql`DELETE FROM users WHERE id = ${id}`;
}
