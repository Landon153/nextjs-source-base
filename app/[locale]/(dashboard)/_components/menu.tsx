'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Fragment, type HTMLAttributes, type JSX } from 'react';

import { MenuLink } from '@/app/[locale]/(dashboard)/_components/menu-link';
import { useDefaultValueMenu } from '@/app/[locale]/(dashboard)/_lib/hooks/use-default-value-menu';
import ChevronRightIcon from '@/assets/svg/icon/chevron-right.svg';
import { type MenuItem } from '@/lib/auth/definitions';
import { cn } from '@/lib/utils';

interface MenuProps extends HTMLAttributes<HTMLElement> {
  items: MenuItem[];
}

export function Menu({ className, items = [], ...props }: MenuProps): JSX.Element {
  const item = useDefaultValueMenu(items);

  return (
    <div className={cn('px-2 py-4', className)} {...props}>
      <Accordion.Root collapsible className="space-y-0.5" defaultValue={item?.regexPath} type="single">
        {items.map((menuItem) =>
          menuItem.children ? (
            <Accordion.Item key={menuItem.regexPath} value={menuItem.regexPath}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center gap-4 rounded-md px-4 py-3 text-sm hover:bg-slate-50/60 data-[state=open]:bg-slate-50">
                  <ChevronRightIcon className="size-4 shrink-0 p-0.75 text-slate-300 transition group-data-[state=open]:rotate-90 group-data-[state=open]:text-foreground" />
                  {menuItem.title}
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-collapsible-closed data-[state=open]:animate-collapsible-open">
                <ul className="space-y-3 py-2.5 pl-12">
                  {menuItem.children.map((child) =>
                    child.children ? (
                      <Fragment key={child.title} />
                    ) : (
                      <li key={child.path}>
                        <MenuLink href={child.path} pathRegex={child.regexPath}>
                          {child.title}
                        </MenuLink>
                      </li>
                    ),
                  )}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          ) : (
            <MenuLink
              key={menuItem.path}
              className="flex w-full items-center gap-4 rounded-md px-4 py-3 text-sm text-foreground hover:bg-slate-50/60"
              classNames={{ active: 'bg-slate-50 text-foreground [&_svg]:text-foreground' }}
              href={menuItem.path}
              pathRegex={menuItem.regexPath}
            >
              <ChevronRightIcon className="size-4 shrink-0 p-0.75 text-slate-300 transition" />
              {menuItem.title}
            </MenuLink>
          ),
        )}
      </Accordion.Root>
    </div>
  );
}
