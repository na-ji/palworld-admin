'use client';
import { ColumnDef } from '@tanstack/react-table';

import { PlayerAction } from '@/app/player-table/player-action';
import { Badge } from '@/components/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { cn } from '@/utils/cn';
import type { Player } from '../../../server/palworldManager';

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column}>Name</DataTableColumnHeader>;
    },
    cell: ({ row }) => {
      const player = row.original;

      return (
        <a
          href={`https://steamcommunity.com/profiles/${player.steamId}`}
          className="flex items-center"
          target="_blank"
          rel="noreferrer"
        >
          {player.steamProfile && (
            <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 mr-2">
              <img className="aspect-square h-full w-full" alt="Avatar" src={player.steamProfile.avatar.small} />
            </span>
          )}
          {player.name}
        </a>
      );
    },
  },
  {
    accessorKey: 'playerUid',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column}>ID</DataTableColumnHeader>;
    },
  },
  {
    accessorKey: 'steamId',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column}>Steam ID</DataTableColumnHeader>;
    },
  },
  {
    accessorKey: 'isOnline',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column}>Is Online</DataTableColumnHeader>;
    },
    cell: ({ row }) => {
      const isOnline = row.getValue('isOnline');

      return (
        <Badge variant="secondary">
          <span
            className={cn('flex h-2 w-2 rounded-full mr-2', { 'bg-green-600': isOnline, 'bg-red-600': !isOnline })}
          />
          {isOnline ? 'Online' : 'Offline'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const player = row.original;

      return <PlayerAction player={player} />;
    },
  },
];
