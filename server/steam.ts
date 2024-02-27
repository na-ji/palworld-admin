import SteamAPI from 'steamapi';
import type UserSummary from 'steamapi/dist/src/structures/UserSummary';

import { logger } from './logger';

const hasSteamApiKey = process.env.STEAM_API_KEY !== undefined;
const steam = new SteamAPI(process.env.STEAM_API_KEY || false);

export const getSteamUserSummary = async (steamId: string): Promise<UserSummary | undefined> => {
  if (!hasSteamApiKey) {
    return Promise.resolve(undefined);
  }

  logger.info(`Fetching steam user summary for "${steamId}"`);

  const userSummary = await steam.getUserSummary(steamId);
  if (Array.isArray(userSummary)) {
    return userSummary[0];
  }
  return userSummary;
};
