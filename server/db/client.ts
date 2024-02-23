import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

export const runMigrations = () => {
  migrate(db, { migrationsFolder: './server/db/migrations' });
};
