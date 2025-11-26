import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Filters } from '@/app/[locale]/(dashboard)/logs/access/_components/filters';
import { AccessLog } from '@/app/[locale]/(dashboard)/logs/access/_components/log';
import { getAccessLogOptions } from '@/app/[locale]/(dashboard)/logs/access/_lib/query/get-access-log-options';
import {
  getAccessLogSchema,
  type GetAccessLogValues,
} from '@/app/[locale]/(dashboard)/logs/access/_lib/schema/get-access-log-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '접속 로그',
};

export default function LogAccessListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetAccessLogValues>(searchParams, [
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getAccessLogSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getAccessLogOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/logs/access', label: '로그 관리' },
        { href: '/logs/access', label: '접속 로그' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AccessLog hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
