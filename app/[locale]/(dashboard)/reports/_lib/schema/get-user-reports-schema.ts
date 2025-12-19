import { z } from 'zod';

import { QueryParamKey } from '@/lib/constants';
import { limitQuerySchema, pageQuerySchema, searchQuerySchema, sortByQuerySchema } from '@/lib/schema/common-schema';

export const getUserReportsSchema = z.object({
  [QueryParamKey.Search]: searchQuerySchema,
  [QueryParamKey.Page]: pageQuerySchema,
  [QueryParamKey.Limit]: limitQuerySchema,
  [QueryParamKey.SortBy]: sortByQuerySchema.default('statistic.recentReportedAt:DESC'),
});

export type GetUserReportsValues = z.infer<typeof getUserReportsSchema>;
