import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Filters } from '@/app/[locale]/(dashboard)/reports/_components/filters';
import { UserReports } from '@/app/[locale]/(dashboard)/reports/_components/user-reports';
import { getUserReportsOptions } from '@/app/[locale]/(dashboard)/reports/_lib/query/get-user-reports-options';
import {
  getUserReportsSchema,
  type GetUserReportsValues,
} from '@/app/[locale]/(dashboard)/reports/_lib/schema/get-user-reports-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import type { SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '신고 관리',
};

export default function ReportListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetUserReportsValues>(searchParams, [
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getUserReportsSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getUserReportsOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/reports', label: '신고/차단 관리' },
        { href: '/reports', label: '신고 관리' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserReports hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
