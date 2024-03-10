'use client';
import { Power } from 'lucide-react';
import { FC } from 'react';

import { DropdownMenuItem } from '@/components/dropdown-menu';
import { logout } from './log-out-action';

export const LogOutMenuItem: FC = () => {
  return (
    <DropdownMenuItem
      className="gap-2"
      onSelect={async () => {
        await logout();
      }}
      textValue="log out"
    >
      <Power className="h-5 w-5" /> Log out
    </DropdownMenuItem>
  );
};
