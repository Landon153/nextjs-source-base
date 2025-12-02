import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { DisplayStatusValues } from '@/app/[locale]/(dashboard)/operations/notices/_lib/constants';
import type { GetNoticesValues } from '@/app/[locale]/(dashboard)/operations/notices/_lib/schema/get-notices-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getNotices } from '@/lib/services/default/features/notices';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type Notice } from '@/lib/services/default/types/notice';

export function getNoticesOptions(
  queryParams: GetNoticesValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<Notice>>,
  Error,
  ApiResponse<PaginatedResponse<Notice>>,
  (string | number | Date | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.Notices,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
      queryParams[QueryParamKey.IsShow],
      queryParams[QueryParamKey.From],
      queryParams[QueryParamKey.To],
    ],
    queryFn: () =>
      getNotices({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        title_like: queryParams[QueryParamKey.Search],
        sortBy: queryParams[QueryParamKey.SortBy],
        withs: 'creator',

        ...(queryParams[QueryParamKey.IsShow] &&
          queryParams[QueryParamKey.IsShow] !== DisplayStatusValues.All && {
            isShow_eq: queryParams[QueryParamKey.IsShow],
          }),

        ...(queryParams[QueryParamKey.From] &&
          queryParams[QueryParamKey.To] && {
            createdAt_btw: [
              queryParams[QueryParamKey.From].toISOString(),
              queryParams[QueryParamKey.To].toISOString(),
            ].join(','),
          }),
      }),
  });
}
