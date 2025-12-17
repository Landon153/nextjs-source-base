import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { type GetUserReportsValues } from '@/app/[locale]/(dashboard)/reports/_lib/schema/get-user-reports-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getUserReports } from '@/lib/services/default/features/report';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type User } from '@/lib/services/default/types/user';

export function getUserReportsOptions(
  queryParams: GetUserReportsValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<User>>,
  Error,
  ApiResponse<PaginatedResponse<User>>,
  (string | number | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.UserReports,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
    ],
    queryFn: () =>
      getUserReports({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        search_like: queryParams[QueryParamKey.Search],
        sortBy: queryParams[QueryParamKey.SortBy],
        withs: 'statistic',
      }),
  });
}
