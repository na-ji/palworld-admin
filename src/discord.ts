import type { APIGuildMember, APIPartialGuild } from 'discord-api-types/v10';
import 'server-only';

const botToken = process.env.AUTH_BOT_TOKEN;
const guildIds = process.env.AUTH_DISCORD_ALLOWED_GUILDS?.split(',').filter((i) => i);
const roleIds = process.env.AUTH_DISCORD_ALLOWED_ROLES?.split(',').filter((i) => i);

const getGuilds = async (accessToken: string): Promise<Array<APIPartialGuild>> => {
  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if ('message' in data && typeof data.message === 'string') {
    throw new Error(`Failed to get guilds: ${JSON.stringify(data)}`);
  }

  return data;
};

const getGuildMember = async (guildId: string, userId: string): Promise<APIGuildMember> => {
  const response = await fetch(`https://discord.com/api/guilds/${guildId}/members/${userId}`, {
    headers: {
      Authorization: `Bot ${botToken}`,
    },
  });

  const data = response.json();

  if ('message' in data && typeof data.message === 'string') {
    throw new Error(`Failed to get user's #${userId} guild #${guildId}: ${JSON.stringify(data)}`);
  }

  return data;
};

interface UserAccess {
  finaleDecision: boolean;
  hasError: boolean;
  hasRole: boolean;
  isMemberOfGuild: boolean;
  areGuildIdsConfigured: boolean;
  areRoleIdsConfigured: boolean;
}

const commonAccess: Partial<UserAccess> = {
  hasError: false,
  hasRole: false,
  isMemberOfGuild: false,
};

const logUserAccess = (userName: string, userAccess: Partial<UserAccess>): void => {
  console.info(`${userName} tried to login: ${JSON.stringify({ ...commonAccess, ...userAccess })}`);
};

export const userHasAccess = async (userName: string, userAccessToken?: string, userId?: string): Promise<boolean> => {
  const areGuildIdsConfigured = Array.isArray(guildIds) && guildIds.length > 0;
  const areRoleIdsConfigured = Array.isArray(roleIds) && roleIds.length > 0 && !!botToken;

  try {
    if (!userAccessToken || !areGuildIdsConfigured) {
      logUserAccess(userName, { areGuildIdsConfigured, areRoleIdsConfigured, finaleDecision: true });
      return true;
    }

    const userGuilds = await getGuilds(userAccessToken);
    const configuredGuildsTheUserIsMemberOf = userGuilds.filter((membersGuild) => guildIds.includes(membersGuild.id));
    const isMemberOfGuild = configuredGuildsTheUserIsMemberOf.length > 0;

    if (!areRoleIdsConfigured || !userId || !isMemberOfGuild) {
      logUserAccess(userName, {
        areGuildIdsConfigured,
        areRoleIdsConfigured,
        isMemberOfGuild,
        finaleDecision: isMemberOfGuild,
      });
      return isMemberOfGuild;
    }

    let hasRole = false;

    for (const guild of configuredGuildsTheUserIsMemberOf) {
      const member = await getGuildMember(guild.id, userId);
      hasRole = member.roles.some((role) => roleIds.includes(role));

      if (hasRole) {
        logUserAccess(userName, {
          areGuildIdsConfigured,
          areRoleIdsConfigured,
          isMemberOfGuild,
          hasRole,
          finaleDecision: hasRole,
        });

        return hasRole;
      }
    }

    logUserAccess(userName, {
      areGuildIdsConfigured,
      areRoleIdsConfigured,
      isMemberOfGuild,
      hasRole,
      finaleDecision: hasRole,
    });

    return hasRole;
  } catch (error) {
    console.error(error);
    logUserAccess(userName, { areGuildIdsConfigured, areRoleIdsConfigured, hasError: true, finaleDecision: false });

    return false;
  }
};
