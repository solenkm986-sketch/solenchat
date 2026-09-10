'use client';

import { useTransition } from 'react';
import { signOutAction } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="secondary"
      isLoading={isPending}
      onClick={() => startTransition(() => signOutAction())}
    >
      Выйти
    </Button>
  );
}
