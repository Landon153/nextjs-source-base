import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Banners } from '@/app/[locale]/(dashboard)/contents/banners/_components/banners';
import { Filters } from '@/app/[locale]/(dashboard)/contents/banners/_components/filters';
import { getBannersOptions } from '@/app/[locale]/(dashboard)/contents/banners/_lib/query/get-banners-options';
import {
  getBannersSchema,
  type GetBannersValues,
} from '@/app/[locale]/(dashboard)/contents/banners/_lib/schema/get-banners-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '배너 관리',
};

export default function BannerListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetBannersValues>(searchParams, [
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.IsShowing,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getBannersSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getBannersOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/contents/banners', label: '콘텐츠 관리' },
        { href: '/contents/banners', label: '배너 관리' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Banners hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
