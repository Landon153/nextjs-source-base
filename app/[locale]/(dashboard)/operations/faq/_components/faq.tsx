'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/operations/faq/_components/datatable';
import { getFaqOptions } from '@/app/[locale]/(dashboard)/operations/faq/_lib/query/get-faq-options';
import type { GetFaqValues } from '@/app/[locale]/(dashboard)/operations/faq/_lib/schema/get-faq-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface UsersProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetFaqValues;
}

export function Faq({ validatedParams, hasFilter, ...props }: UsersProps): JSX.Element {
  const { data } = useSuspenseQuery(getFaqOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
