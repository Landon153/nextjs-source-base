import { z } from 'zod';

import {
  AnswerStatusValues,
  SearchConditionValues,
} from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/constants';
import { QueryParamKey } from '@/lib/constants';
import {
  dateQuerySchema,
  limitQuerySchema,
  pageQuerySchema,
  searchQuerySchema,
  sortByQuerySchema,
} from '@/lib/schema/common-schema';
import { transformLastArrayItem } from '@/lib/transform';

export const getCustomerSupportsSchema = z.object({
  [QueryParamKey.IsAnswer]: z
    .union([
      z.nativeEnum(AnswerStatusValues),
      z.nativeEnum(AnswerStatusValues).array().transform(transformLastArrayItem),
    ])
    .optional(),

  [QueryParamKey.SearchBy]: z
    .union([
      z.nativeEnum(SearchConditionValues),
      z.nativeEnum(SearchConditionValues).array().transform(transformLastArrayItem),
    ])
    .optional()
    .default(SearchConditionValues.Email),

  [QueryParamKey.From]: dateQuerySchema,
  [QueryParamKey.To]: dateQuerySchema,
  [QueryParamKey.Search]: searchQuerySchema,
  [QueryParamKey.Page]: pageQuerySchema,
  [QueryParamKey.Limit]: limitQuerySchema,
  [QueryParamKey.SortBy]: sortByQuerySchema,
});

export type GetCustomerSupportsValues = z.infer<typeof getCustomerSupportsSchema>;
