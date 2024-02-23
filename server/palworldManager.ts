import { createPlayer, getAllPlayers } from './db/schema/player';
import { logger } from './logger';
import { RconPlayer, ServerInfo, getPlayers, getServerInfo } from './rcon';

export interface Player extends RconPlayer {
  isOnline: boolean;
}

export const players: Record<string, Player> = {};
const savedPlayers = new Set<string>();
export const serverInfo: ServerInfo = {
  version: '',
  name: '',
};
let updateInterval: NodeJS.Timeout;

export const updatePlayers = async () => {
  logger.silly('Updating players');
  const rconPlayers = await getPlayers();

  Object.keys(players).forEach((steamId) => {
    players[steamId].isOnline = false;
  });

  for (const player of rconPlayers) {
    if (!savedPlayers.has(player.steamId)) {
      await createPlayer({
        steamId: player.steamId,
        name: player.name,
        playerUid: player.playerUid,
      });
      savedPlayers.add(player.steamId);
    }

    players[player.steamId] = {
      ...player,
      isOnline: true,
    };
  }
};

export const startAutoUpdates = async () => {
  (await getAllPlayers()).forEach((player) => {
    savedPlayers.add(player.steamId);
    players[player.steamId] = {
      ...player,
      isOnline: false,
    };
  });

  getServerInfo()
    .then((info) => {
      serverInfo.version = info.version;
      serverInfo.name = info.name;

      return updatePlayers();
    })
    .then(() => {
      updateInterval = setInterval(updatePlayers, 5000);
    });
};
