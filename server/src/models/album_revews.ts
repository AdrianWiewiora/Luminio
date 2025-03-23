import { sql } from "../db.ts";

export interface NewDbAlbumReview {
  user_id: number;
  album_id: number;
  body: string;
  value: number;
}

export interface DbAlbumReview extends NewDbAlbumReview {
  id: number;
  created_at: number;
}

export async function getAlbumReviewsByUser(
  id: number,
): Promise<DbAlbumReview[]> {
  return await sql<
    DbAlbumReview[]
  >`SELECT * FROM album_reviews WHERE user_id = ${id}`;
}

export async function getAlbumReviewsByAlbum(
  id: number,
): Promise<DbAlbumReview[]> {
  return await sql<
    DbAlbumReview[]
  >`SELECT * FROM album_reviews WHERE album_id = ${id}`;
}

export async function getAlbumReview(id: number): Promise<DbAlbumReview> {
  const rows = await sql<
    DbAlbumReview[]
  >`SELECT * FROM album_reviews WHERE id = ${id} LIMIT 1`;
  return rows[0];
}

export async function insertAlbumReview(album_review: NewDbAlbumReview) {
  await sql`INSERT INTO album_reviews ${sql(album_review)}`;
}

export async function updateAlbumReview(
  album_review: NewDbAlbumReview,
  id: number,
) {
  await sql`UPDATE album_reviews
  SET ${sql(album_review)}
  WHERE id = ${id};`;
}

export async function deleteAlbumReview(id: number) {
  await sql`DELETE FROM album_reviews WHERE id = ${id}`;
}
