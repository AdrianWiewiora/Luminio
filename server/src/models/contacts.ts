import { sql } from "../db.ts";

export interface NewDbContact {
  user_id: number;
  name: string;
  contact_info: string;
}

export interface DbContact extends NewDbContact {
  id: number;
  created_at: number;
}

export async function getContactsByUser(id: number): Promise<DbContact[]> {
  return await sql<DbContact[]>`SELECT * FROM contacts WHERE user_id = ${id}`;
}
