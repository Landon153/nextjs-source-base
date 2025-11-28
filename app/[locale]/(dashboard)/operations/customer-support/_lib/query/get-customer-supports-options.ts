import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import {
  AnswerStatusValues,
  SearchConditionValues,
} from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/constants';
import type { GetCustomerSupportsValues } from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/schema/get-customer-supports-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getCustomerSupports } from '@/lib/services/default/features/customer-support';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type CustomerSupport } from '@/lib/services/default/types/customer-support';

export function getCustomerSupportsOptions(
  queryParams: GetCustomerSupportsValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<CustomerSupport>>,
  Error,
  ApiResponse<PaginatedResponse<CustomerSupport>>,
  (string | number | Date | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.CustomerSupports,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.SortBy],
      queryParams[QueryParamKey.IsAnswer],
      queryParams[QueryParamKey.From],
      queryParams[QueryParamKey.To],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SearchBy],
    ],
    queryFn: () =>
      getCustomerSupports({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        sortBy: queryParams[QueryParamKey.SortBy],
        withs: 'respondent',

        ...(queryParams[QueryParamKey.IsAnswer] &&
          queryParams[QueryParamKey.IsAnswer] !== AnswerStatusValues.All && {
            isAnswer: queryParams[QueryParamKey.IsAnswer],
          }),

        ...(queryParams[QueryParamKey.From] &&
          queryParams[QueryParamKey.To] && {
            createdAt_btw: [
              queryParams[QueryParamKey.From].toISOString(),
              queryParams[QueryParamKey.To].toISOString(),
            ].join(','),
          }),

        ...(queryParams[QueryParamKey.Search] && {
          ...(queryParams[QueryParamKey.SearchBy] === SearchConditionValues.Email && {
            userEmail_like: queryParams[QueryParamKey.Search],
          }),
          ...(queryParams[QueryParamKey.SearchBy] === SearchConditionValues.AdminName && {
            'respondent.nickname_like': queryParams[QueryParamKey.Search],
          }),
        }),
      }),
  });
}
