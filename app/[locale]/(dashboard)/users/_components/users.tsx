'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/users/_components/datatable';
import { getUsersOptions } from '@/app/[locale]/(dashboard)/users/_lib/query/get-users-options';
import type { GetUsersValues } from '@/app/[locale]/(dashboard)/users/_lib/schema/get-users-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface UsersProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetUsersValues;
}

export function Users({ validatedParams, hasFilter, ...props }: UsersProps): JSX.Element {
  const { data } = useSuspenseQuery(getUsersOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      queryParams={validatedParams}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
