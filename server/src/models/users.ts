import { sql } from "../db.ts";

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


export interface ReturnDbUser extends DbUser {
  average_value: number;
  comment_count: number;
  album_count: number;
}

export async function getAllUsers(): Promise<ReturnDbUser[]> {
  return await sql<ReturnDbUser[]>`SELECT 
        u.*,
        AVG(ar.value) AS average_value,
        (SELECT COUNT(*) FROM photo_reviews pr WHERE pr.user_id = u.id) +
        (SELECT COUNT(*) FROM album_reviews alr WHERE alr.user_id = u.id) AS comment_count,
        (SELECT COUNT(*) FROM albums WHERE user_id = u.id) as album_count
    FROM 
        users u
    LEFT JOIN 
        albums a ON u.id = a.user_id
    LEFT JOIN 
        album_reviews ar ON a.id = ar.album_id
    GROUP BY 
        u.id;`;
}

export async function getUser(id: number): Promise<ReturnDbUser> {
  const rows = await sql<
  ReturnDbUser[]
  >`SELECT 
        u.*,
        AVG(ar.value) AS average_value,
        (SELECT COUNT(*) FROM photo_reviews pr WHERE pr.user_id = u.id) +
        (SELECT COUNT(*) FROM album_reviews alr WHERE alr.user_id = u.id) AS comment_count,
        (SELECT COUNT(*) FROM albums WHERE user_id = u.id) as album_count
    FROM 
        users u
    LEFT JOIN 
        albums a ON u.id = a.user_id
    LEFT JOIN 
        album_reviews ar ON a.id = ar.album_id
    WHERE
        u.id = ${id}
    GROUP BY 
        u.id;`;
  return rows[0];
}

export async function getUserByMail(
  email: string,
): Promise<ReturnDbUser | undefined> {
  const rows = await sql<
  ReturnDbUser[]
  >`SELECT 
        u.*,
        AVG(ar.value) AS average_value,
        (SELECT COUNT(*) FROM photo_reviews pr WHERE pr.user_id = u.id) +
        (SELECT COUNT(*) FROM album_reviews alr WHERE alr.user_id = u.id) AS comment_count,
        (SELECT COUNT(*) FROM albums WHERE user_id = u.id) as album_count
    FROM 
        users u
    LEFT JOIN 
        albums a ON u.id = a.user_id
    LEFT JOIN 
        album_reviews ar ON a.id = ar.album_id
    WHERE
        u.email = ${email}
    GROUP BY 
        u.id;`;
  return rows[0];
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
  await sql`DELETE FROM users WHERE id = ${id}`;
}
