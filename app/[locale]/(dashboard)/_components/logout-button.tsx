import { type JSX } from 'react';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { logout } from '@/lib/services/default/features/auth-private';

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ ...props }: LogoutButtonProps): JSX.Element {
  return (
    <form
      action={async () => {
        'use server';

        await logout();
        await signOut();
      }}
      {...props}
    >
      <Button className="rounded border-foreground" size="sm" type="submit" variant="outline">
        로그아웃
      </Button>
    </form>
  );
}
