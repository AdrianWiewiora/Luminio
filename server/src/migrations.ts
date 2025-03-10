import { PendingQuery } from "postgres";
import { sql } from "./db.ts";

const MIGRATIONS = new Map<string, PendingQuery<object[]>>();

MIGRATIONS.set(
  "2025-03-10-0000 initial user schema",
  sql`CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar UNIQUE,
    "password_hash" varchar,
    "user_description" text,
    "created_at" timestamp DEFAULT (now())
  );`,
);

MIGRATIONS.set(
  "2025-03-10-0010 initial photos schema",
  sql`CREATE TABLE "photos" (
    "id" SERIAL PRIMARY KEY,
    "user_id" integer NOT NULL,
    "title" varchar,
    "description" text,
    "created_at" timestamp DEFAULT (now())
  );`,
);

interface LuminioDbInfo {
  value: string;
}

export async function migrate() {
  await sql`CREATE TABLE IF NOT EXISTS luminio_db_info (key TEXT PRIMARY KEY, value TEXT)`;
  await sql`INSERT INTO luminio_db_info (key, value) VALUES ('last_migration', '') ON CONFLICT (key) DO NOTHING`;

  const rows = await sql<
    LuminioDbInfo[]
  >`SELECT value FROM luminio_db_info WHERE key = 'last_migration'`;
  let last_migration = rows[0].value;

  for (const [migration, query] of MIGRATIONS) {
    if (migration <= last_migration) {
      continue;
    }

    console.log(`Running migration ${migration}`);
    await sql.begin(async (sql) => {
      await query;
      await sql`UPDATE luminio_db_info SET  ${
        sql({ value: migration })
      } WHERE key = 'last_migration'`;
    });

    last_migration = migration;
  }
}
