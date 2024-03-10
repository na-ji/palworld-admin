import { FC } from 'react';
import 'server-only';

import { LogOutMenuItem } from '@/app/header/log-out-menu-item';
import { auth } from '@/auth';
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from '@/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';

export const Avatar: FC = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const { user } = session;
  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarUI>
          <AvatarImage src={user.image || ''} />
          <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </AvatarUI>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-2 py-1.5 text-sm font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.discordUsername}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <LogOutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
