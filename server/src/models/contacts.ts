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

export async function updateContacts(contacts: NewDbContact[]) {
  await sql`INSERT INTO contacts 
  ${sql(contacts)}
  ON CONFLICT (id)
  DO UPDATE SET
  user_id = EXCLUDED.user_id,
  name = EXCLUDED.name,
  contact_info = EXCLUDED.contact_info;`;
}
