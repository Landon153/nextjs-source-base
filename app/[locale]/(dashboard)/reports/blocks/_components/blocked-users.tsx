'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/reports/blocks/_components/datatable';
import { getBlockedUsersOptions } from '@/app/[locale]/(dashboard)/reports/blocks/_lib/query/get-blocked-users-options';
import { type GetBlockedUsersValues } from '@/app/[locale]/(dashboard)/reports/blocks/_lib/schema/get-blocked-users-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface BlockedUsersProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetBlockedUsersValues;
}

export function BlockedUsers({ validatedParams, hasFilter, ...props }: BlockedUsersProps): JSX.Element {
  const { data } = useSuspenseQuery(getBlockedUsersOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
