import postgres from "postgres";
import { DATABASE_URL } from "../config.ts";

export const sql = postgres(DATABASE_URL, { onnotice: () => {} });

export async function fileUpload(file: File): Promise<number> {
  const data = {
    content_type: file.type,
    data: await file.bytes(),
    filename: file.name,
  };
  const [result] = await sql`INSERT INTO files ${sql(data)} returning id`;
  return result.id;
}

export async function getFile(file_id: number): Promise<File> {
  const [result] = await sql` SELECT * FROM files WHERE files.id = ${file_id} `;
  const blob = new Blob([result.data], { type: result.content_type });
  const file = new File([blob], result.filename);
  return file;
}
