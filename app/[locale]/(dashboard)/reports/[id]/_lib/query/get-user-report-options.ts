import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import type { GetReportsValues } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/schema/get-reports-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getUserReportDetails } from '@/lib/services/default/features/report';
import type { ApiResponse } from '@/lib/services/default/fetcher';
import type { PaginatedResponse } from '@/lib/services/default/types/common';
import type { Report } from '@/lib/services/default/types/report';

export function getUserReportOptions(
  id: string | number,
  queryParams: GetReportsValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<Report>>,
  Error,
  ApiResponse<PaginatedResponse<Report>>,
  (string | number | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.UserReport,
      id,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.SortBy],
    ],
    queryFn: () =>
      getUserReportDetails(id, {
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        withs: 'reporter,profile.statistic',
        sortBy: queryParams[QueryParamKey.SortBy],
      }),
  });
}
