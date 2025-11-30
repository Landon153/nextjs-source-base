import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Filters } from '@/app/[locale]/(dashboard)/operations/notices/_components/filters';
import { Notices } from '@/app/[locale]/(dashboard)/operations/notices/_components/notices';
import { getNoticesOptions } from '@/app/[locale]/(dashboard)/operations/notices/_lib/query/get-notices-options';
import {
  getNoticesSchema,
  type GetNoticesValues,
} from '@/app/[locale]/(dashboard)/operations/notices/_lib/schema/get-notices-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '공지사항 관리',
};

export default function NoticeListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetNoticesValues>(searchParams, [
    QueryParamKey.From,
    QueryParamKey.To,
    QueryParamKey.IsShow,
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getNoticesSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getNoticesOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/operations/notices', label: '운영 관리' },
        { href: '/operations/notices', label: '공지사항 관리' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notices hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
