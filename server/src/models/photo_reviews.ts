import { sql } from "../db.ts";

export interface NewDbPhotoReview {
  user_id: number;
  photo_id: number;
  body: string;
  value: number;
}

export interface DbPhotoReview extends NewDbPhotoReview {
  id: number;
  created_at: number;
}

export async function getPhotoReviewsByUser(
  id: number,
): Promise<DbPhotoReview[]> {
  return await sql<
    DbPhotoReview[]
  >`SELECT * FROM photo_reviews WHERE user_id = ${id}`;
}

export async function getPhotoReviewsByPhoto(
  id: number,
): Promise<DbPhotoReview[]> {
  return await sql<
    DbPhotoReview[]
  >`SELECT * FROM photo_reviews WHERE photo_id = ${id}`;
}

export async function getPhotoReview(id: number): Promise<DbPhotoReview> {
  const rows = await sql<
    DbPhotoReview[]
  >`SELECT * FROM photo_reviews WHERE id = ${id} LIMIT 1`;
  return rows[0];
}

export async function insertPhotoReview(photo_review: NewDbPhotoReview) {
  await sql`INSERT INTO photo_reviews ${sql(photo_review)}`;
}

export async function updatePhotoReview(
  photo_review: NewDbPhotoReview,
  id: number,
) {
  await sql`UPDATE photo_reviews
  SET ${sql(photo_review)}
  WHERE id = ${id};`;
}

export async function deletePhotoReview(id: number) {
  await sql`DELETE FROM photo_reviews WHERE id = ${id}`;
}
