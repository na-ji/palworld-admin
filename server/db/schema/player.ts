import { eq, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type UserSummary from 'steamapi/dist/src/structures/UserSummary';

export const player = sqliteTable('player', {
  steamId: text('steam_id').primaryKey().notNull(),
  name: text('name').notNull(),
  playerUid: text('player_uid').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  steamProfile: text('steam_profile', { mode: 'json' }).$type<UserSummary | null>().default(null),
});

export type Player = typeof player.$inferSelect;
export type NewPlayer = Exclude<typeof player.$inferInsert, 'createdAt' | 'updatedAt'>;

export const createPlayer = async (newPlayer: NewPlayer) => {
  const db = await import('../client').then((m) => m.db);
  return await db.insert(player).values(newPlayer).execute();
};

export const getAllPlayers = async () => {
  const db = await import('../client').then((m) => m.db);

  return db.select().from(player).all();
};

export const setPlayerSteamProfile = async (steamId: string, steamProfile: UserSummary | null) => {
  const db = await import('../client').then((m) => m.db);
  return await db.update(player).set({ steamProfile }).where(eq(player.steamId, steamId)).execute();
};
