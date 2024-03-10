import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';

import { userHasAccess } from '@/discord';
const authIsConfigured =
  !!process.env.AUTH_DISCORD_ID && !!process.env.AUTH_DISCORD_SECRET && !!process.env.AUTH_SECRET;

export const { handlers, auth, signOut } = NextAuth({
  providers: [Discord({ authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds' })],
  debug: false,
  session: { strategy: 'jwt' },
  trustHost: true,
  callbacks: {
    async signIn({ account, profile }) {
      return userHasAccess(`${profile?.username}`, account?.access_token, account?.providerAccountId);
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.discordId = token.discordId;
        session.userId = token.userId;
        session.discordUsername = token.discordUsername;
      }

      return session;
    },
    async jwt({ token, user, profile }) {
      if (user?.id) {
        token.userId = user.id;
      }

      if (profile?.id) {
        token.discordId = profile.id;
      }

      if (profile?.username) {
        token.discordUsername = profile.username;
      }

      return token;
    },
    async authorized({ auth }) {
      return authIsConfigured && !!auth?.user;
    },
  },
});

export const { GET, POST } = handlers;
