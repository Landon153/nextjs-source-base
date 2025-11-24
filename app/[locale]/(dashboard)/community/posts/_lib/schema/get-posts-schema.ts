import { z } from 'zod';

import { StatusValues } from '@/app/[locale]/(dashboard)/community/posts/_lib/constants';
import { QueryParamKey } from '@/lib/constants';
import {
  dateQuerySchema,
  limitQuerySchema,
  pageQuerySchema,
  searchQuerySchema,
  sortByQuerySchema,
} from '@/lib/schema/common-schema';
import { transformLastArrayItem } from '@/lib/transform';

export const getPostsSchema = z.object({
  [QueryParamKey.Search]: searchQuerySchema,
  [QueryParamKey.Page]: pageQuerySchema,
  [QueryParamKey.Limit]: limitQuerySchema,
  [QueryParamKey.Status]: z
    .union([z.nativeEnum(StatusValues), z.nativeEnum(StatusValues).array().transform(transformLastArrayItem)])
    .optional(),
  [QueryParamKey.From]: dateQuerySchema,
  [QueryParamKey.To]: dateQuerySchema,
  [QueryParamKey.SortBy]: sortByQuerySchema,
});

export type GetPostsValues = z.infer<typeof getPostsSchema>;
