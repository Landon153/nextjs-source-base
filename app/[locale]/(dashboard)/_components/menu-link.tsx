'use client';

import { type ComponentProps, type ElementRef, forwardRef } from 'react';

import { getFormattedUrl, matchPathname } from '@/app/[locale]/(dashboard)/_lib/pathname';
import { Link, usePathname } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

type MenuLinkElement = ElementRef<typeof Link>;
interface MenuLinkProps extends ComponentProps<typeof Link> {
  pathRegex: string;
  classNames?: {
    active?: string;
  };
}

export const MenuLink = forwardRef<MenuLinkElement, MenuLinkProps>(
  ({ className, classNames, pathRegex, ...props }, forwardedRef) => {
    const pathname = usePathname();
    const href = getFormattedUrl(props.href);
    const isActive = pathname === href || matchPathname(pathRegex, pathname);

    return (
      <Link
        ref={forwardedRef}
        className={cn(
          'flex text-slate-400 transition',
          className,
          isActive ? ['text-slate-900', classNames?.active] : 'hover:text-slate-900/80',
        )}
        {...props}
      />
    );
  },
);

MenuLink.displayName = 'MenuLink';
