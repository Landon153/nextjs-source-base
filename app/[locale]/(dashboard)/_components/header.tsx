import { type HTMLAttributes, type JSX } from 'react';

import { Breadcrumb } from '@/app/[locale]/(dashboard)/_components/breadcrumb';
import { LogoutButton } from '@/app/[locale]/(dashboard)/_components/logout-button';
import { ToggleMenu } from '@/app/[locale]/(dashboard)/_components/toggle-menu';
import { cn } from '@/lib/utils';

type HeaderProps = HTMLAttributes<HTMLDivElement>;

export function Header({ className, ...props }: HeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-slate-200 bg-slate-50 px-4 sm:px-6',
        className,
      )}
      {...props}
    >
      <ToggleMenu />

      <Breadcrumb className="max-sm:hidden" />

      <LogoutButton className="ml-auto" />
    </header>
  );
}
