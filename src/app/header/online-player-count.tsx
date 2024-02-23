'use client';
import { useAtomSelector } from '@zedux/react';
import { FC, Suspense } from 'react';
import { selectOnlinePlayerCount } from '../ServerStatusProvider';

export const OnlinePlayerCount: FC = () => {
  const onlinePlayerCount = useAtomSelector(selectOnlinePlayerCount);

  return (
    <Suspense>
      <span>{onlinePlayerCount} online</span>
    </Suspense>
  );
};
