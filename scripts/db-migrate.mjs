// Runs every .sql file in supabase/migrations, in filename order, against
// SUPABASE_DB_URL (set in .env.local — never commit that file).
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { config } from "dotenv";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const connectionString = process.env.SUPABASE_DB_URL;
if (!connectionString) {
  console.error("SUPABASE_DB_URL is not set in .env.local");
  process.exit(1);
}

const migrationsDir = path.join(__dirname, "..", "supabase", "migrations");
const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  for (const file of files) {
    const sql = readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Running ${file}...`);
    await client.query(sql);
    console.log(`  done.`);
  }
  await client.end();
  console.log("All migrations applied.");
}

main().catch(async (err) => {
  console.error(err);
  await client.end();
  process.exit(1);
});
