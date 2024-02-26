import { ConfirmationDialogProvider } from '@/components/confirmation-dialog';
import { H2 } from '@/components/typography/h2';
import { Broadcast } from './broadcast';
import { PlayerTable } from './player-table';

export default function Home() {
  return (
    <>
      <H2>Player List</H2>
      <ConfirmationDialogProvider>
        <PlayerTable />
      </ConfirmationDialogProvider>
      <H2>Broadcast</H2>
      <Broadcast />
    </>
  );
}
