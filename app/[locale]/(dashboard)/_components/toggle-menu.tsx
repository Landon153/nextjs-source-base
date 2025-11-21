'use client';

import { PanelLeftIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { type JSX, type MouseEventHandler, useCallback, useMemo, useState } from 'react';

import { Menu } from '@/app/[locale]/(dashboard)/_components/menu';
import { menuItems } from '@/app/[locale]/(dashboard)/_components/menu-items';
import { LogoLink } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { filterMenuItems } from '@/lib/auth/menu';

export function ToggleMenu(): JSX.Element {
  const { data: session } = useSession();
  const menuItemsFiltered = useMemo(
    () => filterMenuItems(menuItems, session?.user.roles, session?.user.permissions),
    [session?.user.permissions, session?.user.roles],
  );
  const [open, setOpen] = useState(false);

  const handleMenuClick = useCallback<MouseEventHandler<HTMLElement>>((event) => {
    if ((event.target as HTMLElement).tagName === 'A') {
      setOpen(false);
    }
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          icon
          aria-label="메뉴 전환"
          className="shrink-0 sm:hidden"
          prefix={<PanelLeftIcon />}
          variant="outline"
        />
      </SheetTrigger>
      <SheetContent className="sm:max-w-xs" side="left">
        <SheetTitle className="grid h-16 shrink-0 place-items-center">
          <LogoLink />
        </SheetTitle>
        <SheetDescription className="sr-only text-center">BrickMate</SheetDescription>

        <ScrollArea className="">
          <Menu items={menuItemsFiltered} onClick={handleMenuClick} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
