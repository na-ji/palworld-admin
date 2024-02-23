import Link from 'next/link';
import { FC } from 'react';

import { MainNavigation } from './main-navigation';
import { OnlinePlayerCount } from './online-player-count';
import { ThemeSwitcher } from './theme-switcher';

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/*<Icons.logo className="h-6 w-6" />*/}
            <span className="hidden font-bold sm:inline-block">Palworld Admin</span>
          </Link>
          <MainNavigation />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <OnlinePlayerCount />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
