import { z } from 'zod';

export const noticesFormSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.').max(2000, '내용은 2000자 이하로 입력해주세요.'),
  isShow: z.coerce.boolean(),
  title: z.string().min(1, '제목을 입력해주세요.').max(100, '제목은 100자 이하로 입력해주세요.'),
});

export type NoticesFormValues = z.infer<typeof noticesFormSchema>;
