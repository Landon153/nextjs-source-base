import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import type { GetAccessLogValues } from '@/app/[locale]/(dashboard)/logs/access/_lib/schema/get-access-log-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getAccessLogs } from '@/lib/services/default/features/log';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type LogAccess } from '@/lib/services/default/types/log';

export function getAccessLogOptions(
  queryParams: GetAccessLogValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<LogAccess>>,
  Error,
  ApiResponse<PaginatedResponse<LogAccess>>,
  (string | number | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.AccessLog,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
    ],
    queryFn: () =>
      getAccessLogs({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        search_like: queryParams[QueryParamKey.Search],
        sortBy: queryParams[QueryParamKey.SortBy],
      }),
  });
}
