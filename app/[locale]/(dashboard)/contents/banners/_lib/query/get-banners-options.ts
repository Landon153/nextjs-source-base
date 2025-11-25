import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { StatusValues } from '@/app/[locale]/(dashboard)/contents/banners/_lib/constants';
import type { GetBannersValues } from '@/app/[locale]/(dashboard)/contents/banners/_lib/schema/get-banners-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getBanners } from '@/lib/services/default/features/banners';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type Banner } from '@/lib/services/default/types/banner';
import { type PaginatedResponse } from '@/lib/services/default/types/common';

export function getBannersOptions(
  queryParams: GetBannersValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<Banner>>,
  Error,
  ApiResponse<PaginatedResponse<Banner>>,
  (string | number | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.Banners,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
      queryParams[QueryParamKey.IsShowing],
    ],
    queryFn: () =>
      getBanners({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        search_like: queryParams[QueryParamKey.Search],
        withs: 'file',
        sortBy: queryParams[QueryParamKey.SortBy],
        ...(queryParams[QueryParamKey.IsShowing] &&
          queryParams[QueryParamKey.IsShowing] !== StatusValues.All && {
            isShow_eq: queryParams[QueryParamKey.IsShowing],
          }),
      }),
  });
}
