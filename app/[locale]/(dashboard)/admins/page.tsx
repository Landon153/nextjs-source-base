import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Admins } from '@/app/[locale]/(dashboard)/admins/_components/admins';
import { Filters } from '@/app/[locale]/(dashboard)/admins/_components/filters';
import { getAdminsOptions } from '@/app/[locale]/(dashboard)/admins/_lib/query/get-admins-options';
import { getAdminsSchema, type GetAdminsValues } from '@/app/[locale]/(dashboard)/admins/_lib/schema/get-admins-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '관리자 관리',
};

export default function AdminListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetAdminsValues>(searchParams, [
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getAdminsSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getAdminsOptions(validatedParams));

  return (
    <Main breadcrumbs={[{ href: '/admins', label: '관리자 관리' }]} className="space-y-7">
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Admins hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
