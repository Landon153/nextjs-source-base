import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { type JSX } from 'react';

import { MembersStatistic } from '@/app/[locale]/(dashboard)/(home)/_components/members-statistic';
import { StatsList } from '@/app/[locale]/(dashboard)/(home)/_components/stats-list';
import { VisitorsStatistic } from '@/app/[locale]/(dashboard)/(home)/_components/visitors-statistic';
import {
  getMembersStatisticOptions,
  getVisitorsStatisticOptions,
} from '@/app/[locale]/(dashboard)/(home)/_lib/query/get-statistic-options';
import {
  getStatisticSchema,
  type GetStatisticValues,
} from '@/app/[locale]/(dashboard)/(home)/_lib/schema/get-statistic-schema';
import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { QueryParamKey, StatisticKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import type { SearchParams } from '@/lib/types/common';

export default function Home({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const queryClient = getQueryClient();

  const extractedVisitorsParams = extractParams<GetStatisticValues>(searchParams, {
    [StatisticKeys.Month]: QueryParamKey.VisitorsByMonth,
    [StatisticKeys.Year]: QueryParamKey.VisitorsByYear,
    [StatisticKeys.Period]: QueryParamKey.VisitorsPeriod,
  });

  const extractedMembersParams = extractParams<GetStatisticValues>(searchParams, {
    [StatisticKeys.Month]: QueryParamKey.MembersByMonth,
    [StatisticKeys.Year]: QueryParamKey.MembersByYear,
    [StatisticKeys.Period]: QueryParamKey.MembersPeriod,
  });

  const { validatedParams: validatedVisitorsParams } = validateParams(getStatisticSchema, extractedVisitorsParams);
  const { validatedParams: validatedMembersParams } = validateParams(getStatisticSchema, extractedMembersParams);

  void queryClient.prefetchQuery(getVisitorsStatisticOptions(validatedVisitorsParams));
  void queryClient.prefetchQuery(getMembersStatisticOptions(validatedMembersParams));

  return (
    <Main breadcrumbs={[{ href: '/', label: 'HOME' }]} className="space-y-5">
      <StatsList />

      <div className="grid gap-5 lg:grid-cols-2">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <VisitorsStatistic searchParams={validatedVisitorsParams} />
          <MembersStatistic searchParams={validatedMembersParams} />
        </HydrationBoundary>
      </div>
    </Main>
  );
}
