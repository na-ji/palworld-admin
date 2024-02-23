import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { FC, Key, useCallback } from 'react';

import type { Player } from '../../../server/palworldManager';
import { banPlayer, kickPlayer } from '../../client';
import { useConfirmationModal } from '../../components/ConfirmationModal';
import { VerticalDotsIcon } from './VerticalDotsIcon';

export const PlayerAction: FC<{ player: Player }> = ({ player }) => {
  const { ConfirmationModal, openModal } = useConfirmationModal();
  const handleDropdownAction = useCallback(
    (key: Key) => {
      const action = key as 'kick' | 'ban';

      openModal(async () => {
        if (action === 'kick') {
          await kickPlayer(player.steamId);
        } else {
          await banPlayer(player.steamId);
        }
      });
    },
    [player.steamId, openModal],
  );

  return (
    <>
      <ConfirmationModal>Are you sure?</ConfirmationModal>
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown title="Player actions">
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <VerticalDotsIcon className="text-default-300" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={handleDropdownAction} title="Player actions" aria-label="Player Actions">
            <DropdownItem startContent="→🚪" key="kick" title="Kick">
              Kick
            </DropdownItem>
            <DropdownItem color="danger" className="text-danger" startContent="🔨" key="ban" title="Ban">
              Ban
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};
