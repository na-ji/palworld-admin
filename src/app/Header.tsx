import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { FC } from 'react';

import { OnlinePlayerCount } from './OnlinePlayerCount';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header: FC = () => {
  return (
    <Navbar isBordered>
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">Palworld Admin</p>
        </NavbarBrand>
      </NavbarContent>

      {/*<NavbarContent className="hidden sm:flex gap-4" justify="center">*/}
      {/*  <NavbarItem>*/}
      {/*    <Link color="foreground" href="/">*/}
      {/*      Features*/}
      {/*    </Link>*/}
      {/*  </NavbarItem>*/}
      {/*</NavbarContent>*/}

      <NavbarContent as="div" justify="end">
        <OnlinePlayerCount />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
};
