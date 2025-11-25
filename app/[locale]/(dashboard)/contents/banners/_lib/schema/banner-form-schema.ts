import { z } from 'zod';

import { mediaQuerySchema } from '@/lib/schema/common-schema';

export const bannerFormSchema = z.object({
  isShow: z.coerce.boolean(),
  title: z
    .string()
    .min(1, { message: '타이틀을 입력해주세요 (최대 100자).' })
    .max(100, { message: '제목은 최대 100자까지 가능합니다.' }),
  media: mediaQuerySchema,
  link: z.string().url({ message: '유효한 URL을 입력해주세요.' }).nullable(),
});

export type BannerFormValues = z.infer<typeof bannerFormSchema>;
