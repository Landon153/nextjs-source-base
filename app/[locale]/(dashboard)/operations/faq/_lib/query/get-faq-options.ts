import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { DisplayStatusValues } from '@/app/[locale]/(dashboard)/operations/faq/_lib/constants';
import type { GetFaqValues } from '@/app/[locale]/(dashboard)/operations/faq/_lib/schema/get-faq-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getFAQ } from '@/lib/services/default/features/faq';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type FAQ } from '@/lib/services/default/types/faq';

export function getFaqOptions(
  queryParams: GetFaqValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<FAQ>>,
  Error,
  ApiResponse<PaginatedResponse<FAQ>>,
  (string | number | Date | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.FAQ,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
      queryParams[QueryParamKey.IsShow],
      queryParams[QueryParamKey.From],
      queryParams[QueryParamKey.To],
    ],
    queryFn: () =>
      getFAQ({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        title_like: queryParams[QueryParamKey.Search],

        withs: 'creator',
        sortBy: queryParams[QueryParamKey.SortBy],

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
