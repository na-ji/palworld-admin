import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    discordId: string;
    userId: string;
    discordUsername: string;
  }

  interface Profile {
    id: string;
    username: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    discordId: string;
    discordUsername: string;
    trainerName?: string;
    userId: string;
  }
}
