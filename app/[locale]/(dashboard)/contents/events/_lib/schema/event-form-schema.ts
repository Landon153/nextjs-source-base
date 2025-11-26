import { z } from 'zod';

import { mediaQuerySchema } from '@/lib/schema/common-schema';

export const eventFormSchema = z.object({
  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
  eventDates: z
    .object({
      fromDate: z.coerce.date(),
      toDate: z.coerce.date(),
    })
    .refine((data) => data.toDate > data.fromDate, {
      message: '종료 날짜는 시작 날짜보다 이전일 수 없습니다.',
      path: ['toDate'],
    })
    .refine((data) => data.fromDate > new Date(), {
      message: '시작 날짜는 현재 날짜보다 이전일 수 없습니다.',
      path: ['fromDate'],
    }),
  isShow: z.coerce.boolean({ message: '공개 여부를 선택해주세요.' }),
  isPushNoti: z.coerce.boolean({ message: '푸시 알림 여부를 선택해주세요.' }),
  media: mediaQuerySchema,
  title: z
    .string()
    .min(1, { message: '타이틀을 입력해주세요 (최대 100자)' })
    .max(100, { message: '제목은 최대 100자까지 가능합니다.' }),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
