import { sql } from "../db.ts";
import { DbUser } from "./users.ts";

export interface DbSession {
  id: string;
  user_id: string;
  created_at: number;
}

export async function createSession(user_id: number): Promise<DbSession> {
  const rows = await sql<DbSession[]>`INSERT INTO sessions ${
    sql({ user_id: user_id })
  } RETURNING *`;
  return rows[0];
}

export async function getUserBySession(
  session_uuid: string,
): Promise<DbUser | undefined> {
  const rows = await sql<
    DbUser[]
  >`SELECT
      u.*,
      AVG(ar.value) AS average_value,
      (SELECT COUNT(*) FROM photo_reviews pr WHERE pr.user_id = u.id) +
      (SELECT COUNT(*) FROM album_reviews alr WHERE alr.user_id = u.id) AS comment_count,
      (SELECT COUNT(*) FROM albums WHERE user_id = u.id) as album_count
    FROM sessions s
    LEFT JOIN
      users u ON s.user_id = u.id
    LEFT JOIN 
      albums a ON u.id = a.user_id
    LEFT JOIN 
      album_reviews ar ON a.id = ar.album_id
    WHERE s.id = ${session_uuid}
    GROUP BY 
      u.id;`;
  return rows[0];
}

export async function deleteSession(user_id: number) {
  await sql`DELETE FROM sessions WHERE user_id = ${user_id}`;
}
