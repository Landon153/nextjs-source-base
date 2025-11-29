import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Faq } from '@/app/[locale]/(dashboard)/operations/faq/_components/faq';
import { Filters } from '@/app/[locale]/(dashboard)/operations/faq/_components/filters';
import { getFaqOptions } from '@/app/[locale]/(dashboard)/operations/faq/_lib/query/get-faq-options';
import { getFaqSchema, type GetFaqValues } from '@/app/[locale]/(dashboard)/operations/faq/_lib/schema/get-faq-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: 'FAQ 관리',
};

export default function FaqListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetFaqValues>(searchParams, [
    QueryParamKey.From,
    QueryParamKey.To,
    QueryParamKey.IsShow,
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getFaqSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getFaqOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/operations/faq', label: '운영 관리' },
        { href: '/operations/faq', label: 'FAQ 관리' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Faq hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
