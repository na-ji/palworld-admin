import { BanIcon, MoreHorizontal, UserXIcon } from 'lucide-react';
import { FC, useCallback } from 'react';

import { banPlayer, kickPlayer } from '@/client';
import { Button } from '@/components/button';
import { useConfirmationDialog } from '@/components/confirmation-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { useToast } from '@/components/use-toast';
import type { Player } from '../../../server/palworldManager';

export const PlayerAction: FC<{ player: Player }> = ({ player }) => {
  const { openModal, setContent, setConfirmationCallback } = useConfirmationDialog();
  const { toast } = useToast();

  const handleKickAction = useCallback(() => {
    setContent(`Are you sure you want to kick ${player.name}?`, 'This will disconnect the player from the server.');
    setConfirmationCallback(async () => {
      try {
        await kickPlayer(player.steamId);
        toast({
          title: `${player.name} kicked`,
        });
      } catch {
        toast({
          title: `Failed to kick ${player.name}`,
          description: 'Please try again later',
          variant: 'destructive',
        });
      }
    });
    openModal();
  }, [player, openModal, setContent, setConfirmationCallback, toast]);

  const handleBanAction = useCallback(() => {
    setContent(`Are you sure you want to ban ${player.name}?`, "This action can't be undone.");
    setConfirmationCallback(async () => {
      try {
        await banPlayer(player.steamId);
        toast({
          title: `${player.name} banned`,
        });
      } catch {
        toast({
          title: `Failed to ban ${player.name}`,
          description: 'Please try again later',
          variant: 'destructive',
        });
      }
    });
    openModal();
  }, [player, openModal, setContent, setConfirmationCallback, toast]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="gap-2" onSelect={handleKickAction}>
          <UserXIcon className="h-5 w-5" /> Kick
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 text-destructive hover:!bg-destructive hover:!text-destructive-foreground"
          onSelect={handleBanAction}
        >
          <BanIcon className="h-5 w-5" /> Ban
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
