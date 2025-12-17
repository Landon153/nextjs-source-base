import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Filters } from '@/app/[locale]/(dashboard)/users/_components/filters';
import { Users } from '@/app/[locale]/(dashboard)/users/_components/users';
import { getUsersOptions } from '@/app/[locale]/(dashboard)/users/_lib/query/get-users-options';
import { getUsersSchema, type GetUsersValues } from '@/app/[locale]/(dashboard)/users/_lib/schema/get-users-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '일반 회원',
};

export default function GeneralUserListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetUsersValues>(searchParams, [
    QueryParamKey.From,
    QueryParamKey.To,
    QueryParamKey.MarketingNotifyStatus,
    QueryParamKey.SuspensionStatus,
    QueryParamKey.SearchBy,
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getUsersSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getUsersOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/users', label: '회원 관리' },
        { href: '/users', label: '일반 회원' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Users hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
