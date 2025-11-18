import { z } from 'zod';

export const credentialsFormSchema = z.object({
  email: z
    .string({
      message: '이메일을 입력하세요.',
    })
    .email({
      message: '유효한 이메일 주소를 입력하세요.',
    }),
  password: z
    .string({
      message: '비밀번호를 입력하세요.',
    })
    .min(1, '비밀번호를 입력하세요.'),
});

export type CredentialsFormValues = z.infer<typeof credentialsFormSchema>;
