'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/logs/access/_components/datatable/datatable';
import { getAccessLogOptions } from '@/app/[locale]/(dashboard)/logs/access/_lib/query/get-access-log-options';
import { type GetAccessLogValues } from '@/app/[locale]/(dashboard)/logs/access/_lib/schema/get-access-log-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface CustomerSupportsProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetAccessLogValues;
}

export function AccessLog({ validatedParams, hasFilter, ...props }: CustomerSupportsProps): JSX.Element {
  const { data } = useSuspenseQuery(getAccessLogOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
