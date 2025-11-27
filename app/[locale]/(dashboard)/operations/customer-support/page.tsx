import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { CustomerSupports } from '@/app/[locale]/(dashboard)/operations/customer-support/_components/customer-supports';
import { Filters } from '@/app/[locale]/(dashboard)/operations/customer-support/_components/filters';
import { getCustomerSupportsOptions } from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/query/get-customer-supports-options';
import {
  getCustomerSupportsSchema,
  type GetCustomerSupportsValues,
} from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/schema/get-customer-supports-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: 'CS 관리',
};

export default function CustomerSupportListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetCustomerSupportsValues>(searchParams, [
    QueryParamKey.From,
    QueryParamKey.To,
    QueryParamKey.IsAnswer,
    QueryParamKey.Search,
    QueryParamKey.SearchBy,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getCustomerSupportsSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getCustomerSupportsOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/operations/customer-support', label: '운영 관리' },
        { href: '/operations/customer-support', label: 'CS 관리' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CustomerSupports hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
