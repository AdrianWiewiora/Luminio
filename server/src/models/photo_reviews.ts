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

export interface UserDbPhotoReview extends DbPhotoReview {
  first_name: string;
  last_name: string;
}

export async function getPhotoReviewsByUser(
  id: number,
): Promise<UserDbPhotoReview[]> {
  return await sql<
    UserDbPhotoReview[]
  >`SELECT photo_reviews.id,
  photo_reviews.user_id,
  photo_reviews.photo_id,
  photo_reviews.body,
  photo_reviews.value,
  photo_reviews.created_at,
    users.first_name,
  users.last_name FROM photo_reviews LEFT JOIN users ON photo_reviews.user_id = users.id WHERE photo_reviews.user_id = ${id}`;
}

export async function getPhotoReviewsByPhoto(
  id: number,
): Promise<UserDbPhotoReview[]> {
  return await sql<
    UserDbPhotoReview[]
  >`SELECT photo_reviews.id,
  photo_reviews.user_id,
  photo_reviews.photo_id,
  photo_reviews.body,
  photo_reviews.value,
  photo_reviews.created_at,
  users.first_name,
  users.last_name FROM photo_reviews LEFT JOIN users ON photo_reviews.user_id = users.id WHERE photo_reviews.photo_id = ${id}`;
}

export async function getPhotoReview(id: number): Promise<UserDbPhotoReview> {
  const rows = await sql<
    UserDbPhotoReview[]
  >`SELECT photo_reviews.id,
  photo_reviews.user_id,
  photo_reviews.photo_id,
  photo_reviews.body,
  photo_reviews.value,
  photo_reviews.created_at,
    users.first_name,
  users.last_name FROM photo_reviews LEFT JOIN users ON photo_reviews.user_id = users.id WHERE photo_reviews.id = ${id} LIMIT 1`;
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
