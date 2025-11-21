'use client';

import { useSession } from 'next-auth/react';
import { type HTMLAttributes, type JSX, useMemo } from 'react';

import { Menu } from '@/app/[locale]/(dashboard)/_components/menu';
import { menuItems } from '@/app/[locale]/(dashboard)/_components/menu-items';
import { LogoLink } from '@/components/shared/logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { filterMenuItems } from '@/lib/auth/menu';
import { cn } from '@/lib/utils';

type SidebarProps = HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className, ...props }: SidebarProps): JSX.Element {
  const { data: session } = useSession();
  const menuItemsFiltered = useMemo(
    () => filterMenuItems(menuItems, session?.user.roles, session?.user.permissions),
    [session?.user.permissions, session?.user.roles],
  );

  return (
    <aside
      className={cn('fixed inset-y-0 left-0 z-10 flex w-60 flex-col bg-white max-sm:hidden', className)}
      {...props}
    >
      <div className="grid h-20 shrink-0 place-items-center">
        <LogoLink />
      </div>

      <ScrollArea className="">
        <Menu items={menuItemsFiltered} />
      </ScrollArea>
    </aside>
  );
}
