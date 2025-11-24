import { z } from 'zod';

import { Permission } from '@/lib/services/default/constants';

export const adminFormSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '관리자명을 입력해주세요 (최대 20자)' })
    .max(20, { message: '이름은 최대 20자여야 합니다.' }),
  email: z
    .string()
    .email({ message: '유효한 이메일 주소를 입력해주세요.' })
    .min(1, { message: '이메일을 입력해주세요 (최대 50자)' })
    .max(50, { message: '이메일은 최대 50자여야 합니다.' }),
  phoneNumber: z
    .string()
    .min(1, { message: '연락처를 입력해주세요 (최대 20자)' })
    .max(20, { message: '연락처는 최대 20자여야 합니다.' })
    .regex(/^\+?\d+(?:[ ]?\d+)*$/, {
      message: '연락처는 숫자와 공백만 포함해야 하며, 국제 전화 코드는 +로 시작할 수 있습니다.',
    }),
  status: z.coerce.boolean(),
  permissionsIds: z.array(z.nativeEnum(Permission)).min(1, { message: '권한을 선택해주세요.' }),
});

export type AdminFormValues = z.infer<typeof adminFormSchema>;
