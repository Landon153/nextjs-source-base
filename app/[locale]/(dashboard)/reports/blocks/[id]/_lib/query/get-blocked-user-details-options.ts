import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { type GetBlockedUserDetailsValues } from '@/app/[locale]/(dashboard)/reports/blocks/[id]/_lib/schema/get-blocked-user-details-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getBlockedUserDetails } from '@/lib/services/default/features/block';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type Block } from '@/lib/services/default/types/block';
import { type PaginatedResponse } from '@/lib/services/default/types/common';

export function getBlockedUserDetailsOptions(
  userId: string | number,
  queryParams: GetBlockedUserDetailsValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<Block>>,
  Error,
  ApiResponse<PaginatedResponse<Block>>,
  (string | number | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.BlockedUserDetails,
      userId,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.SortBy],
    ],
    queryFn: () =>
      getBlockedUserDetails(userId, {
        withs: 'blocker',
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        sortBy: queryParams[QueryParamKey.SortBy],
      }),
  });
}
