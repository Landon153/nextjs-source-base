import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { UserReport } from '@/app/[locale]/(dashboard)/reports/[id]/_components/user-report';
import { getUserReportOptions } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/query/get-user-report-options';
import {
  getReportsSchema,
  type GetReportsValues,
} from '@/app/[locale]/(dashboard)/reports/[id]/_lib/schema/get-reports-schema';
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

export const metadata: Metadata = {
  title: '신고 상세',
};

export default async function ReportDetailsPage({
  params,
  searchParams,
}: ReportDetailsPageProps): Promise<JSX.Element> {
  const response = await getUserDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const extractedParams = extractParams<GetReportsValues>(searchParams, [
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getReportsSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getUserReportOptions(params.id, validatedParams));

  const {
    data: { nickname },
  } = response;

  return (
    <Main
      breadcrumbs={[
        { href: '/reports', label: '신고/차단 관리' },
        { href: '/reports', label: '신고 관리' },
        { href: `/reports/${params.id}`, label: '신고 상세' },
      ]}
      className="space-y-7"
    >
      <Card>
        <CardHeader className="min-h-15 justify-center py-3">
          <CardTitle className="text-sm font-medium">{nickname}</CardTitle>
        </CardHeader>
      </Card>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserReport
          hasFilter={!isEqual(defaultParams, validatedParams)}
          userId={params.id}
          validatedParams={validatedParams}
        />
      </HydrationBoundary>
    </Main>
  );
}
