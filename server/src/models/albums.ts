import { sql } from "../db.ts";

export interface NewDbAlbum {
  user_id: number;
  name: string;
  description: string;
  tag: number;
  is_public: boolean;
  cover_id: number;
}

export interface DbAlbum extends NewDbAlbum {
  id: number;
  created_at: number;
}

export async function getAlbumsByUser(id: number): Promise<DbAlbum[]> {
  return await sql<DbAlbum[]>`SELECT * FROM albums WHERE user_id = ${id}`;
}

export async function getAlbumsByTag(id: number): Promise<DbAlbum[]> {
  return await sql<DbAlbum[]>`SELECT * FROM albums WHERE tag = ${id}`;
}

export async function getAlbum(id: number): Promise<DbAlbum|undefined> {
  const rows = await sql<
    DbAlbum[]
  >`SELECT * FROM albums WHERE id = ${id} LIMIT 1`;
  return rows[0];
}
export async function getAlbums(): Promise<DbAlbum[]> {
  return  await sql<
    DbAlbum[]
  >`SELECT * FROM albums`;
}

export async function insertAlbum(album: NewDbAlbum): Promise<DbAlbum> {
  const rows = await sql<DbAlbum[]>`INSERT INTO albums ${sql(album)} RETURNING *`;
  return rows[0];
}

export async function updateAlbum(album: NewDbAlbum, id: number) {
  await sql`UPDATE albums
  SET ${sql(album)}
  WHERE id = ${id};`;
}

export async function deleteAlbum(id: number) {
  await sql`DELETE FROM Albums WHERE id = ${id}`;
}
