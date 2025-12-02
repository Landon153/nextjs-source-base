'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/reports/[id]/_components/datatable';
import { UserReportCard } from '@/app/[locale]/(dashboard)/reports/[id]/_components/user-report-card';
import { getUserReportOptions } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/query/get-user-report-options';
import { type GetReportsValues } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/schema/get-reports-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';
import { cn } from '@/lib/utils';

interface UserReportProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  userId: string | number;
  validatedParams: GetReportsValues;
}

export function UserReport({ className, userId, validatedParams, hasFilter, ...props }: UserReportProps): JSX.Element {
  const { data } = useSuspenseQuery(getUserReportOptions(userId, validatedParams));

  return (
    <div className={cn('grid items-start gap-5 xl:grid-cols-[1fr_31.875rem]', className)} {...props}>
      <Datatable
        data={data.status ? data.data : EmptyPaginationResponse}
        hasFilter={hasFilter}
        sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      />
      <UserReportCard className="shrink-0" />
    </div>
  );
}
