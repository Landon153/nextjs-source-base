import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import type { GetAdminsValues } from '@/app/[locale]/(dashboard)/admins/_lib/schema/get-admins-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getAdmins } from '@/lib/services/default/features/admin';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type Admin } from '@/lib/services/default/types/user';

export function getAdminsOptions(
  queryParams: GetAdminsValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<Admin>>,
  Error,
  ApiResponse<PaginatedResponse<Admin>>,
  (string | number | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.Admins,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
    ],
    queryFn: () =>
      getAdmins({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        search_like: queryParams[QueryParamKey.Search],
        withs: 'permissions',
        sortBy: queryParams[QueryParamKey.SortBy],
      }),
  });
}
