'use client';
import { FC } from 'react';

import { DataTable } from '@/components/data-table';
import { useAtomSelector } from '@zedux/react';
import { selectPlayerList } from '../server-status-provider';
import { columns } from './columns';

export const PlayerTable: FC = () => {
  const playerList = useAtomSelector(selectPlayerList);

  return (
    <div className="container-fluid py-4">
      <DataTable columns={columns} data={playerList} />
    </div>
  );
};
