import { z } from 'zod';

export const customerSupportsFormSchema = z.object({
  answerContent: z.string().max(1000, '비밀번호를 입력하세요.').nullable(),
});

export type CustomerSupportsFormValues = z.infer<typeof customerSupportsFormSchema>;
