import { z } from 'zod';

import { QueryParamKey } from '@/lib/constants';
import { limitQuerySchema, pageQuerySchema, searchQuerySchema, sortByQuerySchema } from '@/lib/schema/common-schema';

export const getAccessLogSchema = z.object({
  [QueryParamKey.Search]: searchQuerySchema,
  [QueryParamKey.Page]: pageQuerySchema,
  [QueryParamKey.Limit]: limitQuerySchema,
  [QueryParamKey.SortBy]: sortByQuerySchema,
});

export type GetAccessLogValues = z.infer<typeof getAccessLogSchema>;
