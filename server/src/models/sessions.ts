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
  >`SELECT * FROM sessions s LEFT JOIN users u WHERE s.id = ${session_uuid} LIMIT 1`;

  return rows[0];
}

export async function deleteSession(user_id: number) {
  await sql`DELETE FROM sessions WHERE user_id = ${user_id}`;
}
