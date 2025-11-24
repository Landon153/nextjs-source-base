'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/contents/banners/_components/datatable';
import { getBannersOptions } from '@/app/[locale]/(dashboard)/contents/banners/_lib/query/get-banners-options';
import { type GetBannersValues } from '@/app/[locale]/(dashboard)/contents/banners/_lib/schema/get-banners-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface BannersProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetBannersValues;
}

export function Banners({ validatedParams, hasFilter, ...props }: BannersProps): JSX.Element {
  const { data } = useSuspenseQuery(getBannersOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
