import { z } from 'zod';

import { PeriodValues } from '@/app/[locale]/(dashboard)/(home)/_lib/constants';
import { StatisticKeys } from '@/lib/constants';
import { transformLastArrayItem } from '@/lib/transform';

const monthSchema = z
  .union([
    z.coerce.number().int().positive().min(1).max(12),
    z.coerce.number().int().min(1).max(12).array().transform(transformLastArrayItem),
  ])
  .optional()
  .default(new Date().getMonth() + 1);

const yearSchema = z
  .union([
    z.coerce.number().int().positive().min(2020),
    z.coerce.number().int().min(2020).array().transform(transformLastArrayItem),
  ])
  .optional()
  .default(new Date().getFullYear());

const periodSchema = z
  .union([z.nativeEnum(PeriodValues), z.nativeEnum(PeriodValues).array().transform(transformLastArrayItem)])
  .optional()
  .default(PeriodValues.Month);

export const getStatisticSchema = z.object({
  [StatisticKeys.Month]: monthSchema,
  [StatisticKeys.Year]: yearSchema,
  [StatisticKeys.Period]: periodSchema,
});

export type GetStatisticValues = z.infer<typeof getStatisticSchema>;
