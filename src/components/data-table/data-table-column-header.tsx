import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/table-core';
import { FC, ReactNode, useCallback } from 'react';

import { Button } from '@/components/button';
import type { Player } from '../../../server/palworldManager';

interface SortableRowHeaderProps {
  column: Column<Player, unknown>;
  children: ReactNode;
}

export const DataTableColumnHeader: FC<SortableRowHeaderProps> = ({ column, children }) => {
  const toggleSort = useCallback(() => column.toggleSorting(column.getIsSorted() === 'asc'), [column]);

  return (
    <Button variant="ghost" onClick={toggleSort}>
      {children}
      {column.getIsSorted() === 'desc' ? (
        <ArrowDownIcon className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'asc' ? (
        <ArrowUpIcon className="ml-2 h-4 w-4" />
      ) : (
        <CaretSortIcon className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};
