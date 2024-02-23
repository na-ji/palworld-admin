'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { cn } from '@/utils/cn';

export const MainNavigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm">
      <Link
        href="/"
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === '/' ? 'text-foreground' : 'text-foreground/60',
        )}
      >
        Players
      </Link>
    </nav>
  );
};
