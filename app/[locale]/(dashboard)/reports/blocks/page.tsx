import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX, Suspense } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { BlockedUsers } from '@/app/[locale]/(dashboard)/reports/blocks/_components/blocked-users';
import { Filters } from '@/app/[locale]/(dashboard)/reports/blocks/_components/filters';
import { getBlockedUsersOptions } from '@/app/[locale]/(dashboard)/reports/blocks/_lib/query/get-blocked-users-options';
import {
  getBlockedUsersSchema,
  type GetBlockedUsersValues,
} from '@/app/[locale]/(dashboard)/reports/blocks/_lib/schema/get-blocked-users-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import type { SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '차단 관리',
};

export default function BlockListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetBlockedUsersValues>(searchParams, [
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getBlockedUsersSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getBlockedUsersOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/reports', label: '신고/차단 관리' },
        { href: '/reports/blocks', label: '차단 관리' },
      ]}
      className="space-y-7"
    >
      <Suspense>
        <Filters validatedParams={validatedParams} />
      </Suspense>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlockedUsers hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
