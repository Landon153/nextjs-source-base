'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/operations/notices/_components/datatable';
import { getNoticesOptions } from '@/app/[locale]/(dashboard)/operations/notices/_lib/query/get-notices-options';
import type { GetNoticesValues } from '@/app/[locale]/(dashboard)/operations/notices/_lib/schema/get-notices-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface NoticesProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetNoticesValues;
}

export function Notices({ validatedParams, hasFilter, ...props }: NoticesProps): JSX.Element {
  const { data } = useSuspenseQuery(getNoticesOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
