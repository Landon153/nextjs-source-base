import { z } from 'zod';

import { mediaQuerySchema } from '@/lib/schema/common-schema';

const removeMarkdownImages = (text: string): string => {
  return text.replace(/!\[.*?]\(.*?\)/g, '');
};

const contentSchema = z
  .string()
  .min(1, '내용을 입력해주세요.')
  .refine((text) => removeMarkdownImages(text).length <= 1000, {
    message: '내용은 1000자 이하로 입력해주세요.',
  });

export const faqFormSchema = z.object({
  content: contentSchema,
  isShow: z.coerce.boolean(),
  media: mediaQuerySchema,
  title: z.string().min(1, '제목을 입력해주세요.').max(100, '제목은 100자 이하로 입력해주세요.'),
});

export type FaqFormValues = z.infer<typeof faqFormSchema>;
