'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/reports/_components/datatable';
import { getUserReportsOptions } from '@/app/[locale]/(dashboard)/reports/_lib/query/get-user-reports-options';
import { type GetUserReportsValues } from '@/app/[locale]/(dashboard)/reports/_lib/schema/get-user-reports-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface UserReportsProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetUserReportsValues;
}

export function UserReports({ validatedParams, hasFilter, ...props }: UserReportsProps): JSX.Element {
  const { data } = useSuspenseQuery(getUserReportsOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
