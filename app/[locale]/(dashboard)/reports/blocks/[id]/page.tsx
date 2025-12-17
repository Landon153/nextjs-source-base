import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { BlockedUserDetails } from '@/app/[locale]/(dashboard)/reports/blocks/[id]/_components/blocked-user-details';
import { getBlockedUserDetailsOptions } from '@/app/[locale]/(dashboard)/reports/blocks/[id]/_lib/query/get-blocked-user-details-options';
import {
  getBlockedUserDetailsSchema,
  type GetBlockedUserDetailsValues,
} from '@/app/[locale]/(dashboard)/reports/blocks/[id]/_lib/schema/get-blocked-user-details-schema';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { getUserDetails } from '@/lib/services/default/features/user';
import type { SearchParams } from '@/lib/types/common';

interface ReportDetailsPageProps {
  params: { id: string };
  searchParams: SearchParams;
}

export async function generateMetadata({ params }: ReportDetailsPageProps): Promise<Metadata> {
  const response = await getUserDetails(params.id);

  if (!response.status) {
    notFound();
  }

  return {
    title: response.data.nickname,
  };
}

export default async function BlockDetailsPage({ params, searchParams }: ReportDetailsPageProps): Promise<JSX.Element> {
  const response = await getUserDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const extractedParams = extractParams<GetBlockedUserDetailsValues>(searchParams, [
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getBlockedUserDetailsSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getBlockedUserDetailsOptions(params.id, validatedParams));

  const { nickname, statistic } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/reports', label: '신고/차단 관리' },
        { href: '/reports/blocks', label: '차단 관리' },
        { href: `/reports/blocks/${params.id}`, label: nickname },
      ]}
      className="space-y-7"
    >
      <Card>
        <CardHeader className="min-h-15 justify-center py-3">
          <CardTitle className="text-sm font-medium">{nickname}</CardTitle>
        </CardHeader>
      </Card>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlockedUserDetails
          hasFilter={!isEqual(defaultParams, validatedParams)}
          totalBlocked={statistic?.totalBlocked}
          totalUnblocked={statistic?.totalUnblocked}
          userId={params.id}
          validatedParams={validatedParams}
        />
      </HydrationBoundary>
    </Main>
  );
}
