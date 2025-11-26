import { z } from 'zod';

import { StatusValues } from '@/app/[locale]/(dashboard)/contents/events/_lib/constants';
import { QueryParamKey } from '@/lib/constants';
import { limitQuerySchema, pageQuerySchema, searchQuerySchema, sortByQuerySchema } from '@/lib/schema/common-schema';
import { transformLastArrayItem } from '@/lib/transform';

export const getEventsSchema = z.object({
  [QueryParamKey.Search]: searchQuerySchema,
  [QueryParamKey.Page]: pageQuerySchema,
  [QueryParamKey.Limit]: limitQuerySchema,
  [QueryParamKey.SortBy]: sortByQuerySchema,
  [QueryParamKey.Status]: z
    .union([z.nativeEnum(StatusValues), z.nativeEnum(StatusValues).array().transform(transformLastArrayItem)])
    .optional(),
});

export type GetEventsValues = z.infer<typeof getEventsSchema>;
