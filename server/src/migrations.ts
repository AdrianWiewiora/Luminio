import { sql } from "./db.ts";
import { readDir } from "@std/fs/unstable-read-dir";
import * as path from "@std/path";

const MIGRATIONS_DIR = "../../migrations/";

interface LuminioDbInfo {
  value: string;
}

export async function migrate() {
  // Bootstrap migration info in the db
  await sql`CREATE TABLE IF NOT EXISTS luminio_db_info (key TEXT PRIMARY KEY, value TEXT)`;
  await sql`INSERT INTO luminio_db_info (key, value) VALUES ('last_migration', '') ON CONFLICT (key) DO NOTHING`;

  // Fetch the last migration
  const rows = await sql<
    LuminioDbInfo[]
  >`SELECT value FROM luminio_db_info WHERE key = 'last_migration'`;
  let last_migration = rows[0].value;

  // Iterate over all migrations and run them if they're newer than the last db migration
  const dir = readDir(MIGRATIONS_DIR);
  const file_names: string[] = [];
  for await (const file of dir) {
    if (file.isFile && file.name.endsWith(".sql")) {
      file_names.push(file.name);
    }
  }

  file_names.sort((a, b) => a.localeCompare(b));

  for (const file_name of file_names) {
    const migration = file_name.split(".sql")[0];
    if (migration <= last_migration) {
      continue;
    }

    const query = sql.file(path.join(MIGRATIONS_DIR, file_name));

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
