import { z } from 'zod';

import { QueryParamKey } from '@/lib/constants';
import { limitQuerySchema, pageQuerySchema, sortByQuerySchema } from '@/lib/schema/common-schema';

export const getReportsSchema = z.object({
  [QueryParamKey.Page]: pageQuerySchema,
  [QueryParamKey.Limit]: limitQuerySchema,
  [QueryParamKey.SortBy]: sortByQuerySchema,
});

export type GetReportsValues = z.infer<typeof getReportsSchema>;
