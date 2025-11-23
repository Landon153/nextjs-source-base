'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/admins/_components/datatable';
import { getAdminsOptions } from '@/app/[locale]/(dashboard)/admins/_lib/query/get-admins-options';
import { type GetAdminsValues } from '@/app/[locale]/(dashboard)/admins/_lib/schema/get-admins-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface AdminsProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetAdminsValues;
}

export function Admins({ validatedParams, hasFilter, ...props }: AdminsProps): JSX.Element {
  const { data } = useSuspenseQuery(getAdminsOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
