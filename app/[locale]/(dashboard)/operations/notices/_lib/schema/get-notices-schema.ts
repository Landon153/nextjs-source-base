import { z } from 'zod';

import { DisplayStatusValues } from '@/app/[locale]/(dashboard)/operations/notices/_lib/constants';
import { QueryParamKey } from '@/lib/constants';
import {
  dateQuerySchema,
  limitQuerySchema,
  pageQuerySchema,
  searchQuerySchema,
  sortByQuerySchema,
} from '@/lib/schema/common-schema';
import { transformLastArrayItem } from '@/lib/transform';

export const getNoticesSchema = z.object({
  [QueryParamKey.IsShow]: z
    .union([
      z.nativeEnum(DisplayStatusValues),
      z.nativeEnum(DisplayStatusValues).array().transform(transformLastArrayItem),
    ])
    .optional(),

  [QueryParamKey.From]: dateQuerySchema,
  [QueryParamKey.To]: dateQuerySchema,
  [QueryParamKey.Search]: searchQuerySchema,
  [QueryParamKey.Page]: pageQuerySchema,
  [QueryParamKey.Limit]: limitQuerySchema,
  [QueryParamKey.SortBy]: sortByQuerySchema,
});

export type GetNoticesValues = z.infer<typeof getNoticesSchema>;
