import { sql } from "../db.ts";

export interface NewDbPhoto {
  user_id: number;
  album_id: number;
  file_path: string;
  category_id: number;
}

export interface DbPhoto extends NewDbPhoto {
  id: number;
  created_at: number;
}

export async function getAllPhotos(): Promise<DbPhoto[]> {
  const rows = await sql<
    DbPhoto[]
  >`SELECT * FROM photos`;
  return rows;
}

export async function getPhotoById(id: number): Promise<DbPhoto> {
  const rows = await sql<
    DbPhoto[]
  >`SELECT * FROM photos WHERE id = ${id} LIMIT 1`;
  return rows[0];
}

export async function getPhotosByAlbum(
  id: number,
  limit: number,
  offset: number,
): Promise<DbPhoto[]> {
  const rows = await sql<
    DbPhoto[]
  >`SELECT * FROM photos WHERE album_id = ${id} LIMIT ${limit} OFFSET ${offset}`;
  return rows;
}

export async function getAllPhotosByAlbum(id: number): Promise<DbPhoto[]> {
  const rows = await sql<
    DbPhoto[]
  >`SELECT * FROM photos WHERE album_id = ${id}`;
  return rows;
}
