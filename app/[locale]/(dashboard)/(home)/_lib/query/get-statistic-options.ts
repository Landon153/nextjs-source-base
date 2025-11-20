import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { type GetStatisticValues } from '@/app/[locale]/(dashboard)/(home)/_lib/schema/get-statistic-schema';
import { QueryKeys, StatisticKeys } from '@/lib/constants';
import { calculateDateRange } from '@/lib/helpers/date';
import { getMembersStatistic, getVisitorsStatistic } from '@/lib/services/default/features/user';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type ChartStatistic } from '@/lib/services/default/types/user';

export function getMembersStatisticOptions(
  queryParams: GetStatisticValues,
): UseSuspenseQueryOptions<ApiResponse<ChartStatistic[]>, Error, ApiResponse<ChartStatistic[]>, string[]> {
  const month = queryParams[StatisticKeys.Month];
  const year = queryParams[StatisticKeys.Year];
  const period = queryParams[StatisticKeys.Period];

  const { fromDate, toDate } = calculateDateRange(period, year, month);

  return queryOptions({
    queryKey: [QueryKeys.Members, fromDate, toDate],
    queryFn: () => getMembersStatistic({ fromDate, toDate }),
  });
}

export function getVisitorsStatisticOptions(
  queryParams: GetStatisticValues,
): UseSuspenseQueryOptions<ApiResponse<ChartStatistic[]>, Error, ApiResponse<ChartStatistic[]>, string[]> {
  const month = queryParams[StatisticKeys.Month];
  const year = queryParams[StatisticKeys.Year];
  const period = queryParams[StatisticKeys.Period];

  const { fromDate, toDate } = calculateDateRange(period, year, month);

  return queryOptions({
    queryKey: [QueryKeys.Visitors, fromDate, toDate],
    queryFn: () => getVisitorsStatistic({ fromDate, toDate }),
  });
}
