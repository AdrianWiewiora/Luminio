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

export async function getAllContacts(): Promise<DbContact[]> {
  return await sql<DbContact[]>`SELECT * FROM contacts`;
}

export async function getContact(id: number): Promise<DbContact> {
  const rows = await sql<
    DbContact[]
  >`SELECT * FROM contacts WHERE id = ${id} LIMIT 1`;
  return rows[0];
}

export async function insertContact(contact: NewDbContact) {
  await sql`INSERT INTO contacts ${sql(contact)}`;
}

export async function updateContact(contact: NewDbContact, id: number) {
  await sql`UPDATE contacts
  SET ${sql(contact)}
  WHERE id = ${id};`;
}

export async function deleteContact(id: number) {
  await sql`DELETE FROM Contacts WHERE id = ${id}`;
}
