import { sql } from "../db.ts";

export interface NewDbService {
  name: string;
}

export interface DbService extends NewDbService {
  id: number;
  created_at: number;
}

export async function getAllServices(): Promise<DbService[]> {
  return await sql<DbService[]>`SELECT * FROM services`;
}
