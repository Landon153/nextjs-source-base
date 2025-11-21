'use client';

import { type HTMLAttributes, type JSX } from 'react';

import { type BreadcrumbAtom, useSetBreadcrumbState } from '@/app/[locale]/(dashboard)/_lib/hooks/use-breadcrumb';
import { cn } from '@/lib/utils';

interface MainProps extends HTMLAttributes<HTMLElement> {
  breadcrumbs?: BreadcrumbAtom[];
}

export function Main({ className, breadcrumbs, ...props }: MainProps): JSX.Element {
  useSetBreadcrumbState(breadcrumbs);

  return <main className={cn('flex w-full grow flex-col p-4 lg:px-10 lg:py-7', className)} {...props} />;
}
