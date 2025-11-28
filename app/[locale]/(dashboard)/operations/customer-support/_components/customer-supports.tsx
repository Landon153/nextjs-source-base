'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/operations/customer-support/_components/datatable';
import { getCustomerSupportsOptions } from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/query/get-customer-supports-options';
import type { GetCustomerSupportsValues } from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/schema/get-customer-supports-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface CustomerSupportsProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetCustomerSupportsValues;
}

export function CustomerSupports({ validatedParams, hasFilter, ...props }: CustomerSupportsProps): JSX.Element {
  const { data } = useSuspenseQuery(getCustomerSupportsOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
