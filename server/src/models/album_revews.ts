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

export interface UserDbAlbumReview extends DbAlbumReview {
  first_name: string;
  last_name: string;
}

export async function getAlbumReviewsByUser(
  id: number,
): Promise<UserDbAlbumReview[]> {
  return await sql<
    UserDbAlbumReview[]
  >`SELECT album_reviews.id,
  album_reviews.user_id,
  album_reviews.album_id,
  album_reviews.body,
  album_reviews.value,
  album_reviews.created_at,
    users.first_name,
  users.last_name
   FROM album_reviews LEFT JOIN users ON album_reviews.user_id = users.id WHERE user_id = ${id}`;
}

export async function getAlbumReviewsByAlbum(
  id: number,
): Promise<UserDbAlbumReview[]> {
  return await sql<
    UserDbAlbumReview[]
  >`SELECT album_reviews.id,
   album_reviews.user_id,
   album_reviews.album_id,
   album_reviews.body,
   album_reviews.value,
   album_reviews.created_at,
     users.first_name,
  users.last_name
   FROM album_reviews LEFT JOIN users ON album_reviews.user_id = users.id  WHERE album_id = ${id}`;
}

export async function getAlbumReview(id: number): Promise<UserDbAlbumReview> {
  const rows = await sql<
    UserDbAlbumReview[]
  >`SELECT album_reviews.id,
   album_reviews.user_id,
   album_reviews.album_id,
   album_reviews.body,
   album_reviews.value,
   album_reviews.created_at,
     users.first_name,
  users.last_name
   FROM album_reviews LEFT JOIN users ON album_reviews.user_id = users.id WHERE id = ${id} LIMIT 1`;
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
