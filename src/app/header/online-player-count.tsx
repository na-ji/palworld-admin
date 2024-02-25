'use client';
import { useAtomSelector } from '@zedux/react';
import { FC, Suspense } from 'react';
import { selectOnlinePlayerCount } from '../server-status-provider';

export const OnlinePlayerCount: FC = () => {
  const onlinePlayerCount = useAtomSelector(selectOnlinePlayerCount);

  return (
    <Suspense>
      <span>{onlinePlayerCount} online</span>
    </Suspense>
  );
};
