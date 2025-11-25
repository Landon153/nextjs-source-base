'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/contents/events/_components/datatable';
import { getEventsOptions } from '@/app/[locale]/(dashboard)/contents/events/_lib/query/get-events-option';
import { type GetEventsValues } from '@/app/[locale]/(dashboard)/contents/events/_lib/schema/get-events-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface EventsProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetEventsValues;
}

export function Events({ validatedParams, hasFilter, ...props }: EventsProps): JSX.Element {
  const { data } = useSuspenseQuery(getEventsOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
