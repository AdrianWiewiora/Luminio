import { sql } from "../db.ts";
import { DbUser } from "./users.ts";

export interface DbSession {
  id: string;
  user_id: string;
  created_at: number;
}

export async function createSession(user_id: number): Promise<DbSession> {
  const [result] = await sql<DbSession[]>`INSERT INTO sessions ${
    sql({ user_id: user_id })
  } RETURNING *`;
  return result;
}

export async function getUserBySession(
  session_uuid: string,
): Promise<DbUser | undefined> {
  const [result] = await sql<
    DbUser[]
  >`SELECT users.* FROM users LEFT JOIN sessions ON sessions.user_id = users.id WHERE sessions.id = ${session_uuid}`;
  return result;
}

export interface DbUserStats {
  average_rating: number;
  comment_count: number;
  album_count: number;
}

export async function getUserStats(user_id: number): Promise<DbUserStats> {
  const [result] = await sql<
    DbUserStats[]
  >`SELECT
      AVG(ar.value) AS average_rating,
      (SELECT COUNT(*) FROM photo_reviews pr WHERE pr.user_id = u.id) +
      (SELECT COUNT(*) FROM album_reviews alr WHERE alr.user_id = u.id) AS comment_count,
      (SELECT COUNT(*) FROM albums WHERE user_id = u.id) as album_count
    FROM users u
    LEFT JOIN 
      albums a ON u.id = a.user_id
    LEFT JOIN 
      album_reviews ar ON a.id = ar.album_id
    WHERE u.id = ${user_id}
    GROUP BY 
      u.id;`;
  return result;
}

export async function deleteSession(user_id: number) {
  await sql`DELETE FROM sessions WHERE user_id = ${user_id}`;
}
