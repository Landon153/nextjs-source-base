'use client';

import { type ComponentProps, Fragment, type JSX } from 'react';

import { useBreadcrumbValue } from '@/app/[locale]/(dashboard)/_lib/hooks/use-breadcrumb';
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

type BreadcrumbProps = ComponentProps<typeof BreadcrumbRoot>;

export function Breadcrumb({ className, ...props }: BreadcrumbProps): JSX.Element {
  const breadcrumbItems = useBreadcrumbValue();
  const length = breadcrumbItems.length;

  return (
    <BreadcrumbRoot className={cn('flex grow', className)} {...props}>
      <BreadcrumbList className="text-foreground">
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href + item.label}>
            {index === length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage className={cn(index === 0 ? 'text-xl font-medium text-slate-900' : 'text-sm')}>
                  {item.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className={cn(
                      index === 0 ? 'text-xl font-medium text-slate-900' : 'text-sm',
                      'hover:text-slate-900',
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
