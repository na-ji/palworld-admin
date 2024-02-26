'use client';
import { FC, FormEvent, useCallback, useRef, useState } from 'react';

import { broadcast } from '@/client';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useToast } from '@/components/use-toast';

export const Broadcast: FC = () => {
  const [message, setMessage] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!message) {
        return;
      }

      await broadcast(message);
      toast({
        title: 'Message sent',
      });
      setMessage('');
    },
    [toast, message],
  );

  return (
    <form className="flex w-full max-w-[29rem] items-center space-x-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Hello world!"
        maxLength={54}
        onChange={(event) => setMessage(event.target.value)}
        value={message}
      />
      <Button type="submit" disabled={!message}>
        Send
      </Button>
    </form>
  );
};
