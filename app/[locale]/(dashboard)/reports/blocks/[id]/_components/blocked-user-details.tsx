'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/reports/blocks/[id]/_components/datatable';
import { getBlockedUserDetailsOptions } from '@/app/[locale]/(dashboard)/reports/blocks/[id]/_lib/query/get-blocked-user-details-options';
import { type GetBlockedUserDetailsValues } from '@/app/[locale]/(dashboard)/reports/blocks/[id]/_lib/schema/get-blocked-user-details-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface BlockedUserDetailsProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  totalBlocked: number | undefined;
  totalUnblocked: number | undefined;
  userId: string | number;
  validatedParams: GetBlockedUserDetailsValues;
}

export function BlockedUserDetails({
  userId,
  validatedParams,
  totalBlocked = 0,
  totalUnblocked = 0,
  hasFilter,
  ...props
}: BlockedUserDetailsProps): JSX.Element {
  const { data } = useSuspenseQuery(getBlockedUserDetailsOptions(userId, validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      totalBlocked={totalBlocked}
      totalUnblocked={totalUnblocked}
      {...props}
    />
  );
}
