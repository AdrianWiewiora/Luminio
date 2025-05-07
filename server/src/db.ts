import postgres from "postgres";
import { DATABASE_URL } from "../config.ts";

export const sql = postgres(DATABASE_URL);

interface DbFile {
  id: number;
  filename: string;
  content_type: string;
  data: Uint8Array<ArrayBufferLike>;
}

export async function fileUpload(file: File): Promise<number> {
  const data = {
    content_type: file.type,
    data: await file.bytes(),
    filename: file.name,
  };
  const [result] = await sql`INSERT INTO files ${sql(data)} returning id`;
  return result.id;
}

export async function getFile(id: number): Promise<File> {
  const [result] = await sql<DbFile[]>`
    SELECT * FROM photos LEFT JOIN files ON photos.file_id = files.id WHERE files.id = ${id}
  `;
  const blob = new Blob([result.data], { type: result.content_type });
  const file = new File([blob], result.filename);
  return file;
}
